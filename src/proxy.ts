import { NextResponse, type NextRequest } from "next/server";

/**
 * Content-Security-Policy com nonce por requisição (padrão oficial do Next.js).
 * O Next lê o nonce deste cabeçalho e o aplica aos scripts e estilos do framework; `layout.tsx` repassa o
 * nonce às tags de terceiros. Por isso toda página é renderizada por requisição (sem HTML estático).
 *
 * Domínios liberados = só o que o site usa, e só depois do aceite de cookies:
 * - GA4: googletagmanager.com (script) e *.google-analytics.com / *.analytics.google.com (envio de dados)
 * - Meta Pixel: connect.facebook.net (script) e www.facebook.com (envio de dados e imagem de rastreio)
 * Tag nova? Acrescentar o domínio aqui E registrar em Docs/24. Sem isso o navegador bloqueia a tag.
 */
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";
  const isLocal = ["localhost", "127.0.0.1"].includes(request.nextUrl.hostname);

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    `style-src 'self' 'nonce-${nonce}'`,
    // Atributos style="" (largura do logo, cores por área, barras de progresso) não aceitam nonce.
    "style-src-attr 'unsafe-inline'",
    "img-src 'self' data: blob: https://www.facebook.com https://*.google-analytics.com https://*.googletagmanager.com",
    "font-src 'self'",
    "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://www.facebook.com https://connect.facebook.net",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    // Em http://localhost o upgrade quebraria os recursos do `next start` local.
    ...(isLocal ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|brand/).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
