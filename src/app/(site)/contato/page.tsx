import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com a equipe do Católico Digital.",
};

export default function ContatoPage() {
  return (
    <main className="site-shell contact-shell">
      <section className="hero" aria-labelledby="contact-title">
        <p className="eyebrow">Contato</p>
        <h1 id="contact-title">Vamos conversar.</h1>
        <p className="hero-copy">
          Esta página será conectada ao formulário de leads na próxima etapa.
        </p>
        <Link className="primary-link" href="/">Voltar para o início</Link>
      </section>
    </main>
  );
}
