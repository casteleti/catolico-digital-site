import Link from "next/link";

export default function NotFound() {
  return <main className="not-found" id="main-content"><div className="not-found__pattern" aria-hidden="true" /><div className="container not-found__content"><p className="eyebrow eyebrow--light">Católico Digital</p><h1>Esta página não foi encontrada.</h1><p>O endereço pode ter mudado ou não existir mais. Você pode voltar para o início e continuar por lá.</p><Link className="button button--gold" href="/">Voltar ao início</Link></div></main>;
}
