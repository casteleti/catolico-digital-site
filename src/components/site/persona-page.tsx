import { Check } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { AreaScreen } from "@/components/site/area-screen";
import { Illustration } from "@/components/site/illustration";
import { ModuleIcon } from "@/components/site/module-icon";
import { Container } from "@/components/ui/container";
import type { AreaScreen as Screen } from "@/content/areas";
import { CTA, ONBOARDING_URL } from "@/content/links";
import { ROLES } from "@/content/roles";

type Card = { icon: string; title: string; text: string };

export type Persona = {
  slug: string;
  eyebrow: string;
  quote: string;
  title: string;
  lead: string;
  image: { name: string; alt: string; width: number; height: number };
  routine: { eyebrow: string; title: string; lead: string; steps: Array<{ when: string; title: string; text: string; icon: string }> };
  spotlight: {
    label: string;
    title: string;
    text: string;
    points: string[];
    link?: { href: string; label: string };
    ask: string;
    screen?: Screen;
    art?: { name: string; alt: string; width: number; height: number };
  };
  features: { eyebrow: string; title: string; lead: string; cards: Card[] };
  band: { eyebrow: string; title: string; lead: string; cards: Card[] };
  closing: { eyebrow: string; title: string; text: string };
  cta: string;
};

/**
 * Página "Para quem" no formato reformulado (05/10/2026): banner com ilustração, a rotina da pessoa em quatro
 * momentos, um recurso em destaque, quatro cartões, uma faixa escura, um fecho e a chamada final.
 */
export function PersonaPage({ persona }: { persona: Persona }) {
  const others = ROLES.filter((r) => r.slug !== persona.slug && r.slug !== "catequese");
  const s = persona.spotlight;
  return (
    <main id="main-content" className="persona">
      <section className="hero hero--brand page-hero" aria-labelledby="persona-title">
        <div className="hero-pattern" aria-hidden="true" />
        <Container className="role-hero">
          <div>
            <p className="eyebrow eyebrow--light">{persona.eyebrow}</p>
            <blockquote className="page-hero__quote">{persona.quote}</blockquote>
            <h1 id="persona-title">{persona.title}</h1>
            <p className="hero-copy hero-copy--light">{persona.lead}</p>
            <div className="hero__actions">
              <a className="button button--gold" href={ONBOARDING_URL}><span>{CTA.primary}</span><span className="button__arrow" aria-hidden="true">→</span></a>
              <Link className="text-link text-link--light" href="/contato">{CTA.talk} <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <Illustration className="role-hero__art" {...persona.image} priority />
        </Container>
      </section>

      <section className="section section--white" aria-labelledby="rotina-title">
        <Container>
          <Reveal className="section-heading"><p className="eyebrow">{persona.routine.eyebrow}</p><h2 id="rotina-title">{persona.routine.title}</h2><p>{persona.routine.lead}</p></Reveal>
          <ol className="routine">
            {persona.routine.steps.map((step, i) => (
              <Reveal as="li" className="routine__step" delay={i * 80} key={step.when}>
                <span className="routine__icon"><ModuleIcon name={step.icon} size={18} /></span>
                <p className="routine__when">{step.when}</p>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section section--ivory" aria-labelledby="destaque-title">
        <Container>
          <Reveal as="article" className="verb-row">
            <div className="verb-row__copy">
              <span className="verb-row__verb"><i>01</i> {s.label}</span>
              <h2 id="destaque-title">{s.title}</h2>
              <p>{s.text}</p>
              <ul className="verb-row__points">{s.points.map((pt) => <li key={pt}><Check aria-hidden="true" size={16} /> {pt}</li>)}</ul>
              {s.link ? <Link className="text-link" href={s.link.href}>{s.link.label} <span aria-hidden="true">→</span></Link> : null}
            </div>
            <div className={`verb-row__visual ${s.art ? "verb-row__visual--art" : ""}`.trim()} aria-hidden={s.art ? undefined : true}>
              <div className="ask" aria-hidden="true"><span className="ask__avatar">{persona.eyebrow.replace(/^Para (o |a |os |as )?/, "")[0]}</span><span className="ask__bubble">{s.ask}</span></div>
              {s.screen ? <AreaScreen screen={s.screen} /> : null}
              {s.art ? <Illustration {...s.art} /> : null}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section section--white" aria-labelledby="recursos-title">
        <Container>
          <Reveal className="section-heading"><p className="eyebrow">{persona.features.eyebrow}</p><h2 id="recursos-title">{persona.features.title}</h2><p>{persona.features.lead}</p></Reveal>
          <div className="icon-grid icon-grid--four">
            {persona.features.cards.map((card, i) => (
              <Reveal as="article" className="icon-card" delay={i * 70} key={card.title}>
                <span className="icon-card__icon"><ModuleIcon name={card.icon} /></span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--night paroco-admin" aria-labelledby="faixa-title">
        <Container>
          <Reveal className="section-heading section-heading--light"><p className="eyebrow eyebrow--light">{persona.band.eyebrow}</p><h2 id="faixa-title">{persona.band.title}</h2><p>{persona.band.lead}</p></Reveal>
          <div className="icon-grid icon-grid--four">
            {persona.band.cards.map((card, i) => (
              <Reveal as="article" className="icon-card" delay={i * 70} key={card.title}>
                <span className="icon-card__icon"><ModuleIcon name={card.icon} /></span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--ivory" aria-labelledby="fecho-title">
        <Container className="narrow-center">
          <Reveal>
            <p className="eyebrow">{persona.closing.eyebrow}</p>
            <h2 id="fecho-title">{persona.closing.title}</h2>
            <p className="paroco-transfer__text">{persona.closing.text}</p>
          </Reveal>
        </Container>
      </section>

      <section className="final-cta section section--night" aria-labelledby="persona-cta">
        <div className="final-cta__pattern" aria-hidden="true" />
        <Container className="narrow-center">
          <p className="eyebrow eyebrow--light">Católico Digital</p>
          <h2 id="persona-cta">{persona.cta}</h2>
          <p>Monte o site da sua paróquia em 5 minutos e veja o painel funcionando com os dados de vocês. {CTA.note}</p>
          <div className="final-cta__actions">
            <a className="button button--gold" href={ONBOARDING_URL}><span>{CTA.primary}</span><span className="button__arrow" aria-hidden="true">→</span></a>
            <Link className="text-link text-link--light final-cta__secondary" href="/contato">{CTA.talk} <span aria-hidden="true">→</span></Link>
          </div>
          <nav className="area-others" aria-label="Para as outras pessoas da paróquia">
            {others.map((r) => <Link href={`/para/${r.slug}`} key={r.slug}>{r.menu} <span aria-hidden="true">→</span></Link>)}
          </nav>
        </Container>
      </section>
    </main>
  );
}
