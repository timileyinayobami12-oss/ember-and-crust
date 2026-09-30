"use client";

import { useEffect, useState } from "react";
import { Menu as MenuIcon, X, Pizza, Drumstick, CupSoda, IceCreamCone, Croissant } from "lucide-react";
import { ScriptLogo } from "./logo";
import { OrderPill, PHONE_DISPLAY, PHONE_HREF } from "./header-bits";
import { useCart, useRoute } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Order Online", page: "menu" as const },
  { label: "About Us", page: "about" as const },
  { label: "Contact", page: "contact" as const },
];

const CATEGORY_BAR = [
  { label: "Pizzas", icon: Pizza, category: "pizzas" },
  { label: "Wings", icon: Drumstick, category: "sides" },
  { label: "Fries & Bread", icon: Croissant, category: "sides" },
  { label: "Drinks", icon: CupSoda, category: "drinks" },
  { label: "Desserts", icon: IceCreamCone, category: "desserts" },
];

export function Header() {
  const { page, navigate } = useRoute();
  const cartCount = useCart((s) => s.lines.reduce((n, l) => n + l.qty, 0));
  const cartSubtotal = useCart((s) => s.lines.reduce((n, l) => n + l.qty * l.price, 0));
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (p: "home" | "menu" | "about" | "contact" | "cart") => {
    setOpen(false);
    navigate(p);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* main red bar */}
      <div
        className={cn(
          "hero-stripes bg-ember text-white transition-shadow duration-300",
          scrolled && "shadow-lg shadow-black/25"
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <button
            onClick={() => go("home")}
            className="shrink-0 transition hover:opacity-90"
            aria-label="Ember and Crust home"
          >
            <ScriptLogo size="text-2xl md:text-3xl" />
          </button>

          <nav className="hidden items-center gap-7 text-[15px] font-medium lg:flex" aria-label="Main">
            {NAV.map((n) => (
              <button
                key={n.page}
                onClick={() => go(n.page)}
                className={cn(
                  "relative py-1 transition hover:text-gold",
                  page === n.page && "text-gold"
                )}
              >
                {n.label}
                {page === n.page && (
                  <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-gold" />
                )}
              </button>
            ))}
          </nav>

          <div className="hidden md:block">
            <a href={PHONE_HREF} className="block text-right leading-tight transition hover:text-gold">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-white/70">
                Call us for delivery
              </span>
              <span className="font-display text-lg font-semibold tracking-wide">
                {PHONE_DISPLAY}
              </span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <OrderPill
                count={cartCount}
                subtotal={cartSubtotal}
                onClick={() => go("cart")}
              />
            </div>
            <button
              className="rounded-md p-2 transition hover:bg-white/10 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* mobile dropdown */}
        <div
          className={cn(
            "overflow-hidden border-t border-white/10 bg-ember-dark transition-[max-height] duration-300 lg:hidden",
            open ? "max-h-96" : "max-h-0"
          )}
        >
          <div className="space-y-1 px-4 py-3">
            {NAV.map((n) => (
              <button
                key={n.page}
                onClick={() => go(n.page)}
                className="block w-full rounded-md px-3 py-2.5 text-left text-[15px] font-medium transition hover:bg-white/10"
              >
                {n.label}
              </button>
            ))}
            <div className="pt-2 sm:hidden">
              <OrderPill count={cartCount} subtotal={cartSubtotal} onClick={() => go("cart")} />
            </div>
            <a
              href={PHONE_HREF}
              className="block rounded-md px-3 py-2.5 text-[15px] font-medium md:hidden"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      {/* category icon bar, darker red like Pizzaro */}
      <div className="hidden bg-ember-dark md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-1.5">
          {CATEGORY_BAR.map((c) => (
            <button
              key={c.label}
              onClick={() => navigate("menu", { menuCategory: c.category })}
              className="group flex items-center gap-2 rounded-md px-4 py-2 text-sm text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              <c.icon className="h-4 w-4 text-gold transition group-hover:scale-110" strokeWidth={1.8} />
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
