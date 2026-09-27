import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com a equipe do Católico Digital.",
};

export default function ContatoPage() {
  return (
    <main className="site-shell contact-shell" id="main-content">
      <section className="hero contact-content" aria-labelledby="contact-title">
        <p className="eyebrow eyebrow--light">Contato</p>
        <h1 id="contact-title">Vamos conversar sobre a presença digital da sua paróquia.</h1>
        <p className="hero-copy hero-copy--light">
          Conheça os recursos do Católico Digital e confira as informações disponíveis sobre o lançamento.
        </p>
        <div className="contact-actions">
          <Link className="button button--gold" href="/#quero-conhecer">Conhecer a solução</Link>
          <Link className="text-link text-link--light" href="/">Voltar para o início <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
  );
}
