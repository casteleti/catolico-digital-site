import type { LeadType } from "@/content/contact";
import type { Touch } from "@/lib/attribution";

/**
 * Regras do lead do formulário de contato (servidor). O backend decide se um contato conta como conversão e monta o
 * evento do GA4; a página só repassa o que ele mandou, depois da confirmação de entrega.
 */
export const FORM_NAME = "contato";

/** Os únicos parâmetros que podem chegar ao GA4. Nada de nome, e-mail, telefone, paróquia ou mensagem. */
export const GA_LEAD_PARAMS = ["lead_id", "form_name", "lead_type", "utm_source", "utm_medium", "utm_campaign"] as const;
export type GaLeadEvent = { name: "generate_lead"; params: Partial<Record<(typeof GA_LEAD_PARAMS)[number], string>> };

/** Só contato comercial vira `generate_lead`; os demais tipos não geram evento. */
export function gaLeadEvent(leadId: string, leadType: LeadType, attribution: { first: Touch | null; last: Touch | null }): GaLeadEvent | null {
  if (leadType !== "commercial") return null;
  const touch = attribution.last ?? attribution.first; // a campanha mais recente (o last touch começa igual ao first)
  const params: GaLeadEvent["params"] = { lead_id: leadId, form_name: FORM_NAME, lead_type: leadType };
  if (touch?.utm_source) params.utm_source = touch.utm_source;
  if (touch?.utm_medium) params.utm_medium = touch.utm_medium;
  if (touch?.utm_campaign) params.utm_campaign = touch.utm_campaign;
  return { name: "generate_lead", params };
}

/** Só os campos de campanha, sem os vazios, para o canal da equipe. */
export function compactTouch(touch: Touch | null): Touch | null {
  if (!touch) return null;
  const entries = Object.entries(touch).filter(([, value]) => value);
  return entries.length ? (Object.fromEntries(entries) as Touch) : null;
}

/**
 * Evita enviar duas vezes o mesmo envio (duplo clique, repetição do navegador, nova tentativa depois de uma resposta
 * perdida): a página manda um `submission_id` por formulário e o servidor devolve o mesmo resultado, sem reenviar ao canal.
 * Em memória, por instância do servidor (hoje há uma); expira em 10 minutos.
 */
const TTL_MS = 10 * 60 * 1000;
const seen = new Map<string, { at: number; result: Promise<unknown> }>();

export function runOnce<T>(key: string | null, work: () => Promise<T>, now = Date.now()): Promise<T> {
  if (!key) return work();
  if (seen.size > 1000) for (const [k, v] of seen) if (now - v.at > TTL_MS) seen.delete(k);
  const previous = seen.get(key);
  if (previous && now - previous.at <= TTL_MS) return previous.result as Promise<T>;
  const result = work();
  seen.set(key, { at: now, result });
  result.catch(() => seen.delete(key)); // falhou: a nova tentativa com o mesmo id pode tentar de novo
  return result;
}

export const isDuplicate = (key: string | null) => Boolean(key && seen.has(key));

export function resetLeadDedupe() {
  seen.clear();
}
