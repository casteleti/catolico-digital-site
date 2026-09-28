"use client";

import { useEffect, useRef, useState } from "react";

const destinations = ["Início", "Horários", "Comunidade São Pedro", "Agenda", "Busca"];

export function ScheduleUpdateDemo() {
  const [time, setTime] = useState("19h");
  const [pageTimes, setPageTimes] = useState(destinations.map(() => "19h"));
  const [updatedPages, setUpdatedPages] = useState<number[]>([]);
  const [announcement, setAnnouncement] = useState("");
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

  function updateTime(nextTime: "19h" | "18h30") {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    setTime(nextTime);
    setAnnouncement("");
    setUpdatedPages([]);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setPageTimes(destinations.map(() => nextTime));
      setAnnouncement(nextTime === "18h30" ? "Horário atualizado em 5 lugares" : "Horário restaurado em 5 lugares");
      return;
    }

    destinations.forEach((_, index) => {
      const timer = window.setTimeout(() => {
        setPageTimes((current) => current.map((value, pageIndex) => pageIndex === index ? nextTime : value));
        setUpdatedPages((current) => [...current, index]);
        if (index === destinations.length - 1) {
          setAnnouncement(nextTime === "18h30" ? "Horário atualizado em 5 lugares" : "Horário restaurado em 5 lugares");
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
