"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchX } from "lucide-react";
import { RestaurantCard } from "@/components/restaurant/restaurant-card";
import { RestaurantFilters, type FilterState } from "@/components/restaurant/restaurant-filters";
import { restaurants } from "@/lib/data/restaurants";
import { searchMenuItems } from "@/lib/data/menu-items";

const allCuisines = Array.from(new Set(restaurants.flatMap((r) => r.cuisines))).slice(0, 10);

export default function RestaurantsPage() {
  return (
    <Suspense fallback={<div className="container-page py-24 text-center text-ink-400">Loading restaurants…</div>}>
      <RestaurantsPageContent />
    </Suspense>
  );
}

function RestaurantsPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() ?? "";
  const categoryParam = searchParams.get("category");

  const [filters, setFilters] = useState<FilterState>({
    pureVeg: false,
    sortBy: "rating",
    cuisine: categoryParam,
  });

  const matchingRestaurantIdsFromDishes = useMemo(() => {
    if (!query) return new Set<string>();
    return new Set(searchMenuItems(query).map((item) => item.restaurantId));
  }, [query]);

  const filtered = useMemo(() => {
    let list = restaurants.filter((r) => {
      if (query) {
        const matchesName = r.name.toLowerCase().includes(query);
        const matchesCuisine = r.cuisines.some((c) => c.toLowerCase().includes(query));
        const matchesDish = matchingRestaurantIdsFromDishes.has(r.id);
        if (!matchesName && !matchesCuisine && !matchesDish) return false;
      }
      if (filters.pureVeg && !r.isPureVeg) return false;
      if (filters.cuisine) {
        const matchesCuisine = r.cuisines.some((c) => c.toLowerCase() === filters.cuisine!.toLowerCase());
        const matchesTag = r.tags.some((t) => t.toLowerCase() === filters.cuisine!.toLowerCase());
        if (!matchesCuisine && !matchesTag) return false;
      }
      return true;
    });

    switch (filters.sortBy) {
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "delivery_time":
        list = [...list].sort((a, b) => a.deliveryTimeMinutes - b.deliveryTimeMinutes);
        break;
      case "price_low":
        list = [...list].sort((a, b) => a.priceForTwo - b.priceForTwo);
        break;
      case "price_high":
        list = [...list].sort((a, b) => b.priceForTwo - a.priceForTwo);
        break;
    }
    return list;
  }, [query, filters, matchingRestaurantIdsFromDishes]);

  return (
    <div className="container-page py-8">
      <div className="mb-2">
        <h1 className="font-display text-2xl font-extrabold text-ink-900 sm:text-3xl">
          {query ? `Results for "${query}"` : "Restaurants in Vadodara"}
        </h1>
        <p className="text-sm text-ink-400">{filtered.length} restaurants delivering to you</p>
      </div>

      <div className="sticky top-20 z-20 -mx-4 bg-cream/95 px-4 py-3 backdrop-blur">
        <RestaurantFilters filters={filters} onChange={setFilters} cuisines={allCuisines} />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
          <SearchX className="h-12 w-12 text-ink-400" />
          <p className="font-display text-lg font-bold text-ink-900">No restaurants found</p>
          <p className="text-sm text-ink-400">Try a different search term or clear your filters.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((r, i) => (
            <RestaurantCard key={r.id} restaurant={r} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
