"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

type Question = { question: string; answer: string };

export function FaqAccordion({ items }: { items: Question[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div className={`faq-item ${isOpen ? "faq-item--open" : ""}`} key={item.question}>
            <button className="faq-trigger" id={`faq-trigger-${index}`} type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(isOpen ? null : index)}>
              <span>{item.question}</span>{isOpen ? <Minus aria-hidden="true" size={20} /> : <Plus aria-hidden="true" size={20} />}
            </button>
            <div className="faq-answer" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-trigger-${index}`} hidden={!isOpen}>{item.answer}</div>
          </div>
        );
      })}
    </div>
  );
}
