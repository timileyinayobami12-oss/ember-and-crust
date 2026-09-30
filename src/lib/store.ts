"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { byId, type MenuItem } from "@/data/menu";

export type Page =
  | "home"
  | "menu"
  | "about"
  | "contact"
  | "cart"
  | "checkout"
  | "success";

export type CartLine = {
  key: string;
  itemId: string;
  name: string;
  size?: string;
  price: number;
  qty: number;
  image: string;
};

export type OrderType = "delivery" | "pickup";

export const DELIVERY_FEE = 3.99;
export const FREE_DELIVERY_OVER = 30;
export const TAX_RATE = 0.08875;

type RouteState = {
  page: Page;
  menuCategory: string;
  orderNumber: number | null;
  navigate: (page: Page, opts?: { menuCategory?: string }) => void;
  setOrderNumber: (n: number | null) => void;
};

export const useRoute = create<RouteState>((set) => ({
  page: "home",
  menuCategory: "all",
  orderNumber: null,
  navigate: (page, opts) =>
    set((s) => ({
      page,
      menuCategory: opts?.menuCategory ?? (page === "menu" ? s.menuCategory : "all"),
    })),
  setOrderNumber: (n) => set({ orderNumber: n }),
}));

type CartState = {
  lines: CartLine[];
  orderType: OrderType;
  add: (
    item: MenuItem,
    opts?: { size?: string; price?: number; qty?: number }
  ) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  setOrderType: (t: OrderType) => void;
  count: () => number;
  subtotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      orderType: "delivery",
      add: (item, opts) => {
        const size = opts?.size;
        const price =
          opts?.price ??
          (size && item.sizes
            ? (item.sizes.find((s) => s.label === size)?.price ?? item.sizes[0].price)
            : (item.price ?? item.sizes?.[0].price ?? 0));
        const key = `${item.id}${size ? `::${size}` : ""}`;
        set((s) => {
          const existing = s.lines.find((l) => l.key === key);
          const qty = opts?.qty ?? 1;
          if (existing) {
            return {
              lines: s.lines.map((l) =>
                l.key === key ? { ...l, qty: l.qty + qty } : l
              ),
            };
          }
          return {
            lines: [
              ...s.lines,
              {
                key,
                itemId: item.id,
                name: item.name,
                size,
                price,
                qty,
                image: item.image,
              },
            ],
          };
        });
      },
      setQty: (key, qty) =>
        set((s) => ({
          lines:
            qty <= 0
              ? s.lines.filter((l) => l.key !== key)
              : s.lines.map((l) => (l.key === key ? { ...l, qty } : l)),
        })),
      remove: (key) =>
        set((s) => ({ lines: s.lines.filter((l) => l.key !== key) })),
      clear: () => set({ lines: [] }),
      setOrderType: (t) => set({ orderType: t }),
      count: () => get().lines.reduce((n, l) => n + l.qty, 0),
      subtotal: () => get().lines.reduce((n, l) => n + l.qty * l.price, 0),
    }),
    {
      name: "ember-crust-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const itemFromLine = (line: CartLine) => byId(line.itemId);

export const cartTotals = (lines: CartLine[], orderType: OrderType) => {
  const subtotal = lines.reduce((n, l) => n + l.qty * l.price, 0);
  const delivery =
    orderType === "delivery" && (subtotal === 0 || subtotal >= FREE_DELIVERY_OVER)
      ? 0
      : orderType === "delivery"
        ? DELIVERY_FEE
        : 0;
  const tax = subtotal * TAX_RATE;
  return {
    subtotal,
    delivery,
    tax,
    total: subtotal + delivery + tax,
  };
};
