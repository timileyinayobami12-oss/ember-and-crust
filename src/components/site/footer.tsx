"use client";

import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { ScriptLogo } from "./logo";
import { ADDRESS, EMAIL, HOURS, MAP_URL, PHONE_DISPLAY, PHONE_HREF } from "./header-bits";
import { useRoute } from "@/lib/store";

const SOCIALS = [
  { label: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { label: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { label: "Twitter", icon: Twitter, href: "https://twitter.com" },
];

const LINKS = [
  { label: "Order Online", page: "menu" as const },
  { label: "About Us", page: "about" as const },
  { label: "Contact", page: "contact" as const },
  { label: "Your Order", page: "cart" as const },
];

export function Footer() {
  const { navigate } = useRoute();
  return (
    <footer className="mt-auto bg-charcoal text-white/75">
      {/* social row */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-4 px-4 py-6">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="rounded-full border border-white/15 p-3 text-white/70 transition hover:border-gold hover:bg-white/5 hover:text-gold"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      {/* main columns */}
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <ScriptLogo size="text-3xl" className="text-white" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
            A small pizza kitchen on Fulton Market with one oak burning oven,
            a short menu and a stubborn love of good crust.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Explore
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {LINKS.map((l) => (
              <li key={l.label}>
                <button
                  onClick={() => navigate(l.page)}
                  className="transition hover:text-gold"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Visit Us
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{ADDRESS}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={PHONE_HREF} className="transition hover:text-gold">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${EMAIL}`} className="break-all transition hover:text-gold">
                {EMAIL}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Hours
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {HOURS.map((h) => (
              <li key={h.days} className="flex justify-between gap-4">
                <span className="text-white/55">{h.days}</span>
                <span className="text-right">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* map button */}
      <div className="mx-auto max-w-6xl px-4 pb-10 text-center">
        <a
          href={MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-ember px-7 py-3 text-sm font-medium text-white transition hover:bg-ember-bright"
        >
          <MapPin className="h-4 w-4" />
          Find us on the map
        </a>
      </div>

      {/* bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Ember &amp; Crust. All rights reserved.</p>
          <a
            href="https://fadelysstudio.space-z.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-gold"
          >
            Designed By Fadelys Studio
          </a>
        </div>
      </div>
    </footer>
  );
}
