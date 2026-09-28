import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

export const metadata: Metadata = {
  metadataBase: new URL("https://catolico.digital"),
  title: {
    default: "Católico Digital · Plataforma digital para paróquias",
    template: "%s | Católico Digital",
  },
  description: "Horários, comunidades, sacramentos, pastorais e avisos em um só lugar, publicados no site da paróquia. Simples de atualizar, fácil para o fiel encontrar.",
  openGraph: {
    title: "Católico Digital · Plataforma digital para paróquias",
    description: "Horários, comunidades, sacramentos, pastorais e avisos em um só lugar, publicados no site da paróquia. Simples de atualizar, fácil para o fiel encontrar.",
    type: "website",
    locale: "pt_BR",
    siteName: "Católico Digital",
  },
  twitter: {
    card: "summary_large_image",
    title: "Católico Digital · Plataforma digital para paróquias",
    description: "Horários, comunidades, sacramentos, pastorais e avisos em um só lugar, publicados no site da paróquia. Simples de atualizar, fácil para o fiel encontrar.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
