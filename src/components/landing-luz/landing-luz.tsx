import Link from "next/link";
import { LeadFormLuz } from "@/components/landing-luz/lead-form-luz";

/**
 * Opção B — "Luz". Segunda proposta visual da landing, pensada para quem chega
 * do Instagram pelo celular: fundo claro, o produto no celular como imagem de
 * herói, botão de conversa fixo no rodapé (alcance do polegar), seções curtas,
 * arcos no lugar da rosácea, dourado só em detalhe. A copy já incorpora a
 * revisão de 26/09 (Docs/marketing/revisao-copy-landing-2026-09-26.md).
 *
 * Não interfere na opção A: usa só classes `lz-*` (src/styles/landing-luz.css)
 * e vive fora do grupo de rotas (site).
 */

function Check() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

function BrandLuz() {
  return (
    <span className="lz-brand">
      <span className="lz-brand__symbol" aria-hidden="true"><span /></span>
      <span className="lz-brand__name"><strong>Católico</strong> <em>Digital</em></span>
    </span>
  );
}

const perguntas = ["“Que horas é a missa de domingo?”", "“Como faço para batizar meu filho?”", "“A secretaria abre no sábado?”"];

const recursos: Array<[string, string]> = [
  ["Missas e horários especiais", "Natal, Semana Santa e festas sem apagar o horário de sempre."],
  ["Confissões e adoração", "Dia, horário e local — por comunidade."],
  ["Sacramentos", "O que é preciso, documentos, preparação e um botão para falar."],
  ["Comunidades e capelas", "Cada uma com horários e endereço próprios."],
  ["Avisos com validade", "Somem sozinhos quando deixam de valer."],
  ["Pastorais, agenda e notícias", "Com “Quero participar”, calendário e fotos."],
];

const paraQuem = [
  "Sua paróquia ainda não tem site.",
  "O site existe, mas está antigo ou ninguém consegue atualizar.",
  "A informação está só nas redes sociais e nos grupos.",
  "A secretaria responde as mesmas perguntas todos os dias.",
  "Quando o pároco ou a secretária mudam, tudo recomeça do zero.",
  "Vocês têm mais de uma comunidade ou capela.",
];

const seguranca: Array<[string, string]> = [
  ["Conexão segura", "Endereço próprio com certificado, cuidado por nós."],
  ["Cópias de segurança", "Diárias, com restauração testada."],
  ["Acesso por função", "A conta é da paróquia; o acesso se transfere quando alguém sai."],
  ["Consentimento", "Inscrições em sacramentos e pastorais só com autorização registrada, conforme a LGPD."],
];

const faq: Array<[string, string]> = [
  ["Quanto custa?", "Trabalhamos com uma implantação assistida e uma mensalidade de custo baixo por paróquia. Os valores dependem do tamanho da paróquia e do número de comunidades, e são apresentados na conversa inicial."],
  ["Quem fica com o acesso quando o pároco ou a secretária mudam?", "A conta é da paróquia. A administração é transferida para a nova pessoa; nada se perde com a saída de alguém."],
  ["Podemos usar nosso próprio endereço na internet?", "Sim. A paróquia pode usar seu endereço próprio ou um endereço em catolico.digital. Nós cuidamos do certificado de segurança."],
  ["Já temos um site. Dá para aproveitar?", "Sim. Analisamos o que existe e reorganizamos o conteúdo na nova estrutura — o conteúdo continua sendo da paróquia."],
  ["É preciso entender de tecnologia?", "Não. O painel usa a linguagem da paróquia (horário, aviso, pastoral), e o que mudar pode ser desfeito."],
];

function PhoneMockup({ large = false }: { large?: boolean }) {
  return (
    <div className={`lz-phone ${large ? "lz-phone--large" : ""}`.trim()} aria-label="Ilustração: página inicial de uma paróquia no celular">
      <div className="lz-phone__top"><span className="lz-phone__parish">Paróquia São José</span><span className="lz-phone__city">Jaboticabal · SP</span></div>
      <div className="lz-phone__masses">
        <span className="lz-phone__label">Próximas missas</span>
        <div><span>Hoje · Matriz</span><strong>19h</strong></div>
        <div><span>Amanhã · Matriz</span><strong>07h</strong></div>
        {large && <div><span>Sábado · Capela São Pedro</span><strong>19h</strong></div>}
      </div>
      <div className="lz-phone__pills"><span className="is-gold">Horários</span><span>Sacramentos</span>{large && <span>Falar</span>}</div>
      <div className="lz-phone__notice">Aviso · Secretaria fechada nesta sexta.<small>válido até 26/09</small></div>
    </div>
  );
}

export function LandingLuz() {
  return (
    <div className="lz-page">
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>

      <header className="lz-header">
        <div className="lz-wrap lz-header__inner">
          <Link href="/luz" aria-label="Católico Digital — início"><BrandLuz /></Link>
          <nav className="lz-nav" aria-label="Navegação principal">
            <a href="#como-funciona">Como funciona</a>
            <a href="#recursos">Recursos</a>
            <a href="#seguranca">Segurança</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>
          <a className="lz-btn lz-btn--small" href="#formulario">Conversar</a>
        </div>
      </header>

      <main id="main-content">
        {/* 1. Herói */}
        <section className="lz-section lz-hero-section" aria-labelledby="lz-hero-title">
          <div className="lz-wrap lz-hero">
            <div className="lz-hero__copy">
              <p className="lz-eyebrow">Para paróquias</p>
              <h1 className="lz-h1" id="lz-hero-title">O site da paróquia que a secretaria consegue manter.</h1>
              <p className="lz-lead">Horários, sacramentos, pastorais e avisos em um só lugar. Mudou a missa? Altere uma vez e o site inteiro se atualiza — sem depender de quem entende de tecnologia.</p>
              <div className="lz-hero__actions">
                <a className="lz-btn" href="#formulario">Quero conversar sobre minha paróquia</a>
                <a className="lz-textlink" href="#como-funciona">Ver como funciona</a>
              </div>
              <p className="lz-micro">Estamos apresentando às primeiras paróquias. Sem compromisso.</p>
            </div>
            <div className="lz-hero__visual">
              <div className="lz-hero__arch" aria-hidden="true" />
              <PhoneMockup large />
            </div>
          </div>
          <p className="lz-wrap lz-caption">Ilustração. Paróquia e cidade fictícias.</p>
        </section>

        {/* 2. Contexto + dado */}
        <section className="lz-section" aria-labelledby="lz-ctx-title">
          <div className="lz-wrap">
            <div className="lz-card lz-context">
              <p className="lz-eyebrow">A comunidade já está no digital</p>
              <h2 className="lz-h2" id="lz-ctx-title">A informação da paróquia também precisa estar.</h2>
              <p className="lz-text">Hoje, horários, eventos, avisos e pastorais ficam espalhados entre redes sociais, grupos de mensagens e cartazes — e desatualizam em lugares diferentes.</p>
              <div className="lz-stat">
                <span className="lz-stat__number">&lt; ½</span>
                <span className="lz-stat__text">das paróquias da Arquidiocese de São Paulo tem site próprio.<small>Levantamento próprio, set/2026, páginas da arquisp.org.br.</small></span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Mecanismo */}
        <section className="lz-section lz-dark" id="como-funciona" aria-labelledby="lz-mec-title">
          <div className="lz-wrap lz-mec">
            <div className="lz-mec__copy">
              <p className="lz-eyebrow lz-eyebrow--gold">Como funciona</p>
              <h2 className="lz-h2" id="lz-mec-title">Mude uma vez. Tudo se atualiza.</h2>
              <p className="lz-text lz-text--light">Cada informação existe uma única vez: a missa de domingo, a Pastoral Familiar, a festa do padroeiro. O site inteiro lê essa mesma informação.</p>
              <p className="lz-text lz-text--light lz-mec__note">Nada de mexer em quatro lugares. Você cuida do conteúdo; o Católico Digital cuida de onde ele aparece.</p>
            </div>
            <div className="lz-mec__demo">
              <div className="lz-panel">
                <span className="lz-panel__label">Painel · Missa dominical</span>
                <div className="lz-panel__row">
                  <span className="lz-panel__field">Horário</span>
                  <span className="lz-chip lz-chip--old">19:00</span>
                  <span className="lz-arrow" aria-hidden="true">→</span>
                  <span className="lz-chip lz-chip--new">18:30</span>
                  <span className="lz-panel__save">Salvar</span>
                </div>
              </div>
              <div className="lz-targets">
                {["Página inicial", "Horários", "Agenda", "Busca"].map((t) => (
                  <div className="lz-target" key={t}><span>{t}</span><strong>Domingo · 18h30</strong></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Perguntas */}
        <section className="lz-section" aria-labelledby="lz-perg-title">
          <div className="lz-wrap">
            <p className="lz-eyebrow">Uma realidade muito comum</p>
            <h2 className="lz-h2" id="lz-perg-title">As perguntas que chegam todo dia à secretaria.</h2>
            <div className="lz-arches">
              {perguntas.map((q) => <div className="lz-arch" key={q}>{q}</div>)}
            </div>
            <p className="lz-text">Quando a informação da paróquia está organizada em um só lugar, ela responde sozinha — e a secretaria ganha tempo para o que só uma pessoa faz.</p>
          </div>
        </section>

        {/* 5. Recursos */}
        <section className="lz-section lz-section--flush" id="recursos" aria-labelledby="lz-rec-title">
          <div className="lz-wrap">
            <p className="lz-eyebrow">A paróquia escolhe o que usa</p>
            <h2 className="lz-h2" id="lz-rec-title">Tudo o que a comunidade procura, no lugar certo.</h2>
            <p className="lz-text lz-only-mobile">Deslize para ver os recursos. Cada um pode ser ligado ou desligado.</p>
          </div>
          <div className="lz-row" role="list">
            {recursos.map(([title, copy]) => (
              <div className="lz-row__card" role="listitem" key={title}><strong>{title}</strong><span>{copy}</span></div>
            ))}
          </div>
          <div className="lz-wrap"><div className="lz-callout"><strong>Use só o que fizer sentido.</strong> Desligar um recurso nunca apaga o que já foi cadastrado.</div></div>
        </section>

        {/* 6. Exceção de horário */}
        <section className="lz-section" aria-labelledby="lz-exc-title">
          <div className="lz-wrap lz-two">
            <div className="lz-card lz-exception">
              <p className="lz-eyebrow">Horários especiais</p>
              <h2 className="lz-h3" id="lz-exc-title">Na véspera de Natal, a missa é às 20h. O site sabe.</h2>
              <div className="lz-cal" aria-hidden="true">
                {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => <span className="lz-cal__dow" key={`${d}-${i}`}>{d}</span>)}
                {[20, 21, 22, 23, 24, 25, 26].map((n) => <span className={`lz-cal__day ${n === 24 ? "is-exception" : ""} ${n === 20 ? "is-sunday" : ""}`.trim()} key={n}>{n}</span>)}
              </div>
              <div className="lz-times">
                <div><span>Todo domingo</span><strong>19h</strong></div>
                <div className="is-gold"><span>Só em 24/12</span><strong>20h</strong></div>
              </div>
              <p className="lz-text">Você informa a exceção da data. O horário de sempre continua intacto — e quem consultar naquele dia vê o horário certo.</p>
            </div>

            {/* 7. Assistente */}
            <div className="lz-card lz-assist" aria-labelledby="lz-ia-title">
              <p className="lz-eyebrow">Atalho por conversa <span className="lz-tag">Em desenvolvimento</span></p>
              <h2 className="lz-h3" id="lz-ia-title">Escreva como falaria com alguém da equipe.</h2>
              <div className="lz-chat">
                <div className="lz-bubble lz-bubble--me">A missa de domingo passou das 19h para as 18h30.</div>
                <div className="lz-bubble">Encontrei a missa dominical das 19h. Alterar para 18h30?
                  <div className="lz-bubble__actions"><span className="is-confirm">Confirmar</span><span>Cancelar</span></div>
                </div>
                <div className="lz-bubble">Pronto. O site está atualizado.</div>
              </div>
              <p className="lz-text">O assistente mostra o que entendeu e pede a sua confirmação antes de qualquer alteração. Nada muda sem o seu “sim”.</p>
            </div>
          </div>
        </section>

        {/* 8. Para quem é */}
        <section className="lz-section" id="para-quem" aria-labelledby="lz-quem-title">
          <div className="lz-wrap">
            <div className="lz-card lz-card--ice lz-who">
              <div>
                <p className="lz-eyebrow">Será que é para a minha paróquia?</p>
                <h2 className="lz-h2" id="lz-quem-title">Faz sentido especialmente se…</h2>
              </div>
              <ul className="lz-checklist">
                {paraQuem.map((item) => <li key={item}><Check />{item}</li>)}
              </ul>
              <a className="lz-btn" href="#formulario">Quero conversar sobre minha paróquia</a>
            </div>
          </div>
        </section>

        {/* 9. Segurança */}
        <section className="lz-section" id="seguranca" aria-labelledby="lz-seg-title">
          <div className="lz-wrap">
            <p className="lz-eyebrow">Responsabilidade com os dados</p>
            <h2 className="lz-h2" id="lz-seg-title">Informações da comunidade merecem cuidado.</h2>
            <div className="lz-security">
              {seguranca.map(([title, copy]) => <div className="lz-security__row" key={title}><strong>{title}</strong><span>{copy}</span></div>)}
            </div>
          </div>
        </section>

        {/* 10. Lançamento + formulário */}
        <section className="lz-section" id="formulario" aria-labelledby="lz-form-title">
          <div className="lz-wrap lz-two lz-two--form">
            <div>
              <p className="lz-eyebrow">Lançamento</p>
              <h2 className="lz-h2" id="lz-form-title">Quer ser uma das primeiras paróquias a conhecer?</h2>
              <p className="lz-text">Deixe seus dados. Entramos em contato para entender a sua realidade e apresentar a proposta com calma.</p>
              <ul className="lz-checklist lz-checklist--compact">
                <li><Check />Conheça a proposta antes do lançamento público.</li>
                <li><Check />Converse sobre a realidade da sua paróquia.</li>
                <li><Check />Receba as condições e a disponibilidade.</li>
              </ul>
            </div>
            <div className="lz-card lz-formcard"><LeadFormLuz /></div>
          </div>
        </section>

        {/* 11. Dúvidas */}
        <section className="lz-section" id="duvidas" aria-labelledby="lz-faq-title">
          <div className="lz-wrap lz-faqwrap">
            <p className="lz-eyebrow">Dúvidas frequentes</p>
            <h2 className="lz-h2" id="lz-faq-title">O que você talvez queira saber.</h2>
            <div className="lz-faq">
              {faq.map(([q, a], i) => (
                <details className="lz-faq__item" key={q} open={i === 0}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="lz-footer">
        <div className="lz-wrap lz-footer__inner">
          <BrandLuz />
          <p>Tecnologia humana para paróquias.</p>
          <div className="lz-footer__links"><a href="#formulario">Contato</a><Link href="/privacidade">Privacidade</Link><span>© {new Date().getFullYear()} Católico Digital</span></div>
        </div>
      </footer>

      <div className="lz-sticky">
        <a className="lz-btn lz-btn--full" href="#formulario">Quero conversar sobre minha paróquia</a>
        <span>Sem compromisso.</span>
      </div>
    </div>
  );
}
