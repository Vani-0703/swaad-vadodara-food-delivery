"use client";

import { motion } from "framer-motion";
import { Minus, Plus, Star } from "lucide-react";
import { SafeImage } from "@/components/shared/safe-image";
import { VegDot } from "@/components/shared/veg-dot";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/store/cart-store";
import type { MenuItem } from "@/lib/types";
import { formatINR } from "@/lib/utils";

export function FoodItemCard({ item }: { item: MenuItem }) {
  const { lines, addItem, decrementItem } = useCartStore();
  const line = lines.find((l) => l.itemId === item.id);
  const quantity = line?.quantity ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex gap-4 border-b border-ink-900/5 py-5 last:border-0"
    >
      <div className="flex-1">
        <VegDot isVeg={item.isVeg} />
        <div className="mt-1.5 flex items-center gap-2">
          <h4 className="font-display font-bold text-ink-900">{item.name}</h4>
          {item.isBestseller && <Badge variant="offer">Bestseller</Badge>}
        </div>
        <p className="mt-1 flex items-center gap-1 text-xs text-ink-400">
          <Star className="h-3 w-3 fill-turmeric-500 text-turmeric-500" /> {item.rating} ({item.ratingCount})
        </p>
        <p className="mt-1 font-mono text-sm font-bold text-ink-900">{formatINR(item.price)}</p>
        <p className="mt-1.5 line-clamp-2 max-w-sm text-sm text-ink-400">{item.description}</p>
      </div>

      <div className="relative shrink-0">
        <div className="h-28 w-28 overflow-hidden rounded-2xl shadow-card">
          <SafeImage src={item.image} alt={item.name} width={112} height={112} className="h-full w-full object-cover" />
        </div>
        <div className="absolute -bottom-3 left-1/2 w-[88%] -translate-x-1/2">
          {quantity === 0 ? (
            <Button
              size="sm"
              className="w-full shadow-glow"
              onClick={() => addItem(item.id, item.restaurantId)}
            >
              ADD
            </Button>
          ) : (
            <div className="flex w-full items-center justify-between rounded-full bg-gradient-spice px-2 py-1.5 text-white shadow-glow">
              <button onClick={() => decrementItem(item.id)} aria-label="Decrease quantity">
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-sm font-bold">{quantity}</span>
              <button onClick={() => addItem(item.id, item.restaurantId)} aria-label="Increase quantity">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
