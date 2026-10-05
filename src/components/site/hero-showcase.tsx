"use client";

import { Check, FileCheck2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ModuleIcon } from "./module-icon";

/**
 * O palco do herói: a janela do painel e o celular trocam de tela a cada poucos segundos, e os alertas se
 * revezam com fade. Tudo desenhado em CSS (nada para baixar); um único relógio no navegador; para quando a aba
 * sai de vista e fica parado para quem pede "reduzir movimento".
 */
const STEP_MS = 3800;

type PanelScreen = { module: string; title: string; stats: Array<[string, string]>; rows: Array<"ok" | "wait" | "plain">; tone?: "rose" | "blue" };
const PANEL: PanelScreen[] = [
  { module: "book", title: "Inscrições · Catequese Infantil 2027", stats: [["48", "recebidas"], ["31", "confirmadas"], ["3", "em espera"]], rows: ["ok", "ok", "wait", "plain"] },
  { module: "church", title: "Sacramentos · pedidos desta semana", stats: [["7", "batismos"], ["2", "casamentos"], ["1", "crisma"]], rows: ["ok", "wait", "wait", "plain"] },
  { module: "clock", title: "Missas · horários e exceções", stats: [["12", "missas na semana"], ["3", "capelas"], ["1", "exceção: 24/12"]], rows: ["ok", "ok", "ok", "plain"] },
  { module: "users", title: "Pastorais e Ministérios · equipes", stats: [["23", "grupos ativos"], ["214", "pessoas servindo"], ["5", "convites"]], rows: ["ok", "plain", "ok", "plain"] },
  { module: "hand-heart", title: "Dízimo · quadro de PIX da paróquia", stats: [["1", "chave PIX"], ["QR", "gerado"], ["0", "taxa"]], rows: ["ok", "plain", "plain", "plain"] },
];
const SIDEBAR = ["book", "clock", "church", "users", "hand-heart"] as const;
const SIDEBAR_LABELS: Record<(typeof SIDEBAR)[number], string> = { book: "Catequese", clock: "Missas", church: "Sacramentos", users: "Pastorais", "hand-heart": "Dízimo" };

type PhoneScreen = { kicker: string; question: React.ReactNode; options: [string, string]; progress: number };
const PHONE: PhoneScreen[] = [
  { kicker: "Catequizando · 4 de 9", question: <>Pela idade, Ana entra em <b>Eucaristia 1</b>.&nbsp;Confere?</>, options: ["Sim, confere", "Prefiro escolher o ano"], progress: 44 },
  { kicker: "Horário · 6 de 9", question: <>Sábado, <b>9h</b>, no Centro Catequético. Restam&nbsp;3&nbsp;vagas.</>, options: ["Quero esta turma", "Ver outro horário"], progress: 66 },
  { kicker: "Documentos · 8 de 9", question: <>Certidão de batismo: <b>tirar uma foto</b>&nbsp;agora?</>, options: ["Tirar foto", "Entrego na secretaria"], progress: 88 },
  { kicker: "Batismo · pedido", question: <>Qual a <b>data</b> que a família prefere para o&nbsp;batismo?</>, options: ["Domingo, 14/03", "Outra data"], progress: 30 },
  { kicker: "Dízimo", question: <>Chave PIX da paróquia: <b>copiar</b> ou ler o QR&nbsp;Code?</>, options: ["Copiar chave", "Mostrar QR Code"], progress: 100 },
];

type Alert = { icon: string; label: string; strong: string; kind?: "doc" };
const ALERTS_TOP: Alert[] = [
  { icon: "doc", label: "Certidão de batismo", strong: "Enviada pela família", kind: "doc" },
  { icon: "church", label: "Pedido de Matrimônio", strong: "Recebido com 2 certidões" },
  { icon: "users", label: "Pastoral da Criança", strong: "Coordenadora convidada" },
  { icon: "bell", label: "Aviso publicado", strong: "Some sozinho em 30/11" },
  { icon: "book", label: "Crisma 2", strong: "12 inscritos confirmados" },
];
const ALERTS_BOTTOM: Alert[] = [
  { icon: "clock", label: "Horário atualizado", strong: "Missa de domingo · 18h30" },
  { icon: "book", label: "Inscrição na catequese", strong: "Recebida · nº 2027-0041" },
  { icon: "hand-heart", label: "Dízimo", strong: "Chave PIX conferida" },
  { icon: "map", label: "Capela São Benedito", strong: "Missa de quarta · 19h30" },
  { icon: "church", label: "Batismo marcado", strong: "Domingo, 14/03 · 10h" },
];

export function HeroShowcase() {
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onVisibility = () => setRunning(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);
  useEffect(() => {
    if (!running || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setTick((t) => t + 1), STEP_MS);
    return () => window.clearInterval(id);
  }, [running]);

  const panel = PANEL[tick % PANEL.length]!;
  const phone = PHONE[tick % PHONE.length]!;
  const top = ALERTS_TOP[tick % ALERTS_TOP.length]!;
  const bottom = ALERTS_BOTTOM[(tick + 2) % ALERTS_BOTTOM.length]!;

  return (
    <div className="hero-stage" role="group" aria-label="Prévia ilustrativa: o painel da secretaria e a inscrição da catequese no celular, alternando entre os módulos">
      <div className="panel-window" aria-hidden="true">
        <div className="panel-window__bar"><span /><span /><span /><i>paroquiasaojose.catolico.digital/admin</i></div>
        <div className="panel-window__body">
          <div className="panel-window__side">
            {SIDEBAR.map((key) => (
              <b className={key === panel.module ? "is-on" : ""} key={key}><ModuleIcon name={key} size={13} /> {SIDEBAR_LABELS[key]}</b>
            ))}
          </div>
          <div className="panel-window__main">
            {PANEL.map((screen, i) => (
              <div className={`panel-screen ${screen === panel ? "is-active" : ""}`.trim()} key={i}>
                <p className="panel-window__title">{screen.title}</p>
                <div className="panel-window__stats">{screen.stats.map(([n, label]) => <i key={label}><b>{n}</b>{label}</i>)}</div>
                <div className="panel-window__rows">{screen.rows.map((state, j) => <i key={j}><b /><s data-state={state} /></i>)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="phone" aria-hidden="true">
        <div className="phone__screen">
          {PHONE.map((screen, i) => (
            <div className={`phone-screen ${screen === phone ? "is-active" : ""}`.trim()} key={i}>
              <p className="phone__kicker">{screen.kicker}</p>
              <p className="phone__question">{screen.question}</p>
              <div className="phone__options"><span className="is-on">{screen.options[0]}</span><span>{screen.options[1]}</span></div>
              <div className="phone__progress"><i style={{ width: `${screen.progress}%` }} /></div>
            </div>
          ))}
        </div>
      </div>

      <div className="floating-card floating-card--top" key={`top-${tick}`}>
        {top.kind === "doc" ? <FileCheck2 aria-hidden="true" size={15} /> : <ModuleIcon name={top.icon} size={15} />}
        <span>{top.label}<strong>{top.strong}</strong></span>
      </div>
      <div className="floating-card floating-card--bottom" key={`bottom-${tick}`}>
        <ModuleIcon name={bottom.icon} size={15} />
        <span>{bottom.label}<strong><Check aria-hidden="true" size={12} /> {bottom.strong}</strong></span>
      </div>
    </div>
  );
}
