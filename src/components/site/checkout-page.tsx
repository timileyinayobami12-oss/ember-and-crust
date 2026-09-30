"use client";

import { useState } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import { PageBand } from "./menu-page";
import { cartTotals, useCart, useRoute } from "@/lib/store";
import { formatPrice } from "@/data/menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Form = {
  name: string;
  phone: string;
  email: string;
  address: string;
  apt: string;
  city: string;
  zip: string;
  when: "asap" | "later";
  payment: "card-online" | "card-delivery" | "cash";
  notes: string;
};

export function CheckoutPage() {
  const { lines, clear, orderType } = useCart();
  const navigate = useRoute((s) => s.navigate);
  const setOrderNumber = useRoute((s) => s.setOrderNumber);
  const totals = cartTotals(lines, orderType);
  const [form, setForm] = useState<Form>({
    name: "",
    phone: "",
    email: "",
    address: "",
    apt: "",
    city: "Chicago",
    zip: "",
    when: "asap",
    payment: "card-online",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof Form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const valid = (f: Form) => {
    const e: Record<string, string> = {};
    if (f.name.trim().length < 2) e.name = "Tell us your name";
    if (!/^[\d\s()+-]{7,}$/.test(f.phone)) e.phone = "A real phone number helps us reach you";
    if (!/.+@.+\..+/.test(f.email)) e.email = "We send the receipt here";
    if (orderType === "delivery") {
      if (f.address.trim().length < 5) e.address = "Street address, please";
      if (!/^\d{5}$/.test(f.zip.trim())) e.zip = "5 digit ZIP";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (lines.length === 0) {
      navigate("menu");
      return;
    }
    if (!valid(form)) return;
    const n = Math.floor(1000 + Math.random() * 9000);
    setOrderNumber(n);
    clear();
    navigate("success");
  };

  const field = (
    key: keyof Form,
    label: string,
    props: React.ComponentProps<typeof Input> = {},
    optional = false
  ) => (
    <div className="space-y-1.5">
      <Label htmlFor={`f-${key}`}>
        {label}
        {optional && <span className="ml-1 font-normal text-black/40">optional</span>}
      </Label>
      <Input
        id={`f-${key}`}
        value={form[key] as string}
        onChange={(e) => set(key, e.target.value)}
        className={cn(errors[key] && "border-ember focus-visible:ring-ember/40")}
        {...props}
      />
      {errors[key] && <p className="text-xs text-ember">{errors[key]}</p>}
    </div>
  );

  return (
    <>
      <PageBand
        title="Checkout"
        subtitle={orderType === "delivery" ? "Delivery in about 30 to 40 minutes." : "Ready for pickup in about 20 minutes."}
      />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1.5fr_1fr]">
        <form onSubmit={placeOrder} noValidate className="space-y-8">
          <fieldset className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm">
            <legend className="-ml-2 px-2 font-display text-lg font-bold text-ink">
              1. Who is this for
            </legend>
            <div className="grid gap-5 sm:grid-cols-2">
              {field("name", "Full name", { placeholder: "Jamie Rivera", autoComplete: "name" })}
              {field("phone", "Phone", { placeholder: "(312) 555 0142", type: "tel", autoComplete: "tel" })}
            </div>
            <div className="mt-5">{field("email", "Email", { placeholder: "jamie@email.com", type: "email", autoComplete: "email" })}</div>
          </fieldset>

          <fieldset className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm">
            <legend className="-ml-2 px-2 font-display text-lg font-bold text-ink">
              2. Where it goes
            </legend>
            <p className="mb-4 text-sm text-black/50">
              {orderType === "delivery"
                ? "Delivering to your door. We cover most of the West Loop."
                : "You chose pickup. We are at 1418 W Fulton Market."}
            </p>
            {orderType === "delivery" ? (
              <div className="grid gap-5 sm:grid-cols-2">
                {field("address", "Street address", { placeholder: "1200 W Monroe St", autoComplete: "street-address" })}
                {field("apt", "Apt / suite", { placeholder: "Apt 3B" }, true)}
                {field("city", "City", { autoComplete: "address-level2" })}
                {field("zip", "ZIP code", { placeholder: "60607", inputMode: "numeric", autoComplete: "postal-code" })}
              </div>
            ) : (
              <div className="rounded-xl bg-cream p-4 text-sm leading-relaxed text-black/60">
                Pickup window opens about 20 minutes after you place the order.
                Grab it at the counter and skip the line by telling us your name.
              </div>
            )}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {(
                [
                  { id: "asap", title: "As soon as possible", sub: orderType === "delivery" ? "30 to 40 min" : "about 20 min" },
                  { id: "later", title: "Schedule it", sub: "choose a time in notes" },
                ] as const
              ).map((o) => (
                <button
                  type="button"
                  key={o.id}
                  onClick={() => set("when", o.id)}
                  className={cn(
                    "rounded-xl border p-4 text-left transition",
                    form.when === o.id
                      ? "border-ember bg-ember/5 shadow-sm"
                      : "border-black/10 hover:border-ember/40"
                  )}
                  aria-pressed={form.when === o.id}
                >
                  <span className="block font-display font-semibold text-ink">{o.title}</span>
                  <span className="mt-0.5 block text-xs text-black/50">{o.sub}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm">
            <legend className="-ml-2 px-2 font-display text-lg font-bold text-ink">
              3. How you pay
            </legend>
            <div className="grid gap-3">
              {(
                [
                  { id: "card-online", title: "Pay online", sub: "Card ending demonstration, sandbox mode" },
                  { id: "card-delivery", title: "Card on delivery or pickup", sub: "Swipe at the door or counter" },
                  { id: "cash", title: "Cash", sub: "Driver carries change" },
                ] as const
              ).map((o) => (
                <button
                  type="button"
                  key={o.id}
                  onClick={() => set("payment", o.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-4 text-left transition",
                    form.payment === o.id
                      ? "border-ember bg-ember/5 shadow-sm"
                      : "border-black/10 hover:border-ember/40"
                  )}
                  aria-pressed={form.payment === o.id}
                >
                  <span
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
                      form.payment === o.id ? "border-ember" : "border-black/25"
                    )}
                  >
                    {form.payment === o.id && (
                      <span className="h-2 w-2 rounded-full bg-ember" />
                    )}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{o.title}</span>
                    <span className="block text-xs text-black/50">{o.sub}</span>
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-5">
              <Label htmlFor="f-notes">
                Notes for the kitchen <span className="ml-1 font-normal text-black/40">optional</span>
              </Label>
              <Textarea
                id="f-notes"
                rows={3}
                placeholder="Ring the upstairs bell, extra napkins, no onions, allergic to tree nuts..."
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
              />
            </div>
          </fieldset>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-ember py-4 text-sm font-semibold text-white shadow-lg shadow-ember/25 transition hover:bg-ember-bright active:scale-95"
          >
            <Lock className="h-4 w-4" />
            Place Order · {formatPrice(totals.total)}
          </button>
        </form>

        {/* summary */}
        <aside className="h-fit rounded-2xl border border-black/8 bg-white p-6 shadow-sm lg:sticky lg:top-40">
          <h2 className="font-display text-xl font-bold text-ink">Your food</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {lines.map((l) => (
              <li key={l.key} className="flex justify-between gap-3">
                <span className="text-black/65">
                  <span className="font-semibold text-ink">{l.qty}×</span> {l.name}
                  {l.size && <span className="block text-xs text-black/40">{l.size}</span>}
                </span>
                <span className="shrink-0 font-medium">{formatPrice(l.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2.5 border-t border-black/10 pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-black/55">Subtotal</dt>
              <dd>{formatPrice(totals.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-black/55">
                {orderType === "delivery" ? "Delivery" : "Pickup"}
              </dt>
              <dd>{totals.delivery === 0 ? "Free" : formatPrice(totals.delivery)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-black/55">Tax</dt>
              <dd>{formatPrice(totals.tax)}</dd>
            </div>
            <div className="flex justify-between border-t border-black/10 pt-3 font-display text-lg font-bold text-ink">
              <dt>Total</dt>
              <dd>{formatPrice(totals.total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </>
  );
}

export function SuccessPage() {
  const orderNumber = useRoute((s) => s.orderNumber);
  const navigate = useRoute((s) => s.navigate);
  const orderType = useCart((s) => s.orderType);
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-leaf/10">
        <CheckCircle2 className="h-12 w-12 text-leaf" strokeWidth={1.5} />
      </div>
      <h1 className="mt-7 font-display text-4xl font-bold uppercase text-ink">
        Order received
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-black/60">
        Your order{" "}
        <span className="font-semibold text-ember">
          #{orderNumber ?? 1024}
        </span>{" "}
        just hit the kitchen and the oven is already at temperature. A
        confirmation text is on its way to your phone.
      </p>
      <p className="mt-4 rounded-full bg-cream px-6 py-2.5 text-sm font-medium text-charcoal">
        {orderType === "delivery"
          ? "Estimated delivery: 30 to 40 minutes"
          : "Estimated pickup: about 20 minutes"}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => navigate("menu")}
          className="rounded-full bg-ember px-7 py-3 text-sm font-semibold text-white transition hover:bg-ember-bright active:scale-95"
        >
          Order Something Else
        </button>
        <button
          onClick={() => navigate("home")}
          className="rounded-full border border-black/15 px-7 py-3 text-sm font-semibold text-ink transition hover:border-ember hover:text-ember active:scale-95"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
