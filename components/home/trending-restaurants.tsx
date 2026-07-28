import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RestaurantCard } from "@/components/restaurant/restaurant-card";
import type { Restaurant } from "@/lib/types";

export function TrendingRestaurants({ restaurants }: { restaurants: Restaurant[] }) {
  return (
    <section className="container-page py-12">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900 sm:text-3xl">🔥 Trending in Vadodara</h2>
          <p className="text-sm text-ink-400">Most ordered from this week</p>
        </div>
        <Link href="/restaurants" className="hidden items-center gap-1 text-sm font-semibold text-chili-600 sm:flex">
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {restaurants.slice(0, 8).map((r, i) => (
          <RestaurantCard key={r.id} restaurant={r} index={i} />
        ))}
      </div>
    </section>
  );
}
