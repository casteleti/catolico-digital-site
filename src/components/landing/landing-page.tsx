import {
  BookOpen,
  CalendarDays,
  Check,
  Church,
  Clock3,
  FileText,
  Globe,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Newspaper,
  RefreshCcw,
  ShieldCheck,
  Smartphone,
  Users,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FaqAccordion } from "@/components/landing/faq-accordion";
import { LeadForm } from "@/components/landing/lead-form";
import { ProductTabs } from "@/components/landing/product-tabs";
import { ScheduleUpdateDemo } from "@/components/landing/schedule-update-demo";
import { ScrollProgress } from "@/components/motion/scroll-progress";

type IconType = LucideIcon;
type CardItem = [IconType, string, string];

const problemCards: CardItem[] = [
  [Clock3, "O horário mudou, mas não em todo lugar.", "O Instagram já mostra 18h30. O site ainda diz 19h."],
  [CalendarDays, "O aviso que não sai do ar.", "A festa junina acabou, mas continua na página inicial em setembro."],
  [RefreshCcw, "Cada ajuste depende de alguém.", "Trocar uma informação exige esperar a agência ou o voluntário que sabe mexer no site."],
  [FileText, "A informação ficou numa arte.", "A programação da Semana Santa circulou no WhatsApp e não está em nenhum lugar fácil de achar."],
  [MessageCircle, "As mesmas perguntas, todos os dias.", "A secretaria responde por telefone o que o fiel poderia ver no celular em segundos."],
  [Users, "Quando a pessoa sai, o site para.", "Quem cuidava mudou de pastoral, e ninguém sabe a senha."],
];

const parishRealityCards: CardItem[] = [
  [Church, "Matriz e capelas.", "Cada comunidade com endereço, horários e eventos próprios, sem confusão."],
  [CalendarDays, "Novena, retiro, festa do padroeiro.", "Eventos organizados na agenda da paróquia."],
  [UsersRound, "Coordenador novo.", "Troque o responsável pela pastoral em um lugar só."],
  [BookOpen, "Sacramentos organizados.", "Orientações, documentos e contatos de batismo, crisma e matrimônio em um só lugar."],
  [MapPin, "Secretaria fácil de achar.", "Horário de atendimento, endereço e WhatsApp sempre à vista do fiel."],
];

const parishResources = [
  { title: "Celebrações", items: ["Horários de missas, confissões e adoração"] },
  { title: "Vida paroquial", items: ["Comunidades e capelas", "Pastorais e movimentos", "Sacramentos: orientações, documentos e contatos"] },
  { title: "Comunicação", items: ["Avisos e comunicados", "Notícias", "Agenda paroquial"] },
  { title: "Atendimento", items: ["Secretaria, endereço e horários de atendimento", "Contato pelo WhatsApp", "Documentos importantes"] },
  { title: "Contribuição", items: ["Informações de dízimo e chave PIX"] },
];

const communityChanges: CardItem[] = [
  [MessageCircle, "Para a secretaria.", "Atualiza horários e avisos sem depender de ninguém e sem medo de estragar o site."],
  [Church, "Para o pároco.", "Os fiéis encontram informação confiável, e o padre não precisa virar administrador de tecnologia."],
  [Newspaper, "Para a comunicação.", "Agenda, avisos e notícias em um só lugar, coerentes entre si."],
  [UsersRound, "Para o conselho.", "Uma estrutura que continua funcionando quando as pessoas mudam."],
  [Smartphone, "Para o fiel.", "A próxima missa em poucos toques, direto no celular."],
];

const audienceChecklist = [
  "Sua paróquia ainda não tem um site.",
  "O site existe, mas está antigo ou difícil de atualizar.",
  "A maior parte das informações está só nas redes sociais.",
  "Vocês têm matriz e capelas, e os horários são difíceis de organizar.",
  "A secretaria responde repetidamente às mesmas dúvidas.",
  "Quem cuida do site hoje é uma única pessoa.",
  "Vocês querem uma presença digital mais profissional sem aumentar a complexidade.",
];

const comparisonRows = [
  ["Você edita páginas", "Você atualiza informações"],
  ["O mesmo horário escrito em vários lugares", "Cada informação cadastrada uma vez"],
  ["Recursos adaptados com plugins", "Recursos feitos para missas, sacramentos e pastorais"],
  ["Mudanças dependem de quem entende de site", "Painel pensado para a secretaria"],
  ["Estrutura criada do zero", "Estrutura pronta para a paróquia"],
];

const securityCards: CardItem[] = [
  [ShieldCheck, "Controle de acesso.", "As áreas administrativas são protegidas e acessíveis apenas a pessoas autorizadas."],
  [Globe, "Dados separados.", "As informações de cada paróquia ficam isoladas das demais."],
  [RefreshCcw, "Conexão segura.", "HTTPS e infraestrutura configurada com boas práticas."],
  [HeartHandshake, "Privacidade.", "O projeto considera os princípios e requisitos aplicáveis da LGPD."],
];

const faq: Array<[string, string]> = [
  ["O Católico Digital é apenas um site?", "Não. O site é a parte que o fiel vê. Por trás dele, as informações da paróquia ficam organizadas em um só lugar: horários, comunidades, pastorais, sacramentos e avisos. Quando algo muda, a atualização é feita uma vez."],
  ["É necessário entender de tecnologia?", "Não. O painel usa palavras do dia a dia da paróquia, como missa, aviso e pastoral. Foi pensado para que a secretaria consiga atualizar as informações sem precisar entender de sites."],
  ["Nossa paróquia já tem um site. Podemos usar o Católico Digital?", "Sim. O Católico Digital pode assumir o lugar do site atual e organizar as informações que hoje estão espalhadas. A forma de transição é combinada na conversa com cada paróquia."],
  ["Funciona com matriz e várias capelas?", "Sim. Cada comunidade pode ter endereço, horários e eventos próprios, todos organizados na mesma estrutura."],
  ["O site funciona no celular?", "Sim. O site é pensado primeiro para o celular, que é por onde muita gente procura horários, endereço e contato da paróquia."],
  ["Todas as paróquias precisam usar os mesmos recursos?", "Não. Cada recurso pode ser ativado ou desativado conforme a realidade da paróquia. Uma paróquia pequena pode começar com poucos recursos e acrescentar outros depois."],
  ["O Católico Digital substitui o Instagram e o WhatsApp?", "Não. Eles continuam úteis para divulgar. O Católico Digital é o lugar onde a informação oficial da paróquia fica organizada, e para onde esses canais podem apontar."],
  ["É um sistema financeiro ou de gestão paroquial?", "Não. O foco é organizar e publicar as informações da paróquia para os fiéis. As informações de dízimo e PIX podem ser exibidas no site, mas o Católico Digital não processa pagamentos."],
  ["Podemos usar nosso próprio domínio?", "A estrutura prevê a possibilidade de domínio próprio. Os detalhes são definidos durante a implantação."],
  ["Quanto custa?", "Os valores serão apresentados na conversa com cada paróquia, de acordo com a estrutura e os recursos necessários."],
  ["Existe suporte?", "O modelo de suporte fará parte da modalidade contratada e será explicado antes da contratação."],
];

function IconCard({ icon: Icon, title, copy, className = "" }: { icon: IconType; title: string; copy: string; className?: string }) {
  return <article className={`icon-card ${className}`.trim()}><span className="icon-card__icon"><Icon aria-hidden="true" size={22} strokeWidth={1.7} /></span><h3>{title}</h3><p>{copy}</p></article>;
}

function cards(items: CardItem[]) {
  return items.map(([Icon, title, copy]) => <IconCard key={title} icon={Icon} title={title} copy={copy} />);
}

export function LandingPage() {
  return (
    <main id="main-content">
      <ScrollProgress />

      <section className="hero hero--brand landing-hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-pattern" aria-hidden="true" />
        <Container className="hero__grid">
          <div className="hero__content">
            <p className="eyebrow eyebrow--light">Plataforma digital para paróquias</p>
            <h1 id="hero-title">Mude o horário da missa uma vez. O site inteiro acompanha.</h1>
            <p className="hero-copy hero-copy--light">Horários, comunidades, sacramentos, pastorais e avisos organizados em um só lugar e publicados no site da paróquia. Simples para a secretaria atualizar, fácil para o fiel encontrar.</p>
            <div className="hero__actions">
              <Link className="button button--gold" href="#quero-conhecer"><span>Quero conhecer o Católico Digital</span><span className="button__arrow" aria-hidden="true">→</span></Link>
              <Link className="text-link text-link--light" href="#como-e-diferente"><span className="play-icon" aria-hidden="true">▶</span> Veja como funciona</Link>
            </div>
            <p className="hero-microcopy">Pré-lançamento para as primeiras paróquias · Não é preciso entender de sites</p>
          </div>
          <div className="product-preview product-preview--composed" role="group" aria-label="Prévia ilustrativa do site paroquial no Católico Digital">
            <div className="device-window" aria-hidden="true"><div className="device-window__bar"><span /><span /><span /></div><div className="device-window__screen"><div className="screen-nav" /><div className="screen-hero" /><div className="screen-blocks"><i /><i /><i /></div></div></div>
            <div className="floating-card floating-card--celebration"><Church aria-hidden="true" size={15} /><span>Horário atualizado<strong>Missa de domingo · 18h30</strong></span></div>
            <div className="floating-card floating-card--news"><Newspaper aria-hidden="true" size={15} /><span>Nova notícia<strong>Publicada agora</strong></span></div>
          </div>
        </Container>
      </section>

      <section className="section section--ivory" id="problema" aria-labelledby="problem-title">
        <Container>
          <div className="section-heading"><p className="eyebrow">Uma realidade muito comum</p><h2 id="problem-title">O difícil não é colocar a paróquia na internet. É manter tudo certo depois.</h2><p>A comunidade já está no celular. Mas horários, avisos e eventos costumam ficar espalhados entre Instagram, grupos de WhatsApp, cartazes e um site que ninguém consegue atualizar.</p></div>
          <div className="icon-grid icon-grid--six">{cards(problemCards)}</div>
          <div className="section-note problem-close"><strong>Quando o fiel encontra um horário errado, a confiança vai junto.</strong><span>Foi olhando para essa realidade que nasceu o Católico Digital.</span></div>
        </Container>
      </section>

      <section className="section section--white" id="como-e-diferente" aria-labelledby="idea-title">
        <Container>
          <div className="section-heading"><p className="eyebrow">Conheça o Católico Digital</p><h2 id="idea-title">Você atualiza a informação. O Católico Digital cuida das páginas.</h2><p>Em um site comum, o horário da missa aparece escrito em vários lugares, e cada um precisa ser alterado à mão. No Católico Digital, cada informação da paróquia é cadastrada uma vez só. Quando ela muda, o site passa a mostrar a versão correta onde ela aparece.</p></div>
          <ScheduleUpdateDemo />
          <p className="schedule-update-demo__caption">Você não precisa pensar em quais páginas mexer. Só no que mudou.</p>
          <div className="mini-feature-list idea-seals"><span><Check aria-hidden="true" size={19} /> Tudo em um só lugar</span><span><Check aria-hidden="true" size={19} /> Atualizado pela própria paróquia</span><span><Check aria-hidden="true" size={19} /> Fácil para o fiel encontrar</span></div>
          <Link className="text-link" href="#demonstracao">Ver na prática <span aria-hidden="true">→</span></Link>
        </Container>
      </section>

      <section className="section section--white" id="demonstracao" aria-labelledby="demo-title">
        <Container>
          <div className="section-heading"><p className="eyebrow">Pensado para quem usa</p><h2 id="demo-title">Claro para quem visita. Simples para quem administra.</h2><p>O Católico Digital funciona bem dos dois lados: para quem procura informações e para quem precisa mantê-las atualizadas.</p></div>
          <ProductTabs />
        </Container>
      </section>

      <section className="section section--ivory" id="realidade-paroquial" aria-labelledby="reality-title">
        <Container>
          <div className="section-heading"><p className="eyebrow">Não é apenas mais um template</p><h2 id="reality-title">A vida de uma paróquia não cabe em um site comum.</h2><p>O Católico Digital foi pensado a partir das situações que a secretaria enfrenta toda semana.</p></div>
          <div className="icon-grid icon-grid--six reality-grid">{cards(parishRealityCards)}</div>
        </Container>
      </section>

      <section className="section section--cool" id="recursos" aria-labelledby="features-title">
        <Container>
          <div className="section-heading"><p className="eyebrow">A paróquia escolhe o que precisa</p><h2 id="features-title">Uma estrutura que se adapta à realidade de cada comunidade.</h2><p>Nem toda paróquia precisa das mesmas coisas. O Católico Digital é organizado por recursos que podem ser usados conforme a necessidade.</p></div>
          <div className="resource-groups">{parishResources.map((group) => <article className="resource-group" key={group.title}><span className="icon-card__icon"><Church aria-hidden="true" size={22} /></span><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
          <div className="feature-callout feature-callout--stacked"><div><h3>Use apenas o que fizer sentido.</h3><p>Cada recurso pode ser ativado ou desativado conforme a realidade da paróquia.</p></div></div>
          <p className="resource-identity-note">Brasão, cores e fotos da sua paróquia. A tecnologia é a mesma; a identidade é de vocês.</p>
        </Container>
      </section>

      <section className="section section--white" id="como-funciona" aria-labelledby="steps-title">
        <Container>
          <div className="narrow-center"><p className="eyebrow">Simples desde o começo</p><h2 id="steps-title">Sua paróquia no digital sem transformar isso em um projeto complicado.</h2></div>
          <div className="steps-grid">
            <article className="step"><span className="step__number">01</span><span className="step__icon"><UsersRound aria-hidden="true" size={23} /></span><h3>Conhecemos a paróquia.</h3><p>Conversamos com a secretaria e o pároco para entender horários, comunidades, pastorais e a identidade da paróquia.</p></article>
            <article className="step"><span className="step__number">02</span><span className="step__icon"><HeartHandshake aria-hidden="true" size={23} /></span><h3>Organizamos juntos.</h3><p>Orientamos a paróquia a cadastrar tudo em uma estrutura única, com o brasão, as cores e as fotos da paróquia.</p></article>
            <article className="step"><span className="step__number">03</span><span className="step__icon"><Globe aria-hidden="true" size={23} /></span><h3>Publicamos.</h3><p>Revisamos junto com vocês e colocamos o site no ar, pronto para o celular.</p></article>
            <article className="step"><span className="step__number">04</span><span className="step__icon"><RefreshCcw aria-hidden="true" size={23} /></span><h3>Vocês atualizam.</h3><p>Mudou alguma coisa? A secretaria altera a informação uma vez, pelo painel, sem precisar chamar ninguém.</p></article>
          </div>
        </Container>
      </section>

      <section className="section section--brand" id="para-cada-um" aria-labelledby="benefits-title">
        <Container>
          <div className="section-heading section-heading--light"><p className="eyebrow eyebrow--light">Mais do que um novo site</p><h2 id="benefits-title">Uma presença digital que trabalha a favor de toda a comunidade.</h2></div>
          <div className="icon-grid icon-grid--six benefits-grid community-changes-grid">{cards(communityChanges)}</div>
        </Container>
      </section>

      <section className="section section--ivory" id="para-quem" aria-labelledby="audience-title">
        <Container className="audience-layout">
          <div className="section-heading section-heading--compact"><p className="eyebrow">Será que é para a minha paróquia?</p><h2 id="audience-title">O Católico Digital pode ajudar especialmente se…</h2></div>
          <ul className="check-list">{audienceChecklist.map((item) => <li key={item}><Check size={19} aria-hidden="true" />{item}</li>)}</ul>
          <div className="audience-secondary"><h3>Talvez ainda não seja o que vocês procuram se precisam de…</h3><ul><li>Um sistema financeiro ou de gestão paroquial.</li><li>Um aplicativo próprio.</li><li>Uma agência que produza o conteúdo por vocês.</li></ul></div>
          <Link className="button button--brand" href="#quero-conhecer">Quero conversar sobre minha paróquia <span aria-hidden="true">→</span></Link>
        </Container>
      </section>

      <section className="purpose-band section section--white" id="proposito" aria-labelledby="purpose-title">
        <Container className="purpose-band__inner"><div><p className="eyebrow">Tecnologia a serviço da comunidade</p><h2 id="purpose-title">Digitalizar não significa perder proximidade.</h2><p>O Católico Digital existe para facilitar o que a tecnologia pode organizar: informações, comunicação e acesso.</p></div><blockquote>A tecnologia fica nos bastidores. A comunidade continua no centro.</blockquote></Container>
      </section>

      <section className="section section--brand" id="diferenciais" aria-labelledby="difference-title">
        <Container>
          <div className="section-heading section-heading--light"><p className="eyebrow eyebrow--light">Por que não um site comum?</p><h2 id="difference-title">Criado para a realidade de uma paróquia.</h2><p>Em vez de adaptar uma ferramenta genérica à vida da Igreja, a estrutura já nasce pensando nas informações e na rotina de uma comunidade paroquial.</p></div>
          <div className="comparison-table-wrap"><table className="comparison-table"><thead><tr><th scope="col">Site genérico</th><th scope="col">Católico Digital</th></tr></thead><tbody>{comparisonRows.map(([generic, catholic]) => <tr key={generic}><td data-label="Site genérico">{generic}</td><td data-label="Católico Digital">{catholic}</td></tr>)}</tbody></table></div>
          <div className="comparison-note"><h3>E o Instagram e o WhatsApp?</h3><p>Continuam importantes. Eles espalham a mensagem. O Católico Digital guarda a informação oficial da paróquia, o lugar para onde esses canais podem apontar.</p></div>
        </Container>
      </section>

      <section className="section section--cool" id="seguranca" aria-labelledby="security-title">
        <Container>
          <div className="section-heading"><p className="eyebrow">Responsabilidade digital</p><h2 id="security-title">A presença digital pertence à paróquia, não a quem cuida dela hoje.</h2><p>Padres são transferidos, secretárias mudam, voluntários trocam de pastoral. A estrutura continua, e as informações ficam protegidas.</p></div>
          <div className="icon-grid icon-grid--four">{cards(securityCards)}</div>
          <Link className="text-link" href="/privacidade">Conheça nossa política de privacidade <span aria-hidden="true">→</span></Link>
        </Container>
      </section>

      <section className="section section--ivory" id="quero-conhecer" aria-labelledby="launch-title">
        <Container className="launch-card">
          <div className="section-heading section-heading--compact"><p className="eyebrow">Lançamento</p><h2 id="launch-title">Quer ser uma das primeiras paróquias a usar o Católico Digital?</h2><p>Estamos apresentando o Católico Digital às primeiras comunidades antes do lançamento público. Deixe seus dados para conhecer a proposta e conversar sobre a realidade da sua paróquia.</p></div>
          <div className="launch-benefits"><p><Check size={18} aria-hidden="true" /> Conheça a solução antes do lançamento público.</p><p><Check size={18} aria-hidden="true" /> Converse diretamente sobre a realidade da sua paróquia.</p><p><Check size={18} aria-hidden="true" /> Receba informações sobre condições e disponibilidade.</p></div>
          <div className="form-wrapper"><h3>Conte um pouco sobre sua paróquia.</h3><p>Preencha os dados abaixo e entraremos em contato para apresentar a proposta.</p><LeadForm /></div>
        </Container>
      </section>

      <section className="section section--white" id="duvidas" aria-labelledby="faq-title">
        <Container className="faq-layout"><div className="section-heading section-heading--compact"><p className="eyebrow">Dúvidas frequentes</p><h2 id="faq-title">O que você talvez queira saber antes de conversar conosco.</h2></div><FaqAccordion items={faq.map(([question, answer]) => ({ question, answer }))} /></Container>
      </section>

      <section className="final-cta section section--night" id="chamada-final" aria-labelledby="final-title">
        <div className="final-cta__pattern" aria-hidden="true" />
        <Container className="narrow-center"><p className="eyebrow eyebrow--light">Católico Digital</p><h2 id="final-title">Sua paróquia já produz informação todos os dias.</h2><p>O Católico Digital ajuda a organizá-la, mantê-la atualizada e colocá-la ao alcance de quem procura.</p><div className="final-cta__actions"><Link className="button button--gold" href="#quero-conhecer"><span>Quero conhecer o Católico Digital</span><span className="button__arrow" aria-hidden="true">→</span></Link><Link className="text-link text-link--light final-cta__secondary" href="/contato">Ainda tenho uma dúvida <span aria-hidden="true">→</span></Link></div></Container>
      </section>
    </main>
  );
}
