"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, MapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="container-page flex flex-col items-center justify-center gap-4 py-24 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className="flex h-24 w-24 items-center justify-center rounded-full bg-basil-500/10"
      >
        <CheckCircle2 className="h-14 w-14 text-basil-500" />
      </motion.div>
      <h1 className="font-display text-3xl font-extrabold text-ink-900">Order placed!</h1>
      <p className="max-w-sm text-ink-400">
        Your order {orderId && <span className="font-mono font-bold text-ink-700">#{orderId}</span>} has been confirmed.
        The restaurant is preparing your food now.
      </p>
      <div className="mt-4 flex gap-3">
        {orderId && (
          <Button size="lg" asChild>
            <Link href={`/orders/${orderId}`}>
              <MapIcon className="h-4 w-4" /> Track order
            </Link>
          </Button>
        )}
        <Button size="lg" variant="secondary" asChild>
          <Link href="/restaurants">Order more food</Link>
        </Button>
      </div>
    </div>
  );
}
