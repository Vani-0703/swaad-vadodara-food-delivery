"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Heart, Leaf } from "lucide-react";
import { SafeImage } from "@/components/shared/safe-image";
import { RatingBadge } from "@/components/shared/rating-badge";
import { Badge } from "@/components/ui/badge";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import type { Restaurant } from "@/lib/types";
import { formatINR } from "@/lib/utils";

export function RestaurantCard({ restaurant, index = 0 }: { restaurant: Restaurant; index?: number }) {
  const { has, toggle } = useWishlistStore();
  const wished = has(restaurant.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 8) * 0.05 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-ink-900/5 bg-white shadow-card transition-shadow hover:shadow-card-hover"
    >
      <Link href={`/restaurant/${restaurant.slug}`}>
        <div className="relative h-44 w-full overflow-hidden">
          <SafeImage
            src={restaurant.banner}
            alt={restaurant.name}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />

          {restaurant.offers[0] && (
            <div className="absolute bottom-2 left-2">
              <Badge variant="offer" className="bg-ink-900/70 text-white border-white/30">
                {restaurant.offers[0].label}
              </Badge>
            </div>
          )}

          {restaurant.isTrending && (
            <div className="absolute left-2 top-2">
              <Badge>🔥 Trending</Badge>
            </div>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              toggle(restaurant.id);
            }}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-transform hover:scale-110"
            aria-label="Toggle wishlist"
          >
            <Heart className={wished ? "h-4 w-4 fill-chili-500 text-chili-500" : "h-4 w-4 text-ink-700"} />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-bold leading-tight text-ink-900 line-clamp-1">{restaurant.name}</h3>
            <RatingBadge rating={restaurant.rating} />
          </div>
          <p className="mt-1 line-clamp-1 text-sm text-ink-400">{restaurant.cuisines.join(", ")}</p>
          <div className="mt-2 flex items-center justify-between text-sm text-ink-400">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {restaurant.deliveryTimeMinutes} mins
            </span>
            <span>{formatINR(restaurant.priceForTwo)} for two</span>
          </div>
          {restaurant.isPureVeg && (
            <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-basil-500">
              <Leaf className="h-3.5 w-3.5" /> Pure Veg
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
