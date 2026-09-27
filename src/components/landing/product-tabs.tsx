"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";

type Tab = { label: string; title: string; description: string; kind: string };

export function ProductTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tab = tabs[active];
  if (!tab) return null;
  const panelId = "product-demo-panel";
  const activeTabId = `product-demo-tab-${tab.kind}`;

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    setActive(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div className="product-tabs">
      <div className="product-tabs__nav" role="tablist" aria-label="Demonstração do produto">
        {tabs.map((item, index) => (
          <button ref={(element) => { tabRefs.current[index] = element; }} className={index === active ? "is-active" : ""} key={item.label} id={`product-demo-tab-${item.kind}`} type="button" role="tab" aria-selected={index === active} aria-controls={panelId} tabIndex={index === active ? 0 : -1} onKeyDown={(event) => handleTabKeyDown(event, index)} onClick={() => setActive(index)}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="product-tabs__panel" id={panelId} role="tabpanel" aria-labelledby={activeTabId} tabIndex={0}>
        <div key={tab.kind} className={`product-tabs__mockup product-tabs__mockup--${tab.kind}`} aria-hidden="true">
          <div className="mockup-toolbar"><span /><span /><span /></div>
          <div className="mockup-content"><i /><i /><i /><i /><i /></div>
        </div>
        <div className="product-tabs__copy"><p className="eyebrow">{tab.label}</p><h3>{tab.title}</h3><p>{tab.description}</p></div>
      </div>
    </div>
  );
}
