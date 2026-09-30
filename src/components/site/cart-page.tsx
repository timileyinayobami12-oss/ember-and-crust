"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2, Truck, Store } from "lucide-react";
import { PageBand } from "./menu-page";
import {
  cartTotals,
  FREE_DELIVERY_OVER,
  useCart,
  useRoute,
} from "@/lib/store";
import { formatPrice, MENU, byId } from "@/data/menu";
import { cn } from "@/lib/utils";

export function CartPage() {
  const { lines, setQty, remove, orderType, setOrderType } = useCart();
  const navigate = useRoute((s) => s.navigate);
  const totals = cartTotals(lines, orderType);
  const toFree = FREE_DELIVERY_OVER - totals.subtotal;

  if (lines.length === 0) {
    return (
      <>
        <PageBand title="Your Order" />
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-cream">
            <ShoppingBag className="h-10 w-10 text-ember" strokeWidth={1.5} />
          </div>
          <h2 className="mt-6 font-display text-2xl font-bold text-ink">
            Nothing in the bag yet
          </h2>
          <p className="mt-2 max-w-sm text-[15px] text-black/55">
            The oven is hot and the menu is short. Start with the Hot Honey
            Pepperoni and thank us later.
          </p>
          <button
            onClick={() => navigate("menu")}
            className="mt-7 rounded-full bg-ember px-8 py-3 text-sm font-semibold text-white transition hover:bg-ember-bright active:scale-95"
          >
            Browse the Menu
          </button>

          {/* upsell */}
          <div className="mt-14 w-full">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-black/40">
              Popular right now
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {MENU.filter((m) => m.popular && m.category === "pizzas")
                .slice(0, 3)
                .map((m) => (
                  <button
                    key={m.id}
                    onClick={() => navigate("menu")}
                    className="group flex items-center gap-3 rounded-xl border border-black/8 bg-white p-3 text-left shadow-sm transition hover:border-ember/40 hover:shadow-md"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                      <Image src={m.image} alt={m.name} fill sizes="56px" className="object-cover" />
                    </div>
                    <span>
                      <span className="block font-display text-sm font-semibold text-ink">
                        {m.name}
                      </span>
                      <span className="block text-xs text-ember">
                        from {formatPrice(m.sizes![0].price)}
                      </span>
                    </span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageBand title="Your Order" subtitle="Almost there. Check the bag, then checkout." />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1.5fr_1fr]">
        {/* lines */}
        <div className="space-y-4">
          {/* delivery / pickup toggle */}
          <div className="flex rounded-full border border-black/10 bg-white p-1 shadow-sm">
            {(
              [
                { id: "delivery", label: "Delivery", icon: Truck },
                { id: "pickup", label: "Pickup", icon: Store },
              ] as const
            ).map((o) => (
              <button
                key={o.id}
                onClick={() => setOrderType(o.id)}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition",
                  orderType === o.id
                    ? "bg-ember text-white shadow-md shadow-ember/25"
                    : "text-black/55 hover:text-ink"
                )}
                aria-pressed={orderType === o.id}
              >
                <o.icon className="h-4 w-4" />
                {o.label}
              </button>
            ))}
          </div>

          {orderType === "delivery" && toFree > 0 && (
            <p className="rounded-lg bg-gold/15 px-4 py-3 text-center text-sm text-charcoal">
              Add <strong>{formatPrice(toFree)}</strong> more and delivery is on us.
            </p>
          )}
          {orderType === "delivery" && toFree <= 0 && (
            <p className="rounded-lg bg-leaf/10 px-4 py-3 text-center text-sm text-leaf">
              Nice. Delivery is free on this order.
            </p>
          )}

          <ul className="space-y-3">
            {lines.map((l) => (
              <li
                key={l.key}
                className="flex items-center gap-4 rounded-xl border border-black/8 bg-white p-3.5 shadow-sm"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full sm:h-20 sm:w-20">
                  <Image src={l.image} alt={l.name} fill sizes="80px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-[15px] font-semibold text-ink">
                    {l.name}
                  </p>
                  {l.size && (
                    <p className="text-xs uppercase tracking-wider text-black/45">{l.size}</p>
                  )}
                  <p className="mt-0.5 text-sm font-semibold text-ember">
                    {formatPrice(l.price)}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setQty(l.key, l.qty - 1)}
                    aria-label={`Remove one ${l.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-black/12 text-black/60 transition hover:border-ember hover:text-ember active:scale-90"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-7 text-center font-display font-semibold">{l.qty}</span>
                  <button
                    onClick={() => setQty(l.key, l.qty + 1)}
                    aria-label={`Add one ${l.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-black/12 text-black/60 transition hover:border-ember hover:text-ember active:scale-90"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="hidden w-20 text-right font-display font-semibold text-ink sm:block">
                  {formatPrice(l.price * l.qty)}
                </div>
                <button
                  onClick={() => remove(l.key)}
                  aria-label={`Remove ${l.name} from order`}
                  className="ml-1 text-black/30 transition hover:text-ember"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => navigate("menu")}
            className="text-sm font-semibold text-ember underline-offset-4 hover:underline"
          >
            + Add more items
          </button>
        </div>

        {/* summary */}
        <aside className="h-fit rounded-2xl border border-black/8 bg-white p-6 shadow-sm lg:sticky lg:top-40">
          <h2 className="font-display text-xl font-bold text-ink">Order Summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-black/55">Subtotal</dt>
              <dd className="font-medium">{formatPrice(totals.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-black/55">
                Delivery {orderType === "pickup" && "(pickup)"}
              </dt>
              <dd className="font-medium">
                {totals.delivery === 0 ? "Free" : formatPrice(totals.delivery)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-black/55">Tax</dt>
              <dd className="font-medium">{formatPrice(totals.tax)}</dd>
            </div>
            <div className="flex justify-between border-t border-black/10 pt-3 font-display text-lg font-bold text-ink">
              <dt>Total</dt>
              <dd>{formatPrice(totals.total)}</dd>
            </div>
          </dl>
          <button
            onClick={() => navigate("checkout")}
            className="mt-6 w-full rounded-full bg-ember py-3.5 text-sm font-semibold text-white transition hover:bg-ember-bright active:scale-95"
          >
            Checkout
          </button>
          <p className="mt-3 text-center text-xs text-black/45">
            or keep browsing, the oven is not going anywhere
          </p>
        </aside>
      </div>
    </>
  );
}
