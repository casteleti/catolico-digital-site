import { isSiteHost, readCookieValue, writeCookieValue } from "@/lib/cookies";
import type { Consent } from "@/lib/consent";

/**
 * Origem do tráfego (UTMs e identificadores de clique do Google). Guardada em dois cookies de primeira parte, em
 * `.catolico.digital`, para o site comercial e `app.catolico.digital` enxergarem o mesmo valor:
 *   - `cd_ft` (first touch): a primeira visita; nunca é sobrescrita;
 *   - `cd_lt` (last touch): a última visita que trouxe parâmetro de campanha; começa igual ao first touch e a visita direta não o troca.
 * Só é gravada com o aceite de "Medição" (ver `src/lib/consent.ts`). Antes da resposta, a visita fica na
 * `sessionStorage` da aba e só vira cookie se o aceite vier; se vier a rejeição, é descartada.
 * Formato e leitura: `Docs/24_TAGS_PIXELS_INVENTARIO.md`, seção 3. Sem dados pessoais: só parâmetros de campanha,
 * caminho da página de entrada, origem (sem query) do referrer e a data.
 */
export const FIRST_TOUCH_COOKIE = "cd_ft";
export const LAST_TOUCH_COOKIE = "cd_lt";
const PENDING_KEY = "cd-attr-pending";
/** 90 dias: o prazo em que o Google ainda aceita importar uma conversão a partir do `gclid`. */
const MAX_AGE = 60 * 60 * 24 * 90;

const CAMPAIGN_FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid"] as const;
const FIELD_LIMIT: Record<string, number> = { gclid: 200, gbraid: 200, wbraid: 200, lp: 120, ref: 200 };
const DEFAULT_LIMIT = 100;

export type Touch = Partial<Record<(typeof CAMPAIGN_FIELDS)[number] | "lp" | "ref" | "ts", string>>;

type Pending = { ft?: Touch; lt?: Touch };

const clean = (value: string | null | undefined, field: string) =>
  (value ?? "").replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, FIELD_LIMIT[field] ?? DEFAULT_LIMIT);

export const hasCampaign = (touch: Touch | undefined) => Boolean(touch && CAMPAIGN_FIELDS.some((field) => touch[field]));

/** A visita atual, lida da URL e do referrer. Calculada uma vez por carregamento de página. */
let currentVisit: Touch | null = null;
function visitNow(): Touch {
  if (currentVisit) return currentVisit;
  const params = new URLSearchParams(window.location.search);
  const touch: Touch = {};
  for (const field of CAMPAIGN_FIELDS) {
    const value = clean(params.get(field), field);
    if (value) touch[field] = value;
  }
  touch.lp = clean(window.location.pathname, "lp");
  try {
    // Só origem + caminho do referrer (sem query) e só de fora do nosso domínio.
    const ref = document.referrer ? new URL(document.referrer) : null;
    if (ref && !isSiteHost(ref.hostname)) touch.ref = clean(`${ref.origin}${ref.pathname}`, "ref");
  } catch {
    /* referrer inválido: ignora */
  }
  touch.ts = new Date().toISOString();
  currentVisit = touch;
  return touch;
}

function parseTouch(value: unknown): Touch | null {
  if (!value || typeof value !== "object") return null;
  const touch: Touch = {};
  for (const field of [...CAMPAIGN_FIELDS, "lp", "ref", "ts"] as const) {
    const item = (value as Record<string, unknown>)[field];
    if (typeof item === "string" && item) touch[field] = clean(item, field);
  }
  return touch.ts ? touch : null;
}

function readCookie(name: string): Touch | null {
  try {
    const raw = readCookieValue(name);
    return raw ? parseTouch(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

/**
 * Lê a origem do cabeçalho `Cookie` de uma requisição (no servidor). Os cookies `cd_ft`/`cd_lt` viajam para
 * `catolico.digital` sozinhos; só existem para quem aceitou "Medição". Valores inválidos viram `null`.
 */
export function attributionFromCookieHeader(header: string | null): { first: Touch | null; last: Touch | null } {
  const read = (name: string): Touch | null => {
    try {
      const entry = (header ?? "").split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
      return entry ? parseTouch(JSON.parse(decodeURIComponent(entry.slice(name.length + 1)))) : null;
    } catch {
      return null;
    }
  };
  return { first: read(FIRST_TOUCH_COOKIE), last: read(LAST_TOUCH_COOKIE) };
}

/** Lê a origem guardada (para uso futuro no cadastro). `null` = nenhuma ou sem consentimento. */
export function readAttribution(): { first: Touch | null; last: Touch | null } {
  return { first: readCookie(FIRST_TOUCH_COOKIE), last: readCookie(LAST_TOUCH_COOKIE) };
}

function writeCookie(name: string, touch: Touch) {
  let value = JSON.stringify(touch);
  if (encodeURIComponent(value).length > 3500) value = JSON.stringify({ ...touch, ref: undefined, lp: undefined }); // limite de ~4 KB do cookie
  writeCookieValue(name, value, MAX_AGE);
}

function readPending(): Pending {
  try {
    const raw = window.sessionStorage.getItem(PENDING_KEY);
    const data = raw ? (JSON.parse(raw) as Pending) : {};
    return { ft: parseTouch(data.ft) ?? undefined, lt: parseTouch(data.lt) ?? undefined };
  } catch {
    return {};
  }
}

function savePending(pending: Pending | null) {
  try {
    if (pending) window.sessionStorage.setItem(PENDING_KEY, JSON.stringify(pending));
    else window.sessionStorage.removeItem(PENDING_KEY);
  } catch {
    /* sem sessionStorage: a visita só vale se o aceite vier nesta mesma página */
  }
}

/**
 * Chamada a cada mudança do consentimento (e na entrada). `consent === null` = ainda sem resposta.
 * Idempotente: pode rodar várias vezes na mesma página sem trocar o first touch.
 */
export function syncAttribution(consent: Consent | null) {
  const visit = visitNow();
  if (consent === null) {
    const pending = readPending();
    savePending({ ft: pending.ft ?? visit, lt: hasCampaign(visit) ? visit : pending.lt });
    return;
  }
  const pending = readPending();
  savePending(null);
  if (!consent.analytics) return;

  const first = pending.ft ?? visit;
  if (!readCookie(FIRST_TOUCH_COOKIE)) writeCookie(FIRST_TOUCH_COOKIE, first);
  // Visita com campanha troca o last touch; visita direta só o cria quando ainda não existe (começa igual ao first touch).
  const last = hasCampaign(visit) ? visit : (pending.lt ?? (readCookie(LAST_TOUCH_COOKIE) ? null : first));
  if (last) writeCookie(LAST_TOUCH_COOKIE, last);
}
