import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

/**
 * Casco da opção A (landing atual em produção): skip link, header e footer.
 * Vive num grupo de rotas para que /luz (opção B)
 * possa ter o próprio casco sem herdar este. As URLs não mudam: (site) não
 * entra no caminho.
 */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
