"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CreditCard, MapPin, Wallet, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/store/cart-store";
import { useOrderStore } from "@/lib/store/order-store";
import { menuItems } from "@/lib/data/menu-items";
import { restaurants } from "@/lib/data/restaurants";
import { formatINR } from "@/lib/utils";
import type { Order } from "@/lib/types";

const DELIVERY_FEE = 35;

const paymentMethods = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "upi", label: "UPI", icon: Wallet },
  { id: "cod", label: "Cash on Delivery", icon: Banknote },
];

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="container-page py-24 text-center text-ink-400">Loading checkout…</div>}>
      <CheckoutPageContent />
    </Suspense>
  );
}

function CheckoutPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const discount = Number(searchParams.get("discount") ?? 0);

  const { lines, subtotal, restaurantId, clearCart } = useCartStore();
  const placeOrder = useOrderStore((s) => s.placeOrder);

  const [address, setAddress] = useState("");
  const [method, setMethod] = useState("card");
  const [processing, setProcessing] = useState(false);

  const restaurant = restaurants.find((r) => r.id === restaurantId);
  const cartItems = lines
    .map((line) => ({ line, item: menuItems.find((m) => m.id === line.itemId) }))
    .filter((x) => x.item);

  const sub = subtotal();
  const total = Math.max(0, sub + DELIVERY_FEE - discount);

  async function handlePayment() {
    if (!address.trim()) return;
    setProcessing(true);

    // In production this calls /api/checkout to create a real Stripe
    // Checkout Session and redirects to session.url. Here we simulate the
    // round trip so the flow is fully testable without live Stripe keys.
    await new Promise((r) => setTimeout(r, 900));

    const order: Order = {
      id: `SW${Date.now().toString().slice(-8)}`,
      restaurantId: restaurantId ?? "",
      items: cartItems.map(({ line, item }) => ({
        itemId: line.itemId,
        quantity: line.quantity,
        price: item!.price,
        name: item!.name,
      })),
      status: "placed",
      total,
      placedAt: new Date().toISOString(),
      eta: new Date(Date.now() + (restaurant?.deliveryTimeMinutes ?? 30) * 60000).toISOString(),
      address,
    };

    placeOrder(order);
    clearCart();
    router.push(`/checkout/success?orderId=${order.id}`);
  }

  if (cartItems.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <p className="text-ink-400">Your cart is empty.</p>
        <Button className="mt-4" onClick={() => router.push("/restaurants")}>
          Browse restaurants
        </Button>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <h1 className="font-display text-3xl font-extrabold text-ink-900">Checkout</h1>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-ink-900/5 bg-white p-5 shadow-card">
            <p className="mb-3 flex items-center gap-2 font-display font-bold text-ink-900">
              <MapPin className="h-4 w-4 text-chili-500" /> Delivery address
            </p>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Flat / house no., street, area, landmark — Vadodara"
              className="h-12"
            />
            <p className="mt-2 text-xs text-ink-400">
              Full map-based address picker uses Google Maps Places Autocomplete once NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is set.
            </p>
          </div>

          <div className="rounded-2xl border border-ink-900/5 bg-white p-5 shadow-card">
            <p className="mb-3 font-display font-bold text-ink-900">Payment method</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {paymentMethods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`flex flex-col items-center gap-2 rounded-2xl border p-4 transition-colors ${
                    method === m.id ? "border-chili-500 bg-chili-50" : "border-ink-900/10 bg-white"
                  }`}
                >
                  <m.icon className={`h-6 w-6 ${method === m.id ? "text-chili-600" : "text-ink-400"}`} />
                  <span className="text-xs font-semibold text-ink-700">{m.label}</span>
                </button>
              ))}
            </div>
            {method !== "cod" && (
              <p className="mt-3 text-xs text-ink-400">
                Secured by Stripe — you'll be redirected to a hosted payment page to complete your {method === "card" ? "card" : "UPI"} payment.
              </p>
            )}
          </div>
        </div>

        <div className="h-fit rounded-2xl border border-ink-900/5 bg-white p-5 shadow-card">
          <h2 className="font-display text-lg font-bold text-ink-900">Order Summary</h2>
          <p className="text-sm text-ink-400">{restaurant?.name}</p>
          <Separator className="my-4" />
          <div className="max-h-48 space-y-2 overflow-y-auto text-sm">
            {cartItems.map(({ line, item }) => (
              <div key={line.itemId} className="flex justify-between text-ink-700">
                <span>{item!.name} × {line.quantity}</span>
                <span>{formatINR(item!.price * line.quantity)}</span>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="space-y-2 text-sm text-ink-700">
            <div className="flex justify-between"><span>Item total</span><span>{formatINR(sub)}</span></div>
            <div className="flex justify-between"><span>Delivery fee</span><span>{formatINR(DELIVERY_FEE)}</span></div>
            {discount > 0 && (
              <div className="flex justify-between text-basil-500"><span>Discount</span><span>−{formatINR(discount)}</span></div>
            )}
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between font-display text-lg font-extrabold text-ink-900">
            <span>Total</span>
            <span>{formatINR(total)}</span>
          </div>
          <Button size="lg" className="mt-5 w-full" disabled={!address.trim() || processing} onClick={handlePayment}>
            {processing ? "Processing…" : `Pay ${formatINR(total)}`}
          </Button>
        </div>
      </div>
    </div>
  );
}
