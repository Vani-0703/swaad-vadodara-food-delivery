import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-spice shadow-glow">
        <UtensilsCrossed className="h-9 w-9 text-white" />
      </div>
      <h1 className="font-display text-3xl font-extrabold text-ink-900">Page not found</h1>
      <p className="max-w-sm text-ink-400">We looked everywhere on the menu but couldn't find this page.</p>
      <Button asChild size="lg">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
