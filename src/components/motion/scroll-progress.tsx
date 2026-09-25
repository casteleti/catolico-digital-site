"use client";

import { useEffect, useState } from "react";

const stages = ["Descobrir", "Entender", "Ver", "Confiar", "Conhecer"];

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    update();
    return () => { window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); if (frame) window.cancelAnimationFrame(frame); };
  }, []);
  const activeStage = Math.min(stages.length - 1, Math.floor(progress * stages.length));
  return <div className="scroll-progress" aria-label={`Progresso da página: ${stages[activeStage]}`}><span className="scroll-progress__line" style={{ transform: `scaleX(${progress})` }} />{stages.map((stage, index) => <span className={index <= activeStage ? "is-active" : ""} key={stage} title={stage}><i /></span>)}</div>;
}
