"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";

/**
 * Aparece suavemente quando entra na tela (fade + leve subida), uma vez só. `delay` escalona irmãos.
 * Com "reduzir movimento" ligado no sistema, mostra direto.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "span" | "p" | "h2" | "h3";
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          element.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6%" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const Element = Tag as "div";
  return (
    <Element className={`reveal ${className}`.trim()} ref={ref as never} style={{ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties}>
      {children}
    </Element>
  );
}
