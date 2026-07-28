"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, ChefHat, Bike, PackageCheck, Clock } from "lucide-react";
import { MapView } from "@/components/shared/map-view";
import { Button } from "@/components/ui/button";
import { useOrderStore } from "@/lib/store/order-store";
import { restaurants } from "@/lib/data/restaurants";
import { formatINR } from "@/lib/utils";
import type { OrderStatus } from "@/lib/types";

const steps: { status: OrderStatus; label: string; icon: typeof CheckCircle2 }[] = [
  { status: "placed", label: "Order placed", icon: CheckCircle2 },
  { status: "confirmed", label: "Confirmed", icon: CheckCircle2 },
  { status: "preparing", label: "Preparing your food", icon: ChefHat },
  { status: "picked_up", label: "Picked up by rider", icon: PackageCheck },
  { status: "on_the_way", label: "On the way", icon: Bike },
  { status: "delivered", label: "Delivered", icon: CheckCircle2 },
];

export function OrderTrackingClient({ orderId }: { orderId: string }) {
  const order = useOrderStore((s) => s.getOrder(orderId));
  const advanceStatus = useOrderStore((s) => s.advanceStatus);

  // Demo-only: simulate a rider progressing through statuses every few
  // seconds so the tracking UI is fully explorable without a live backend.
  useEffect(() => {
    if (!order || order.status === "delivered") return;
    const timer = setInterval(() => advanceStatus(orderId), 6000);
    return () => clearInterval(timer);
  }, [orderId, order, advanceStatus]);

  if (!order) {
    return (
      <div className="container-page flex flex-col items-center gap-3 py-24 text-center">
        <p className="font-display text-lg font-bold text-ink-900">Order not found in this browser</p>
        <p className="max-w-sm text-sm text-ink-400">
          Order history is stored locally in this demo. Place a new order to see live tracking.
        </p>
        <Button asChild size="lg">
          <Link href="/restaurants">Browse restaurants</Link>
        </Button>
      </div>
    );
  }

  const restaurant = restaurants.find((r) => r.id === order.restaurantId);
  const currentIndex = steps.findIndex((s) => s.status === order.status);

  return (
    <div className="container-page py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-ink-900">Order #{order.id}</h1>
          <p className="text-sm text-ink-400">{restaurant?.name} · {restaurant?.address.area}</p>
        </div>
        <Button variant="secondary" asChild>
          <Link href="/orders">All orders</Link>
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr]">
        <MapView
          center={{ lat: restaurant?.address.lat ?? 22.3072, lng: restaurant?.address.lng ?? 73.1812 }}
          destination={{ lat: restaurant?.address.lat ?? 22.3072, lng: restaurant?.address.lng ?? 73.1812 }}
          riderPosition={{ lat: (restaurant?.address.lat ?? 22.3072) + 0.01, lng: (restaurant?.address.lng ?? 73.1812) + 0.01 }}
          className="h-80 w-full lg:h-full"
        />

        <div className="rounded-2xl border border-ink-900/5 bg-white p-6 shadow-card">
          <p className="flex items-center gap-2 text-sm font-semibold text-chili-600">
            <Clock className="h-4 w-4" /> Arriving by {new Date(order.eta).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
          </p>

          <div className="mt-6 space-y-6">
            {steps.map((step, i) => {
              const done = i <= currentIndex;
              return (
                <div key={step.status} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full ${
                        done ? "bg-gradient-spice text-white shadow-glow" : "bg-ink-50 text-ink-400"
                      }`}
                    >
                      <step.icon className="h-4 w-4" />
                    </div>
                    {i < steps.length - 1 && <div className={`mt-1 h-8 w-0.5 ${done ? "bg-chili-500" : "bg-ink-100"}`} />}
                  </div>
                  <p className={`pt-1.5 text-sm font-semibold ${done ? "text-ink-900" : "text-ink-400"}`}>{step.label}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 border-t border-ink-900/10 pt-4">
            <p className="mb-2 text-sm font-bold text-ink-900">Items</p>
            {order.items.map((item) => (
              <div key={item.itemId} className="flex justify-between text-sm text-ink-700">
                <span>{item.name} × {item.quantity}</span>
                <span>{formatINR(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="mt-2 flex justify-between border-t border-ink-900/10 pt-2 font-bold text-ink-900">
              <span>Total</span>
              <span>{formatINR(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
