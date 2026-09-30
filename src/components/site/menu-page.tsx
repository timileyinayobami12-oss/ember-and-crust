"use client";

import { useMemo, useState } from "react";
import { Leaf, Flame, Wheat } from "lucide-react";
import { CATEGORIES, MENU } from "@/data/menu";
import { useRoute } from "@/lib/store";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";

export function MenuPage() {
  const initial = useRoute((s) => s.menuCategory);
  const [cat, setCat] = useState<string>(initial ?? "all");

  const items = useMemo(
    () => (cat === "all" ? MENU : MENU.filter((m) => m.category === cat)),
    [cat]
  );

  return (
    <>
      <PageBand title="Our Menu" subtitle="Short on purpose. Every dish earns its spot." />
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* sticky category pills */}
        <div className="sticky top-[64px] z-30 -mx-4 bg-white/95 px-4 py-3 backdrop-blur md:top-[118px]">
          <div className="nice-scroll flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Menu categories">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={cat === c.id}
                onClick={() => setCat(c.id)}
                className={cn(
                  "whitespace-nowrap rounded-full border px-5 py-2 font-display text-sm font-medium uppercase tracking-wider transition",
                  cat === c.id
                    ? "border-ember bg-ember text-white shadow-md shadow-ember/25"
                    : "border-black/12 text-black/55 hover:border-ember/40 hover:text-ember"
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>

        {/* legend + note */}
        <div className="mt-12 rounded-xl bg-cream p-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-black/60">
            <span className="inline-flex items-center gap-1.5">
              <Leaf className="h-4 w-4 text-leaf" /> Vegetarian
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Flame className="h-4 w-4 text-ember" /> Has some heat
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Wheat className="h-4 w-4 text-gold" /> Our own 48 hour dough
            </span>
          </div>
          <p className="mx-auto mt-3 max-w-xl text-[13px] leading-relaxed text-black/50">
            Everything is made to order. Tell us about allergies in the notes at
            checkout and the kitchen will take care of you. Pizzas come in 12
            inch and 16 inch; a 12 inch feeds one hungry person or two polite ones.
          </p>
        </div>
      </div>
    </>
  );
}

export function PageBand({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="hero-stripes bg-ember py-12 text-center text-white">
      <h1 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
        {title}
      </h1>
      {subtitle && <p className="mx-auto mt-2 max-w-xl text-[15px] text-white/75">{subtitle}</p>}
      <span className="mx-auto mt-4 block h-1 w-16 rounded-full bg-gold" aria-hidden />
    </section>
  );
}
