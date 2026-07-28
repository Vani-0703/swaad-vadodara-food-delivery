"use client";

import { motion } from "framer-motion";
import { Plus, Star } from "lucide-react";
import { SafeImage } from "@/components/shared/safe-image";
import { VegDot } from "@/components/shared/veg-dot";
import { useCartStore } from "@/lib/store/cart-store";
import type { MenuItem } from "@/lib/types";
import { formatINR } from "@/lib/utils";

export function PopularDishes({ dishes }: { dishes: MenuItem[] }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <section className="bg-white py-12">
      <div className="container-page">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-extrabold text-ink-900 sm:text-3xl">Popular dishes near you</h2>
          <p className="text-sm text-ink-400">Loved by Vadodara foodies this week</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {dishes.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-ink-900/5 bg-white shadow-card transition-shadow hover:shadow-card-hover"
            >
              <div className="relative h-28 w-full overflow-hidden">
                <SafeImage
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="200px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <button
                  onClick={() => addItem(item.id, item.restaurantId)}
                  className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-spice text-white shadow-glow transition-transform hover:scale-110"
                  aria-label={`Add ${item.name}`}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="p-3">
                <VegDot isVeg={item.isVeg} />
                <p className="mt-1 line-clamp-1 text-sm font-bold text-ink-900">{item.name}</p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-ink-700">{formatINR(item.price)}</span>
                  <span className="flex items-center gap-0.5 text-xs text-ink-400">
                    <Star className="h-3 w-3 fill-turmeric-500 text-turmeric-500" /> {item.rating}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
