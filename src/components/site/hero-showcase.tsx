"use client";

import { Check, FileCheck2 } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ModuleIcon } from "./module-icon";

/**
 * O palco do herói (05/10/2026): quatro cenas — Horários, Sacramentos, Catequese e Dízimo. Acima do palco, os
 * quatro tópicos com uma pílula que desliza até o da vez; clicar num tópico mostra aquela cena e reinicia o
 * relógio. A janela do painel, o celular e os dois avisos mudam juntos. Tudo em CSS (nada para baixar); para
 * quando a aba sai de vista e fica parado para quem pede "reduzir movimento".
 */
const STEP_MS = 3800;

type Scene = {
  tab: string;
  panel: { module: string; title: string; stats: Array<[string, string]>; rows: Array<"ok" | "wait" | "plain"> };
  phone: { kicker: string; question: React.ReactNode; options: [string, string]; progress: number };
  top: { icon: string; label: string; strong: string; kind?: "doc" };
  bottom: { icon: string; label: string; strong: string };
};

const SCENES: Scene[] = [
  {
    tab: "Horários",
    panel: { module: "clock", title: "Missas · horários e exceções", stats: [["12", "missas na semana"], ["3", "capelas"], ["1", "exceção: 24/12"]], rows: ["ok", "ok", "ok", "plain"] },
    phone: { kicker: "Missas · domingo", question: <>Matriz: 7h, 9h e <b>19h</b>. Capela São Benedito:&nbsp;<b>10h</b>.</>, options: ["Como chegar", "Ver outras capelas"], progress: 100 },
    top: { icon: "clock", label: "Horário atualizado", strong: "Missa de domingo · 18h30" },
    bottom: { icon: "map", label: "Capela São Benedito", strong: "Missa de quarta · 19h30" },
  },
  {
    tab: "Sacramentos",
    panel: { module: "church", title: "Sacramentos · pedidos desta semana", stats: [["7", "batismos"], ["2", "casamentos"], ["1", "crisma"]], rows: ["ok", "wait", "wait", "plain"] },
    phone: { kicker: "Batismo · pedido", question: <>Envie a <b>certidão de nascimento</b> por foto ou&nbsp;PDF.</>, options: ["Enviar arquivo", "Falar no WhatsApp"], progress: 70 },
    top: { icon: "doc", label: "Certidão de batismo", strong: "Enviada pela família", kind: "doc" },
    bottom: { icon: "church", label: "Pedido de Matrimônio", strong: "Recebido com 2 certidões" },
  },
  {
    tab: "Catequese",
    panel: { module: "book", title: "Inscrições · Catequese Infantil 2027", stats: [["48", "recebidas"], ["31", "confirmadas"], ["3", "em espera"]], rows: ["ok", "ok", "wait", "plain"] },
    phone: { kicker: "Catequizando · 4 de 9", question: <>Pela idade, Ana entra em <b>Eucaristia 1</b>.&nbsp;Confere?</>, options: ["Sim, confere", "Prefiro escolher o ano"], progress: 44 },
    top: { icon: "book", label: "Crisma 2", strong: "12 inscritos confirmados" },
    bottom: { icon: "book", label: "Inscrição na catequese", strong: "Recebida · nº 2027-0041" },
  },
  {
    tab: "Dízimo",
    panel: { module: "hand-heart", title: "Dízimo · quadro de PIX da paróquia", stats: [["1", "chave PIX"], ["QR", "gerado"], ["0", "taxa"]], rows: ["ok", "plain", "plain", "plain"] },
    phone: { kicker: "Dízimo", question: <>Chave PIX da paróquia: <b>copiar</b> ou ler o QR&nbsp;Code?</>, options: ["Copiar chave", "Mostrar QR Code"], progress: 100 },
    top: { icon: "hand-heart", label: "Dízimo", strong: "Chave PIX conferida" },
    bottom: { icon: "shield", label: "Alteração registrada", strong: "Chave PIX · por Maria" },
  },
];

const SIDEBAR = ["clock", "church", "book", "hand-heart", "users"] as const;
const SIDEBAR_LABELS: Record<(typeof SIDEBAR)[number], string> = { clock: "Missas", church: "Sacramentos", book: "Catequese", "hand-heart": "Dízimo", users: "Pastorais" };

export function HeroShowcase() {
  const [index, setIndex] = useState(0);
  /** Conta cada troca de cena: reinicia a animação dos avisos e a barrinha de tempo da pílula. */
  const [step, setStep] = useState(0);
  /** Muda quando o visitante escolhe um tópico: reinicia o relógio. */
  const [restart, setRestart] = useState(0);
  const [running, setRunning] = useState(true);
  const [still, setStill] = useState(false);
  /** Pausa escolhida pelo visitante (WCAG 2.2.2): vale mesmo sem "reduzir movimento" ligado. */
  const [paused, setPaused] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(reduce.matches);
    const onVisibility = () => setRunning(!document.hidden);
    sync();
    reduce.addEventListener("change", sync);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      reduce.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (!running || still || paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SCENES.length);
      setStep((s) => s + 1);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [running, still, paused, restart]);

  // A pílula mede o tópico ativo e desliza até ele (também quando a tela muda de tamanho).
  useLayoutEffect(() => {
    const place = () => {
      const tab = tabsRef.current?.querySelectorAll<HTMLButtonElement>("button")[index];
      if (tab) setPill({ x: tab.offsetLeft, w: tab.offsetWidth });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [index]);

  const pick = (i: number) => {
    setIndex(i);
    setStep((s) => s + 1);
    setRestart((r) => r + 1);
  };

  const scene = SCENES[index]!;

  return (
    <div className="hero-showcase" data-paused={paused || undefined}>
      <div className="hero-tabs" ref={tabsRef} role="group" aria-label="O que a plataforma organiza">
        <span aria-hidden="true" className="hero-tabs__pill" style={pill ? { width: pill.w, transform: `translateX(${pill.x}px)` } : { opacity: 0 }}>
          {still || paused ? null : <i className="hero-tabs__timer" key={step} style={{ animationDuration: `${STEP_MS}ms` }} />}
        </span>
        {SCENES.map((s, i) => (
          <button aria-pressed={i === index} className={i === index ? "is-on" : undefined} key={s.tab} onClick={() => pick(i)} type="button">{s.tab}</button>
        ))}
      </div>

      <div className="hero-stage" role="group" aria-label={`Prévia ilustrativa do painel e do celular: ${scene.tab}`}>
        <div className="panel-window" aria-hidden="true">
          <div className="panel-window__bar"><span /><span /><span /><i>paroquiasaojose.catolico.digital/admin</i></div>
          <div className="panel-window__body">
            <div className="panel-window__side">
              {SIDEBAR.map((key) => (
                <b className={key === scene.panel.module ? "is-on" : ""} key={key}><ModuleIcon name={key} size={13} /> {SIDEBAR_LABELS[key]}</b>
              ))}
            </div>
            <div className="panel-window__main">
              {SCENES.map((s, i) => (
                <div className={`panel-screen ${i === index ? "is-active" : ""}`.trim()} key={s.tab}>
                  <p className="panel-window__title">{s.panel.title}</p>
                  <div className="panel-window__stats">{s.panel.stats.map(([n, label]) => <i key={label}><b>{n}</b>{label}</i>)}</div>
                  <div className="panel-window__rows">{s.panel.rows.map((state, j) => <i key={j}><b /><s data-state={state} /></i>)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="phone" aria-hidden="true">
          <div className="phone__screen">
            {SCENES.map((s, i) => (
              <div className={`phone-screen ${i === index ? "is-active" : ""}`.trim()} key={s.tab}>
                <p className="phone__kicker">{s.phone.kicker}</p>
                <p className="phone__question">{s.phone.question}</p>
                <div className="phone__options"><span className="is-on">{s.phone.options[0]}</span><span>{s.phone.options[1]}</span></div>
                <div className="phone__progress"><i style={{ width: `${s.phone.progress}%` }} /></div>
              </div>
            ))}
          </div>
        </div>

        <div className="floating-card floating-card--top" key={`top-${step}`}>
          {scene.top.kind === "doc" ? <FileCheck2 aria-hidden="true" size={15} /> : <ModuleIcon name={scene.top.icon} size={15} />}
          <span>{scene.top.label}<strong>{scene.top.strong}</strong></span>
        </div>
        <div className="floating-card floating-card--bottom" key={`bottom-${step}`}>
          <ModuleIcon name={scene.bottom.icon} size={15} />
          <span>{scene.bottom.label}<strong><Check aria-hidden="true" size={12} /> {scene.bottom.strong}</strong></span>
        </div>
      </div>

      <div className="hero-showcase__foot">
        <p className="hero-showcase__note">Exemplo ilustrativo, com dados&nbsp;fictícios.</p>
        {still ? null : (
          <button aria-pressed={paused} className="hero-showcase__pause" onClick={() => setPaused((value) => !value)} type="button">
            {paused ? "Retomar a animação" : "Pausar a animação"}
          </button>
        )}
      </div>
    </div>
  );
}
