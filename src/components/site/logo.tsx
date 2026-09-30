"use client";

import { Flame } from "lucide-react";

export function ScriptLogo({
  className = "",
  size = "text-3xl",
}: {
  className?: string;
  size?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-script leading-none ${size} ${className}`}
    >
      <Flame className="h-[0.85em] w-[0.85em] text-gold" strokeWidth={2.2} />
      <span>
        Ember <span className="text-[0.75em]">&amp;</span> Crust
      </span>
    </span>
  );
}
