"use client";

import { useEffect, useRef, useState } from "react";

const destinations = ["Horários", "Comunidade São Pedro", "Agenda"];

export function ScheduleUpdateDemo() {
  const [time, setTime] = useState("19h");
  const [pageTimes, setPageTimes] = useState(destinations.map(() => "19h"));
  const [updatedPages, setUpdatedPages] = useState<number[]>([]);
  const [announcement, setAnnouncement] = useState("");
  const [tried, setTried] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

  function updateTime(nextTime: "19h" | "18h30") {
    setTried(true);
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    setTime(nextTime);
    setAnnouncement("");
    setUpdatedPages([]);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setPageTimes(destinations.map(() => nextTime));
      setAnnouncement(nextTime === "18h30" ? "Horário atualizado em 3 lugares" : "Horário restaurado em 3 lugares");
      return;
    }

    destinations.forEach((_, index) => {
      const timer = window.setTimeout(() => {
        setPageTimes((current) => current.map((value, pageIndex) => pageIndex === index ? nextTime : value));
        setUpdatedPages((current) => [...current, index]);
        if (index === destinations.length - 1) {
          setAnnouncement(nextTime === "18h30" ? "Horário atualizado em 3 lugares" : "Horário restaurado em 3 lugares");
        }
      }, 120 * (index + 1));
      timers.current.push(timer);
    });
  }

  return (
    <div className="schedule-update-demo">
      <div className="schedule-update-demo__editor">
        <p className="eyebrow">Informação da paróquia</p>
        <h3>Missa de domingo</h3>
        <p className="schedule-update-demo__current">{time}</p>
        <div className={`try-hint ${tried ? "is-done" : ""}`.trim()} aria-hidden="true">
          <span className="try-hint__text">Clique para testar</span>
          <svg className="try-hint__arrow" viewBox="0 0 160 110" fill="none">
            <defs>
              <filter id="giz" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence baseFrequency="0.9" numOctaves="2" seed="7" type="fractalNoise" />
                <feDisplacementMap in="SourceGraphic" scale="2.2" />
              </filter>
            </defs>
            <g filter="url(#giz)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path className="try-hint__line" d="M12 10 C 30 52, 70 88, 136 86" strokeWidth="3.2" />
              <path className="try-hint__head" d="M118 72 C 126 78, 132 82, 139 86 C 131 89, 124 94, 118 101" strokeWidth="3.2" />
            </g>
          </svg>
        </div>
        <button className="button button--brand" type="button" onClick={() => updateTime(time === "19h" ? "18h30" : "19h")}>
          {time === "19h" ? "Alterar para 18h30" : "Voltar para 19h"}
        </button>
      </div>
      <div className="schedule-update-demo__pages" aria-label="Páginas que mostram o horário" aria-live="polite" aria-atomic="false">
        {destinations.map((destination, index) => (
          <article className={`schedule-update-demo__page ${updatedPages.includes(index) ? "is-updated" : ""}`} key={destination}>
            <h3>{destination}</h3>
            <p>Missa de domingo · {pageTimes[index]}</p>
          </article>
        ))}
        <span className="visually-hidden">{announcement}</span>
      </div>
    </div>
  );
}
