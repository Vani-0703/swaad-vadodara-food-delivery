import { cn } from "@/lib/utils";

export function VegDot({ isVeg }: { isVeg: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex h-4 w-4 items-center justify-center rounded-sm border-2",
        isVeg ? "border-basil-500" : "border-chili-600"
      )}
      title={isVeg ? "Vegetarian" : "Non-vegetarian"}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", isVeg ? "bg-basil-500" : "bg-chili-600")} />
    </span>
  );
}
