import Link from "next/link";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

export default function NotFound() {
  return (
    <>
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
      <SiteHeader />
      <main className="not-found" id="main-content"><div className="not-found__pattern" aria-hidden="true" /><div className="container not-found__content"><p className="eyebrow eyebrow--light">Católico Digital</p><h1>Esta página não foi encontrada.</h1><p>O endereço pode ter mudado ou não existir mais. Você pode voltar para o início e continuar por lá.</p><Link className="button button--gold" href="/">Voltar ao início</Link></div></main>
      <SiteFooter />
    </>
  );
}
