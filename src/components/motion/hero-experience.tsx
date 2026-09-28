"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

const points = Array.from({ length: 18 }, (_, index) => ({
  angle: index * 20,
  distance: 112 + (index % 3) * 20,
}));

export function HeroExperience() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = element.getBoundingClientRect();
      const x = ((window.innerWidth / 2) - (bounds.left + bounds.width / 2)) / bounds.width;
      const y = ((window.innerHeight / 2) - (bounds.top + bounds.height / 2)) / bounds.height;
      element.style.setProperty("--pointer-x", `${Math.max(-1, Math.min(1, x)) * 8}px`);
      element.style.setProperty("--pointer-y", `${Math.max(-1, Math.min(1, y)) * 8}px`);
      element.style.setProperty("--scroll-depth", `${Math.max(0, Math.min(1, -bounds.top / Math.max(1, bounds.height)))}`);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    window.addEventListener("pointermove", schedule, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    update();
    return () => {
      window.removeEventListener("pointermove", schedule);
      window.removeEventListener("scroll", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="hero-experience" aria-hidden="true"><div className="hero-experience__halo" /><div className="digital-rosette">{points.map((point) => <i key={`${point.angle}-${point.distance}`} style={({ "--angle": `${point.angle}deg`, "--distance": `${point.distance}px` } as CSSProperties)} />)}</div><div className="hero-experience__grid" /></div>;
}
