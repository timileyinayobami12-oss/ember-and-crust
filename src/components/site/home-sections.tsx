"use client";

import { useState } from "react";
import Image from "next/image";
import { Flame, Wheat, Timer, Sprout, Plus } from "lucide-react";
import { DEAL, MENU, MENU as ALL, byId, formatPrice } from "@/data/menu";
import { useCart, useRoute } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { ProductCard, QuickCard } from "./product-card";
import { cn } from "@/lib/utils";

/* ---------------- promo tile grid (1 large + 2 small + 1 wide) --------------- */

export function PromoTiles() {
  const navigate = useRoute((s) => s.navigate);
  return (
    <section className="mx-auto max-w-6xl px-4 py-12" aria-label="Promotions">
      <div className="grid gap-4 md:grid-cols-2">
        {/* large tile */}
        <button
          onClick={() => navigate("menu", { menuCategory: "pizzas" })}
          className="group relative col-span-1 row-span-2 min-h-72 overflow-hidden rounded-2xl text-left md:min-h-full"
        >
          <Image
            src="/images/pizza-pepperoni.jpg"
            alt="Hot Honey Pepperoni pizza on a dark board"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
          <span className="absolute left-5 top-5 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-charcoal">
            Hot &amp; Sweet
          </span>
          <div className="absolute inset-x-5 bottom-5">
            <h2 className="font-display text-3xl font-bold uppercase leading-tight text-white">
              Hot Honey
              <br />
              Pepperoni
            </h2>
            <p className="mt-1.5 text-sm text-white/80">
              Our most ordered pizza, three months running.
            </p>
            <span className="mt-3 inline-block rounded-full border border-white/60 px-4 py-1.5 text-xs font-semibold text-white transition group-hover:bg-white group-hover:text-ember">
              View More
            </span>
          </div>
        </button>

        {/* two small tiles */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate("menu", { menuCategory: "sides" })}
            className="group relative min-h-44 overflow-hidden rounded-2xl bg-gold text-left"
          >
            <Image
              src="/images/side-fries.jpg"
              alt="A tray of hand cut skin on fries"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-center p-4">
              <span className="font-display text-xl font-bold uppercase leading-tight text-charcoal">
                Free
                <br />
                Fries
              </span>
              <span className="mt-1 text-[11px] font-medium text-charcoal/80">
                On orders over $30
              </span>
            </div>
          </button>

          <button
            onClick={() => navigate("menu", { menuCategory: "drinks" })}
            className="group relative min-h-44 overflow-hidden rounded-2xl bg-charcoal text-left"
          >
            <Image
              src="/images/tile-coffee.png"
              alt="A tall glass of iced coffee"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-center p-4">
              <span className="font-display text-xl font-bold uppercase leading-tight text-white">
                Cold
                <br />
                Brew
              </span>
              <span className="mt-1 text-[11px] font-medium text-white/75">
                Steeped 18 hours
              </span>
            </div>
          </button>
        </div>

        {/* wide tile */}
        <button
          onClick={() => navigate("menu")}
          className="group relative min-h-44 overflow-hidden rounded-2xl text-left"
        >
          <Image
            src="/images/tile-eat.png"
            alt="A slice of pepperoni pizza lifted with a long cheese pull"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
          <div className="absolute inset-y-0 left-5 flex flex-col justify-center">
            <span className="font-display text-2xl font-bold uppercase text-white">
              Order Online
            </span>
            <span className="mt-1 max-w-56 text-xs text-white/80">
              Your pizza is about 30 minutes away. Reheat not required.
            </span>
            <span className="mt-2.5 inline-flex w-fit items-center gap-1.5 rounded-full bg-ember px-4 py-1.5 text-xs font-semibold text-white transition group-hover:bg-ember-bright">
              Start Your Order
            </span>
          </div>
        </button>
      </div>
    </section>
  );
}

/* ---------------------- tabbed featured menu, Pizzaro style ---------------------- */

const TABS = [
  { id: "pizzas", label: "Pizzas" },
  { id: "sides", label: "Wings & Sides" },
  { id: "desserts", label: "Desserts" },
] as const;

export function TabbedMenu() {
  const navigate = useRoute((s) => s.navigate);
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("pizzas");
  const items = ALL.filter((m) => m.category === tab).slice(0, 3);
  // middle card gets the Pizzaro highlight
  const ordered = items.length === 3 ? [items[1], items[0], items[2]] : items;

  return (
    <section className="mx-auto max-w-6xl px-4 pb-14" aria-label="Popular picks">
      <div className="flex justify-center gap-2" role="tablist" aria-label="Menu categories">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-full px-5 py-2 font-display text-sm font-medium uppercase tracking-wider transition",
              tab === t.id
                ? "bg-ember text-white shadow-md shadow-ember/30"
                : "text-black/50 hover:bg-black/5 hover:text-ink"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ordered.map((item, i) => (
          <ProductCard key={item.id} item={item} featured={items.length === 3 && i === 0} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={() => navigate("menu")}
          className="rounded-full border-2 border-ember px-8 py-3 text-sm font-semibold text-ember transition hover:bg-ember hover:text-white active:scale-95"
        >
          Browse the Full Menu
        </button>
      </div>
    </section>
  );
}

/* ------------------------- dark deal of the day banner ------------------------- */

export function DealBanner() {
  const add = useCart((s) => s.add);
  const navigate = useRoute((s) => s.navigate);
  const { toast } = useToast();
  const item = byId(DEAL.itemId)!;

  const grab = () => {
    add(item, { size: DEAL.sizeLabel, price: DEAL.price });
    toast({
      title: "Deal locked in",
      description: `Margherita · ${DEAL.sizeLabel} · ${formatPrice(DEAL.price)}`,
    });
  };

  return (
    <section className="relative overflow-hidden bg-charcoal text-white" aria-label="Deal of the day">
      <Image
        src="/images/oven-fire.jpg"
        alt="Fire burning inside the oak oven"
        fill
        sizes="100vw"
        className="object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/55 to-charcoal/85" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-gold">
          Free delivery on orders over $30
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
          Deal of the Day
        </h2>
        <p className="mt-4 text-lg font-medium text-white/85">
          Margherita, {DEAL.sizeLabel}
        </p>
        <p className="mx-auto mt-1 max-w-md text-sm text-white/60">{DEAL.note}</p>
        <p className="mt-4 font-display text-5xl font-bold text-gold">
          {formatPrice(DEAL.price)}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            onClick={grab}
            className="rounded-full bg-ember px-8 py-3 text-sm font-semibold text-white transition hover:bg-ember-bright active:scale-95"
          >
            Grab the Deal
          </button>
          <button
            onClick={() => navigate("menu", { menuCategory: "pizzas" })}
            className="rounded-full border border-white/40 px-8 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 active:scale-95"
          >
            See All Pizzas
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ goes great with ------------------------------ */

export function GoesGreatWith() {
  const picks = ["cola", "lemonade", "cookie", "sundae"]
    .map((id) => MENU.find((m) => m.id === id)!)
    .filter(Boolean);
  return (
    <section className="mx-auto max-w-6xl px-4 py-14" aria-label="Drinks and desserts">
      <SectionHeading
        title="Goes Great With"
        subtitle="Because pizza alone is only almost perfect."
      />
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {picks.map((item) => (
          <QuickCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

/* --------------------------- featured caprese section --------------------------- */

export function FeaturedProduct() {
  const item = MENU.find((m) => m.id === "caprese")!;
  const [size, setSize] = useState(item.sizes![0].label);
  const price = item.sizes!.find((s) => s.label === size)!.price;
  const add = useCart((s) => s.add);
  const { toast } = useToast();

  return (
    <section className="bg-cream py-14" aria-label="Featured pizza">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-ember">
            From the oven
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold text-ink">{item.name}</h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-black/60">
            {item.description} It is the pizza that started this place, and it
            still outsells everything else on Friday nights.
          </p>

          <p className="mt-6 text-[10px] uppercase tracking-[0.18em] text-black/40">
            Pick size
          </p>
          <div className="mt-2 flex gap-2">
            {item.sizes!.map((s) => (
              <button
                key={s.label}
                onClick={() => setSize(s.label)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-xs font-medium transition",
                  size === s.label
                    ? "border-ember bg-ember text-white"
                    : "border-black/15 text-black/60 hover:border-ember/50 hover:text-ember"
                )}
                aria-pressed={size === s.label}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-5">
            <span className="font-display text-3xl font-semibold text-ink">
              {formatPrice(price)}
            </span>
            <button
              onClick={() => {
                add(item, { size, price });
                toast({
                  title: "Added to your order",
                  description: `${item.name} · ${size} · ${formatPrice(price)}`,
                });
              }}
              className="inline-flex items-center gap-2 rounded-full bg-ember px-7 py-3 text-sm font-semibold text-white transition hover:bg-ember-bright active:scale-95"
            >
              <Plus className="h-4 w-4" />
              Add to Cart
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-full border-8 border-white shadow-2xl shadow-ember/15">
            <Image
              src="/images/board-caprese.jpg"
              alt="The Caprese pizza on a wooden board with tomatoes and mozzarella"
              fill
              sizes="(min-width: 768px) 450px, 90vw"
              className="object-cover"
            />
          </div>
          <span className="absolute -right-1 top-6 rotate-12 rounded-full bg-leaf px-4 py-1.5 text-xs font-semibold text-white shadow-lg md:right-6">
            Vegetarian
          </span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- features row ------------------------------- */

const FEATURES = [
  {
    icon: Flame,
    title: "Real Wood Fire",
    text: "Our oven runs at 900 degrees on oak. No gas, no shortcuts.",
  },
  {
    icon: Wheat,
    title: "Dough Made Daily",
    text: "Mixed every morning and rested for 48 hours before it is stretched.",
  },
  {
    icon: Timer,
    title: "Hot On Arrival",
    text: "Insulated boxes and short routes keep every pie at temperature.",
  },
  {
    icon: Sprout,
    title: "Local First",
    text: "Produce from Illinois farms, cheese from just over the line in Wisconsin.",
  },
];

export function FeaturesRow() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14" aria-label="Why Ember and Crust">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <div key={f.title} className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-ember/25 text-ember transition hover:border-ember hover:bg-ember hover:text-white">
              <f.icon className="h-7 w-7" strokeWidth={1.6} />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">{f.title}</h3>
            <p className="mx-auto mt-2 max-w-56 text-[13px] leading-relaxed text-black/55">
              {f.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- gallery strip ------------------------------- */

const GALLERY = [
  { src: "/images/oven-fire.jpg", alt: "Oak fire inside the oven" },
  { src: "/images/tile-eat.png", alt: "A pepperoni slice lifted with a cheese pull" },
  { src: "/images/dough-balls.jpg", alt: "Dough balls resting on a floured table" },
  { src: "/images/board-caprese.jpg", alt: "Caprese board with tomatoes and mozzarella" },
  { src: "/images/party-slices.jpg", alt: "Cheese pizza cut into slices" },
  { src: "/images/veggie-flatlay.jpg", alt: "Vegetable pizza with roasted vegetables" },
  { src: "/images/oven-pizza.jpg", alt: "Pizza baking inside the wood fired oven" },
];

export function GalleryStrip() {
  return (
    <section aria-label="Life at the pizzeria">
      <div className="grid grid-cols-4 sm:grid-cols-7">
        {GALLERY.map((g) => (
          <div key={g.src} className="group relative aspect-square overflow-hidden">
            <Image
              src={g.src}
              alt={g.alt}
              fill
              sizes="(min-width: 640px) 15vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-ember/0 transition group-hover:bg-ember/25" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ section heading ------------------------------ */

export function SectionHeading({
  title,
  subtitle,
  light = false,
}: {
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="text-center">
      <h2
        className={cn(
          "font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl",
          light ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mx-auto mt-2 max-w-lg text-[15px]",
            light ? "text-white/65" : "text-black/55"
          )}
        >
          {subtitle}
        </p>
      )}
      <span className="mx-auto mt-4 block h-1 w-16 rounded-full bg-ember" aria-hidden />
    </div>
  );
}
