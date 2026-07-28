"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { menuItems } from "@/lib/data/menu-items";
import type { CartLine } from "@/lib/types";

interface CartState {
  lines: CartLine[];
  restaurantId: string | null;
  addItem: (itemId: string, restaurantId: string) => void;
  removeItem: (itemId: string) => void;
  decrementItem: (itemId: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      restaurantId: null,

      addItem: (itemId, restaurantId) => {
        const state = get();
        if (state.restaurantId && state.restaurantId !== restaurantId && state.lines.length > 0) {
          // Switching restaurants clears the cart, mirroring Swiggy/Zomato behaviour
          set({ lines: [{ itemId, restaurantId, quantity: 1 }], restaurantId });
          return;
        }
        const existing = state.lines.find((l) => l.itemId === itemId);
        if (existing) {
          set({
            lines: state.lines.map((l) => (l.itemId === itemId ? { ...l, quantity: l.quantity + 1 } : l)),
          });
        } else {
          set({ lines: [...state.lines, { itemId, restaurantId, quantity: 1 }], restaurantId });
        }
      },

      decrementItem: (itemId) => {
        const state = get();
        const existing = state.lines.find((l) => l.itemId === itemId);
        if (!existing) return;
        if (existing.quantity <= 1) {
          const remaining = state.lines.filter((l) => l.itemId !== itemId);
          set({ lines: remaining, restaurantId: remaining.length ? state.restaurantId : null });
        } else {
          set({ lines: state.lines.map((l) => (l.itemId === itemId ? { ...l, quantity: l.quantity - 1 } : l)) });
        }
      },

      removeItem: (itemId) => {
        const remaining = get().lines.filter((l) => l.itemId !== itemId);
        set({ lines: remaining, restaurantId: remaining.length ? get().restaurantId : null });
      },

      clearCart: () => set({ lines: [], restaurantId: null }),

      totalItems: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),

      subtotal: () =>
        get().lines.reduce((sum, l) => {
          const item = menuItems.find((m) => m.id === l.itemId);
          return sum + (item ? item.price * l.quantity : 0);
        }, 0),
    }),
    { name: "swaad-cart" }
  )
);
