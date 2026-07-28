"use client";

import { cn } from "@/lib/utils";

export interface FilterState {
  pureVeg: boolean;
  sortBy: "rating" | "delivery_time" | "price_low" | "price_high";
  cuisine: string | null;
}

const sortOptions: { value: FilterState["sortBy"]; label: string }[] = [
  { value: "rating", label: "Rating" },
  { value: "delivery_time", label: "Fastest Delivery" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
];

export function RestaurantFilters({
  filters,
  onChange,
  cuisines,
}: {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  cuisines: string[];
}) {
  return (
    <div className="scrollbar-hide flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
      <button
        onClick={() => onChange({ ...filters, pureVeg: !filters.pureVeg })}
        className={cn(
          "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
          filters.pureVeg
            ? "border-basil-500 bg-basil-500/10 text-basil-500"
            : "border-ink-900/10 bg-white text-ink-700 hover:border-basil-500"
        )}
      >
        🌱 Pure Veg
      </button>

      {sortOptions.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange({ ...filters, sortBy: opt.value })}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
            filters.sortBy === opt.value
              ? "border-transparent bg-gradient-spice text-white shadow-glow"
              : "border-ink-900/10 bg-white text-ink-700 hover:border-chili-500"
          )}
        >
          {opt.label}
        </button>
      ))}

      <span className="mx-1 h-6 w-px shrink-0 bg-ink-900/10" />

      {cuisines.map((cuisine) => (
        <button
          key={cuisine}
          onClick={() => onChange({ ...filters, cuisine: filters.cuisine === cuisine ? null : cuisine })}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
            filters.cuisine === cuisine
              ? "border-transparent bg-gradient-berry text-white shadow-glow"
              : "border-ink-900/10 bg-white text-ink-700 hover:border-berry-500"
          )}
        >
          {cuisine}
        </button>
      ))}
    </div>
  );
}
