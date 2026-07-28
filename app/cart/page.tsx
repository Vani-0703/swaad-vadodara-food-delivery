"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingBag, Tag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SafeImage } from "@/components/shared/safe-image";
import { useCartStore } from "@/lib/store/cart-store";
import { menuItems } from "@/lib/data/menu-items";
import { restaurants } from "@/lib/data/restaurants";
import { coupons, applyCoupon } from "@/lib/data/coupons";
import { formatINR } from "@/lib/utils";

const DELIVERY_FEE = 35;

export default function CartPage() {
  const router = useRouter();
  const { lines, addItem, decrementItem, removeItem, subtotal, restaurantId } = useCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  const restaurant = restaurants.find((r) => r.id === restaurantId);
  const cartItems = lines
    .map((line) => ({ line, item: menuItems.find((m) => m.id === line.itemId) }))
    .filter((x) => x.item);

  const sub = subtotal();
  const total = Math.max(0, sub + DELIVERY_FEE - appliedDiscount);

  function handleApplyCoupon() {
    const result = applyCoupon(couponCode, sub);
    if (result.valid) {
      setAppliedDiscount(result.discount);
      setAppliedCode(result.coupon.code);
      setCouponMessage(`"${result.coupon.code}" applied — you saved ${formatINR(result.discount)}`);
    } else {
      setAppliedDiscount(0);
      setAppliedCode(null);
      setCouponMessage(result.message);
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="container-page flex flex-col items-center justify-center gap-4 py-24 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ink-50">
          <ShoppingBag className="h-9 w-9 text-ink-400" />
        </div>
        <h1 className="font-display text-2xl font-bold text-ink-900">Your cart is empty</h1>
        <p className="text-sm text-ink-400">Looks like you haven't added anything yet.</p>
        <Button asChild size="lg">
          <Link href="/restaurants">Browse restaurants</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <h1 className="font-display text-3xl font-extrabold text-ink-900">Your Cart</h1>
      {restaurant && <p className="mt-1 text-ink-400">Ordering from {restaurant.name}, {restaurant.address.area}</p>}

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-3">
          {cartItems.map(({ line, item }) => (
            <div key={line.itemId} className="flex items-center gap-4 rounded-2xl border border-ink-900/5 bg-white p-4 shadow-card">
              <SafeImage src={item!.image} alt={item!.name} width={72} height={72} className="h-[72px] w-[72px] rounded-xl object-cover" />
              <div className="flex-1">
                <p className="font-display font-bold text-ink-900">{item!.name}</p>
                <p className="text-sm text-ink-400">{formatINR(item!.price)} each</p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-ink-900/10 px-1.5 py-1">
                <button onClick={() => decrementItem(line.itemId)} className="p-1.5 text-chili-600" aria-label="Decrease">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-5 text-center text-sm font-bold">{line.quantity}</span>
                <button onClick={() => addItem(line.itemId, line.restaurantId)} className="p-1.5 text-chili-600" aria-label="Increase">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <p className="w-20 text-right font-mono font-bold text-ink-900">{formatINR(item!.price * line.quantity)}</p>
              <button onClick={() => removeItem(line.itemId)} className="text-ink-400 hover:text-chili-600" aria-label="Remove">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          <div className="rounded-2xl border border-ink-900/5 bg-white p-4 shadow-card">
            <p className="mb-2 flex items-center gap-2 text-sm font-bold text-ink-900">
              <Tag className="h-4 w-4 text-chili-500" /> Apply coupon
            </p>
            <div className="flex gap-2">
              <Input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Enter coupon code"
                className="h-11"
              />
              <Button variant="secondary" onClick={handleApplyCoupon}>
                Apply
              </Button>
            </div>
            {couponMessage && (
              <p className={`mt-2 text-sm ${appliedCode ? "text-basil-500" : "text-chili-600"}`}>{couponMessage}</p>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              {coupons.map((c) => (
                <button
                  key={c.code}
                  onClick={() => setCouponCode(c.code)}
                  className="rounded-full border border-dashed border-turmeric-500 bg-turmeric-500/5 px-3 py-1 text-xs font-bold text-turmeric-600"
                >
                  {c.code}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="h-fit rounded-2xl border border-ink-900/5 bg-white p-5 shadow-card">
          <h2 className="font-display text-lg font-bold text-ink-900">Bill Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-ink-700">
              <span>Item total</span>
              <span>{formatINR(sub)}</span>
            </div>
            <div className="flex justify-between text-ink-700">
              <span>Delivery fee</span>
              <span>{formatINR(DELIVERY_FEE)}</span>
            </div>
            {appliedDiscount > 0 && (
              <div className="flex justify-between text-basil-500">
                <span>Coupon discount</span>
                <span>−{formatINR(appliedDiscount)}</span>
              </div>
            )}
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between font-display text-lg font-extrabold text-ink-900">
            <span>To pay</span>
            <span>{formatINR(total)}</span>
          </div>
          <Button
            size="lg"
            className="mt-5 w-full"
            onClick={() =>
              router.push(
                `/checkout?discount=${appliedDiscount}&coupon=${appliedCode ?? ""}`
              )
            }
          >
            Proceed to checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
