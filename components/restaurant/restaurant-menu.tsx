"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { FoodItemCard } from "@/components/restaurant/food-item-card";
import type { MenuItem } from "@/lib/types";

export function RestaurantMenu({ items }: { items: MenuItem[] }) {
  const categories = useMemo(() => Array.from(new Set(items.map((i) => i.category))), [items]);
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter((i) => i.name.toLowerCase().includes(q));
  }, [items, query]);

  return (
    <div>
      <div className="relative mb-5">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search dishes on this menu"
          className="pl-10"
        />
      </div>

      {query.trim() ? (
        <div>
          {filteredItems.length === 0 ? (
            <p className="py-10 text-center text-sm text-ink-400">No dishes match "{query}"</p>
          ) : (
            filteredItems.map((item) => <FoodItemCard key={item.id} item={item} />)
          )}
        </div>
      ) : (
        <Tabs defaultValue={categories[0]}>
          <TabsList className="scrollbar-hide flex-wrap justify-start gap-1 overflow-x-auto">
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((cat) => (
            <TabsContent key={cat} value={cat}>
              {items.filter((i) => i.category === cat).map((item) => (
                <FoodItemCard key={item.id} item={item} />
              ))}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
