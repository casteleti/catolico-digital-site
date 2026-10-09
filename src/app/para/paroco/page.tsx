import type { Metadata } from "next";
import { Check } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { AreaScreen } from "@/components/site/area-screen";
import { Illustration } from "@/components/site/illustration";
import { ModuleIcon } from "@/components/site/module-icon";
import { Container } from "@/components/ui/container";
import { JsonLd, breadcrumbLd } from "@/components/seo/json-ld";
import { CTA, ONBOARDING_URL } from "@/content/links";
import { ROLES } from "@/content/roles";

export const metadata: Metadata = {
  title: "Para o Pároco",
  description:
    "Todos os coordenadores, os horários, as inscrições e o site da paróquia num painel só. O\u00A0pároco acompanha tudo e muda o que quiser, sem depender de\u00A0ninguém.",
};

/*
 * Página do pároco (reformulada em 05/10/2026). Escrita a partir da rotina dele e só com o que o sistema faz
 * hoje: com o acesso de Administração ele vê todas as pastorais, muda missas, avisos, site, dízimo e usuários;
 * com o acesso de Pároco, só acompanha catequese e inscrições. A página deixa essa escolha explícita.
 */

const ROUTINE: Array<{ when: string; title: string; text: string; icon: string }> = [
  {
    when: "Antes da primeira missa",
    title: "Abre o painel e vê o\u00A0dia.",
    text: "O que precisa de atenção, os próximos eventos e os atalhos para o que ele mais faz: mudar um horário, criar um aviso, ver as\u00A0inscrições.",
    icon: "clock",
  },
  {
    when: "Depois da reunião do Conselho",
    title: "Confere quem coordena o\u00A0quê.",
    text: "Cada pastoral, movimento e ministério ativo, com o coordenador, o contato e quantas pessoas servem. E\u00A0o aviso de qual grupo ainda não cadastrou a\u00A0equipe.",
    icon: "users",
  },
  {
    when: "Quando o horário muda",
    title: "Corrige uma vez\u00A0só.",
    text: "A Missa do Galo muda para as 20h? Ele\u00A0altera aquele dia, e a página da missa, a da comunidade e a página inicial passam a mostrar o horário\u00A0certo.",
    icon: "church",
  },
  {
    when: "Quando alguém deixa a função",
    title: "Tira o acesso na\u00A0hora.",
    text: "Convida o novo coordenador ou a nova secretária por e-mail e encerra o acesso de quem saiu, sem precisar descobrir senha de\u00A0ninguém.",
    icon: "shield",
  },
];

const FREEDOM: Array<{ icon: string; title: string; text: string }> = [
  { icon: "clock", title: "Horários de missa e confissão", text: "Exceções de data (“24/12 às 20h em vez de 19h”), missa de cada capela e pausa por um mês sem apagar\u00A0nada." },
  { icon: "bell", title: "Avisos e agenda", text: "Aviso com data para sair do ar, evento que se repete de verdade e destaque na página inicial quando ele\u00A0quiser." },
  { icon: "globe", title: "A cara do site", text: "Seis temas de cor, brasão e fotos da paróquia, e a ordem das seções da página\u00A0inicial." },
  { icon: "newspaper", title: "Notícias e seções", text: "Publica ou agenda uma notícia e monta uma seção própria para a festa do padroeiro ou a campanha da\u00A0reforma." },
];

const ADMIN: Array<{ icon: string; title: string; text: string }> = [
  { icon: "hand-heart", title: "Dízimo e PIX", text: "Só a administração altera a chave do PIX, e cada mudança fica registrada com quem fez e\u00A0quando." },
  { icon: "inbox", title: "Inscrições e pedidos", text: "Todos os pedidos de sacramento e inscrições num lugar, com a situação de cada um e os documentos guardados em local\u00A0privado." },
  { icon: "shield", title: "Usuários e acessos", text: "Papéis prontos (secretaria, comunicação, coordenação) e cada pessoa vendo só o que é\u00A0dela." },
  { icon: "book", title: "Catequese", text: "Turmas, vagas, lista de espera e a visão geral da coordenação, com o que precisa de\u00A0atenção." },
];

export default function ParocoPage() {
  const role = ROLES.find((r) => r.slug === "paroco")!;
  const others = ROLES.filter((r) => r.slug !== "paroco");

  return (
    <main id="main-content" className="paroco">
      <JsonLd data={breadcrumbLd([{ name: "Para o Pároco", path: "/para/paroco" }])} />
      <section className="hero hero--brand page-hero" aria-labelledby="paroco-title">
        <div className="hero-pattern" aria-hidden="true" />
        <Container className="role-hero">
          <div>
            <p className="eyebrow eyebrow--light">Para o Pároco</p>
            <h1 id="paroco-title">A paróquia inteira num painel só. E&nbsp;você no&nbsp;comando.</h1>
            <p className="hero-copy hero-copy--light">Coordenadores, horários de missa, inscrições e o site da paróquia num lugar, em vez de espalhados em grupos de WhatsApp, posts e mensagens no Direct. Você&nbsp;enxerga a paróquia inteira e muda o que&nbsp;quiser.</p>
            <div className="hero__actions">
              <a className="button button--gold" href={ONBOARDING_URL}><span>{CTA.primary}</span><span className="button__arrow" aria-hidden="true">→</span></a>
              <Link className="text-link text-link--light" href="/contato">{CTA.talk} <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <Illustration className="role-hero__art" {...role.image} priority />
        </Container>
      </section>

      <section className="section section--white" aria-labelledby="rotina-title">
        <Container>
          <Reveal className="section-heading"><p className="eyebrow">A rotina do padre</p><h2 id="rotina-title">Um dia na paróquia, sem depender de áudio e grupo de&nbsp;WhatsApp.</h2><p>Missas, reuniões, atendimento, visitas. O&nbsp;painel cabe nos intervalos e responde às perguntas que hoje chegam por áudio, Direct e&nbsp;grupo.</p></Reveal>
          <ol className="routine">
            {ROUTINE.map((step, i) => (
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

      <section className="section section--ivory" aria-labelledby="coordenadores-title">
        <Container>
          <Reveal as="article" className="verb-row">
            <div className="verb-row__copy">
              <span className="verb-row__verb"><i>01</i> Todos os coordenadores</span>
              <h2 id="coordenadores-title">Quem coordena cada pastoral, com contato e equipe, numa tela&nbsp;só.</h2>
              <p>A visão geral mostra todos os grupos ativos da paróquia: quem coordena, o telefone e o e-mail, quantas pessoas servem em cada um. Quando&nbsp;um grupo só tem a coordenação cadastrada, ela aparece em “Precisa de&nbsp;atenção”.</p>
              <ul className="verb-row__points">
                <li><Check aria-hidden="true" size={16} /> Cerca de cem pastorais, movimentos e ministérios prontos para ativar</li>
                <li><Check aria-hidden="true" size={16} /> Cada coordenador com o próprio login, vendo só a própria equipe</li>
                <li><Check aria-hidden="true" size={16} /> O coordenador do Conselho Pastoral também enxerga todos os grupos</li>
              </ul>
              <Link className="text-link" href="/vida-paroquial#pastorais-e-ministerios">Ver Pastorais e Ministérios <span aria-hidden="true">→</span></Link>
            </div>
            <div className="verb-row__visual" aria-hidden="true">
              <div className="ask"><span className="ask__avatar">P</span><span className="ask__bubble">Quem está à frente da Pastoral da Criança&nbsp;hoje?</span></div>
              <AreaScreen
                screen={{
                  kicker: "Visão geral · Pastorais & Ministérios",
                  rows: [
                    { icon: "users", text: "Ministério de Música · João", tag: "14 pessoas" },
                    { icon: "users", text: "Pastoral da Criança · Ana", tag: "9 pessoas" },
                    { icon: "users", text: "MESCE · Rita", tag: "12 pessoas" },
                  ],
                  lines: [{ text: "Pastoral do Dízimo: só a coordenação está cadastrada" }],
                  chips: ["18 grupos ativos", "126 pessoas servindo"],
                }}
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section section--white" aria-labelledby="liberdade-title">
        <Container>
          <Reveal className="section-heading"><p className="eyebrow">02 · Liberdade no site</p><h2 id="liberdade-title">Mudou o horário? Você&nbsp;mesmo muda, e o site inteiro&nbsp;acompanha.</h2><p>Cada informação é cadastrada uma vez. O&nbsp;que você altera no painel aparece certo em todas as páginas onde ela está, no mesmo&nbsp;instante.</p></Reveal>
          <div className="icon-grid icon-grid--four">
            {FREEDOM.map((card, i) => (
              <Reveal as="article" className="icon-card" delay={i * 70} key={card.title}>
                <span className="icon-card__icon"><ModuleIcon name={card.icon} /></span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--night paroco-admin" aria-labelledby="admin-title">
        <Container>
          <Reveal className="section-heading section-heading--light"><p className="eyebrow eyebrow--light">03 · O administrativo</p><h2 id="admin-title">O que é sério fica com quem responde pela&nbsp;paróquia.</h2><p>Dízimo, acessos e dados das famílias ficam sob a administração, e o que muda deixa rastro: quem fez, quando e o que havia&nbsp;antes.</p></Reveal>
          <div className="icon-grid icon-grid--four">
            {ADMIN.map((card, i) => (
              <Reveal as="article" className="icon-card paroco-admin__card" delay={i * 70} key={card.title}>
                <span className="icon-card__icon"><ModuleIcon name={card.icon} /></span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--white" aria-labelledby="acesso-title">
        <Container>
          <Reveal className="section-heading section-heading--compact"><p className="eyebrow">04 · Você decide</p><h2 id="acesso-title">Quer pôr a mão na massa ou só&nbsp;acompanhar?</h2><p>O acesso do pároco é escolhido pela paróquia e pode mudar a qualquer&nbsp;momento.</p></Reveal>
          <div className="access-choice">
            <Reveal as="article" className="access-choice__card access-choice__card--full">
              <p className="access-choice__tag">Acesso de Administração</p>
              <h3>Faz&nbsp;tudo.</h3>
              <ul>
                <li><Check aria-hidden="true" size={16} /> Vê todos os coordenadores e equipes</li>
                <li><Check aria-hidden="true" size={16} /> Muda missas, avisos, agenda e a página inicial</li>
                <li><Check aria-hidden="true" size={16} /> Cuida do dízimo, dos usuários e da aparência do site</li>
              </ul>
            </Reveal>
            <Reveal as="article" className="access-choice__card" delay={90}>
              <p className="access-choice__tag">Acesso de Pároco</p>
              <h3>Acompanha, sem se preocupar com o&nbsp;resto.</h3>
              <ul>
                <li><Check aria-hidden="true" size={16} /> Vê as inscrições e os pedidos de sacramento</li>
                <li><Check aria-hidden="true" size={16} /> Acompanha a catequese</li>
                <li><Check aria-hidden="true" size={16} /> A secretaria cuida dos horários e do site</li>
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section section--ivory" aria-labelledby="transferencia-title">
        <Container className="narrow-center">
          <Reveal>
            <p className="eyebrow">Quando o padre muda de paróquia</p>
            <h2 id="transferencia-title">O site fica com a paróquia. A&nbsp;senha não vai&nbsp;junto.</h2>
            <p className="paroco-transfer__text">Cada pessoa entra com o próprio acesso. Quem&nbsp;chega recebe um convite por e-mail; quem sai deixa de entrar no mesmo dia. Nada&nbsp;se perde e ninguém precisa recomeçar do&nbsp;zero.</p>
          </Reveal>
        </Container>
      </section>

      <section className="final-cta section section--night" aria-labelledby="paroco-cta">
        <div className="final-cta__pattern" aria-hidden="true" />
        <Container className="narrow-center">
          <p className="eyebrow eyebrow--light">Católico Digital</p>
          <h2 id="paroco-cta">Mais tempo para a paróquia. Menos&nbsp;tempo lendo mensagens de&nbsp;WhatsApp.</h2>
          <p>Monte o site da sua paróquia em cerca de 5 minutos e veja o painel funcionando com os dados de vocês. {CTA.note}</p>
          <div className="final-cta__actions">
            <a className="button button--gold" href={ONBOARDING_URL}><span>{CTA.primary}</span><span className="button__arrow" aria-hidden="true">→</span></a>
            <Link className="text-link text-link--light final-cta__secondary" href="/contato">{CTA.talk} <span aria-hidden="true">→</span></Link>
          </div>
          <nav className="area-others" aria-label="Para as outras pessoas da paróquia">
            {others.filter((r) => r.slug !== "catequese").map((r) => (
              <Link href={`/para/${r.slug}`} key={r.slug}>{r.menu} <span aria-hidden="true">→</span></Link>
            ))}
          </nav>
        </Container>
      </section>
    </main>
  );
}
