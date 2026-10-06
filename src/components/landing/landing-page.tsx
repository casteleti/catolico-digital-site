import { Check } from "lucide-react";
import Link from "next/link";
import { FaqAccordion } from "@/components/landing/faq-accordion";
import { ScheduleUpdateDemo } from "@/components/landing/schedule-update-demo";
import { Reveal } from "@/components/motion/reveal";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { Illustration } from "@/components/site/illustration";
import { HeroShowcase } from "@/components/site/hero-showcase";
import { LiturgyToday } from "@/components/site/liturgy-today";
import { ModuleIcon } from "@/components/site/module-icon";
import { AreasOverview } from "@/components/site/areas-overview";
import { Container } from "@/components/ui/container";
import { CTA, ONBOARDING_URL } from "@/content/links";
import { AREAS } from "@/content/areas";

const AREA_ITEMS = AREAS.flatMap((a) => a.items);

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
    title: "Imagine a facilidade de oferecer o formulário e todas as instruções de cada\u00A0sacramento.",
    story: "A página de cada sacramento diz o que levar, quando procurar e como se preparar. O\u00A0pedido chega com os documentos, e a secretaria vê tudo numa caixa só, com a situação de cada\u00A0um.",
    points: ["Observação em destaque: “procure com seis meses de antecedência”", "Documentos por foto ou PDF, guardados em local privado", "Cada pedido com situação e histórico de quem abriu"],
    ask: "O que preciso levar para o batismo do meu\u00A0filho?",
    screen: "request",
  },
  {
    verb: "Catequese",
    href: "/vida-paroquial#catequese",
    title: "Inscrição online nas turmas de catequese, gestão dos catequistas e muito\u00A0mais.",
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

const faq: Array<[string, string]> = [
  ["O Católico Digital é só um\u00A0site?", "Não. O\u00A0site é a parte que o fiel vê. Por\u00A0trás dele, a vida da paróquia fica organizada num lugar só: horários, catequese, sacramentos, pastorais, dízimo e avisos. Quando\u00A0algo muda, muda uma\u00A0vez."],
  ["A secretaria precisa entender de\u00A0tecnologia?", "Não. O\u00A0painel fala a língua da paróquia: missa, aviso, turma, catequizando, pastoral. Foi\u00A0feito para quem atende a comunidade todos os dias, no WhatsApp, no Direct e na\u00A0secretaria."],
  ["Como funciona a inscrição da\u00A0catequese?", "Os pais inscrevem pelo celular, uma pergunta por tela. Pela\u00A0data de nascimento o sistema sugere o ano, mostra os horários com vaga e entrega o número da inscrição. Os\u00A0documentos vão por foto, pelo link da família. Quem\u00A0não tem celular é inscrito pela secretaria no\u00A0balcão."],
  ["E o dízimo? Vocês\u00A0processam\u00A0pagamento?", "Não, e isso é de propósito. A\u00A0paróquia cadastra a chave PIX, o QR Code, o nome de quem recebe e o banco na página do dízimo. O\u00A0dinheiro vai direto para a conta da paróquia, sem intermediário e sem\u00A0taxa."],
  ["O catequista e o coordenador de pastoral precisam de outro\u00A0sistema?", "Não. Cada\u00A0um entra com o próprio login e vê só o que coordena: a turma, a equipe. Quem\u00A0coordena duas coisas vê as duas no mesmo\u00A0lugar."],
  ["Funciona com matriz e várias\u00A0capelas?", "Sim. Cada\u00A0comunidade tem endereço, horários e eventos próprios, na mesma estrutura. A\u00A0paróquia pequena usa só a\u00A0matriz."],
  ["Nossa paróquia já tem site. Dá\u00A0para\u00A0trocar?", "Sim. O\u00A0Católico Digital toma o lugar do site atual e organiza o que hoje está espalhado. A\u00A0transição é combinada com cada\u00A0paróquia."],
  ["O Católico Digital substitui o Instagram e o\u00A0WhatsApp?", "Não. Eles\u00A0continuam espalhando a mensagem. O\u00A0Católico Digital é onde a informação oficial mora, e para onde esses canais\u00A0apontam."],
  ["Podemos usar o nosso\u00A0domínio?", "A estrutura prevê domínio próprio. Os\u00A0detalhes são definidos na\u00A0implantação."],
  ["Quanto\u00A0custa?", "Os valores são apresentados na conversa com cada paróquia, de acordo com a estrutura e os módulos que fizerem\u00A0sentido."],
];

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
            <p className="eyebrow eyebrow--light">Plataforma para paróquias</p>
            <h1 id="hero-title">Organize sua paróquia: <em className="hl">horários de missa, dízimo, sacramentos e gestão das&nbsp;pastorais.</em></h1>
            <p className="hero-copy hero-copy--light">Uma estrutura criada por católicos que vivem o dia a dia de uma comunidade. Facilidade&nbsp;e produtividade para quem serve: pároco, secretaria e&nbsp;coordenadores.</p>
            <div className="hero__actions">
              <a className="button button--gold" href={ONBOARDING_URL}><span>Quero montar o site em 5 minutos</span><span className="button__arrow" aria-hidden="true">→</span></a>
              <Link className="text-link text-link--light" href="#modulos">Conhecer todos os recursos <span aria-hidden="true">→</span></Link>
            </div>
            <p className="hero-microcopy">{CTA.note}</p>
          </div>

          <HeroShowcase />
        </Container>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...AREA_ITEMS, ...AREA_ITEMS].map((m, i) => (
            <span className="marquee__item" key={`${m.id}-${i}`}><ModuleIcon name={m.icon} size={16} /> {m.label}</span>
          ))}
        </div>
      </div>

      <section className="section section--ivory" id="verbos" aria-labelledby="verbs-title">
        <Container>
          <Reveal className="section-heading"><p className="eyebrow">Uma plataforma para integrar a comunidade</p><h2 id="verbs-title">Conheça os principais recursos que deixam a sua paróquia mais organizada e próxima dos&nbsp;fiéis.</h2><p>Muito mais que um site: uma plataforma para organizar e comunicar os eventos e os serviços da&nbsp;paróquia.</p></Reveal>
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

      <section className="section section--white" id="como-e-diferente" aria-labelledby="idea-title">
        <Container>
          <div className="idea-intro"><Reveal className="section-heading idea-intro__copy"><p className="eyebrow">A ideia por trás de tudo</p><h2 id="idea-title">Você atualiza a informação. O&nbsp;site cuida das&nbsp;páginas.</h2><p>Num site comum, o horário da missa aparece escrito em vários lugares e cada um precisa ser alterado à mão. Aqui,&nbsp;cada informação da paróquia é cadastrada uma vez. Quando&nbsp;muda, muda em todo lugar onde&nbsp;aparece.</p></Reveal><Reveal className="idea-intro__art" delay={100}><Illustration alt="Uma informação da paróquia é atualizada uma vez e aparece certa em quatro páginas do site." height={900} name="sincronizacao-clara" width={1200} /></Reveal></div>
          <Reveal delay={120}><ScheduleUpdateDemo /><p className="schedule-update-demo__caption">Você não precisa pensar em quais páginas mexer. Só&nbsp;no que&nbsp;mudou.</p></Reveal>
        </Container>
      </section>

      <section className="section section--cool section--spots" id="modulos" aria-labelledby="modules-title">
        <Container>
          <Reveal className="section-heading"><p className="eyebrow">Os recursos</p><h2 id="modules-title">Quatro áreas, dezesseis recursos para a vida da&nbsp;paróquia.</h2><p>Celebrações, vida paroquial, comunicação e administração. Cada&nbsp;área tem uma página que explica o que cada recurso faz, com exemplos de&nbsp;verdade.</p></Reveal>
          <Reveal delay={120}><AreasOverview /></Reveal>
          <Reveal className="feature-callout feature-callout--stacked" delay={80}><div><h3>Use só o que fizer&nbsp;sentido.</h3><p>Cada recurso liga e desliga sem apagar nada. A&nbsp;paróquia pequena começa com missas, avisos e contato; a grande liga a catequese, as pastorais e as&nbsp;capelas.</p></div></Reveal>
        </Container>
      </section>

      <section className="purpose-band section section--white" id="proposito" aria-labelledby="purpose-title">
        <Container className="purpose-band__inner">
          <Reveal><p className="eyebrow">Tecnologia a serviço da comunidade</p><h2 id="purpose-title">Digitalizar é evangelizar para muito mais&nbsp;pessoas.</h2><p>Imagine um site moderno, feito para ser encontrado no Google, compartilhado nas redes sociais e entendido pelas inteligências artificiais. Um&nbsp;lugar onde todo mundo acha as informações da paróquia, tira dúvidas, faz inscrições e muito&nbsp;mais.</p></Reveal>
          <Reveal className="purpose-band__aside" delay={150}><span className="rosette rosette--large" aria-hidden="true" /><blockquote>A tecnologia fica nos bastidores. A&nbsp;comunidade continua no&nbsp;centro.</blockquote></Reveal>
        </Container>
      </section>

      <section className="section section--night section--onboarding" id="comecar" aria-labelledby="start-title">
        <div className="final-cta__pattern" aria-hidden="true" />
        <Container className="onboarding-band">
          <Reveal>
            <p className="eyebrow eyebrow--light">Experimente agora</p>
            <h2 id="start-title">Monte o site da sua paróquia em 5&nbsp;minutos.</h2>
            <p className="onboarding-band__lead">Responda algumas perguntas sobre sua paróquia e assista em tempo real à criação do site. Publique&nbsp;só se&nbsp;gostar.</p>
            <ul className="onboarding-band__checks">
              <li><Check aria-hidden="true" size={18} /> Não precisa criar conta para experimentar</li>
              <li><Check aria-hidden="true" size={18} /> Teste sem cadastrar cartão de crédito</li>
              <li><Check aria-hidden="true" size={18} /> Utilize apenas os recursos que você quiser</li>
            </ul>
            <div className="hero__actions">
              <a className="button button--gold" href={ONBOARDING_URL}><span>{CTA.primary}</span><span className="button__arrow" aria-hidden="true">→</span></a>
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
        <Container className="narrow-center"><Reveal><p className="eyebrow eyebrow--light">Católico Digital</p><h2 id="final-title">Sua paróquia já faz tudo isso. Só&nbsp;não num lugar&nbsp;só.</h2><p>Horários, catequese, sacramentos, pastorais e dízimo organizados, atualizados pela própria paróquia e ao alcance de quem&nbsp;procura.</p><div className="final-cta__actions"><a className="button button--gold" href={ONBOARDING_URL}><span>{CTA.primary}</span><span className="button__arrow" aria-hidden="true">→</span></a><Link className="text-link text-link--light final-cta__secondary" href="/contato">{CTA.talk} <span aria-hidden="true">→</span></Link></div><LiturgyToday /></Reveal></Container>
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
