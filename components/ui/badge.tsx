import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "bg-gradient-spice text-white",
        secondary: "bg-ink-50 text-ink-700",
        veg: "bg-basil-500/10 text-basil-500 border border-basil-500",
        nonveg: "bg-chili-500/10 text-chili-600 border border-chili-500",
        outline: "border border-ink-900/15 text-ink-700",
        offer: "bg-turmeric-500/15 text-turmeric-600 border border-dashed border-turmeric-500",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
