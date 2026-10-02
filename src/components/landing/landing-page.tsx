import { Check, ClipboardCheck, FileCheck2, Globe, HeartHandshake, Lock, RefreshCcw, ShieldCheck, UsersRound } from "lucide-react";
import Link from "next/link";
import { FaqAccordion } from "@/components/landing/faq-accordion";
import { ScheduleUpdateDemo } from "@/components/landing/schedule-update-demo";
import { Reveal } from "@/components/motion/reveal";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { HeroShowcase } from "@/components/site/hero-showcase";
import { LiturgyToday } from "@/components/site/liturgy-today";
import { ModuleIcon } from "@/components/site/module-icon";
import { ModulesTable } from "@/components/site/modules-table";
import { Container } from "@/components/ui/container";
import { CTA, ONBOARDING_URL } from "@/content/links";
import { MODULES } from "@/content/modules";
import { ROLES } from "@/content/roles";

/**
 * Os quatro verbos da vida paroquial: o que a comunidade faz com a paróquia, e como cada módulo-história
 * resolve. Cada um traz a pergunta que chega ao telefone da secretaria e a tela que a responde.
 */
const verbs: Array<{
  verb: string;
  module: string;
  title: string;
  story: string;
  points: string[];
  ask: string;
  screen: "enrollment" | "request" | "teams" | "pix";
}> = [
  {
    verb: "Inscrever",
    module: "catequese",
    title: "A matrícula da catequese cabe na tela do celular da mãe.",
    story: "Uma pergunta por vez, à noite, depois do trabalho. Pela idade, o sistema sugere o ano; a turma mostra as vagas; a certidão vai por foto. Na secretaria, a inscrição chega pronta para confirmar.",
    points: ["Rematrícula reconhecida pelo celular do responsável", "Lista de espera sozinha quando a turma lota", "Chamada no celular do catequista"],
    ask: "Tem vaga na catequese para minha filha de 9 anos?",
    screen: "enrollment",
  },
  {
    verb: "Pedir",
    module: "sacramentos",
    title: "Quem procura um batismo ou um casamento encontra a resposta antes de ligar.",
    story: "A página de cada sacramento diz o que levar, quando procurar e como se preparar. O pedido chega com os documentos, e a secretaria vê tudo numa caixa só, com a situação de cada um.",
    points: ["Observação em destaque: “procure com seis meses de antecedência”", "Documentos por foto, guardados em local privado", "Cada pedido com situação e histórico de quem abriu"],
    ask: "O que preciso levar para o batismo do meu filho?",
    screen: "request",
  },
  {
    verb: "Servir",
    module: "pastorais-e-ministerios",
    title: "Cada coordenador cuida da própria equipe, com o próprio acesso.",
    story: "Cem grupos prontos para ativar. O coordenador do Canto cadastra os músicos; a coordenadora da MESCE, os ministros. Um login só, mesmo para quem coordena dois grupos e ainda dá catequese.",
    points: ["Página pública do grupo: o que faz e como participar", "Equipe com nome, função e contato", "Acesso restrito à própria equipe"],
    ask: "Como faço para entrar no Ministério de Música?",
    screen: "teams",
  },
  {
    verb: "Partilhar",
    module: "dizimo",
    title: "A chave PIX da paróquia a um toque, sem intermediário e sem taxa.",
    story: "A paróquia cadastra a chave, o QR Code, o nome de quem recebe e o banco. Esse quadro aparece onde houver contribuição: dízimo, taxa da catequese, intenção de missa. O dinheiro vai direto para a conta da paróquia.",
    points: ["QR Code e “copia e cola”", "Só a administração altera a chave, com registro", "Nenhum pagamento processado por nós"],
    ask: "Qual é a chave PIX da paróquia?",
    screen: "pix",
  },
];

const securityCards: Array<[typeof Lock, string, string]> = [
  [Lock, "Dado de fé é dado sensível.", "Inscrição na catequese ou pedido de sacramento revela convicção religiosa. Só é guardado com autorização expressa, e o texto aceito fica registrado."],
  [FileCheck2, "Documentos em local privado.", "Certidões e fotos enviadas pelas famílias não têm endereço público: só a equipe autorizada abre, pelo painel."],
  [ClipboardCheck, "Cada acesso fica registrado.", "Quem abriu a ficha, quem baixou o documento, quem mudou o horário. Com data e valor anterior."],
  [ShieldCheck, "Uma paróquia nunca vê a outra.", "Os dados de cada paróquia ficam isolados no banco, por construção, não por combinação."],
];

const faq: Array<[string, string]> = [
  ["O Católico Digital é só um site?", "Não. O site é a parte que o fiel vê. Por trás dele, a vida da paróquia fica organizada num lugar só: horários, catequese, sacramentos, pastorais, dízimo e avisos. Quando algo muda, muda uma vez."],
  ["A secretaria precisa entender de tecnologia?", "Não. O painel fala a língua da paróquia: missa, aviso, turma, catequizando, pastoral. Foi feito para quem atende o telefone e cuida do balcão."],
  ["Como funciona a inscrição da catequese?", "Os pais inscrevem pelo celular, uma pergunta por tela. Pela data de nascimento o sistema sugere o ano, mostra os horários com vaga e entrega o número da inscrição. Os documentos vão por foto, pelo link da família. Quem não tem celular é inscrito pela secretaria no balcão."],
  ["E o dízimo? Vocês processam pagamento?", "Não, e isso é de propósito. A paróquia cadastra a chave PIX, o QR Code, o nome de quem recebe e o banco, e esse quadro aparece onde houver contribuição. O dinheiro vai direto para a conta da paróquia, sem intermediário e sem taxa."],
  ["O catequista e o coordenador de pastoral precisam de outro sistema?", "Não. Cada um entra com o próprio login e vê só o que coordena: a turma, a equipe. Quem coordena duas coisas vê as duas no mesmo lugar."],
  ["Funciona com matriz e várias capelas?", "Sim. Cada comunidade tem endereço, horários e eventos próprios, na mesma estrutura. A paróquia pequena usa só a matriz."],
  ["Nossa paróquia já tem site. Dá para trocar?", "Sim. O Católico Digital toma o lugar do site atual e organiza o que hoje está espalhado. A transição é combinada com cada paróquia."],
  ["O Católico Digital substitui o Instagram e o WhatsApp?", "Não. Eles continuam espalhando a mensagem. O Católico Digital é onde a informação oficial mora, e para onde esses canais apontam."],
  ["Podemos usar o nosso domínio?", "A estrutura prevê domínio próprio. Os detalhes são definidos na implantação."],
  ["Quanto custa?", "Os valores são apresentados na conversa com cada paróquia, de acordo com a estrutura e os módulos que fizerem sentido."],
];

export function LandingPage() {
  const featured = MODULES.filter((m) => m.featured);
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
            <h1 id="hero-title">A paróquia cuida das pessoas. <em className="hl">O Católico Digital ajuda a aproximá-las.</em></h1>
            <p className="hero-copy hero-copy--light">Horários de missas, catequese, sacramentos e avisos em um só lugar. Sua equipe atualiza com facilidade, e os fiéis encontram o que precisam pelo celular.</p>
            <div className="hero__actions">
              <a className="button button--gold" href={ONBOARDING_URL}><span>{CTA.primary}</span><span className="button__arrow" aria-hidden="true">→</span></a>
              <Link className="text-link text-link--light" href="#modulos">Ver os {MODULES.length} módulos <span aria-hidden="true">→</span></Link>
            </div>
            <p className="hero-microcopy">{CTA.note}</p>
            <LiturgyToday />
          </div>

          <HeroShowcase />
        </Container>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...MODULES, ...MODULES].map((m, i) => (
            <span className="marquee__item" key={`${m.slug}-${i}`}><ModuleIcon name={m.icon} size={16} /> {m.short}</span>
          ))}
        </div>
      </div>

      <section className="section section--ivory" id="verbos" aria-labelledby="verbs-title">
        <Container>
          <Reveal className="section-heading"><p className="eyebrow">O que a comunidade faz com a paróquia</p><h2 id="verbs-title">Inscrever, pedir, servir, partilhar. Agora sem fila, sem papel e sem ligar três vezes.</h2><p>As quatro coisas que mais ocupam a secretaria viram quatro páginas no site e quatro telas no painel. O fiel resolve pelo celular; a secretaria confirma com um toque.</p></Reveal>
          <div className="verb-list">
            {verbs.map((v, i) => {
              const m = MODULES.find((x) => x.slug === v.module)!;
              return (
                <Reveal as="article" className={`verb-row ${i % 2 ? "verb-row--flip" : ""}`.trim()} key={v.verb}>
                  <div className="verb-row__copy">
                    <span className="verb-row__verb"><i>0{i + 1}</i> {v.verb}</span>
                    <h3>{v.title}</h3>
                    <p>{v.story}</p>
                    <ul className="verb-row__points">{v.points.map((pt) => <li key={pt}><Check aria-hidden="true" size={16} /> {pt}</li>)}</ul>
                    <Link className="text-link" href={`/modulos/${m.slug}`}>Ver o módulo {m.short} <span aria-hidden="true">→</span></Link>
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
          <Reveal className="section-heading"><p className="eyebrow">A ideia por trás de tudo</p><h2 id="idea-title">Você atualiza a informação. O site cuida das páginas.</h2><p>Num site comum, o horário da missa aparece escrito em vários lugares e cada um precisa ser alterado à mão. Aqui, cada informação da paróquia é cadastrada uma vez. Quando muda, muda em todo lugar onde aparece.</p></Reveal>
          <Reveal delay={120}><ScheduleUpdateDemo /><p className="schedule-update-demo__caption">Você não precisa pensar em quais páginas mexer. Só no que mudou.</p></Reveal>
        </Container>
      </section>

      <section className="section section--cool section--spots" id="modulos" aria-labelledby="modules-title">
        <Container>
          <Reveal className="section-heading"><p className="eyebrow">Os módulos</p><h2 id="modules-title">{MODULES.length} módulos, cada um feito para uma parte da vida da paróquia.</h2><p>A paróquia liga só o que usa. Quatro deles têm uma página inteira contando a história: Catequese, Sacramentos, Pastorais e Dízimo.</p></Reveal>
          <div className="featured-modules">
            {featured.map((m, i) => (
              <Reveal delay={i * 90} key={m.slug}>
                <Link className="featured-module" href={`/modulos/${m.slug}`}>
                  <span className="featured-module__num">0{i + 1}</span>
                  <span className="icon-card__icon"><ModuleIcon name={m.icon} /></span>
                  <h3>{m.name}</h3>
                  <p>{m.promise}</p>
                  <span className="featured-module__go">Ler a história <span aria-hidden="true">→</span></span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}><ModulesTable compact /></Reveal>
          <Reveal className="feature-callout feature-callout--stacked" delay={80}><div><h3>Use só o que fizer sentido.</h3><p>Cada módulo liga e desliga sem apagar nada. A paróquia pequena começa com missas, avisos e contato; a grande liga a catequese, as pastorais e as capelas.</p></div></Reveal>
        </Container>
      </section>

      <section className="section section--brand section--roles" id="para-quem" aria-labelledby="roles-title">
        <Container>
          <Reveal className="section-heading section-heading--light"><p className="eyebrow eyebrow--light">Para quem</p><h2 id="roles-title">A mesma plataforma, contada para quem vive a paróquia.</h2></Reveal>
          <div className="role-grid">
            {ROLES.map((role, i) => (
              <Reveal delay={i * 80} key={role.slug}>
                <Link className="role-card" href={`/para/${role.slug}`}>
                  <span className="role-card__icon"><ModuleIcon name={role.icon} size={20} /></span>
                  <span className="role-card__menu">{role.menu}</span>
                  <blockquote className="role-card__quote">{role.quote}</blockquote>
                  <p>{role.title}</p>
                  <span className="role-card__go">Ver o que muda <span aria-hidden="true">→</span></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--white" id="como-funciona" aria-labelledby="steps-title">
        <Container>
          <Reveal className="narrow-center"><p className="eyebrow">Simples desde o começo</p><h2 id="steps-title">Sua paróquia no digital sem virar um projeto de tecnologia.</h2></Reveal>
          <div className="steps-grid">
            {[
              [UsersRound, "Conhecemos a paróquia.", "Conversamos com o pároco e a secretaria: horários, comunidades, pastorais, catequese e a identidade da paróquia."],
              [HeartHandshake, "Montamos juntos.", "Tudo cadastrado uma vez, com o brasão, as cores e as fotos de vocês. A catequese e as pastorais já vêm pré-montadas."],
              [Globe, "Publicamos.", "Revisamos com vocês e colocamos no ar, pronto para o celular."],
              [RefreshCcw, "Vocês cuidam.", "Mudou algo? A secretaria altera uma vez, pelo painel. O catequista e o coordenador cuidam do que é deles."],
            ].map(([Icon, title, copy], i) => {
              const StepIcon = Icon as typeof UsersRound;
              return (
                <Reveal as="article" className="step" delay={i * 110} key={title as string}><span className="step__number">0{i + 1}</span><span className="step__icon"><StepIcon aria-hidden="true" size={23} /></span><h3>{title as string}</h3><p>{copy as string}</p></Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section section--cool" id="seguranca" aria-labelledby="security-title">
        <Container>
          <Reveal className="section-heading"><p className="eyebrow">Responsabilidade com os fiéis</p><h2 id="security-title">Quem confia os dados da família à paróquia merece cuidado.</h2><p>Crianças da catequese, noivos, enfermos: a paróquia guarda informações delicadas. O sistema trata isso como a LGPD manda, sem juridiquês para a secretaria.</p></Reveal>
          <div className="icon-grid icon-grid--four">
            {securityCards.map(([Icon, title, copy], i) => (
              <Reveal as="article" className="icon-card" delay={i * 90} key={title}><span className="icon-card__icon"><Icon aria-hidden="true" size={22} strokeWidth={1.7} /></span><h3>{title}</h3><p>{copy}</p></Reveal>
            ))}
          </div>
          <Reveal delay={200}><Link className="text-link" href="/privacidade">Leia a política de privacidade <span aria-hidden="true">→</span></Link></Reveal>
        </Container>
      </section>

      <section className="purpose-band section section--white" id="proposito" aria-labelledby="purpose-title">
        <Container className="purpose-band__inner">
          <Reveal><p className="eyebrow">Tecnologia a serviço da comunidade</p><h2 id="purpose-title">Digitalizar não é perder a proximidade.</h2><p>O Católico Digital organiza o que pode ser organizado: informação, inscrição, comunicação. O encontro, o acolhimento e a catequese continuam sendo das pessoas.</p></Reveal>
          <Reveal className="purpose-band__aside" delay={150}><span className="rosette rosette--large" aria-hidden="true" /><blockquote>A tecnologia fica nos bastidores. A comunidade continua no centro.</blockquote></Reveal>
        </Container>
      </section>

      <section className="section section--night section--onboarding" id="comecar" aria-labelledby="start-title">
        <div className="final-cta__pattern" aria-hidden="true" />
        <Container className="onboarding-band">
          <Reveal>
            <p className="eyebrow eyebrow--light">Experimente agora</p>
            <h2 id="start-title">Monte o site da sua paróquia em 5 minutos. E veja no celular, na hora.</h2>
            <p className="onboarding-band__lead">São nove perguntas sobre a paróquia, nada de tecnologia. A cada resposta, o site aparece ao lado. Quando gostar, você guarda com o seu e-mail; nada vai ao ar sem você mandar.</p>
            <ul className="onboarding-band__checks">
              <li><Check aria-hidden="true" size={18} /> Não precisa criar conta nem senha para começar</li>
              <li><Check aria-hidden="true" size={18} /> Pode pular o que não souber e voltar depois</li>
              <li><Check aria-hidden="true" size={18} /> Catequese, sacramentos e pastorais já vêm pré-montados</li>
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
              <p className="onboarding-mock__q">Quem é o padroeiro da paróquia?</p>
              <div className="onboarding-mock__input">São José<i /></div>
              <div className="onboarding-mock__chips"><span>Nossa Senhora Aparecida</span><span>Santo Antônio</span><span>São Sebastião</span></div>
              <div className="onboarding-mock__actions"><span className="is-primary">Continuar →</span><span>Pular</span></div>
            </div>
            <div className="onboarding-mock__phone" aria-hidden="true"><div><b /><s /><s /><em>Paróquia São José</em></div></div>
          </Reveal>
        </Container>
      </section>

      <section className="section section--white" id="duvidas" aria-labelledby="faq-title">
        <Container className="faq-layout"><Reveal className="section-heading section-heading--compact"><p className="eyebrow">Dúvidas frequentes</p><h2 id="faq-title">O que o pároco e a secretaria costumam perguntar.</h2></Reveal><Reveal delay={120}><FaqAccordion items={faq.map(([question, answer]) => ({ question, answer }))} /></Reveal></Container>
      </section>

      <section className="final-cta section section--night" id="chamada-final" aria-labelledby="final-title">
        <div className="final-cta__pattern" aria-hidden="true" />
        <Container className="narrow-center"><Reveal><p className="eyebrow eyebrow--light">Católico Digital</p><h2 id="final-title">Sua paróquia já faz tudo isso. Só não num lugar só.</h2><p>Horários, catequese, sacramentos, pastorais e dízimo organizados, atualizados pela própria paróquia e ao alcance de quem procura.</p><div className="final-cta__actions"><a className="button button--gold" href={ONBOARDING_URL}><span>{CTA.primary}</span><span className="button__arrow" aria-hidden="true">→</span></a><Link className="text-link text-link--light final-cta__secondary" href="/contato">{CTA.talk} <span aria-hidden="true">→</span></Link></div></Reveal></Container>
      </section>
    </main>
  );
}

/** Telas desenhadas em CSS para cada verbo (dados fictícios de uma paróquia de exemplo). */
function VerbScreen({ kind }: { kind: "enrollment" | "request" | "teams" | "pix" }) {
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
        <div className="vscreen__row"><ModuleIcon name="book" size={16} /><span>Turma Euc. 1 · sábado, 9h</span><b>18 crianças</b></div>
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
