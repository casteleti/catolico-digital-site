/**
 * Consentimento de cookies (LGPD). A escolha fica só no navegador (localStorage), sem cookie e sem servidor.
 * Tags de medição (GA4) e publicidade (Meta Pixel) só carregam depois do aceite da categoria correspondente.
 * Mudou o texto do aviso ou as categorias? Suba `CONSENT_VERSION`: todo mundo volta a ver o aviso.
 */
export const CONSENT_KEY = "cd-consent";
export const CONSENT_VERSION = 1;
export const CONSENT_EVENT = "cd-consent-change";
export const CONSENT_OPEN_EVENT = "cd-consent-open";

export type Consent = { analytics: boolean; marketing: boolean };
type Stored = Consent & { v: number; at: string };

/** Valor lido no servidor: ainda não dá para saber a escolha, então nada é mostrado nem carregado. */
export const CONSENT_SERVER_SNAPSHOT = "__server__";

export function readConsentRaw(): string {
  try {
    return window.localStorage.getItem(CONSENT_KEY) ?? "";
  } catch {
    return "";
  }
}

/** `null` = sem escolha válida (nunca respondeu, versão antiga ou valor corrompido). */
export function parseConsent(raw: string): Consent | null {
  if (!raw || raw === CONSENT_SERVER_SNAPSHOT) return null;
  try {
    const data = JSON.parse(raw) as Partial<Stored>;
    if (data.v !== CONSENT_VERSION || typeof data.analytics !== "boolean" || typeof data.marketing !== "boolean") return null;
    return { analytics: data.analytics, marketing: data.marketing };
  } catch {
    return null;
  }
}

export function saveConsent(consent: Consent) {
  const stored: Stored = { ...consent, v: CONSENT_VERSION, at: new Date().toISOString() };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(stored));
  } catch {
    /* navegador sem armazenamento: a escolha vale só até recarregar */
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Apaga os cookies que o GA4 e o Meta Pixel já tenham criado (ao retirar o consentimento). */
export function clearTrackingCookies() {
  const hostParts = window.location.hostname.split(".");
  const domains = ["", window.location.hostname, ...hostParts.slice(1).map((_, i) => `.${hostParts.slice(i + 1).join(".")}`)];
  for (const entry of document.cookie.split(";")) {
    const name = entry.split("=")[0]?.trim();
    if (!name || !/^(_ga|_gid|_gat|_fbp|_fbc)/.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}
