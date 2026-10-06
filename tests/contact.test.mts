import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import nodemailer from "nodemailer";

/** Formulário de contato: configuração de e-mail, mensagem enviada, limite de envios e respostas da rota `/api/contato`. */
const { buildContactMessage, contactMailConfig, sendContactMail } = await import("../src/lib/contact-mail.ts");
const { rateLimited, resetRateLimit } = await import("../src/lib/rate-limit.ts");
const { POST } = await import("../src/app/api/contato/route.ts");

const ENV = { CONTACT_TO: "ricardo@daksa.com.br, renato@daksa.com.br", MAIL_FROM: "Católico.digital <no-reply@mail.catolico.digital>", SMTP_HOST: "smtp.mailgun.org", SMTP_USER: "postmaster@mail.catolico.digital", SMTP_PASSWORD: "segredo" };
const DATA = { subject: "Quero ver uma demonstração", name: "Maria", email: "maria@paroquia.com.br", phone: "", parish: "Paróquia São José", location: "", role: "Secretaria", message: "Olá!" };

describe("configuração de e-mail", () => {
  it("lê destinatários (vírgula), remetente e SMTP; porta 587 por padrão", () => {
    const config = contactMailConfig(ENV)!;
    assert.deepEqual(config.to, ["ricardo@daksa.com.br", "renato@daksa.com.br"]);
    assert.equal(config.port, 587);
    assert.equal(config.secure, false);
    assert.equal(config.user, "postmaster@mail.catolico.digital");
  });

  it("porta 465 com SMTP_SECURE=true", () => {
    const config = contactMailConfig({ ...ENV, SMTP_SECURE: "true" })!;
    assert.equal(config.port, 465);
    assert.equal(config.secure, true);
  });

  it("incompleta ou inválida = inativa (null): sem destino, sem remetente, sem host, credencial pela metade", () => {
    assert.equal(contactMailConfig({}), null);
    assert.equal(contactMailConfig({ ...ENV, CONTACT_TO: undefined }), null);
    assert.equal(contactMailConfig({ ...ENV, CONTACT_TO: "nao-e-email" }), null);
    assert.equal(contactMailConfig({ ...ENV, MAIL_FROM: undefined }), null);
    assert.equal(contactMailConfig({ ...ENV, SMTP_HOST: undefined }), null);
    assert.equal(contactMailConfig({ ...ENV, SMTP_PASSWORD: undefined }), null);
  });

  it("endereço inválido na lista é ignorado, os válidos continuam", () => {
    assert.deepEqual(contactMailConfig({ ...ENV, CONTACT_TO: "x, ricardo@daksa.com.br" })!.to, ["ricardo@daksa.com.br"]);
  });
});

describe("mensagem", () => {
  const config = contactMailConfig(ENV)!;

  it("vai para os dois e-mails, responde para quem escreveu e leva todos os campos", async () => {
    const sent: Array<Record<string, unknown>> = [];
    await sendContactMail(DATA, config, undefined, { sendMail: (async (message: Record<string, unknown>) => void sent.push(message)) as never });
    const message = sent[0]!;
    assert.deepEqual(message.to, ["ricardo@daksa.com.br", "renato@daksa.com.br"]);
    assert.equal(message.replyTo, "maria@paroquia.com.br");
    assert.equal(message.subject, "[Site] Quero ver uma demonstração · Paróquia São José");
    for (const text of ["Maria", "maria@paroquia.com.br", "Paróquia São José", "Secretaria", "Olá!"]) assert.ok(String(message.text).includes(text), text);
  });

  it("quebra de linha no nome da paróquia não vira cabeçalho extra", () => {
    const message = buildContactMessage({ ...DATA, parish: "X\r\nBcc: alguem@mal.com" }, config);
    assert.equal(/[\r\n]/.test(message.subject), false);
  });

  it("monta o e-mail de verdade com o transporte de teste do nodemailer (sem rede)", async () => {
    const transport = nodemailer.createTransport({ jsonTransport: true });
    const info = await transport.sendMail(buildContactMessage(DATA, config));
    const body = JSON.parse(info.message as string);
    assert.equal(body.to.length, 2);
    assert.match(body.text, /Maria/);
  });
});

describe("limite de envios", () => {
  beforeEach(resetRateLimit);

  it("libera 5 por janela e bloqueia o sexto; outra chave não é afetada; a janela reabre", () => {
    const t0 = 1_000_000;
    for (let i = 0; i < 5; i++) assert.equal(rateLimited("ip1", 5, 1000, t0), false);
    assert.equal(rateLimited("ip1", 5, 1000, t0), true);
    assert.equal(rateLimited("ip2", 5, 1000, t0), false);
    assert.equal(rateLimited("ip1", 5, 1000, t0 + 1001), false);
  });
});

describe("rota /api/contato", () => {
  const saved = { ...process.env };
  const call = (body: unknown, ip = "1.1.1.1") => POST(new Request("http://x/api/contato", { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": ip }, body: JSON.stringify(body) }));
  const valid = { ...DATA, consent: true };
  const setEnv = (values: Record<string, string | undefined>) => {
    for (const key of ["CONTACT_WEBHOOK_URL", "CONTACT_TO", "MAIL_FROM", "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASSWORD", "SMTP_SECURE"]) delete process.env[key];
    for (const [key, value] of Object.entries(values)) if (value !== undefined) process.env[key] = value;
  };

  beforeEach(() => {
    resetRateLimit();
    setEnv({});
  });
  afterEach(() => {
    for (const key of Object.keys(process.env)) if (!(key in saved)) delete process.env[key];
    Object.assign(process.env, saved);
  });

  it("corpo inválido: 400", async () => {
    assert.equal((await call({})).status, 400);
    assert.equal((await call({ ...valid, consent: false })).status, 400);
    assert.equal((await call({ ...valid, email: "x" })).status, 400);
  });

  it("campo-isca preenchido (robô): responde ok sem enviar nada", async () => {
    setEnv({ ...ENV, SMTP_HOST: "127.0.0.1", SMTP_PORT: "1" });
    assert.equal((await call({ ...valid, website: "http://spam" })).status, 200);
  });

  it("sem webhook e sem e-mail configurado: 503 (canal inativo)", async () => {
    const response = await call(valid);
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { error: "canal-inativo" });
  });

  it("com e-mail configurado mas servidor SMTP fora do ar: 502, não 200", async () => {
    setEnv({ ...ENV, SMTP_HOST: "127.0.0.1", SMTP_PORT: "1" });
    assert.equal((await call(valid)).status, 502);
  });

  it("depois de 5 tentativas do mesmo IP: 429; outro IP segue", async () => {
    setEnv({ ...ENV, SMTP_HOST: "127.0.0.1", SMTP_PORT: "1" });
    for (let i = 0; i < 5; i++) assert.equal((await call(valid, "9.9.9.9")).status, 502);
    assert.equal((await call(valid, "9.9.9.9")).status, 429);
    assert.equal((await call(valid, "8.8.8.8")).status, 502);
  });

  it("webhook configurado e fora do ar: 502", async () => {
    setEnv({ CONTACT_WEBHOOK_URL: "http://127.0.0.1:1/hook" });
    assert.equal((await call(valid)).status, 502);
  });
});
