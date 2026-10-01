import type { Metadata } from "next";
import { ModulesTable } from "@/components/site/modules-table";
import { Container } from "@/components/ui/container";
import { CTA, ONBOARDING_URL } from "@/content/links";
import { MODULES } from "@/content/modules";

export const metadata: Metadata = {
  title: "Módulos",
  description: `Os ${MODULES.length} módulos do Católico Digital: missas, catequese, sacramentos, pastorais, dízimo, avisos, notícias, galeria e o site da paróquia.`,
};

export default function ModulosPage() {
  return (
    <main id="main-content">
      <section className="hero hero--brand page-hero" aria-labelledby="modules-title">
        <div className="hero-pattern" aria-hidden="true" />
        <Container>
          <p className="eyebrow eyebrow--light">Módulos</p>
          <h1 id="modules-title">{MODULES.length} módulos, cada um feito para uma parte da vida da paróquia.</h1>
          <p className="hero-copy hero-copy--light">A paróquia liga só o que usa, sem apagar nada. Clique em qualquer módulo para ver, em detalhe, o que ele resolve e para quem.</p>
        </Container>
      </section>
      <section className="section section--white" aria-label="Tabela de módulos">
        <Container>
          <ModulesTable />
          <div className="feature-callout feature-callout--stacked"><div><h3>Pré-montado com o que a maioria usa.</h3><p>Catequese Infantil e de Adultos, cerca de cem pastorais e ministérios, os seis sacramentos e os horários já vêm prontos para ajustar, não para construir do zero.</p></div></div>
          <p className="resource-identity-note">Brasão, cores e fotos da sua paróquia. A tecnologia é a mesma; a identidade é de vocês. <a className="text-link" href={ONBOARDING_URL}>{CTA.primary} <span aria-hidden="true">→</span></a></p>
        </Container>
      </section>
    </main>
  );
}
