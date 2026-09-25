"use client";

import { useState } from "react";

type Tab = { label: string; title: string; description: string; kind: string };

export function ProductTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  if (!tab) return null;

  return (
    <div className="product-tabs">
      <div className="product-tabs__nav" role="tablist" aria-label="Demonstração do produto">
        {tabs.map((item, index) => (
          <button className={index === active ? "is-active" : ""} key={item.label} type="button" role="tab" aria-selected={index === active} onClick={() => setActive(index)}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="product-tabs__panel" role="tabpanel">
        <div key={tab.kind} className={`product-tabs__mockup product-tabs__mockup--${tab.kind}`} aria-label={`Prévia: ${tab.label}`}>
          <div className="mockup-toolbar"><span /><span /><span /></div>
          <div className="mockup-content"><i /><i /><i /><i /><i /></div>
        </div>
        <div className="product-tabs__copy"><p className="eyebrow">{tab.label}</p><h3>{tab.title}</h3><p>{tab.description}</p></div>
      </div>
    </div>
  );
}
