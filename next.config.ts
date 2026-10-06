import type { NextConfig } from "next";

const THIRTY_DAYS = 60 * 60 * 24 * 30;

const nextConfig: NextConfig = {
  output: "standalone",
  // CSS (Tailwind, ~22 KB comprimido) vai no HTML em vez de <link> bloqueante: elimina o "render-blocking CSS".
  experimental: { inlineCss: true },
  poweredByHeader: false,
  async headers() {
    // Arquivos de public/ não têm hash no nome: cache longo, com revalidação em segundo plano.
    // Ao trocar um arquivo de public/brand, renomeie-o para forçar a atualização.
    const longCache = [{ key: "Cache-Control", value: `public, max-age=${THIRTY_DAYS}, stale-while-revalidate=86400` }];
    // A Content-Security-Policy (com nonce) é montada por requisição em src/proxy.ts.
    const security = [
      // `preload` + `includeSubDomains`: todo subdomínio de catolico.digital precisa servir HTTPS por 1 ano.
      { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];
    return [
      { source: "/(.*)", headers: security },
      { source: "/brand/:path*", headers: longCache },
      { source: "/:file(favicon.ico|catolico-digital-logo.svg)", headers: longCache },
    ];
  },
};

export default nextConfig;
