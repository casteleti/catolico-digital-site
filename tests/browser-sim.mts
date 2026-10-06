/**
 * Navegador simulado para os testes: cookie jar com as regras do RFC 6265 (Domain, Path, Secure, expiração, sufixo
 * público), `sessionStorage`, `localStorage`, `document.referrer` e eventos de `window`/`document`.
 * Não substitui um teste no navegador real.
 */
export type Cookie = { name: string; value: string; domain: string; hostOnly: boolean; path: string; secure: boolean; expires: number };

const PUBLIC_SUFFIXES = new Set(["digital", "com", "org", "com.br"]);
export let jar: Cookie[] = [];
export const session = new Map<string, string>();
export const local = new Map<string, string>();
export const location = { hostname: "catolico.digital", protocol: "https:", pathname: "/", search: "" };
export const state = { referrer: "", cookieWrites: 0 };

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
  state.cookieWrites++;
  jar = jar.filter((c) => !(c.name === cookie.name && c.domain === cookie.domain && c.path === cookie.path && c.hostOnly === cookie.hostOnly));
  if (cookie.expires > Date.now()) jar.push(cookie);
}

export const visible = () =>
  jar.filter((c) => c.expires > Date.now() && (c.hostOnly ? location.hostname === c.domain : domainMatch(location.hostname, c.domain)) && (!c.secure || location.protocol === "https:"));

export const listeners = new Map<string, Array<() => void>>();

Object.assign(globalThis, {
  window: {
    location,
    sessionStorage: { getItem: (k: string) => session.get(k) ?? null, setItem: (k: string, v: string) => void session.set(k, v), removeItem: (k: string) => void session.delete(k) },
    localStorage: { getItem: (k: string) => local.get(k) ?? null, setItem: (k: string, v: string) => void local.set(k, v), removeItem: (k: string) => void local.delete(k) },
    dispatchEvent: (event: { type: string }) => {
      for (const fn of listeners.get(event.type) ?? []) fn();
      return true;
    },
    addEventListener: (type: string, fn: () => void) => void listeners.set(type, [...(listeners.get(type) ?? []), fn]),
    removeEventListener: (type: string, fn: () => void) => void listeners.set(type, (listeners.get(type) ?? []).filter((item) => item !== fn)),
  },
  document: {
    get referrer() {
      return state.referrer;
    },
    get cookie() {
      return visible().map((c) => `${c.name}=${c.value}`).join("; ");
    },
    set cookie(raw: string) {
      setCookie(raw);
    },
    visibilityState: "visible",
    addEventListener: () => {},
    removeEventListener: () => {},
  },
  Event: class {
    type: string;
    constructor(type: string) {
      this.type = type;
    }
  },
});

export function resetBrowser() {
  jar = [];
  session.clear();
  local.clear();
  listeners.clear();
  state.cookieWrites = 0;
  state.referrer = "";
  location.hostname = "catolico.digital";
  location.protocol = "https:";
  location.pathname = "/";
  location.search = "";
}

/** Passa para outro host (como navegar de `catolico.digital` para `app.catolico.digital`), mantendo cookies e storage. */
export function goTo(host: string, protocol = "https:") {
  location.hostname = host;
  location.protocol = protocol;
}

