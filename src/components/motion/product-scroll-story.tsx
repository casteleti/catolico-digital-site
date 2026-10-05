"use client";

import { CalendarDays, Church, Newspaper, Settings2 } from "lucide-react";
import { useEffect, useState } from "react";

const scenes = [
  [Church, "Tudo começa com uma informação", "A homepage organiza o que a comunidade precisa encontrar\u00A0primeiro."],
  [CalendarDays, "A agenda ganha clareza", "Celebrações e eventos passam a ter um lugar simples de\u00A0consultar."],
  [Newspaper, "A comunicação continua viva", "Notícias e avisos deixam de depender de um único\u00A0canal."],
  [Settings2, "A paróquia segue no controle", "A atualização diária cabe na rotina de quem\u00A0administra."],
] as const;

export function ProductScrollStory() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-story-step]"));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.storyStep ?? 0)); }), { threshold: .55 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  const [Icon, title, copy] = scenes[active] ?? scenes[0];
  return <div className="scroll-story"><div className="scroll-story__visual"><div className={`story-screen story-screen--${active}`}><div className="story-screen__bar"><Icon size={18} /><span>{title}</span></div><div className="story-screen__content"><i /><i /><i /><i /></div></div><p className="story-screen__caption">{copy}</p></div><div className="scroll-story__steps">{scenes.map(([StepIcon, stepTitle, stepCopy], index) => <article data-story-step={index} className={`story-step ${active === index ? "is-active" : ""}`} key={stepTitle}><span className="story-step__number">0{index + 1}</span><StepIcon aria-hidden="true" size={20} /><h3>{stepTitle}</h3><p>{stepCopy}</p></article>)}</div></div>;
}
