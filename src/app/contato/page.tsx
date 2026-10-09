import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/site/contact-form";
import { InstagramIcon } from "@/components/site/instagram-icon";
import { CTA, INSTAGRAM, ONBOARDING_URL } from "@/content/links";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a equipe do Católico Digital sobre a plataforma para a sua\u00A0paróquia.",
};

export default function ContatoPage() {
  return (
    <main id="main-content">
      <section className="hero hero--brand page-hero" aria-labelledby="contact-title">
        <div className="hero-pattern" aria-hidden="true" />
        <Container>
          <p className="eyebrow eyebrow--light">Contato</p>
          <h1 id="contact-title">Vamos conversar sobre a sua&nbsp;paróquia.</h1>
          <p className="hero-copy hero-copy--light">Escolha o assunto, deixe seu contato e a equipe do Católico Digital&nbsp;responde.</p>
        </Container>
      </section>
      <section className="section section--white" aria-label="Formulário de contato">
        <Container className="contact-layout">
          <ContactForm />
          <aside className="contact-aside">
            <p className="eyebrow">Prefere ver na&nbsp;prática?</p>
            <h2>Monte o site da sua paróquia em cerca de 5&nbsp;minutos.</h2>
            <p>{CTA.note}</p>
            <a className="button button--gold" href={ONBOARDING_URL}><span>{CTA.primary}</span><span className="button__arrow" aria-hidden="true">→</span></a>
            <div className="contact-aside__social">
              <p className="eyebrow">Acompanhe</p>
              <a href={INSTAGRAM.url} rel="noopener noreferrer" target="_blank"><InstagramIcon size={20} /> <span><strong>{INSTAGRAM.handle}</strong> no Instagram</span></a>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
