import { GA_LEAD_PARAMS, type GaLeadEvent } from "@/lib/lead";
import { parseConsent, readConsentRaw } from "@/lib/consent";

/**
 * Envia ao GA4 o evento que o servidor autorizou (`generate_lead`), no navegador, uma única vez por `lead_id`.
 * Só com o aceite de "Medição". Antes da tag carregar, o evento fica na fila do `dataLayer` e o GA o envia ao iniciar.
 * Só passam os parâmetros da lista `GA_LEAD_PARAMS`, como texto: qualquer outro campo é descartado.
 */
const FIRED_KEY = "cd-leads-fired";
const firedInMemory = new Set<string>();

function alreadyFired(leadId: string) {
  if (firedInMemory.has(leadId)) return true;
  try {
    return (JSON.parse(window.sessionStorage.getItem(FIRED_KEY) ?? "[]") as string[]).includes(leadId);
  } catch {
    return false;
  }
}

function rememberFired(leadId: string) {
  firedInMemory.add(leadId);
  try {
    const list = JSON.parse(window.sessionStorage.getItem(FIRED_KEY) ?? "[]") as string[];
    window.sessionStorage.setItem(FIRED_KEY, JSON.stringify([...list, leadId].slice(-20)));
  } catch {
    /* sem sessionStorage: vale a memória desta página */
  }
}

/** `true` se o evento foi enviado agora; `false` se já tinha sido, se não há aceite ou se o evento é inválido. */
export function trackLeadOnce(event: GaLeadEvent | null | undefined): boolean {
  if (!event || event.name !== "generate_lead") return false;
  const leadId = event.params?.lead_id;
  if (typeof leadId !== "string" || !leadId || alreadyFired(leadId)) return false;
  if (!parseConsent(readConsentRaw())?.analytics) return false;

  const params: Record<string, string> = {};
  for (const key of GA_LEAD_PARAMS) {
    const value = event.params[key];
    if (typeof value === "string" && value) params[key] = value.slice(0, 100);
  }
  const layer = ((window as unknown as { dataLayer?: unknown[] }).dataLayer ??= []);
  // O GA espera o objeto `arguments` do `gtag(...)`, não uma lista comum.
  const gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    layer.push(arguments);
  } as (...args: unknown[]) => void;
  gtag("event", "generate_lead", params);
  rememberFired(leadId);
  return true;
}
