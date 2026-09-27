import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { PremiumLayers } from "@/components/motion/premium-layers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

export const metadata: Metadata = {
  metadataBase: new URL("https://catolico-digital.example"),
  title: {
    default: "Católico Digital",
    template: "%s | Católico Digital",
  },
  description: "Presença digital organizada para comunidades católicas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
        <SiteHeader />
        {children}
        <PremiumLayers />
        <SiteFooter />
      </body>
    </html>
  );
}
