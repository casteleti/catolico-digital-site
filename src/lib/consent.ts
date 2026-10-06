import { readCookieValue, writeCookieValue } from "@/lib/cookies";

/**
 * Consentimento de cookies (LGPD). A escolha fica no cookie `cd_consent`, de primeira parte, em `.catolico.digital`:
 * o site comercial e `app.catolico.digital` leem a MESMA decisão. Sem servidor e sem identificador: só as categorias,
 * a versão e a data. Tags de medição (GA4) e publicidade (Meta Pixel) só carregam depois do aceite da categoria.
 * Mudou o texto do aviso ou as categorias? Suba `CONSENT_VERSION`: todo mundo volta a ver o aviso.
 * O mesmo formato é lido pela plataforma (`catolico-digital`, `src/lib/tracking-consent.ts`): mudou aqui, mude lá.
 * Decisões antigas, guardadas em `localStorage` (`cd-consent`), continuam valendo e migram para o cookie.
 */
export const CONSENT_COOKIE = "cd_consent";
/** 180 dias: depois disso o aviso volta a perguntar. */
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;
/** Chave antiga em `localStorage` (por origem). Só é lida como reserva e removida na migração. */
export const CONSENT_KEY = "cd-consent";
export const CONSENT_VERSION = 1;
export const CONSENT_EVENT = "cd-consent-change";
export const CONSENT_OPEN_EVENT = "cd-consent-open";

export type Consent = { analytics: boolean; marketing: boolean };
type Stored = Consent & { v: number; at: string };

/** Valor lido no servidor: ainda não dá para saber a escolha, então nada é mostrado nem carregado. */
export const CONSENT_SERVER_SNAPSHOT = "__server__";

export function readConsentRaw(): string {
  const shared = readCookieValue(CONSENT_COOKIE);
  if (shared) return shared;
  try {
    return window.localStorage.getItem(CONSENT_KEY) ?? "";
  } catch {
    return "";
  }
}

/** Leva a decisão antiga de `localStorage` para o cookie compartilhado (uma vez) e apaga a antiga. */
export function migrateLegacyConsent() {
  try {
    const legacy = window.localStorage.getItem(CONSENT_KEY);
    if (legacy === null) return;
    if (!readCookieValue(CONSENT_COOKIE) && parseConsent(legacy)) {
      writeCookieValue(CONSENT_COOKIE, legacy, CONSENT_MAX_AGE);
      if (!readCookieValue(CONSENT_COOKIE)) return; // cookies bloqueados: mantém a reserva
    }
    window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* sem armazenamento: nada a migrar */
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
  const value = JSON.stringify(stored);
  writeCookieValue(CONSENT_COOKIE, value, CONSENT_MAX_AGE);
  if (readCookieValue(CONSENT_COOKIE) !== value) {
    try {
      window.localStorage.setItem(CONSENT_KEY, value); // cookies bloqueados: vale só neste site
    } catch {
      /* navegador sem armazenamento: a escolha vale só até recarregar */
    }
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/** Avisa quando a escolha muda: nesta aba, em outra aba (`storage`) ou noutro subdomínio (relê ao voltar o foco). */
export function subscribeConsent(onChange: () => void) {
  const onVisible = () => {
    if (document.visibilityState === "visible") onChange();
  };
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onChange);
  window.addEventListener("focus", onChange);
  document.addEventListener("visibilitychange", onVisible);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
    window.removeEventListener("focus", onChange);
    document.removeEventListener("visibilitychange", onVisible);
  };
}

/** Apaga os cookies que o GA4, o Meta Pixel e a origem do tráfego (`cd_ft`, `cd_lt`) já tenham criado (ao retirar o consentimento). */
export function clearTrackingCookies() {
  const hostParts = window.location.hostname.split(".");
  // Inclui o próprio host com ponto (`.catolico.digital`): é o domínio em que o GA4 e a origem do tráfego gravam.
  const domains = ["", window.location.hostname, `.${window.location.hostname}`, ...hostParts.slice(1).map((_, i) => `.${hostParts.slice(i + 1).join(".")}`)];
  for (const entry of document.cookie.split(";")) {
    const name = entry.split("=")[0]?.trim();
    if (!name || !/^(_ga|_gid|_gat|_fbp|_fbc|cd_ft$|cd_lt$)/.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}
