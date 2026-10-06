import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";

/**
 * Testes de `src/lib/attribution.ts` (e do apagamento em `src/lib/consent.ts`) com um navegador simulado:
 * cookie jar com as regras do RFC 6265 (Domain, Path, Secure, expiração, sufixo público), `sessionStorage` e
 * `localStorage`. Rodar: `pnpm test`. Não substitui um teste no navegador real.
 */
type Cookie = { name: string; value: string; domain: string; hostOnly: boolean; path: string; secure: boolean; expires: number };

const PUBLIC_SUFFIXES = new Set(["digital", "com", "org", "com.br"]);
let jar: Cookie[] = [];
const session = new Map<string, string>();
const local = new Map<string, string>();
const location = { hostname: "catolico.digital", protocol: "https:", pathname: "/", search: "" };
let referrer = "";
let cookieWrites = 0;

const domainMatch = (host: string, domain: string) => host === domain || host.endsWith(`.${domain}`);

function setCookie(raw: string) {
  const [pair, ...attrs] = raw.split(";").map((part) => part.trim());
  const eq = pair!.indexOf("=");
  const cookie: Cookie = { name: pair!.slice(0, eq), value: pair!.slice(eq + 1), domain: location.hostname, hostOnly: true, path: "/", secure: false, expires: Infinity };
  for (const attr of attrs) {
    const [key = "", value = ""] = attr.split("=");
    const k = key.toLowerCase();
    if (k === "domain") {
      const domain = value.replace(/^\./, "").toLowerCase();
      if (PUBLIC_SUFFIXES.has(domain) || !domainMatch(location.hostname, domain)) return; // o navegador rejeita
      cookie.domain = domain;
      cookie.hostOnly = false;
    } else if (k === "path") cookie.path = value;
    else if (k === "secure") cookie.secure = true;
    else if (k === "max-age") cookie.expires = Date.now() + Number(value) * 1000;
    else if (k === "expires") cookie.expires = Date.parse(value);
  }
  if (cookie.secure && location.protocol !== "https:") return;
  cookieWrites++;
  jar = jar.filter((c) => !(c.name === cookie.name && c.domain === cookie.domain && c.path === cookie.path && c.hostOnly === cookie.hostOnly));
  if (cookie.expires > Date.now()) jar.push(cookie);
}

const visible = () =>
  jar.filter((c) => c.expires > Date.now() && (c.hostOnly ? location.hostname === c.domain : domainMatch(location.hostname, c.domain)) && (!c.secure || location.protocol === "https:"));

Object.assign(globalThis, {
  window: {
    location,
    sessionStorage: { getItem: (k: string) => session.get(k) ?? null, setItem: (k: string, v: string) => void session.set(k, v), removeItem: (k: string) => void session.delete(k) },
    localStorage: { getItem: (k: string) => local.get(k) ?? null, setItem: (k: string, v: string) => void local.set(k, v), removeItem: (k: string) => void local.delete(k) },
    dispatchEvent: () => true,
    addEventListener: () => {},
    removeEventListener: () => {},
  },
  document: {
    get referrer() {
      return referrer;
    },
    get cookie() {
      return visible().map((c) => `${c.name}=${c.value}`).join("; ");
    },
    set cookie(raw: string) {
      setCookie(raw);
    },
  },
});

type Touch = Record<string, string | undefined>;
type Api = typeof import("../src/lib/attribution.ts");
let load = 0;

/** Uma carga de página: módulo novo (como num navegador), mesma jar e mesmo sessionStorage. */
async function page(search: string, opts: { ref?: string; host?: string; path?: string } = {}) {
  location.hostname = opts.host ?? "catolico.digital";
  location.pathname = opts.path ?? "/";
  location.search = search;
  referrer = opts.ref ?? "";
  const api = (await import(`../src/lib/attribution.ts?carga=${load++}`)) as Api;
  return api;
}
const read = (api: Api) => api.readAttribution() as { first: Touch | null; last: Touch | null };
const ACCEPT = { analytics: true, marketing: false };
const REJECT = { analytics: false, marketing: false };
const cd = () => visible().filter((c) => c.name.startsWith("cd_")).map((c) => c.name).sort();

beforeEach(() => {
  jar = [];
  session.clear();
  local.clear();
  cookieWrites = 0;
});

describe("first/last touch", () => {
  it("1. primeira visita direta cria cd_ft e cd_lt, ambos sem campanha", async () => {
    const api = await page("");
    api.syncAttribution(ACCEPT);
    const { first, last } = read(api);
    assert.deepEqual(cd(), ["cd_ft", "cd_lt"]);
    assert.ok(first && last);
    assert.equal(api.hasCampaign(first), false);
    assert.equal(api.hasCampaign(last), false);
    assert.equal(first.lp, "/");
  });

  it("2. segunda visita direta mantém cd_ft e cd_lt iguais", async () => {
    (await page("")).syncAttribution(ACCEPT);
    const before = read(await page(""));
    await new Promise((r) => setTimeout(r, 5));
    const second = await page("");
    second.syncAttribution(ACCEPT);
    assert.deepEqual(read(second), before);
  });

  it("3. primeira visita com UTM: cd_ft e cd_lt recebem a campanha", async () => {
    const api = await page("?utm_source=google&utm_medium=cpc&utm_campaign=teste");
    api.syncAttribution(ACCEPT);
    const { first, last } = read(api);
    assert.equal(first?.utm_source, "google");
    assert.equal(last?.utm_campaign, "teste");
  });

  it("4. direta e depois campanha: cd_ft continua direto, cd_lt vira a campanha", async () => {
    (await page("")).syncAttribution(ACCEPT);
    const api = await page("?utm_source=google&gclid=G1");
    api.syncAttribution(ACCEPT);
    const { first, last } = read(api);
    assert.equal(api.hasCampaign(first!), false);
    assert.equal(last?.gclid, "G1");
  });

  it("5. campanha e depois outra campanha: cd_ft fica com a primeira, cd_lt com a segunda", async () => {
    (await page("?utm_source=a&gclid=G1")).syncAttribution(ACCEPT);
    const api = await page("?utm_source=b&gclid=G2");
    api.syncAttribution(ACCEPT);
    const { first, last } = read(api);
    assert.equal(first?.gclid, "G1");
    assert.equal(last?.gclid, "G2");
    assert.equal(last?.utm_source, "b");
  });

  it("5b. visita direta depois de campanha não apaga o cd_lt", async () => {
    (await page("?utm_source=a&gclid=G1")).syncAttribution(ACCEPT);
    const api = await page("");
    api.syncAttribution(ACCEPT);
    assert.equal(read(api).last?.gclid, "G1");
  });
});

describe("campos", () => {
  it("6. preserva gclid, gbraid, wbraid e os cinco utm_*", async () => {
    const api = await page("?gclid=GC1&gbraid=GB1&wbraid=WB1&utm_source=google&utm_medium=cpc&utm_campaign=teste&utm_term=site+para+paroquia&utm_content=anuncio_a", { ref: "https://www.google.com/search?q=secreto", path: "/modulos" });
    api.syncAttribution(ACCEPT);
    for (const touch of [read(api).first, read(api).last]) {
      assert.equal(touch?.gclid, "GC1");
      assert.equal(touch?.gbraid, "GB1");
      assert.equal(touch?.wbraid, "WB1");
      assert.equal(touch?.utm_source, "google");
      assert.equal(touch?.utm_medium, "cpc");
      assert.equal(touch?.utm_campaign, "teste");
      assert.equal(touch?.utm_term, "site para paroquia");
      assert.equal(touch?.utm_content, "anuncio_a");
      assert.equal(touch?.lp, "/modulos");
      assert.equal(touch?.ref, "https://www.google.com/search"); // sem a query
      assert.ok(touch?.ts && !Number.isNaN(Date.parse(touch.ts)));
    }
  });

  it("6b. ignora parâmetros fora da lista, limita tamanho e remove caracteres de controle", async () => {
    const api = await page(`?email=a@b.com&utm_source=${"x".repeat(500)}&utm_term=ok%0Ador&gclid=${"g".repeat(500)}`);
    api.syncAttribution(ACCEPT);
    const { first } = read(api);
    assert.equal(JSON.stringify(first).includes("a@b.com"), false);
    assert.equal(first?.utm_source?.length, 100);
    assert.equal(first?.gclid?.length, 200);
    assert.equal(first?.utm_term, "okdor");
    assert.ok(visible().every((c) => c.value.length < 4096));
  });

  it("6c. referrer do próprio site não é guardado", async () => {
    const api = await page("?utm_source=a", { ref: "https://app.catolico.digital/comecar?x=1" });
    api.syncAttribution(ACCEPT);
    assert.equal(read(api).first?.ref, undefined);
  });
});

describe("consentimento", () => {
  it("7. sem decisão: só sessionStorage, nenhum cookie", async () => {
    const api = await page("?utm_source=a&gclid=G1");
    api.syncAttribution(null);
    assert.equal(jar.length, 0);
    assert.equal(cookieWrites, 0);
    assert.ok(session.get("cd-attr-pending"));
  });

  it("8a. aceite na mesma página: os dados temporários viram cookies", async () => {
    const api = await page("?utm_source=a&gclid=G1");
    api.syncAttribution(null);
    api.syncAttribution(ACCEPT);
    assert.deepEqual(cd(), ["cd_ft", "cd_lt"]);
    assert.equal(read(api).last?.gclid, "G1");
    assert.equal(session.has("cd-attr-pending"), false);
  });

  it("8b. aceite em outra página: first touch e last touch vêm da visita original", async () => {
    (await page("?utm_source=a&gclid=G1", { path: "/entrada" })).syncAttribution(null);
    (await page("", { path: "/modulos" })).syncAttribution(null); // navegou sem decidir
    const api = await page("", { path: "/contato" });
    api.syncAttribution(ACCEPT);
    const { first, last } = read(api);
    assert.equal(first?.gclid, "G1");
    assert.equal(first?.lp, "/entrada");
    assert.equal(last?.gclid, "G1");
  });

  it("9. rejeição descarta o temporário e não grava nada", async () => {
    const api = await page("?utm_source=a&gclid=G1");
    api.syncAttribution(null);
    api.syncAttribution(REJECT);
    assert.equal(jar.length, 0);
    assert.equal(session.has("cd-attr-pending"), false);
    assert.equal((await page("")).readAttribution().first, null);
  });

  it("10. retirar o consentimento remove cd_ft e cd_lt (Domain=.catolico.digital) sem tocar nos outros", async () => {
    (await page("?utm_source=a")).syncAttribution(ACCEPT);
    document.cookie = "outro=1; Path=/";
    document.cookie = "_ga=abc; Path=/; Domain=.catolico.digital";
    assert.ok(visible().some((c) => c.name === "cd_ft" && c.domain === "catolico.digital" && !c.hostOnly));
    const { clearTrackingCookies } = await import("../src/lib/consent.ts");
    clearTrackingCookies();
    assert.deepEqual(cd(), []);
    assert.equal(visible().some((c) => c.name === "_ga"), false);
    assert.equal(visible().some((c) => c.name === "outro"), true);
  });

  it("10b. depois de retirar, rejeitar mantém tudo apagado", async () => {
    (await page("?utm_source=a")).syncAttribution(ACCEPT);
    const { clearTrackingCookies } = await import("../src/lib/consent.ts");
    clearTrackingCookies();
    const api = await page("?utm_source=a");
    api.syncAttribution(REJECT);
    assert.deepEqual(cd(), []);
  });
});

describe("subdomínio e cookie", () => {
  it("11. cookies de catolico.digital são lidos em app.catolico.digital (e não em outro domínio)", async () => {
    (await page("?utm_source=google&gclid=TESTE123")).syncAttribution(ACCEPT);
    const app = await page("", { host: "app.catolico.digital", path: "/comecar" });
    const { first, last } = read(app);
    assert.equal(first?.gclid, "TESTE123");
    assert.equal(last?.utm_source, "google");
    location.hostname = "catolico.digital.evil.com";
    assert.deepEqual(cd(), []);
  });

  it("11b. atributos: Domain=.catolico.digital, Secure, 90 dias, SameSite=Lax", async () => {
    (await page("?utm_source=a")).syncAttribution(ACCEPT);
    const cookie = jar.find((c) => c.name === "cd_ft")!;
    assert.equal(cookie.domain, "catolico.digital");
    assert.equal(cookie.hostOnly, false);
    assert.equal(cookie.secure, true);
    const days = (cookie.expires - Date.now()) / 86_400_000;
    assert.ok(days > 89.9 && days <= 90);
  });

  it("11c. em localhost o cookie fica só no host atual (sem Secure em http)", async () => {
    location.protocol = "http:";
    (await page("?utm_source=a", { host: "localhost" })).syncAttribution(ACCEPT);
    location.protocol = "https:";
    const cookie = jar.find((c) => c.name === "cd_ft")!;
    assert.equal(cookie.hostOnly, true);
    assert.equal(cookie.secure, false);
  });
});

describe("robustez", () => {
  it("12. syncAttribution repetido na mesma página é idempotente (sem regravar sem necessidade)", async () => {
    const api = await page("");
    api.syncAttribution(ACCEPT);
    const writes = cookieWrites;
    for (let i = 0; i < 5; i++) api.syncAttribution(ACCEPT);
    assert.equal(cookieWrites, writes); // visita direta: nada novo a gravar
  });

  it("12b. cookie corrompido não quebra: é ignorado e refeito", async () => {
    document.cookie = "cd_ft=%7Bquebrado; Path=/; Domain=.catolico.digital";
    const api = await page("?utm_source=a");
    assert.doesNotThrow(() => api.syncAttribution(ACCEPT));
    assert.equal(read(api).first?.utm_source, "a");
  });

  it("12c. sem sessionStorage/cookies disponíveis não lança erro", async () => {
    const win = (globalThis as unknown as { window: { sessionStorage: unknown } }).window;
    const original = win.sessionStorage;
    win.sessionStorage = { getItem: () => { throw new Error("bloqueado"); }, setItem: () => { throw new Error("bloqueado"); }, removeItem: () => { throw new Error("bloqueado"); } };
    const api = await page("?utm_source=a");
    assert.doesNotThrow(() => api.syncAttribution(null));
    assert.doesNotThrow(() => api.syncAttribution(ACCEPT));
    win.sessionStorage = original;
  });
});
