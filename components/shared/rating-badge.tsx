import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The signature "plate-ring" rating badge used across restaurant and
 * food cards — a conic gradient ring (chili -> mango -> turmeric)
 * evoking a thali rim, filled proportionally to the rating.
 */
export function RatingBadge({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const color = rating >= 4 ? "text-basil-500" : rating >= 3 ? "text-turmeric-600" : "text-chili-600";
  return (
    <div
      className={cn(
        "plate-ring inline-flex",
        size === "sm" ? "text-[11px]" : "text-sm"
      )}
    >
      <div className={cn("flex items-center gap-1 rounded-full bg-white font-bold", color, size === "sm" ? "px-1.5 py-0.5" : "px-2.5 py-1")}>
        <Star className={cn("fill-current", size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} />
        {rating.toFixed(1)}
      </div>
    </div>
  );
}
