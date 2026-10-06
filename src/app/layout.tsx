import type { Metadata } from "next";
import { Caveat, Fraunces, Inter } from "next/font/google";
import { headers } from "next/headers";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { AttributionCapture } from "@/components/marketing/attribution-capture";
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
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "./" },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/brand/icone-32.png", type: "image/png", sizes: "32x32" },
    ],
  },
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

const DESCRIPTION = "Plataforma digital para paróquias: horários, comunidades, sacramentos, pastorais e avisos em um só lugar.";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/brand/horizontal-azul.webp`,
      description: DESCRIPTION,
      sameAs: ["https://www.instagram.com/catolicodigitalorg/"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "pt-BR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: SITE_NAME,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: SITE_URL,
      description: DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Ler o cabeçalho deixa a página dinâmica, o que o nonce da CSP (src/proxy.ts) exige.
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html lang="pt-BR" className={`${inter.variable} ${fraunces.variable} ${caveat.variable}`}>
      <body>
        <JsonLd data={structuredData} />
        <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <WhatsAppButton />
        <CookieConsent nonce={nonce} />
        <AttributionCapture />
      </body>
    </html>
  );
}
