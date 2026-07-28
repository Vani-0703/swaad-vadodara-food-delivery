import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chili-500 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-gradient-spice text-white shadow-glow hover:brightness-110 active:scale-[0.98]",
        secondary: "bg-white text-ink-900 border border-ink-900/10 shadow-card hover:shadow-card-hover",
        outline: "border-2 border-chili-500 text-chili-600 bg-transparent hover:bg-chili-50",
        ghost: "bg-transparent hover:bg-ink-900/5 text-ink-900",
        glass: "glass text-ink-900 hover:bg-white/80",
        link: "text-chili-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
