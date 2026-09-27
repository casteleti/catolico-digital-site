import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { PremiumLayers } from "@/components/motion/premium-layers";
import { ScrollProgress } from "@/components/motion/scroll-progress";

/**
 * Casco da opção A (landing atual em produção): header, barra de progresso,
 * camadas de motion e footer. Vive num grupo de rotas para que /luz (opção B)
 * possa ter o próprio casco sem herdar este. As URLs não mudam: (site) não
 * entra no caminho.
 */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
      <SiteHeader />
      <ScrollProgress />
      {children}
      <PremiumLayers />
      <SiteFooter />
    </>
  );
}
