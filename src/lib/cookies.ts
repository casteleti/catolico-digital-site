import { SITE_URL } from "@/lib/site";

/** Cookies de primeira parte compartilhados entre `catolico.digital` e `app.catolico.digital`. Só roda no navegador. */
const SITE_HOST = new URL(SITE_URL).hostname;
export const isSiteHost = (host: string) => host === SITE_HOST || host.endsWith(`.${SITE_HOST}`);

/** `.catolico.digital` em produção; fora dele (localhost, prévia) o cookie fica só no host atual. */
export const cookieDomain = () => (isSiteHost(window.location.hostname) ? `.${SITE_HOST}` : "");

/** Valor já decodificado do cookie, ou `null` se não existir ou o navegador não deixar ler. */
export function readCookieValue(name: string): string | null {
  try {
    const entry = document.cookie.split("; ").find((part) => part.startsWith(`${name}=`));
    return entry ? decodeURIComponent(entry.slice(name.length + 1)) : null;
  } catch {
    return null;
  }
}

export function writeCookieValue(name: string, value: string, maxAgeSeconds: number) {
  const domain = cookieDomain();
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${domain ? `; Domain=${domain}` : ""}${window.location.protocol === "https:" ? "; Secure" : ""}`;
}
