import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Illustration } from "@/components/site/illustration";
import { ModuleIcon } from "@/components/site/module-icon";
import { Container } from "@/components/ui/container";
import { CTA, ONBOARDING_URL } from "@/content/links";
import { moduleBySlug } from "@/content/modules";
import { ROLES, roleBySlug } from "@/content/roles";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ROLES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const r = roleBySlug(slug);
  if (!r) return {};
  return { title: r.menu, description: r.title };
}

/** Página por papel: a dor na voz da pessoa, o que muda e os módulos que mais importam para ela. */
export default async function ParaPage({ params }: Params) {
  const { slug } = await params;
  const role = roleBySlug(slug);
  if (!role) notFound();
  const modules = role.modules.map(moduleBySlug).filter((m): m is NonNullable<typeof m> => Boolean(m));
  const others = ROLES.filter((r) => r.slug !== role.slug);

  return (
    <main id="main-content">
      <section className="hero hero--brand page-hero" aria-labelledby="role-title">
        <div className="hero-pattern" aria-hidden="true" />
        <Container className="role-hero">
          <div>
            <p className="eyebrow eyebrow--light">{role.menu}</p>
            <blockquote className="page-hero__quote">{role.quote}</blockquote>
            <h1 id="role-title">{role.title}</h1>
            <p className="hero-copy hero-copy--light">{role.lead}</p>
            <div className="hero__actions">
              <a className="button button--gold" href={ONBOARDING_URL}><span>{CTA.primary}</span><span className="button__arrow" aria-hidden="true">→</span></a>
            </div>
          </div>
          <Illustration className="role-hero__art" {...role.image} priority />
        </Container>
      </section>

      <section className="section section--white" aria-labelledby="gains-title">
        <Container>
          <div className="section-heading"><p className="eyebrow">O que muda</p><h2 id="gains-title">No dia a dia, é isto.</h2></div>
          <div className="icon-grid icon-grid--four">
            {role.gains.map(([title, copy], i) => (
              <article className="icon-card gain-card" key={title}><span className="gain-card__number">{String(i + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></article>
            ))}
          </div>
        </Container>
      </section>

      {role.slug === "pascom" ? (
        <section className="section section--night sync-band" aria-labelledby="sync-title">
          <Container className="sync-band__grid">
            <div className="section-heading section-heading--light">
              <p className="eyebrow eyebrow--light">Uma vez só</p>
              <h2 id="sync-title">Mudou o horário? A&nbsp;PASCOM corrige num lugar.</h2>
              <p>A informação é cadastrada uma vez. Quando&nbsp;muda, a página da missa, a da comunidade e a página inicial mostram o novo horário ao mesmo tempo, sem caçar o que ficou para trás.</p>
            </div>
            <Illustration alt="Uma informação da paróquia é atualizada uma vez e aparece certa em quatro páginas: missas, terço, velas e confissões." className="sync-band__art" height={900} name="sincronizacao-escura" width={1200} />
          </Container>
        </section>
      ) : null}

      <section className="section section--ivory" aria-labelledby="role-modules-title">
        <Container>
          <div className="section-heading"><p className="eyebrow">Os módulos que mais importam</p><h2 id="role-modules-title">Por onde começar.</h2></div>
          <div className="icon-grid icon-grid--four">
            {modules.map((m) => (
              <Link className="icon-card" href={`/modulos/${m.slug}`} key={m.slug}>
                <span className="icon-card__icon"><ModuleIcon name={m.icon} /></span>
                <h3>{m.name}</h3>
                <p>{m.promise}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--white" aria-labelledby="others-title">
        <Container>
          <div className="section-heading section-heading--compact"><p className="eyebrow">E para as outras pessoas da paróquia</p><h2 id="others-title">A mesma plataforma, contada para cada um.</h2></div>
          <ul className="others-list">
            {others.map((r) => (
              <li key={r.slug}><Link className="text-link" href={`/para/${r.slug}`}>{r.menu} <span aria-hidden="true">→</span></Link></li>
            ))}
          </ul>
        </Container>
      </section>
    </main>
  );
}
