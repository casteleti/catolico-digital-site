import assert from "node:assert/strict";
import { createServer, type IncomingMessage, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { afterEach, beforeEach, describe, it } from "node:test";
import { local, resetBrowser, session } from "./browser-sim.mts";

/** `generate_lead`: o servidor só confirma lead depois que o canal aceita; a página envia o evento uma vez, sem dados pessoais. */
const { POST } = await import("../src/app/api/contato/route.ts");
const { resetLeadDedupe, GA_LEAD_PARAMS } = await import("../src/lib/lead.ts");
const { resetRateLimit } = await import("../src/lib/rate-limit.ts");
const { trackLeadOnce } = await import("../src/lib/track.ts");
const { saveConsent } = await import("../src/lib/consent.ts");
const { CONTACT_SUBJECTS, CONTACT_LEAD_TYPES } = await import("../src/content/contact.ts");

type Received = Record<string, unknown>;
const FORM = { subject: "Quero ver uma demonstração", name: "Maria Silva", email: "maria@paroquia.com.br", phone: "(11) 99999-0000", parish: "Paróquia São José", location: "Campinas - SP", role: "Secretaria", message: "Gostaria de conhecer o sistema", consent: true };
const PII = ["Maria", "maria@paroquia.com.br", "99999", "São José", "Campinas", "Gostaria"];

const touch = (extra: Record<string, string> = {}) => ({ lp: "/", ts: "2026-10-06T10:00:00.000Z", ...extra });
const cookie = (ft: object | null, lt: object | null) =>
  [ft && `cd_ft=${encodeURIComponent(JSON.stringify(ft))}`, lt && `cd_lt=${encodeURIComponent(JSON.stringify(lt))}`].filter(Boolean).join("; ");

let webhook: Server;
let received: Received[] = [];
let webhookStatus = 200;
let webhookDelay = 0;
const saved = { ...process.env };

beforeEach(async () => {
  resetBrowser();
  resetRateLimit();
  resetLeadDedupe();
  received = [];
  webhookStatus = 200;
  webhookDelay = 0;
  webhook = createServer((request: IncomingMessage, response) => {
    let raw = "";
    request.on("data", (chunk) => (raw += chunk));
    request.on("end", () => {
      received.push(JSON.parse(raw));
      setTimeout(() => response.writeHead(webhookStatus).end("{}"), webhookDelay);
    });
  });
  await new Promise<void>((resolve) => webhook.listen(0, "127.0.0.1", resolve));
  for (const key of ["CONTACT_TO", "MAIL_FROM", "SMTP_HOST"]) delete process.env[key];
  process.env.CONTACT_WEBHOOK_URL = `http://127.0.0.1:${(webhook.address() as AddressInfo).port}/hook`;
});
afterEach(async () => {
  await new Promise((resolve) => webhook.close(resolve));
  for (const key of Object.keys(process.env)) if (!(key in saved)) delete process.env[key];
  Object.assign(process.env, saved);
});

const send = (body: object, headers: Record<string, string> = {}, ip = "1.1.1.1") =>
  POST(new Request("http://x/api/contato", { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": ip, ...headers }, body: JSON.stringify(body) }));

describe("o servidor confirma o lead", () => {
  it("1. lead válido + canal OK: lead_created, lead_id e evento generate_lead", async () => {
    const response = await send({ ...FORM, submission_id: "abc-12345678" });
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.lead_created, true);
    assert.match(body.lead_id, /^[0-9a-f-]{36}$/);
    assert.equal(body.lead_type, "commercial");
    assert.equal(body.ga_event.name, "generate_lead");
    assert.equal(body.ga_event.params.lead_id, body.lead_id);
    assert.equal(received.length, 1);
    assert.equal(received[0]!.lead_id, body.lead_id); // o mesmo id vai ao canal da equipe
  });

  it("2. canal falha (500 ou fora do ar): 502, sem lead e sem evento", async () => {
    webhookStatus = 500;
    const failed = await send(FORM);
    assert.equal(failed.status, 502);
    const body = await failed.json();
    assert.equal(body.lead_created, undefined);
    assert.equal(body.ga_event, undefined);
    process.env.CONTACT_WEBHOOK_URL = "http://127.0.0.1:1/hook";
    assert.equal((await send(FORM, {}, "2.2.2.2")).status, 502);
  });

  it("3. campo-isca (robô): parece sucesso, mas lead_created é false, sem evento e sem enviar ao canal", async () => {
    const response = await send({ ...FORM, website: "http://spam.example" });
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.ok, true);
    assert.equal(body.lead_created, false);
    assert.equal(body.ga_event, undefined);
    assert.equal(received.length, 0);
  });

  it("4. validação inválida: 400, sem lead e sem evento", async () => {
    for (const bad of [{}, { ...FORM, consent: false }, { ...FORM, email: "x" }, { ...FORM, subject: "inventado" }, { ...FORM, name: "" }]) {
      const response = await send(bad);
      assert.equal(response.status, 400);
      const body = await response.json();
      assert.equal(body.lead_created, undefined);
      assert.equal(body.ga_event, undefined);
    }
    assert.equal(received.length, 0);
  });
});

describe("duplicidade", () => {
  it("5a. o mesmo submission_id em sequência: um envio ao canal, o mesmo lead_id", async () => {
    const first = await (await send({ ...FORM, submission_id: "mesmo-envio-1" })).json();
    const second = await (await send({ ...FORM, submission_id: "mesmo-envio-1" })).json();
    assert.equal(received.length, 1);
    assert.equal(second.lead_id, first.lead_id);
  });

  it("5b. duplo clique (duas requisições ao mesmo tempo): um envio ao canal", async () => {
    webhookDelay = 50;
    const [a, b] = await Promise.all([send({ ...FORM, submission_id: "duplo-clique-1" }), send({ ...FORM, submission_id: "duplo-clique-1" })]);
    assert.equal(received.length, 1);
    assert.equal((await a.json()).lead_id, (await b.json()).lead_id);
  });

  it("5c. falha seguida de nova tentativa com o mesmo id: tenta de novo e funciona", async () => {
    webhookStatus = 500;
    assert.equal((await send({ ...FORM, submission_id: "tentativa-1" })).status, 502);
    webhookStatus = 200;
    assert.equal((await send({ ...FORM, submission_id: "tentativa-1" })).status, 200);
  });

  it("5d. ids diferentes são contatos diferentes", async () => {
    await send({ ...FORM, submission_id: "contato-aaaa" });
    await send({ ...FORM, submission_id: "contato-bbbb" });
    assert.equal(received.length, 2);
  });

  it("5e. na página, o mesmo lead_id gera um único evento (mesmo repetindo a resposta)", async () => {
    saveConsent({ analytics: true, marketing: false });
    const { ga_event } = await (await send({ ...FORM, submission_id: "pagina-1" })).json();
    assert.equal(trackLeadOnce(ga_event), true);
    assert.equal(trackLeadOnce(ga_event), false);
    assert.equal(trackLeadOnce(ga_event), false);
    assert.equal(((window as unknown as { dataLayer: unknown[] }).dataLayer).length, 1);
  });

  it("5f. depois de recarregar a página (sessionStorage mantido), o mesmo lead não dispara de novo", async () => {
    saveConsent({ analytics: true, marketing: false });
    const { ga_event } = await (await send({ ...FORM, submission_id: "pagina-2" })).json();
    const { trackLeadOnce: afresh } = (await import(`../src/lib/track.ts?recarga=${Date.now()}`)) as typeof import("../src/lib/track.ts");
    assert.equal(trackLeadOnce(ga_event), true);
    assert.equal(afresh(ga_event), false);
    assert.ok(session.get("cd-leads-fired"));
  });
});

describe("atribuição", () => {
  const ft = touch({ utm_source: "google", utm_medium: "cpc", utm_campaign: "primeira", gclid: "GCLID-1", ref: "https://www.google.com/search", ts: "2026-10-01T09:00:00.000Z" });
  const lt = touch({ utm_source: "newsletter", utm_medium: "email", utm_campaign: "segunda", utm_term: "paroquia", utm_content: "banner", gbraid: "GB-1", wbraid: "WB-1", lp: "/modulos", ts: "2026-10-05T09:00:00.000Z" });

  it("6. cd_ft e cd_lt chegam ao canal com todos os campos e as datas", async () => {
    await send(FORM, { cookie: cookie(ft, lt) });
    const attribution = received[0]!.attribution as { first: Record<string, string>; last: Record<string, string> };
    assert.equal(attribution.first.gclid, "GCLID-1");
    assert.equal(attribution.first.ts, "2026-10-01T09:00:00.000Z");
    assert.equal(attribution.first.ref, "https://www.google.com/search");
    assert.deepEqual(
      ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gbraid", "wbraid", "lp", "ts"].map((key) => attribution.last[key]),
      ["newsletter", "email", "segunda", "paroquia", "banner", "GB-1", "WB-1", "/modulos", "2026-10-05T09:00:00.000Z"],
    );
  });

  it("6b. os parâmetros utm do evento vêm do last touch", async () => {
    const { ga_event } = await (await send(FORM, { cookie: cookie(ft, lt) })).json();
    assert.equal(ga_event.params.utm_source, "newsletter");
    assert.equal(ga_event.params.utm_campaign, "segunda");
    assert.equal(ga_event.params.gclid, undefined); // identificador de clique não vai para o GA4
  });

  it("7. sem atribuição (sem cookies ou cookie corrompido): o envio funciona", async () => {
    for (const header of [{}, { cookie: "cd_ft=%7Bquebrado; cd_lt=lixo" }, { cookie: "outro=1" }]) {
      const response = await send(FORM, header, `3.3.3.${Math.random()}`);
      const body = await response.json();
      assert.equal(response.status, 200);
      assert.equal(body.lead_created, true);
      assert.deepEqual(Object.keys(body.ga_event.params).sort(), ["form_name", "lead_id", "lead_type"]);
    }
    assert.deepEqual(received[0]!.attribution, { first: null, last: null });
  });

  it("7b. campos desconhecidos no cookie são descartados e valores longos cortados", async () => {
    await send(FORM, { cookie: cookie({ ...ft, email: "x@y.com", utm_source: "s".repeat(500) }, null) });
    const first = (received[0]!.attribution as { first: Record<string, string> }).first;
    assert.equal(first.email, undefined);
    assert.equal(first.utm_source!.length, 100);
  });
});

describe("tipo de contato", () => {
  it("só assuntos comerciais geram generate_lead; suporte, parceria e outro confirmam o envio sem evento", async () => {
    const results: Record<string, unknown> = {};
    let n = 0;
    for (const subject of CONTACT_SUBJECTS) {
      const body = await (await send({ ...FORM, subject }, {}, `4.4.4.${n++}`)).json();
      assert.equal(body.lead_created, true, subject);
      assert.equal(body.lead_type, CONTACT_LEAD_TYPES[subject]);
      results[subject] = body.ga_event ?? null;
    }
    const withEvent = Object.entries(results).filter(([, event]) => event).map(([subject]) => subject);
    assert.deepEqual(withEvent, ["Quero conversar sobre a Plataforma", "Quero ver uma demonstração", "Valores e planos"]);
    assert.deepEqual([...new Set(Object.values(CONTACT_LEAD_TYPES))].sort(), ["commercial", "other", "partnership", "support"]);
  });

  it("trackLeadOnce ignora evento nulo ou de outro nome", () => {
    saveConsent({ analytics: true, marketing: false });
    assert.equal(trackLeadOnce(null), false);
    assert.equal(trackLeadOnce(undefined), false);
    assert.equal(trackLeadOnce({ name: "outro_evento", params: { lead_id: "x" } } as never), false);
  });
});

describe("nenhum dado pessoal vai para o GA4", () => {
  it("8a. o evento do servidor só tem parâmetros permitidos e nenhum dado do formulário", async () => {
    const { ga_event } = await (await send(FORM, { cookie: cookie(touch({ utm_source: "google", utm_medium: "cpc", utm_campaign: "x", gclid: "G" }), null) })).json();
    for (const key of Object.keys(ga_event.params)) assert.ok((GA_LEAD_PARAMS as readonly string[]).includes(key), key);
    const text = JSON.stringify(ga_event);
    for (const value of PII) assert.equal(text.includes(value), false, value);
  });

  it("8b. mesmo que a resposta trouxesse campos extras, a página só repassa os permitidos", () => {
    saveConsent({ analytics: true, marketing: false });
    trackLeadOnce({ name: "generate_lead", params: { lead_id: "id-1", form_name: "contato", lead_type: "commercial", email: "maria@paroquia.com.br", name: "Maria", message: "oi", gclid: "G" } as never });
    const layer = (window as unknown as { dataLayer: ArrayLike<unknown>[] }).dataLayer;
    const [command, name, params] = Array.from(layer[0]!) as [string, string, Record<string, string>];
    assert.deepEqual([command, name], ["event", "generate_lead"]);
    assert.deepEqual(Object.keys(params).sort(), ["form_name", "lead_id", "lead_type"]);
  });

  it("8c. sem aceite de Medição não há evento", async () => {
    saveConsent({ analytics: false, marketing: true });
    const { ga_event } = await (await send(FORM, {}, "5.5.5.5")).json();
    assert.equal(trackLeadOnce(ga_event), false);
    assert.equal((window as unknown as { dataLayer?: unknown[] }).dataLayer, undefined);
    local.clear();
  });
});
