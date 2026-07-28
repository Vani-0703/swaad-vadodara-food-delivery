"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Wraps next/image with a graceful gradient fallback if a remote
 * (Unsplash/Pexels) image URL ever 404s or is rate-limited — keeps every
 * card looking intentional instead of showing a broken image icon.
 */
export function SafeImage({ className, alt, ...props }: ImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-chili-500 via-mango-500 to-turmeric-500",
          className
        )}
      >
        <UtensilsCrossed className="h-8 w-8 text-white/80" />
      </div>
    );
  }

  return (
    <Image
      className={className}
      alt={alt}
      onError={() => setErrored(true)}
      {...props}
    />
  );
}
