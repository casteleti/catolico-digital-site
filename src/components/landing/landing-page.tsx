import { Check } from "lucide-react";
import Link from "next/link";
import { FaqAccordion } from "@/components/landing/faq-accordion";
import { faq } from "@/content/faq";
import { ScheduleUpdateDemo } from "@/components/landing/schedule-update-demo";
import { Reveal } from "@/components/motion/reveal";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { Illustration } from "@/components/site/illustration";
import { HeroShowcase } from "@/components/site/hero-showcase";
import { LiturgyToday } from "@/components/site/liturgy-today";
import { ModuleIcon } from "@/components/site/module-icon";
import { AreasOverview } from "@/components/site/areas-overview";
import { Container } from "@/components/ui/container";
import { CTA, DEMO_URL, ONBOARDING_URL } from "@/content/links";
import { NAVIGATION } from "@/content/navigation";

const AUDIENCE = NAVIGATION.flatMap((item) => (item.kind === "menu" && item.label === "Para quem" ? item.groups.flatMap((g) => g.links) : []));

/** Os três passos reais do onboarding (app.catolico.digital/comecar). */
const STEPS: Array<[string, string]> = [
  ["Responda nove perguntas", "Nome, cidade, padroeiro, horários de missa e contato. O\u00A0que você não souber, pode\u00A0pular."],
  ["Veja o site ficar pronto", "A cada resposta, a prévia do site aparece ao lado e você confere como o fiel vai\u00A0ver."],
  ["Publique quando quiser", "Nada vai ao ar sem você mandar. Depois,\u00A0a secretaria atualiza tudo por um painel\u00A0simples."],
];

/** O que a paróquia precisa saber antes de testar. Só o que o sistema faz hoje; valores de manutenção ainda são pendência comercial (não afirmar que publicar é grátis). */
const BEFORE_YOU_START: Array<{ q: string; a: string; link?: { href: string; label: string } }> = [
  { q: "O que preciso ter à\u00A0mão?", a: "O nome da paróquia, a cidade, o padroeiro e os horários de missa ajudam. O\u00A0que você não souber, pode pular e completar\u00A0depois." },
  { q: "O que significa\u00A0publicar?", a: "Enquanto você não publica, o site não está aberto ao público. Ao\u00A0publicar, qualquer pessoa pode acessá-lo e ele pode aparecer no Google. Só\u00A0o administrador da paróquia\u00A0publica." },
  { q: "Quanto\u00A0custa?", a: "Montar o site e ver como ele fica não custa nada. Os\u00A0valores para mantê-lo no ar ainda estão sendo definidos e serão combinados com cada\u00A0paróquia.", link: { href: "/contato", label: "Perguntar à equipe" } },
  { q: "Qual será o endereço do\u00A0site?", a: "O site nasce em um endereço no catolico.digital, como paroquiasaojose.catolico.digital. Domínio\u00A0próprio da paróquia: os\u00A0detalhes são combinados com a\u00A0equipe." },
];

/**
 * Os cinco recursos da primeira dobra, na ordem em que o Renato pediu (05/10/2026). Cada um traz a pergunta que
 * chega ao telefone da secretaria e a tela que a responde. Regra de honestidade: só o que existe hoje.
 */
const verbs: Array<{
  verb: string;
  /** A dobra que explica este recurso na página da área. */
  href: string;
  title: string;
  story: string;
  points: string[];
  ask: string;
  screen: Screen;
}> = [
  {
    verb: "Sacramentos",
    href: "/vida-paroquial#sacramentos",
    title: "O formulário e as instruções de cada sacramento, num lugar só para a\u00A0família.",
    story: "A página de cada sacramento diz o que levar, quando procurar e como se preparar. O\u00A0pedido chega com os documentos, e a secretaria vê tudo numa caixa só, com a situação de cada\u00A0um.",
    points: ["Observação em destaque: “procure com seis meses de antecedência”", "Documentos por foto ou PDF, guardados em local privado", "Cada pedido com situação e histórico de quem abriu"],
    ask: "O que preciso levar para o batismo do meu\u00A0filho?",
    screen: "request",
  },
  {
    verb: "Catequese",
    href: "/vida-paroquial#catequese",
    title: "Inscrição online nas turmas, vagas à vista e a chamada no celular do\u00A0catequista.",
    story: "Os pais inscrevem pelo celular, uma pergunta por vez. Pela\u00A0idade, o sistema sugere o ano; a turma mostra as vagas; a certidão vai por foto. Cada\u00A0catequista entra com o próprio login, vê a sua turma e faz a\u00A0chamada.",
    points: ["Rematrícula reconhecida pelo celular do responsável", "Lista de espera sozinha quando a turma lota", "Chamada no celular do catequista"],
    ask: "Tem vaga na catequese para minha filha de 9\u00A0anos?",
    screen: "enrollment",
  },
  {
    verb: "Dízimo",
    href: "/administracao#dizimo",
    title: "Cadastre a chave PIX uma vez e ofereça essa facilidade a quem deseja\u00A0contribuir.",
    story: "A paróquia informa a chave, o QR Code, o nome de quem recebe e o banco. O\u00A0fiel copia a chave ou lê o QR Code no fim da missa, e o dinheiro vai direto para a conta da\u00A0paróquia.",
    points: ["QR Code e “copia e cola”", "Sem intermediário e sem taxa", "Só a administração altera a chave, com registro"],
    ask: "Qual é a chave PIX da\u00A0paróquia?",
    screen: "pix",
  },
  {
    verb: "Agenda semanal",
    href: "/comunicacao#agenda-semanal",
    title: "A semana da paróquia sempre em dia, e cada aviso sai do ar na data\u00A0certa.",
    story: "A secretaria cadastra cada evento uma vez, do jeito que ele se repete, e o site monta a programação sozinho. O\u00A0aviso da quermesse sai da página inicial no dia seguinte à festa, sem ninguém precisar\u00A0lembrar.",
    points: ["Eventos que se repetem: “toda terça, 20h”, “primeira quinta do mês”", "Avisos com data para sair do ar", "Novena, retiro, formação, festa do padroeiro"],
    ask: "O que tem na paróquia esta\u00A0semana?",
    screen: "agenda",
  },
  {
    verb: "Pastorais e Ministérios",
    href: "/vida-paroquial#pastorais-e-ministerios",
    title: "Cada pastoral com a sua equipe organizada, e cada coordenador com o próprio\u00A0acesso.",
    story: "Cem grupos prontos para ativar. O\u00A0coordenador do Canto cadastra os músicos; a coordenadora da MESCE, os ministros. Um\u00A0login só, mesmo para quem coordena dois grupos e ainda dá\u00A0catequese.",
    points: ["Página pública do grupo: o que faz e como participar", "Equipe com nome, função e contato", "Acesso restrito à própria equipe"],
    ask: "Como faço para entrar no Ministério de\u00A0Música?",
    screen: "teams",
  },
];

type Screen = "enrollment" | "request" | "teams" | "pix" | "agenda";

export function LandingPage() {
  return (
    <main id="main-content">
      <ScrollProgress />

      <section className="hero hero--brand landing-hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-pattern" aria-hidden="true" />
        <div className="hero-glow hero-glow--rose" aria-hidden="true" />
        <div className="hero-glow hero-glow--blue" aria-hidden="true" />
        <Container className="hero__grid">
          <div className="hero__content">
            <p className="eyebrow eyebrow--light">Site e painel para paróquias</p>
            <h1 id="hero-title">O site da sua paróquia, com um painel simples para manter <em className="hl">horários de missa, dízimo, sacramentos e pastorais em&nbsp;dia.</em></h1>
            <p className="hero-copy hero-copy--light">Você responde algumas perguntas e vê o site pronto. Depois,&nbsp;a secretaria cadastra cada informação uma vez, e ela aparece certa em todo lugar. Feito&nbsp;para pároco, secretaria e&nbsp;coordenadores.</p>
            <div className="hero__actions">
              <a className="button button--gold" href={ONBOARDING_URL}><span>Quero montar o site da minha paróquia</span><span className="button__arrow" aria-hidden="true">→</span></a>
              <Link className="text-link text-link--light" href="#modulos">Conhecer todos os recursos <span aria-hidden="true">→</span></Link>
            </div>
            <p className="hero-microcopy">{CTA.note}</p>
          </div>

          <HeroShowcase />
        </Container>
      </section>

      <section className="section section--ivory steps-strip" id="como-comecar" aria-labelledby="steps-title">
        <Container>
          <Reveal className="steps-strip__head"><p className="eyebrow">Como começar</p><h2 id="steps-title">Três passos, sem precisar de&nbsp;técnico.</h2></Reveal>
          <ol className="steps-strip__list">
            {STEPS.map(([title, text], i) => (
              <Reveal as="li" className="steps-strip__item" delay={i * 80} key={title}><b aria-hidden="true">{i + 1}</b><div><h3>{title}</h3><p>{text}</p></div></Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section section--white" id="como-e-diferente" aria-labelledby="idea-title">
        <Container>
          <div className="idea-intro"><Reveal className="section-heading idea-intro__copy"><p className="eyebrow">A ideia por trás de tudo</p><h2 id="idea-title">Você atualiza a informação. O&nbsp;site cuida das&nbsp;páginas.</h2><p>Num site comum, o horário da missa aparece escrito em vários lugares e cada um precisa ser alterado à mão. Aqui,&nbsp;cada informação da paróquia é cadastrada uma vez. Quando&nbsp;muda, muda em todo lugar onde&nbsp;aparece.</p></Reveal><Reveal className="idea-intro__art" delay={100}><Illustration alt="Uma informação da paróquia é atualizada uma vez e aparece certa em quatro páginas do site." height={900} name="sincronizacao-clara" width={1200} /></Reveal></div>
          <Reveal delay={120}><ScheduleUpdateDemo /></Reveal>
          <Reveal className="idea-cta" delay={160}>
            <p className="idea-cta__lead">Agora imagine isso com os horários da sua&nbsp;paróquia.</p>
            <a className="button button--gold" href={ONBOARDING_URL}><span>{CTA.primary}</span><span className="button__arrow" aria-hidden="true">→</span></a>
            <p className="idea-cta__note">{CTA.note}</p>
          </Reveal>
        </Container>
      </section>

      <section className="section section--ivory" id="verbos" aria-labelledby="verbs-title">
        <Container>
          <Reveal className="section-heading"><p className="eyebrow">Uma plataforma para integrar a comunidade</p><h2 id="verbs-title">Conheça os principais recursos que deixam a sua paróquia mais organizada e próxima dos&nbsp;fiéis.</h2><p>Muito mais que um site: uma plataforma para organizar e comunicar os eventos e os serviços da&nbsp;paróquia. As&nbsp;telas abaixo são exemplos com dados&nbsp;fictícios.</p></Reveal>
          <div className="verb-list">
            {verbs.map((v, i) => {
              return (
                <Reveal as="article" className={`verb-row ${i % 2 ? "verb-row--flip" : ""}`.trim()} key={v.verb}>
                  <div className="verb-row__copy">
                    <span className="verb-row__verb"><i>0{i + 1}</i> {v.verb}</span>
                    <h3>{v.title}</h3>
                    <p>{v.story}</p>
                    <ul className="verb-row__points">{v.points.map((pt) => <li key={pt}><Check aria-hidden="true" size={16} /> {pt}</li>)}</ul>
                    <Link className="text-link" href={v.href}>Saiba mais sobre {v.verb} <span aria-hidden="true">→</span></Link>
                  </div>
                  <div className="verb-row__visual" aria-hidden="true">
                    <div className="ask"><span className="ask__avatar">{v.verb[0]}</span><span className="ask__bubble">{v.ask}</span></div>
                    <VerbScreen kind={v.screen} />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section section--cool section--spots" id="modulos" aria-labelledby="modules-title">
        <Container>
          <Reveal className="section-heading"><p className="eyebrow">Os recursos</p><h2 id="modules-title">Quatro áreas, dezesseis recursos para a vida da&nbsp;paróquia.</h2><p>Celebrações, vida paroquial, comunicação e administração. Cada&nbsp;área tem uma página que explica o que cada recurso faz, com exemplos de&nbsp;verdade.</p></Reveal>
          <Reveal delay={120}><AreasOverview /></Reveal>
          <Reveal className="feature-callout feature-callout--stacked" delay={80}><div><h3>Use só o que fizer&nbsp;sentido.</h3><p>Cada recurso liga e desliga sem apagar nada. A&nbsp;paróquia pequena começa com missas, avisos e contato; a grande liga a catequese, as pastorais e as&nbsp;capelas.</p></div></Reveal>
        </Container>
      </section>

      <section className="section section--white" id="para-quem" aria-labelledby="who-title">
        <Container>
          <Reveal className="section-heading"><p className="eyebrow">Para quem</p><h2 id="who-title">Cada pessoa da paróquia, com o próprio&nbsp;acesso.</h2><p>O pároco acompanha a paróquia inteira; a secretaria recebe pedidos e inscrições; coordenadores e PASCOM cuidam do que é&nbsp;deles.</p></Reveal>
          <ul className="who-grid">
            {AUDIENCE.map((link, i) => (
              <Reveal as="li" delay={i * 60} key={link.href}>
                <Link className="who-card" href={link.href}>
                  <span className="who-card__icon"><ModuleIcon name={link.icon ?? "users"} size={20} /></span>
                  <strong>{link.label}</strong>
                  <span>{link.description}</span>
                  <i aria-hidden="true">Ver a página →</i>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="purpose-band section section--ivory" id="proposito" aria-labelledby="purpose-title">
        <Container className="purpose-band__inner">
          <Reveal><p className="eyebrow">Tecnologia a serviço da comunidade</p><h2 id="purpose-title">Digitalizar é evangelizar para muito mais&nbsp;pessoas.</h2><p>Um site feito para ser encontrado no Google e compartilhado nas redes sociais. Um&nbsp;lugar onde todo mundo acha as informações da paróquia, tira dúvidas e faz&nbsp;inscrições.</p></Reveal>
          <Reveal className="purpose-band__aside" delay={150}><span className="rosette rosette--large" aria-hidden="true" /><blockquote>A tecnologia fica nos bastidores. A&nbsp;comunidade continua no&nbsp;centro.</blockquote></Reveal>
        </Container>
      </section>

      <section className="section section--white" id="condicoes" aria-labelledby="conditions-title">
        <Container>
          <Reveal className="section-heading"><p className="eyebrow">Antes de começar</p><h2 id="conditions-title">O que você precisa saber antes de&nbsp;testar.</h2></Reveal>
          <dl className="conditions-grid">
            {BEFORE_YOU_START.map((item, i) => (
              <Reveal className="conditions-card" delay={(i % 3) * 60} key={item.q}>
                <dt>{item.q}</dt>
                <dd>{item.a}{item.link ? <> <Link className="text-link" href={item.link.href}>{item.link.label} <span aria-hidden="true">→</span></Link></> : null}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      <section className="section section--night section--onboarding" id="comecar" aria-labelledby="start-title">
        <div className="final-cta__pattern" aria-hidden="true" />
        <Container className="onboarding-band">
          <Reveal>
            <p className="eyebrow eyebrow--light">Experimente agora</p>
            <h2 id="start-title">Monte o site da sua paróquia em cerca de 5&nbsp;minutos.</h2>
            <p className="onboarding-band__lead">Responda algumas perguntas sobre sua paróquia e assista em tempo real à criação do site. Publique&nbsp;só se&nbsp;gostar.</p>
            <ul className="onboarding-band__checks">
              <li><Check aria-hidden="true" size={18} /> Não precisa criar conta para experimentar</li>
              <li><Check aria-hidden="true" size={18} /> Teste sem cadastrar cartão de crédito</li>
              <li><Check aria-hidden="true" size={18} /> Utilize apenas os recursos que você quiser</li>
            </ul>
            <div className="hero__actions">
              <a className="button button--gold" href={ONBOARDING_URL}><span>{CTA.primary}</span><span className="button__arrow" aria-hidden="true">→</span></a>
              <a className="text-link text-link--light" href={DEMO_URL} rel="noopener">{CTA.demo} <span aria-hidden="true">→</span></a>
              <Link className="text-link text-link--light" href="/contato">{CTA.talk} <span aria-hidden="true">→</span></Link>
            </div>
          </Reveal>
          <Reveal className="onboarding-mock" delay={160}>
            <div className="onboarding-mock__trail" aria-hidden="true">
              <b>Seu caminho</b>
              {["Nome da paróquia", "Cidade", "Padroeiro", "Igreja e capelas", "Horários de missa", "Contato", "Estilo do site", "Brasão e foto", "Outros locais"].map((step, i) => (
                <span className={i < 2 ? "is-done" : i === 2 ? "is-now" : ""} key={step}><i>{i + 1}</i>{step}</span>
              ))}
            </div>
            <div className="onboarding-mock__card" aria-hidden="true">
              <p className="onboarding-mock__kicker">Pergunta 3 de 9</p>
              <p className="onboarding-mock__q">Quem é o padroeiro da&nbsp;paróquia?</p>
              <div className="onboarding-mock__input">São José<i /></div>
              <div className="onboarding-mock__chips"><span>Nossa Senhora Aparecida</span><span>Santo Antônio</span><span>São Sebastião</span></div>
              <div className="onboarding-mock__actions"><span className="is-primary">Continuar →</span><span>Pular</span></div>
            </div>
            <div className="onboarding-mock__phone" aria-hidden="true"><div><b /><s /><s /><em>Paróquia São José</em></div></div>
          </Reveal>
        </Container>
      </section>

      <section className="section section--white" id="duvidas" aria-labelledby="faq-title">
        <Container className="faq-layout"><Reveal className="section-heading section-heading--compact"><p className="eyebrow">Dúvidas frequentes</p><h2 id="faq-title">O que o pároco e a secretaria costumam&nbsp;perguntar.</h2></Reveal><Reveal delay={120}><FaqAccordion items={faq.map(([question, answer]) => ({ question, answer }))} /></Reveal></Container>
      </section>

      <section className="final-cta section section--night" id="chamada-final" aria-labelledby="final-title">
        <div className="final-cta__pattern" aria-hidden="true" />
        <Container className="narrow-center"><Reveal><p className="eyebrow eyebrow--light">Católico Digital</p><h2 id="final-title">Esta plataforma é para ampliar e organizar a comunicação da sua&nbsp;paróquia.</h2><p>Horários, catequese, sacramentos, pastorais e dízimo organizados, atualizados pela própria paróquia e ao alcance de quem&nbsp;procura.</p><div className="final-cta__actions"><a className="button button--gold" href={ONBOARDING_URL}><span>{CTA.primary}</span><span className="button__arrow" aria-hidden="true">→</span></a><Link className="text-link text-link--light final-cta__secondary" href="/contato">{CTA.talk} <span aria-hidden="true">→</span></Link></div><LiturgyToday /></Reveal></Container>
      </section>
    </main>
  );
}

/** Telas desenhadas em CSS para cada verbo (dados fictícios de uma paróquia de exemplo). */
function VerbScreen({ kind }: { kind: Screen }) {
  if (kind === "agenda") {
    return (
      <div className="vscreen">
        <p className="vscreen__kicker">Esta semana · Paróquia São José</p>
        <div className="vscreen__row"><ModuleIcon name="clock" size={16} /><span>Terça · Grupo de oração</span><b>20h</b></div>
        <div className="vscreen__row"><ModuleIcon name="heart" size={16} /><span>Quinta · Adoração ao Santíssimo</span><b>19h30</b></div>
        <div className="vscreen__row"><ModuleIcon name="bell" size={16} /><span>Domingo · Quermesse</span><b>16h</b></div>
        <div className="vscreen__chips"><span className="is-on">Aviso sai do ar na segunda</span><span>Toda terça, 20h</span></div>
      </div>
    );
  }
  if (kind === "enrollment") {
    return (
      <div className="vscreen">
        <p className="vscreen__kicker">Inscrição recebida</p>
        <p className="vscreen__title">Ana Clara · nº 2027-0041</p>
        <div className="vscreen__chips"><span className="is-on">Eucaristia 1</span><span>Sábado, 9h</span><span>restam 3 vagas</span></div>
        <div className="vscreen__line is-ok"><Check aria-hidden="true" size={14} /> Certidão de batismo enviada pela família</div>
        <div className="vscreen__line"><ModuleIcon name="clock" size={14} /> Aguardando confirmação da secretaria</div>
      </div>
    );
  }
  if (kind === "request") {
    return (
      <div className="vscreen">
        <p className="vscreen__kicker">Pedido de Batismo</p>
        <p className="vscreen__title">Família Oliveira · recebido hoje</p>
        <div className="vscreen__line is-ok"><Check aria-hidden="true" size={14} /> Certidão de nascimento</div>
        <div className="vscreen__line is-ok"><Check aria-hidden="true" size={14} /> Comprovante de residência</div>
        <div className="vscreen__line"><ModuleIcon name="clock" size={14} /> Certidão de crisma dos padrinhos</div>
        <div className="vscreen__chips"><span className="is-on">Em atendimento</span><span>2 de 3 documentos</span></div>
      </div>
    );
  }
  if (kind === "teams") {
    return (
      <div className="vscreen">
        <p className="vscreen__kicker">Minhas equipes · João</p>
        <div className="vscreen__row"><ModuleIcon name="users" size={16} /><span>Ministério de Música</span><b>14 pessoas</b></div>
        <div className="vscreen__row"><ModuleIcon name="users" size={16} /><span>MESCE</span><b>9 pessoas</b></div>
        <div className="vscreen__row"><ModuleIcon name="book" size={16} /><span>Turma Euc. 1&nbsp;· sábado, 9h</span><b>18 crianças</b></div>
        <div className="vscreen__chips"><span className="is-on">Um login só</span><span>Só o que você coordena</span></div>
      </div>
    );
  }
  return (
    <div className="vscreen vscreen--pix">
      <div className="vscreen__qr"><i /><i /><i /><i /></div>
      <div>
        <p className="vscreen__kicker">Dízimo e contribuições</p>
        <p className="vscreen__title">Paróquia São José</p>
        <div className="vscreen__line">Chave PIX: dizimo@paroquiaexemplo.org.br</div>
        <div className="vscreen__chips"><span className="is-on">Copiar chave</span><span>Banco · Agência · Conta</span></div>
      </div>
    </div>
  );
}
