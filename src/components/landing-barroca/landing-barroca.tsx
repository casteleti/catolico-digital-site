import Link from "next/link";
import { LeadFormBarroca } from "@/components/landing-barroca/lead-form-barroca";
import { ArcoHeroi, ArcoMarca, Check } from "@/components/landing-barroca/ornamentos";

/**
 * Opção D — "Barroca", versão limpa (27/09). Mesmo esqueleto e mesma copy da
 * opção B ("Luz"). Primeira versão tinha adamascado, grão, cantoneiras rococó,
 * filetes duplos, numerais romanos, capitular e Cinzel — o Renato achou
 * "cafona, castelo medieval". Ficou: navy profundo + marfim, dourado como
 * acento único e chapado, Cormorant Garamond nos títulos, Poppins no resto,
 * superfícies planas com bordas finas e cantos suaves.
 *
 * Só classes `bq-*` (src/styles/landing-barroca.css). Não toca as opções A e B.
 */

const perguntas = ["Que horas é a missa de domingo?", "Como faço para batizar meu filho?", "A secretaria abre no sábado?"];

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

function Marca() {
  return (
    <span className="bq-brand">
      <ArcoMarca />
      <span className="bq-brand__name">Católico <em>Digital</em></span>
    </span>
  );
}

function Rotulo({ children, claro = false }: { children: React.ReactNode; claro?: boolean }) {
  return (
    <p className={`bq-eyebrow ${claro ? "bq-eyebrow--claro" : ""}`.trim()}>
      <span>{children}</span>
    </p>
  );
}

function Celular({ grande = false }: { grande?: boolean }) {
  return (
    <div className={`bq-phone ${grande ? "bq-phone--grande" : ""}`.trim()} aria-label="Ilustração: página inicial de uma paróquia no celular">
      <div className="bq-phone__top"><span className="bq-phone__parish">Paróquia São José</span><span className="bq-phone__city">Jaboticabal · SP</span></div>
      <div className="bq-phone__masses">
        <span className="bq-phone__label">Próximas missas</span>
        <div><span>Hoje · Matriz</span><strong>19h</strong></div>
        <div><span>Amanhã · Matriz</span><strong>07h</strong></div>
        {grande && <div><span>Sábado · Capela São Pedro</span><strong>19h</strong></div>}
      </div>
      <div className="bq-phone__pills"><span className="is-dark">Horários</span><span>Sacramentos</span>{grande && <span>Falar</span>}</div>
      <div className="bq-phone__notice">Aviso · Secretaria fechada nesta sexta.<small>válido até 26/09</small></div>
      {grande && <div className="bq-phone__agenda"><span>Festa de São José · 19 mar</span><em>agenda</em></div>}
    </div>
  );
}

export function LandingBarroca() {
  return (
    <div className="bq-page">
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>

      <header className="bq-header">
        <div className="bq-wrap bq-header__inner">
          <Link href="/barroca" aria-label="Católico Digital — início" className="bq-header__brand"><Marca /></Link>
          <nav className="bq-nav" aria-label="Navegação principal">
            <a href="#como-funciona">Como funciona</a>
            <a href="#recursos">Recursos</a>
            <a href="#seguranca">Segurança</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>
          <a className="bq-btn bq-btn--outline bq-btn--small bq-header__cta" href="#formulario">Conversar</a>
          <a className="bq-btn bq-btn--gold bq-header__cta-desktop" href="#formulario">Quero conversar sobre minha paróquia</a>
        </div>
      </header>

      <main id="main-content">
        {/* 1. Herói */}
        <section className="bq-section bq-dark bq-hero-section" aria-labelledby="bq-hero-title">
          <div className="bq-wrap bq-hero">
            <div className="bq-hero__copy">
              <Rotulo claro>Para paróquias</Rotulo>
              <h1 className="bq-h1" id="bq-hero-title">O site da paróquia que a <em>secretaria</em> consegue manter.</h1>
              <p className="bq-lead">Horários, sacramentos, pastorais e avisos em um só lugar. Mudou a missa? Altere uma vez e o site inteiro se atualiza — sem depender de quem entende de tecnologia.</p>
              <div className="bq-hero__actions">
                <a className="bq-btn bq-btn--gold" href="#formulario">Quero conversar sobre minha paróquia</a>
                <a className="bq-textlink" href="#como-funciona">Ver como funciona</a>
              </div>
              <p className="bq-micro">Estamos apresentando às primeiras paróquias. Sem compromisso.</p>
            </div>
            <div className="bq-hero__visual">
              <ArcoHeroi />
              <div className="bq-moldura">
                <Celular grande />
              </div>
            </div>
          </div>
          <p className="bq-wrap bq-caption">Ilustração. Paróquia e cidade fictícias.</p>
        </section>

        {/* 2. Contexto + dado */}
        <section className="bq-section bq-paper" aria-labelledby="bq-ctx-title">
          <div className="bq-wrap bq-context">
            <div className="bq-context__text">
              <Rotulo>A comunidade já está no digital</Rotulo>
              <h2 className="bq-h2" id="bq-ctx-title">A informação da paróquia também precisa estar.</h2>
              <p className="bq-text">Hoje, horários, eventos, avisos e pastorais ficam espalhados entre redes sociais, grupos de mensagens e cartazes — e desatualizam em lugares diferentes. Quem procura encontra três versões da mesma missa.</p>
            </div>
            <div className="bq-quadro bq-stat">
              <span className="bq-stat__number">&lt; ½</span>
              <span className="bq-stat__text">das paróquias da Arquidiocese de São Paulo tem site próprio.<small>Levantamento próprio, set/2026, páginas da arquisp.org.br.</small></span>
            </div>
          </div>
        </section>

        {/* 3. Mecanismo */}
        <section className="bq-section bq-dark" id="como-funciona" aria-labelledby="bq-mec-title">
          <div className="bq-wrap bq-mec">
            <div className="bq-mec__copy">
              <Rotulo claro>Como funciona</Rotulo>
              <h2 className="bq-h2" id="bq-mec-title">Mude <em>uma</em> vez. Tudo se atualiza.</h2>
              <p className="bq-text bq-text--claro">Cada informação existe uma única vez: a missa de domingo, a Pastoral Familiar, a festa do padroeiro. O site inteiro lê essa mesma informação.</p>
              <p className="bq-cita">Nada de mexer em quatro lugares. Você cuida do conteúdo; o Católico Digital cuida de onde ele aparece.</p>
            </div>
            <div className="bq-mec__demo">
              <div className="bq-painel">
                <span className="bq-painel__label">Painel · Missa dominical</span>
                <div className="bq-painel__row">
                  <span className="bq-painel__field">Horário</span>
                  <span className="bq-chip bq-chip--old">19:00</span>
                  <span className="bq-arrow" aria-hidden="true">→</span>
                  <span className="bq-chip bq-chip--new">18:30</span>
                  <span className="bq-painel__save">Salvar</span>
                </div>
              </div>
              <div className="bq-targets">
                {["Página inicial", "Horários", "Agenda", "Busca"].map((t) => (
                  <div className="bq-target" key={t}><span>{t}</span><strong>Domingo · 18h30</strong></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Perguntas */}
        <section className="bq-section bq-paper" aria-labelledby="bq-perg-title">
          <div className="bq-wrap">
            <Rotulo>Uma realidade muito comum</Rotulo>
            <h2 className="bq-h2" id="bq-perg-title">As perguntas que chegam todo dia à secretaria.</h2>
            <div className="bq-perguntas">
              {perguntas.map((q) => (
                <div className="bq-quadro bq-pergunta" key={q}>“{q}”</div>
              ))}
            </div>
            <p className="bq-text">Quando a informação da paróquia está organizada em um só lugar, ela responde sozinha — e a secretaria ganha tempo para o que só uma pessoa faz.</p>
          </div>
        </section>

        {/* 5. Recursos */}
        <section className="bq-section bq-dark bq-section--flush" id="recursos" aria-labelledby="bq-rec-title">
          <div className="bq-wrap">
            <Rotulo claro>A paróquia escolhe o que usa</Rotulo>
            <h2 className="bq-h2" id="bq-rec-title">Tudo o que a comunidade procura, no lugar certo.</h2>
            <p className="bq-text bq-text--claro bq-only-mobile">Deslize para ver os recursos. Cada um pode ser ligado ou desligado.</p>
          </div>
          <div className="bq-row" role="list">
            {recursos.map(([title, copy], i) => (
              <div className="bq-row__card" role="listitem" key={title}><span className="bq-row__num">{String(i + 1).padStart(2, "0")}</span><strong>{title}</strong><span>{copy}</span></div>
            ))}
          </div>
          <div className="bq-wrap"><div className="bq-callout"><strong>Use só o que fizer sentido.</strong> Desligar um recurso nunca apaga o que já foi cadastrado.</div></div>
        </section>

        {/* 6. Exceção de horário */}
        <section className="bq-section bq-paper" aria-labelledby="bq-exc-title">
          <div className="bq-wrap bq-duas">
            <div>
              <Rotulo>Horários especiais</Rotulo>
              <h2 className="bq-h2" id="bq-exc-title">Na véspera de Natal, a missa é às 20h. <em>O site sabe.</em></h2>
              <p className="bq-text">Você informa a exceção da data. O horário de sempre continua intacto — e quem consultar naquele dia vê o horário certo.</p>
            </div>
            <div className="bq-quadro bq-calendario">
              <div className="bq-cal" aria-hidden="true">
                {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => <span className="bq-cal__dow" key={`${d}-${i}`}>{d}</span>)}
                {[20, 21, 22, 23, 24, 25, 26].map((n) => <span className={`bq-cal__day ${n === 24 ? "is-exception" : ""} ${n === 20 ? "is-sunday" : ""}`.trim()} key={n}>{n}</span>)}
              </div>
              <div className="bq-times">
                <div><span>Todo domingo</span><strong>19h</strong></div>
                <div className="is-dark"><span>Só em 24/12</span><strong>20h</strong></div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Assistente */}
        <section className="bq-section bq-dark" aria-labelledby="bq-ia-title">
          <div className="bq-wrap bq-duas">
            <div>
              <Rotulo claro>Atalho por conversa <span className="bq-tag">em desenvolvimento</span></Rotulo>
              <h2 className="bq-h2" id="bq-ia-title">Escreva como falaria com alguém da equipe.</h2>
              <p className="bq-text bq-text--claro">O assistente mostra o que entendeu e pede a sua confirmação antes de qualquer alteração. Nada muda sem o seu “sim”.</p>
            </div>
            <div className="bq-chat">
              <div className="bq-bubble bq-bubble--me">A missa de domingo passou das 19h para as 18h30.</div>
              <div className="bq-bubble">Encontrei a missa dominical das 19h. Alterar para 18h30?
                <div className="bq-bubble__actions"><span className="is-confirm">Confirmar</span><span>Cancelar</span></div>
              </div>
              <div className="bq-bubble">Pronto. O site está atualizado.</div>
            </div>
          </div>
        </section>

        {/* 8. Para quem é */}
        <section className="bq-section bq-paper" id="para-quem" aria-labelledby="bq-quem-title">
          <div className="bq-wrap bq-quem">
            <div className="bq-quem__intro">
              <Rotulo>Será que é para a minha paróquia?</Rotulo>
              <h2 className="bq-h2" id="bq-quem-title">Faz sentido especialmente se…</h2>
              <a className="bq-btn bq-btn--navy bq-only-desktop" href="#formulario">Quero conversar sobre minha paróquia</a>
            </div>
            <ul className="bq-lista">
              {paraQuem.map((item) => <li key={item}><Check />{item}</li>)}
            </ul>
            <a className="bq-btn bq-btn--navy bq-only-mobile" href="#formulario">Quero conversar sobre minha paróquia</a>
          </div>
        </section>

        {/* 9. Segurança */}
        <section className="bq-section bq-dark" id="seguranca" aria-labelledby="bq-seg-title">
          <div className="bq-wrap bq-duas">
            <div>
              <Rotulo claro>Responsabilidade com os dados</Rotulo>
              <h2 className="bq-h2" id="bq-seg-title">Informações da comunidade merecem cuidado.</h2>
            </div>
            <div className="bq-seguranca">
              {seguranca.map(([title, copy]) => <div className="bq-seguranca__row" key={title}><strong>{title}</strong><span>{copy}</span></div>)}
            </div>
          </div>
        </section>

        {/* 10. Lançamento + formulário */}
        <section className="bq-section bq-paper" id="formulario" aria-labelledby="bq-form-title">
          <div className="bq-wrap bq-duas bq-duas--form">
            <div>
              <Rotulo>Lançamento</Rotulo>
              <h2 className="bq-h2" id="bq-form-title">Quer ser uma das primeiras paróquias a conhecer?</h2>
              <p className="bq-text">Deixe seus dados. Entramos em contato para entender a sua realidade e apresentar a proposta com calma.</p>
              <ul className="bq-lista bq-lista--compacta">
                <li><Check />Conheça a proposta antes do lançamento público.</li>
                <li><Check />Converse sobre a realidade da sua paróquia.</li>
                <li><Check />Receba as condições e a disponibilidade.</li>
              </ul>
            </div>
            <div className="bq-quadro bq-moldura-form">
              <LeadFormBarroca />
            </div>
          </div>
        </section>

        {/* 11. Dúvidas */}
        <section className="bq-section bq-dark" id="duvidas" aria-labelledby="bq-faq-title">
          <div className="bq-wrap bq-faqwrap">
            <Rotulo claro>Dúvidas frequentes</Rotulo>
            <h2 className="bq-h2" id="bq-faq-title">O que você talvez queira saber.</h2>
            <div className="bq-faq">
              {faq.map(([q, a], i) => (
                <details className="bq-faq__item" key={q} open={i === 0}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bq-footer">
        <div className="bq-wrap bq-footer__inner">
          <Marca />
          <p>Tecnologia humana para paróquias.</p>
          <div className="bq-footer__links"><a href="#formulario">Contato</a><Link href="/privacidade">Privacidade</Link><span>© {new Date().getFullYear()} Católico Digital</span></div>
        </div>
      </footer>

      <div className="bq-sticky">
        <a className="bq-btn bq-btn--gold bq-btn--full" href="#formulario">Quero conversar sobre minha paróquia</a>
        <span>Sem compromisso.</span>
      </div>
    </div>
  );
}
