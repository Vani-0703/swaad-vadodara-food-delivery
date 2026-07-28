"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order } from "@/lib/types";

interface OrderState {
  orders: Order[];
  placeOrder: (order: Order) => void;
  getOrder: (id: string) => Order | undefined;
  advanceStatus: (id: string) => void;
}

const statusFlow: Order["status"][] = ["placed", "confirmed", "preparing", "picked_up", "on_the_way", "delivered"];

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      placeOrder: (order) => set({ orders: [order, ...get().orders] }),
      getOrder: (id) => get().orders.find((o) => o.id === id),
      advanceStatus: (id) => {
        set({
          orders: get().orders.map((o) => {
            if (o.id !== id) return o;
            const idx = statusFlow.indexOf(o.status);
            const next = statusFlow[Math.min(idx + 1, statusFlow.length - 1)];
            return { ...o, status: next };
          }),
        });
      },
    }),
    { name: "swaad-orders" }
  )
);
