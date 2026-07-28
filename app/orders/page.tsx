"use client";

import Link from "next/link";
import { PackageSearch } from "lucide-react";
import { useOrderStore } from "@/lib/store/order-store";
import { restaurants } from "@/lib/data/restaurants";
import { formatINR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const statusLabels: Record<string, string> = {
  placed: "Order Placed",
  confirmed: "Confirmed",
  preparing: "Preparing",
  picked_up: "Picked Up",
  on_the_way: "On the way",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function OrdersPage() {
  const orders = useOrderStore((s) => s.orders);

  if (orders.length === 0) {
    return (
      <div className="container-page flex flex-col items-center justify-center gap-3 py-24 text-center">
        <PackageSearch className="h-12 w-12 text-ink-400" />
        <h1 className="font-display text-2xl font-bold text-ink-900">No orders yet</h1>
        <p className="text-sm text-ink-400">Your order history will show up here once you place an order.</p>
        <Button asChild size="lg" className="mt-2">
          <Link href="/restaurants">Order now</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <h1 className="font-display text-3xl font-extrabold text-ink-900">Your Orders</h1>
      <div className="mt-6 space-y-4">
        {orders.map((order) => {
          const restaurant = restaurants.find((r) => r.id === order.restaurantId);
          return (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="flex flex-col gap-2 rounded-2xl border border-ink-900/5 bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-display font-bold text-ink-900">{restaurant?.name ?? "Restaurant"}</p>
                <p className="text-sm text-ink-400">
                  #{order.id} · {order.items.length} items · {new Date(order.placedAt).toLocaleDateString("en-IN")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={order.status === "delivered" ? "veg" : "secondary"}>{statusLabels[order.status]}</Badge>
                <span className="font-mono font-bold text-ink-900">{formatINR(order.total)}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
