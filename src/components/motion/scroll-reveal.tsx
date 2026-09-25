"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

export function ScrollReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { element?.classList.add("is-visible"); return; }
    const observer = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) { element.classList.add("is-visible"); observer.disconnect(); } }, { threshold: .12, rootMargin: "0px 0px -8%" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`scroll-reveal ${className}`.trim()}>{children}</div>;
}
