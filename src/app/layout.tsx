import type { Metadata } from "next";
import { Caveat, Fraunces, Inter } from "next/font/google";
import { headers } from "next/headers";
import { CookieConsent } from "@/components/marketing/cookie-consent";
import { SiteFooter } from "@/components/marketing/site-footer";
import { WhatsAppButton } from "@/components/marketing/whatsapp-button";
import { SiteHeader } from "@/components/marketing/site-header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
// Letra de mão das anotações ("Clique para testar"): só onde o site fala como quem rabisca à margem.
const caveat = Caveat({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-hand", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://catolico.digital"),
  title: {
    default: "Católico Digital · Plataforma digital para paróquias",
    template: "%s | Católico Digital",
  },
  description: "Horários, comunidades, sacramentos, pastorais e avisos em um só lugar, publicados no site da paróquia. Simples\u00A0de atualizar, fácil para o fiel\u00A0encontrar.",
  openGraph: {
    title: "Católico Digital · Plataforma digital para paróquias",
    description: "Horários, comunidades, sacramentos, pastorais e avisos em um só lugar, publicados no site da paróquia. Simples\u00A0de atualizar, fácil para o fiel\u00A0encontrar.",
    type: "website",
    locale: "pt_BR",
    siteName: "Católico Digital",
  },
  twitter: {
    card: "summary_large_image",
    title: "Católico Digital · Plataforma digital para paróquias",
    description: "Horários, comunidades, sacramentos, pastorais e avisos em um só lugar, publicados no site da paróquia. Simples\u00A0de atualizar, fácil para o fiel\u00A0encontrar.",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Ler o cabeçalho deixa a página dinâmica, o que o nonce da CSP (src/proxy.ts) exige.
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html lang="pt-BR" className={`${inter.variable} ${fraunces.variable} ${caveat.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <WhatsAppButton />
        <CookieConsent nonce={nonce} />
      </body>
    </html>
  );
}
