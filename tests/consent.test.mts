import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";
import { beforeEach, describe, it } from "node:test";
import { goTo, jar, listeners, local, resetBrowser, visible } from "./browser-sim.mts";

/** Consentimento compartilhado (`src/lib/consent.ts`) e inicialização do GA4 (`src/lib/ga-snippet.ts`). */
const consent = await import("../src/lib/consent.ts");
const { gaInitScript } = await import("../src/lib/ga-snippet.ts");

const ACCEPT = { analytics: true, marketing: false };
const ALL = { analytics: true, marketing: true };
const NONE = { analytics: false, marketing: false };
const names = () => visible().map((c) => c.name).sort();

beforeEach(resetBrowser);

describe("consentimento compartilhado", () => {
  it("sem decisão: nada guardado, parse devolve null", () => {
    assert.equal(consent.readConsentRaw(), "");
    assert.equal(consent.parseConsent(consent.readConsentRaw()), null);
  });

  it("salvar grava o cookie cd_consent em .catolico.digital, Secure, 180 dias", () => {
    consent.saveConsent(ACCEPT);
    const cookie = jar.find((c) => c.name === consent.CONSENT_COOKIE)!;
    assert.equal(cookie.domain, "catolico.digital");
    assert.equal(cookie.hostOnly, false);
    assert.equal(cookie.secure, true);
    const days = (cookie.expires - Date.now()) / 86_400_000;
    assert.ok(days > 179.9 && days <= 180);
    assert.deepEqual(consent.parseConsent(consent.readConsentRaw()), ACCEPT);
    assert.equal(local.size, 0); // não usa mais localStorage
  });

  it("a mesma decisão é lida em app.catolico.digital (e não em outro domínio)", () => {
    consent.saveConsent(ALL);
    goTo("app.catolico.digital");
    assert.deepEqual(consent.parseConsent(consent.readConsentRaw()), ALL);
    goTo("catolico.digital.evil.com");
    assert.equal(consent.parseConsent(consent.readConsentRaw()), null);
  });

  it("uma decisão tomada no app vale no site", () => {
    goTo("app.catolico.digital");
    consent.saveConsent(NONE);
    goTo("catolico.digital");
    assert.deepEqual(consent.parseConsent(consent.readConsentRaw()), NONE);
  });

  it("mudar de preferência troca o valor (não duplica o cookie)", () => {
    consent.saveConsent(ALL);
    consent.saveConsent(NONE);
    assert.equal(jar.filter((c) => c.name === consent.CONSENT_COOKIE).length, 1);
    assert.deepEqual(consent.parseConsent(consent.readConsentRaw()), NONE);
  });

  it("versão antiga ou valor corrompido voltam a perguntar", () => {
    document.cookie = `${consent.CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify({ v: 0, analytics: true, marketing: true }))}; Path=/; Domain=.catolico.digital`;
    assert.equal(consent.parseConsent(consent.readConsentRaw()), null);
    document.cookie = `${consent.CONSENT_COOKIE}=%7Bquebrado; Path=/; Domain=.catolico.digital`;
    assert.equal(consent.parseConsent(consent.readConsentRaw()), null);
  });
});

describe("migração da decisão antiga (localStorage)", () => {
  const legacy = JSON.stringify({ v: 1, analytics: true, marketing: false, at: "2026-10-05T10:00:00.000Z" });

  it("a decisão antiga continua valendo antes da migração", () => {
    local.set(consent.CONSENT_KEY, legacy);
    assert.deepEqual(consent.parseConsent(consent.readConsentRaw()), ACCEPT);
  });

  it("migra para o cookie, preserva a data e apaga a chave antiga", () => {
    local.set(consent.CONSENT_KEY, legacy);
    consent.migrateLegacyConsent();
    assert.equal(local.size, 0);
    assert.equal(consent.readConsentRaw(), legacy);
    goTo("app.catolico.digital");
    assert.deepEqual(consent.parseConsent(consent.readConsentRaw()), ACCEPT);
  });

  it("se já existe cookie, ele manda e a chave antiga é só apagada", () => {
    local.set(consent.CONSENT_KEY, legacy);
    consent.saveConsent(NONE);
    local.set(consent.CONSENT_KEY, legacy);
    consent.migrateLegacyConsent();
    assert.deepEqual(consent.parseConsent(consent.readConsentRaw()), NONE);
    assert.equal(local.size, 0);
  });

  it("valor antigo inválido é descartado sem criar cookie", () => {
    local.set(consent.CONSENT_KEY, "lixo");
    consent.migrateLegacyConsent();
    assert.equal(local.size, 0);
    assert.equal(consent.readConsentRaw(), "");
  });

  it("cookies bloqueados: guarda em localStorage e a decisão continua valendo", () => {
    const doc = globalThis.document as unknown as object;
    const original = Object.getOwnPropertyDescriptor(doc, "cookie")!;
    Object.defineProperty(doc, "cookie", { get: () => "", set: () => {}, configurable: true });
    try {
      consent.saveConsent(ACCEPT);
      assert.deepEqual(consent.parseConsent(consent.readConsentRaw()), ACCEPT);
      assert.ok(local.get(consent.CONSENT_KEY));
      consent.migrateLegacyConsent(); // não perde a reserva se o cookie não pegar
      assert.ok(local.get(consent.CONSENT_KEY));
    } finally {
      Object.defineProperty(doc, "cookie", original);
    }
  });
});

describe("revogação", () => {
  it("retirar o aceite apaga os cookies de medição e de origem, mas guarda a escolha", () => {
    document.cookie = "_ga=GA1.2.1; Path=/; Domain=.catolico.digital";
    document.cookie = "_ga_G-Y7FQ36B3FV=GS1; Path=/; Domain=.catolico.digital";
    document.cookie = "_fbp=fb.1; Path=/; Domain=.catolico.digital";
    document.cookie = "cd_ft=%7B%7D; Path=/; Domain=.catolico.digital";
    document.cookie = "cd_lt=%7B%7D; Path=/; Domain=.catolico.digital";
    document.cookie = "cd_ftx=mantem; Path=/"; // só os nomes exatos de origem são apagados
    consent.saveConsent(ALL);
    consent.saveConsent(NONE);
    consent.clearTrackingCookies();
    assert.deepEqual(names(), ["cd_consent", "cd_ftx"]);
    assert.deepEqual(consent.parseConsent(consent.readConsentRaw()), NONE);
  });

  it("a revogação feita em app.catolico.digital também apaga os cookies do domínio todo", () => {
    document.cookie = "_ga=GA1.2.1; Path=/; Domain=.catolico.digital";
    goTo("app.catolico.digital");
    consent.clearTrackingCookies();
    assert.deepEqual(names(), []);
  });
});

describe("avisos de mudança (sem loop)", () => {
  it("saveConsent avisa quem assinou; cancelar a assinatura para os avisos", () => {
    let calls = 0;
    const off = consent.subscribeConsent(() => void calls++);
    consent.saveConsent(ACCEPT);
    assert.equal(calls, 1);
    window.dispatchEvent(new Event("focus")); // voltar a uma aba relê o cookie (mudança vinda do outro subdomínio)
    assert.equal(calls, 2);
    off();
    consent.saveConsent(NONE);
    assert.equal(calls, 2);
    assert.equal(listeners.get(consent.CONSENT_EVENT)?.length ?? 0, 0);
  });

  it("ler o consentimento não grava nada (o snapshot é puro)", () => {
    consent.saveConsent(ACCEPT);
    const before = JSON.stringify(jar);
    for (let i = 0; i < 20; i++) consent.readConsentRaw();
    assert.equal(JSON.stringify(jar), before);
  });
});

describe("GA4: inicialização sem page_view duplicado", () => {
  const run = (times: number) => {
    const context: Record<string, unknown> = {};
    context.window = context;
    for (let i = 0; i < times; i++) runInNewContext(gaInitScript("G-TESTE"), context);
    return context.dataLayer as unknown as Array<ArrayLike<unknown>>;
  };
  // O código roda em outro contexto (vm): normaliza por JSON para comparar com objetos deste contexto.
  const calls = (layer: Array<ArrayLike<unknown>>) => JSON.parse(JSON.stringify(layer.map((entry) => Array.from(entry)))) as unknown[][];

  it("uma execução: consent default (sem anúncios), js e um único config", () => {
    const layer = calls(run(1));
    assert.deepEqual(layer.map((entry) => entry[0]), ["consent", "js", "config"]);
    assert.deepEqual(layer[0]?.[2], { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "granted" });
    assert.equal(layer[2]?.[1], "G-TESTE");
    assert.equal(layer[2]?.length, 2); // sem send_page_view:false e sem parâmetros extras
  });

  it("executar duas vezes (componente montado em dobro) não repete o config", () => {
    const layer = calls(run(3));
    assert.equal(layer.filter((entry) => entry[0] === "config").length, 1);
    assert.equal(layer.length, 3);
  });

  it("o código não envia page_view manual (a medição otimizada cuida das trocas de página)", () => {
    assert.equal(/page_view/.test(gaInitScript("G-TESTE")), false);
  });
});
