"use client";

import { useState } from "react";
import { formatPrice } from "@/data/menu";
import { FREE_DELIVERY_OVER } from "@/lib/store";

export const PHONE_DISPLAY = "(312) 555 0184";
export const PHONE_HREF = "tel:+13125550184";

export const HOURS = [
  { days: "Monday to Thursday", time: "11am to 10pm" },
  { days: "Friday & Saturday", time: "11am to midnight" },
  { days: "Sunday", time: "noon to 9pm" },
];

export const ADDRESS = "1418 W Fulton Market, Chicago, IL 60607";
export const EMAIL = "hello@emberandcrust.com";
export const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=1418+W+Fulton+Market+Chicago+IL";

export function TopInfoBar() {
  return (
    <div className="bg-ember-deep text-white/85 text-xs">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
        <p className="truncate">
          <span className="text-gold">Free delivery</span> on orders over $
          {FREE_DELIVERY_OVER} &nbsp;·&nbsp; Open late on weekends
        </p>
        <div className="hidden items-center gap-4 sm:flex">
          <a href={PHONE_HREF} className="transition hover:text-white">
            {PHONE_DISPLAY}
          </a>
          <span aria-hidden className="text-white/30">
            |
          </span>
          <a href={`mailto:${EMAIL}`} className="transition hover:text-white">
            {EMAIL}
          </a>
        </div>
      </div>
    </div>
  );
}

export function OrderPill({
  count,
  subtotal,
  onClick,
}: {
  count: number;
  subtotal: number;
  onClick: () => void;
}) {
  const [bump, setBump] = useState(false);
  // subtle pulse when count changes
  return (
    <button
      onClick={(e) => {
        setBump(true);
        setTimeout(() => setBump(false), 300);
        onClick();
      }}
      className={`group flex items-center gap-2 rounded-full bg-leaf px-4 py-2 text-sm font-medium text-white shadow-lg shadow-black/20 transition-all duration-300 hover:bg-[#46a34b] hover:shadow-xl ${
        bump ? "scale-105" : "scale-100"
      }`}
      aria-label={
        count > 0
          ? `View your order, ${count} ${count === 1 ? "item" : "items"}`
          : "Your order is empty"
      }
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="17" cy="20" r="1.5" />
        <path d="M2.5 3.5h2l2.2 11.2a1.6 1.6 0 0 0 1.6 1.3h8.6a1.6 1.6 0 0 0 1.6-1.3L20.5 7H5.1" />
      </svg>
      <span className="whitespace-nowrap">
        {count > 0 ? (
          <>
            {count} {count === 1 ? "item" : "items"}
            <span className="mx-1.5 text-white/50">·</span>
            {formatPrice(subtotal)}
          </>
        ) : (
          "Your Order is Empty"
        )}
      </span>
    </button>
  );
}
