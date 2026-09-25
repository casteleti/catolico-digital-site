"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { HeroExperience } from "@/components/motion/hero-experience";
import { ProductScrollStory } from "@/components/motion/product-scroll-story";

export function PremiumLayers() {
  const [hero, setHero] = useState<HTMLElement | null>(null);
  const [product, setProduct] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setHero(document.querySelector<HTMLElement>(".landing-hero"));
      setProduct(document.querySelector<HTMLElement>("#produto"));
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return <>
    {hero && createPortal(<HeroExperience />, hero)}
    {product && createPortal(<section className="product-story-enhancement section section--night" aria-labelledby="story-title"><div className="container"><div className="section-heading section-heading--light"><p className="eyebrow eyebrow--light">Veja a solução acontecer</p><h2 id="story-title">Uma presença digital que se organiza enquanto você acompanha.</h2></div><ProductScrollStory /></div></section>, product)}
  </>;
}
