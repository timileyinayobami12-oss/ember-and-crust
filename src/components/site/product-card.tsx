"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { formatPrice, type MenuItem } from "@/data/menu";
import { useCart, useRoute } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function ProductCard({
  item,
  featured = false,
}: {
  item: MenuItem;
  featured?: boolean;
}) {
  const add = useCart((s) => s.add);
  const navigate = useRoute((s) => s.navigate);
  const { toast } = useToast();
  const [size, setSize] = useState(item.sizes ? item.sizes[0].label : undefined);
  const price =
    item.sizes && size
      ? (item.sizes.find((s) => s.label === size)?.price ?? item.sizes[0].price)
      : (item.price ?? 0);

  const handleAdd = () => {
    add(item, { size, price });
    toast({
      title: "Added to your order",
      description: `${item.name}${size ? ` · ${size}` : ""} · ${formatPrice(price)}`,
    });
  };

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-xl border bg-white text-center transition-all duration-300",
        featured
          ? "border-ember p-6 shadow-xl shadow-ember/15 lg:-translate-y-3"
          : "border-black/8 p-5 shadow-sm hover:-translate-y-1 hover:border-ember/40 hover:shadow-lg"
      )}
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ember px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
          Most Loved
        </span>
      )}

      <button
        onClick={() => navigate("menu", { menuCategory: item.category })}
        className="relative mx-auto block aspect-square w-40 overflow-hidden rounded-full sm:w-44"
        aria-label={`View ${item.name} in the menu`}
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="180px"
          className="object-cover transition-transform duration-500 group-hover:scale-108"
        />
      </button>

      <h3 className="mt-5 font-display text-xl font-semibold text-ink">{item.name}</h3>
      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-black/55">
        {item.description}
      </p>

      {item.sizes ? (
        <div className="mt-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-black/40">
            Pick size
          </p>
          <div className="mt-2 flex justify-center gap-2">
            {item.sizes.map((s) => (
              <button
                key={s.label}
                onClick={() => setSize(s.label)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-medium transition",
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
          <p className="mt-3 font-display text-2xl font-semibold text-ember">
            {formatPrice(price)}
          </p>
        </div>
      ) : (
        <p className="mt-3 font-display text-2xl font-semibold text-ember">
          {formatPrice(price)}
        </p>
      )}

      <button
        onClick={handleAdd}
        className="mt-4 inline-flex items-center justify-center gap-2 self-center rounded-full bg-ember px-6 py-2.5 text-sm font-medium text-white transition hover:bg-ember-bright active:scale-95"
      >
        <Plus className="h-4 w-4" />
        Add to Cart
      </button>
    </article>
  );
}

/** compact card used in "Goes Great With" row and menu grid */
export function QuickCard({ item }: { item: MenuItem }) {
  const add = useCart((s) => s.add);
  const { toast } = useToast();
  const price = item.price ?? item.sizes?.[0].price ?? 0;

  const handleAdd = () => {
    add(item, { price });
    toast({
      title: "Added to your order",
      description: `${item.name} · ${formatPrice(price)}`,
    });
  };

  return (
    <article className="group flex flex-col items-center rounded-lg p-3 text-center transition hover:bg-black/[0.02]">
      <div className="relative aspect-square w-28 overflow-hidden rounded-full sm:w-32">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="130px"
          className="object-cover transition-transform duration-500 group-hover:scale-108"
        />
      </div>
      <h3 className="mt-3 font-display text-[15px] font-semibold text-ink">{item.name}</h3>
      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-black/40">
        {item.category === "pizzas" ? "Pizza" : item.category.replace(/s$/, "")}
      </p>
      <p className="mt-1.5 text-sm font-semibold text-ember">{formatPrice(price)}</p>
      <button
        onClick={handleAdd}
        aria-label={`Add ${item.name} to order`}
        className="mt-2.5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-ember/40 text-ember transition hover:bg-ember hover:text-white active:scale-90"
      >
        <Plus className="h-4 w-4" />
      </button>
    </article>
  );
}
