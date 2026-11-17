"use client";
import { useId, useState } from "react";

type Item = { q: string; a: string };

export default function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <div className="border-t border-gold-light/60">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-b${i}`;
        const panelId = `${base}-p${i}`;
        return (
          <div key={item.q} className="border-b border-gold-light/60">
            <h3 className="font-sans">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left font-serif text-xl text-plum-ink transition-colors hover:text-plum md:text-[1.4rem]"
              >
                {item.q}
                <span aria-hidden className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold-light transition-colors group-hover:border-plum">
                  <span className="absolute h-px w-3.5 bg-current" />
                  <span className={`absolute h-px w-3.5 bg-current transition-transform duration-500 ${isOpen ? "rotate-0" : "rotate-90"}`} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-calm)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p className="max-w-3xl pb-7 pr-12 text-stone">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
