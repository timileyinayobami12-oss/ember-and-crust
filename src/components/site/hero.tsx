"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatPrice } from "@/data/menu";
import { useRoute } from "@/lib/store";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    image: "/images/hero-caprese.jpg",
    alt: "The Caprese, a wood fired pizza with fresh mozzarella, tomatoes and basil",
    kicker: "Tasty. Fresh. Wood fired.",
    title: ["The", "Caprese"],
    description:
      "Fresh mozzarella folded into the dough, market tomatoes and basil, finished with a balsamic drizzle.",
    priceFrom: 11.99,
    badge: "Since 2018",
  },
  {
    image: "/images/pizza-pepperoni.jpg",
    alt: "Hot Honey Pepperoni pizza on a dark wooden board",
    kicker: "The one everyone talks about",
    title: ["Hot Honey", "Pepperoni"],
    description:
      "Cup and char pepperoni under a slow drizzle of wildflower honey. Sweet, spicy, a little addictive.",
    priceFrom: 12.99,
    badge: "Most ordered",
  },
  {
    image: "/images/pizza-bbq.jpg",
    alt: "The Ember BBQ pizza fresh off the peel",
    kicker: "Straight off the fire",
    title: ["The Ember", "BBQ"],
    description:
      "Smoked chicken, red onion and sharp cheddar over our house barbecue sauce. Napkins required.",
    priceFrom: 13.49,
    badge: "Fan favorite",
  },
];

const DURATION = 6000;

export function Hero() {
  const navigate = useRoute((s) => s.navigate);
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const restart = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      DURATION
    );
  }, []);

  useEffect(() => {
    restart();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [restart]);

  const goto = (i: number) => {
    setIndex(i);
    restart();
  };

  const slide = SLIDES[index];

  return (
    <section
      className="hero-stripes relative overflow-hidden bg-ember text-white"
      aria-label="Featured pizzas"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-14">
        {/* photo */}
        <div className="relative order-1 md:order-2">
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl border-4 border-white/15 shadow-2xl shadow-black/40 md:max-w-lg">
            {SLIDES.map((s, i) => (
              <Image
                key={s.image}
                src={s.image}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="(min-width: 768px) 500px, 90vw"
                className={cn(
                  "object-cover transition-all duration-700",
                  i === index
                    ? "scale-100 opacity-100"
                    : "scale-105 opacity-0"
                )}
              />
            ))}
            <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal">
              {slide.badge}
            </span>
          </div>
          {/* price bubble */}
          <div className="absolute -bottom-5 right-2 flex h-24 w-24 rotate-6 flex-col items-center justify-center rounded-full bg-gold text-charcoal shadow-xl md:right-8">
            <span className="text-[9px] font-semibold uppercase tracking-widest">
              From
            </span>
            <span className="font-display text-2xl font-bold leading-none">
              {formatPrice(slide.priceFrom)}
            </span>
          </div>
        </div>

        {/* copy */}
        <div className="order-2 text-center md:order-1 md:text-left">
          <p className="font-display text-sm font-medium uppercase tracking-[0.35em] text-white/75">
            {slide.kicker}
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            {slide.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/80 md:mx-0">
            {slide.description}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <button
              onClick={() => navigate("menu")}
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-ember transition hover:bg-gold hover:text-charcoal active:scale-95"
            >
              Order Now
            </button>
            <button
              onClick={() => navigate("menu")}
              className="rounded-full border border-white/50 px-7 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 active:scale-95"
            >
              See the Menu
            </button>
          </div>
        </div>
      </div>

      {/* arrows */}
      <button
        onClick={() => goto((index - 1 + SLIDES.length) % SLIDES.length)}
        aria-label="Previous slide"
        className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/25 p-2.5 transition hover:bg-black/45 md:block"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => goto((index + 1) % SLIDES.length)}
        aria-label="Next slide"
        className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/25 p-2.5 transition hover:bg-black/45 md:block"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* dots like Pizzaro */}
      <div className="flex justify-center gap-2 pb-5">
        {SLIDES.map((s, i) => (
          <button
            key={s.image}
            onClick={() => goto(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300",
              i === index ? "w-7 bg-gold" : "w-2.5 bg-white/45 hover:bg-white/70"
            )}
          />
        ))}
      </div>
    </section>
  );
}
