"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  restaurantIds: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      restaurantIds: [],
      toggle: (id) => {
        const exists = get().restaurantIds.includes(id);
        set({
          restaurantIds: exists
            ? get().restaurantIds.filter((r) => r !== id)
            : [...get().restaurantIds, id],
        });
      },
      has: (id) => get().restaurantIds.includes(id),
    }),
    { name: "swaad-wishlist" }
  )
);
