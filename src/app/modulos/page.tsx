import type { Metadata } from "next";
import { AreasOverview } from "@/components/site/areas-overview";
import { ModulesTable } from "@/components/site/modules-table";
import { Container } from "@/components/ui/container";
import { CTA, ONBOARDING_URL } from "@/content/links";
import { MODULES } from "@/content/modules";

export const metadata: Metadata = {
  title: "Módulos",
  description: "As quatro áreas do Católico Digital: celebrações, vida paroquial, comunicação e administração, com os recursos de cada uma.",
};

/** Visão geral: as quatro áreas (a mesma organização do menu) e, embaixo, a tabela com os módulos do sistema. */
export default function ModulosPage() {
  return (
    <main id="main-content">
      <section className="hero hero--brand page-hero" aria-labelledby="modules-title">
        <div className="hero-pattern" aria-hidden="true" />
        <Container>
          <p className="eyebrow eyebrow--light">Módulos</p>
          <h1 id="modules-title">Quatro áreas, cada uma para uma parte da vida da paróquia.</h1>
          <p className="hero-copy hero-copy--light">Celebrações, vida paroquial, comunicação e administração. A&nbsp;paróquia liga só o que usa, sem apagar nada.</p>
        </Container>
      </section>
      <section className="section section--white" aria-label="As quatro áreas">
        <Container>
          <AreasOverview />
        </Container>
      </section>
      <section className="section section--ivory" aria-labelledby="table-title">
        <Container>
          <div className="section-heading"><p className="eyebrow">No sistema</p><h2 id="table-title">Os {MODULES.length} módulos por trás das quatro áreas.</h2><p>Cada recurso acima é feito por um destes módulos. Clique&nbsp;para ver, em detalhe, o que cada um faz hoje.</p></div>
          <ModulesTable />
          <div className="feature-callout feature-callout--stacked"><div><h3>Pré-montado com o que a maioria usa.</h3><p>Catequese Infantil e de Adultos, cerca de cem pastorais e ministérios, os seis sacramentos e os horários já vêm prontos para ajustar, não para construir do zero.</p></div></div>
          <p className="resource-identity-note">Brasão, cores e fotos da sua paróquia. A&nbsp;tecnologia é a mesma; a identidade é de vocês. <a className="text-link" href={ONBOARDING_URL}>{CTA.primary} <span aria-hidden="true">→</span></a></p>
        </Container>
      </section>
    </main>
  );
}
