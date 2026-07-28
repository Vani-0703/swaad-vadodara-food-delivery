"use client";

import Link from "next/link";
import { HeartOff } from "lucide-react";
import { RestaurantCard } from "@/components/restaurant/restaurant-card";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { restaurants } from "@/lib/data/restaurants";

export default function WishlistPage() {
  const restaurantIds = useWishlistStore((s) => s.restaurantIds);
  const wishlisted = restaurants.filter((r) => restaurantIds.includes(r.id));

  return (
    <div className="container-page py-10">
      <h1 className="font-display text-3xl font-extrabold text-ink-900">Your Wishlist</h1>
      <p className="mt-1 text-sm text-ink-400">Restaurants you've saved for later</p>

      {wishlisted.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
          <HeartOff className="h-12 w-12 text-ink-400" />
          <p className="font-display text-lg font-bold text-ink-900">Your wishlist is empty</p>
          <p className="text-sm text-ink-400">Tap the heart icon on any restaurant to save it here.</p>
          <Button asChild size="lg" className="mt-2">
            <Link href="/restaurants">Explore restaurants</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {wishlisted.map((r, i) => (
            <RestaurantCard key={r.id} restaurant={r} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
