/**
 * Limite simples por chave (IP), em memória, para o formulário de contato não virar fonte de spam por e-mail.
 * Vale por instância do servidor (hoje há uma). Janela fixa: `max` envios a cada `windowMs`.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimited(key: string, max = 5, windowMs = 10 * 60 * 1000, now = Date.now()) {
  if (hits.size > 5000) for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > max;
}

export function resetRateLimit() {
  hits.clear();
}
