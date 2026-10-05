import type { Metadata } from "next";
import { Check } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ModuleIcon } from "@/components/site/module-icon";
import { Container } from "@/components/ui/container";
import { CTA, ONBOARDING_URL } from "@/content/links";
import { MODULE_GROUPS, MODULES, moduleBySlug, modulesOf, ROLE_LABELS } from "@/content/modules";
import { ROLES } from "@/content/roles";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return MODULES.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const m = moduleBySlug(slug);
  if (!m) return {};
  return { title: m.name, description: m.promise };
}

/** Página de um módulo: a dor, o que faz hoje, para quem, e os módulos vizinhos. */
export default async function ModuloPage({ params }: Params) {
  const { slug } = await params;
  const m = moduleBySlug(slug);
  if (!m) notFound();
  const group = MODULE_GROUPS.find((g) => g.key === m.group)!;
  const siblings = modulesOf(m.group).filter((x) => x.slug !== m.slug);
  const roles = ROLES.filter((r) => m.roles.includes(r.slug));

  return (
    <main id="main-content">
      <section className="hero hero--brand page-hero" aria-labelledby="module-title">
        <div className="hero-pattern" aria-hidden="true" />
        <Container>
          <p className="eyebrow eyebrow--light"><Link href="/modulos">Módulos</Link> · <Link href={`/${m.group}`}>{group.label}</Link></p>
          <div className="page-hero__title">
            <span className="page-hero__icon"><ModuleIcon name={m.icon} size={28} /></span>
            <h1 id="module-title">{m.headline ?? m.promise}</h1>
          </div>
          <p className="hero-copy hero-copy--light">{m.lead ?? `${m.name}: ${m.pain}`}</p>
          <div className="hero__actions">
            <a className="button button--gold" href={ONBOARDING_URL}><span>{CTA.primary}</span><span className="button__arrow" aria-hidden="true">→</span></a>
            {m.status === "em-preparacao" ? <span className="status-pill">Em preparação</span> : null}
          </div>
        </Container>
      </section>

      <section className="section section--white" aria-labelledby="does-title">
        <Container className="module-layout">
          <div className="section-heading section-heading--compact"><p className="eyebrow">O que faz hoje</p><h2 id="does-title">Sem promessa: o que o módulo {m.short} já faz.</h2>{m.lead ? <p>{m.pain}</p> : null}<p>Tudo o que está aqui existe no sistema. O&nbsp;que ainda está em construção aparece marcado como “em preparação”.</p></div>
          <ul className="does-list">
            {m.does.map((item) => (
              <li key={item}><Check aria-hidden="true" size={18} /><span>{item}</span></li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section section--ivory" aria-labelledby="who-title">
        <Container>
          <div className="section-heading"><p className="eyebrow">Para quem</p><h2 id="who-title">Quem usa o módulo {m.short} no dia a dia.</h2></div>
          <div className="role-grid role-grid--light">
            {roles.map((role) => (
              <Link className="role-card" href={`/para/${role.slug}`} key={role.slug}>
                <span className="role-card__menu">{role.menu}</span>
                <blockquote className="role-card__quote">{role.quote}</blockquote>
                <span className="role-card__go">Ver o que muda <span aria-hidden="true">→</span></span>
              </Link>
            ))}
            {m.roles.includes("fieis") ? (
              <div className="role-card role-card--static">
                <span className="role-card__menu">Para os fiéis</span>
                <p>É a parte que a comunidade vê: no celular, pelo link do WhatsApp, sem baixar nada.</p>
              </div>
            ) : null}
          </div>
          <p className="resource-identity-note">Quem usa: {m.roles.map((r) => ROLE_LABELS[r]).join(", ")}.</p>
        </Container>
      </section>

      {siblings.length > 0 ? (
        <section className="section section--white" aria-labelledby="siblings-title">
          <Container>
            <div className="section-heading"><p className="eyebrow">{group.label}</p><h2 id="siblings-title">Outros módulos de {group.label.toLowerCase()}.</h2></div>
            <div className="icon-grid icon-grid--four">
              {siblings.map((s) => (
                <Link className="icon-card" href={`/modulos/${s.slug}`} key={s.slug}>
                  <span className="icon-card__icon"><ModuleIcon name={s.icon} /></span>
                  <h3>{s.name}</h3>
                  <p>{s.promise}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="final-cta section section--night" aria-labelledby="module-cta">
        <div className="final-cta__pattern" aria-hidden="true" />
        <Container className="narrow-center"><p className="eyebrow eyebrow--light">Católico Digital</p><h2 id="module-cta">Experimente na sua paróquia, em 5 minutos.</h2><p>Monte o site da sua paróquia em 5 minutos e ligue o que fizer sentido. {CTA.note}</p><div className="final-cta__actions"><a className="button button--gold" href={ONBOARDING_URL}><span>{CTA.primary}</span><span className="button__arrow" aria-hidden="true">→</span></a><Link className="text-link text-link--light final-cta__secondary" href="/modulos">Ver todos os módulos <span aria-hidden="true">→</span></Link></div></Container>
      </section>
    </main>
  );
}
