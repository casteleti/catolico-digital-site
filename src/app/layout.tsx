import type { Metadata } from "next";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { PremiumLayers } from "@/components/motion/premium-layers";
import "./globals.css";

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
    <html lang="pt-BR">
      <body>
        <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
        <SiteHeader />
        <ScrollProgress />
        {children}
        <PremiumLayers />
        <SiteFooter />
      </body>
    </html>
  );
}
