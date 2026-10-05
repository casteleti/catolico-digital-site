import type { NextConfig } from "next";

const THIRTY_DAYS = 60 * 60 * 24 * 30;

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    // Arquivos de public/ não têm hash no nome: cache longo, com revalidação em segundo plano.
    // Ao trocar um arquivo de public/brand, renomeie-o para forçar a atualização.
    const longCache = [{ key: "Cache-Control", value: `public, max-age=${THIRTY_DAYS}, stale-while-revalidate=86400` }];
    return [
      { source: "/brand/:path*", headers: longCache },
      { source: "/:file(favicon.ico|catolico-digital-logo.svg)", headers: longCache },
    ];
  },
};

export default nextConfig;
