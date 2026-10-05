import type { Metadata } from "next";
import { Check } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { AreaScreen } from "@/components/site/area-screen";
import { AREA_ACCENTS } from "@/components/site/areas-overview";
import { ModuleIcon } from "@/components/site/module-icon";
import { Container } from "@/components/ui/container";
import { AREAS, areaByKey, areaHref, type AreaKey } from "@/content/areas";
import { CTA, ONBOARDING_URL } from "@/content/links";
import { moduleBySlug } from "@/content/modules";

export function areaMetadata(key: AreaKey): Metadata {
  const area = areaByKey(key);
  return { title: area.label, description: area.intro };
}

/** Página de uma área: o topo, um atalho para cada recurso e quatro dobras, uma por item do menu. */
export function AreaPage({ areaKey }: { areaKey: AreaKey }) {
  const area = areaByKey(areaKey);
  const index = AREAS.findIndex((a) => a.key === areaKey);
  const others = AREAS.filter((a) => a.key !== areaKey);
  return (
    <main id="main-content" style={{ "--col-accent": AREA_ACCENTS[index] } as React.CSSProperties}>
      <section className="hero hero--brand page-hero area-hero" aria-labelledby="area-title">
        <div className="hero-pattern" aria-hidden="true" />
        <Container>
          <p className="eyebrow eyebrow--light"><Link href="/modulos">Módulos</Link> · 0{index + 1} {area.label}</p>
          <h1 id="area-title">{area.headline}</h1>
          <p className="hero-copy hero-copy--light">{area.intro}</p>
          <nav className="area-jump" aria-label={`Recursos de ${area.label}`}>
            {area.items.map((item, i) => (
              <a href={`#${item.id}`} key={item.id}><span>0{i + 1}</span><ModuleIcon name={item.icon} size={16} />{item.label}</a>
            ))}
          </nav>
        </Container>
      </section>

      {area.items.map((item, i) => {
        const mod = moduleBySlug(item.module);
        return (
          <section className={`section ${i % 2 ? "section--ivory" : "section--white"} area-fold`} id={item.id} aria-labelledby={`${item.id}-title`} key={item.id}>
            <Container>
              <Reveal as="article" className={`verb-row ${i % 2 ? "verb-row--flip" : ""}`.trim()}>
                <div className="verb-row__copy">
                  <span className="verb-row__verb"><i>0{i + 1}</i> {item.label}</span>
                  <h2 id={`${item.id}-title`}>{item.headline}</h2>
                  <p>{item.text}</p>
                  <ul className="verb-row__points">{item.points.map((pt) => <li key={pt}><Check aria-hidden="true" size={16} /> {pt}</li>)}</ul>
                  {mod ? <Link className="text-link" href={`/modulos/${mod.slug}`}>Tudo o que o módulo {mod.short} faz <span aria-hidden="true">→</span></Link> : null}
                </div>
                <div className="verb-row__visual" aria-hidden="true">
                  <div className="ask"><span className="ask__avatar">{item.label[0]}</span><span className="ask__bubble">{item.ask}</span></div>
                  <AreaScreen screen={item.screen} />
                </div>
              </Reveal>
            </Container>
          </section>
        );
      })}

      <section className="final-cta section section--night" aria-labelledby="area-cta">
        <div className="final-cta__pattern" aria-hidden="true" />
        <Container className="narrow-center">
          <p className="eyebrow eyebrow--light">Católico Digital</p>
          <h2 id="area-cta">Veja {area.label.toLowerCase()} funcionando na sua paróquia, não numa de exemplo.</h2>
          <p>Monte o site da sua paróquia em 5 minutos e ligue o que fizer sentido. {CTA.note}</p>
          <div className="final-cta__actions">
            <a className="button button--gold" href={ONBOARDING_URL}><span>{CTA.primary}</span><span className="button__arrow" aria-hidden="true">→</span></a>
          </div>
          <nav className="area-others" aria-label="Outras áreas">
            {others.map((a) => <Link href={areaHref(a.key)} key={a.key}>{a.label} <span aria-hidden="true">→</span></Link>)}
          </nav>
        </Container>
      </section>
    </main>
  );
}
