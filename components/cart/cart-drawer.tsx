"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SafeImage } from "@/components/shared/safe-image";
import { useCartStore } from "@/lib/store/cart-store";
import { menuItems } from "@/lib/data/menu-items";
import { restaurants } from "@/lib/data/restaurants";
import { formatINR } from "@/lib/utils";

export function CartDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { lines, addItem, decrementItem, removeItem, subtotal, restaurantId } = useCartStore();
  const restaurant = restaurants.find((r) => r.id === restaurantId);

  const cartItems = lines
    .map((line) => ({ line, item: menuItems.find((m) => m.id === line.itemId) }))
    .filter((x) => x.item);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col p-0">
        <div className="border-b border-ink-900/10 p-5">
          <h2 className="font-display text-xl font-bold">Your Cart</h2>
          {restaurant && <p className="text-sm text-ink-400">Ordering from {restaurant.name}</p>}
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink-50">
              <ShoppingBag className="h-7 w-7 text-ink-400" />
            </div>
            <p className="font-semibold text-ink-700">Your cart is empty</p>
            <p className="text-sm text-ink-400">Add dishes from a restaurant to get started.</p>
            <Button onClick={() => onOpenChange(false)} asChild>
              <Link href="/restaurants">Browse restaurants</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {cartItems.map(({ line, item }) => (
                <div key={line.itemId} className="flex gap-3">
                  <SafeImage
                    src={item!.image}
                    alt={item!.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink-900">{item!.name}</p>
                    <p className="text-sm text-ink-400">{formatINR(item!.price)}</p>
                    <div className="mt-1.5 flex items-center gap-3">
                      <div className="flex items-center gap-2 rounded-full border border-ink-900/10 px-1">
                        <button onClick={() => decrementItem(line.itemId)} className="p-1.5 text-chili-600" aria-label="Decrease quantity">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-4 text-center text-sm font-bold">{line.quantity}</span>
                        <button onClick={() => addItem(line.itemId, line.restaurantId)} className="p-1.5 text-chili-600" aria-label="Increase quantity">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button onClick={() => removeItem(line.itemId)} className="text-ink-400 hover:text-chili-600" aria-label="Remove item">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-ink-900/10 p-5">
              <div className="flex items-center justify-between text-sm text-ink-400">
                <span>Subtotal</span>
                <span className="font-semibold text-ink-900">{formatINR(subtotal())}</span>
              </div>
              <Separator className="my-3" />
              <Button className="w-full" size="lg" asChild onClick={() => onOpenChange(false)}>
                <Link href="/cart">Go to cart</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
