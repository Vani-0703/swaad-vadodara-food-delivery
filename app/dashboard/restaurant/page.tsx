import { TrendingUp, UtensilsCrossed, Clock3, Star } from "lucide-react";
import { restaurants } from "@/lib/data/restaurants";
import { getMenuForRestaurant } from "@/lib/data/menu-items";
import { formatINR } from "@/lib/utils";

const demoRestaurant = restaurants[0];
const menu = getMenuForRestaurant(demoRestaurant.id);

const stats = [
  { label: "Today's orders", value: "38", icon: UtensilsCrossed, gradient: "from-chili-500 to-mango-500" },
  { label: "Revenue today", value: formatINR(18420), icon: TrendingUp, gradient: "from-basil-500 to-turmeric-500" },
  { label: "Avg. prep time", value: "22 min", icon: Clock3, gradient: "from-berry-500 to-chili-500" },
  { label: "Rating", value: demoRestaurant.rating.toFixed(1), icon: Star, gradient: "from-turmeric-500 to-mango-500" },
];

export default function RestaurantOwnerDashboard() {
  return (
    <div className="container-page py-10">
      <h1 className="font-display text-3xl font-extrabold text-ink-900">Restaurant Dashboard</h1>
      <p className="mt-1 text-sm text-ink-400">Demo data for {demoRestaurant.name} — connect Supabase to power this with live orders.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-2xl bg-gradient-to-br ${s.gradient} p-5 text-white shadow-glow`}>
            <s.icon className="h-6 w-6" />
            <p className="mt-3 font-display text-2xl font-black">{s.value}</p>
            <p className="text-sm text-white/85">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-ink-900/5 bg-white p-5 shadow-card">
        <h2 className="mb-4 font-display text-lg font-bold text-ink-900">Menu management</h2>
        <div className="space-y-2">
          {menu.slice(0, 8).map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b border-ink-900/5 py-2 last:border-0">
              <div>
                <p className="text-sm font-semibold text-ink-900">{item.name}</p>
                <p className="text-xs text-ink-400">{item.category}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm font-bold">{formatINR(item.price)}</span>
                <span className="rounded-full bg-basil-500/10 px-3 py-1 text-xs font-semibold text-basil-500">In stock</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-xs text-ink-400">
        Roadmap: order accept/reject actions, menu item CRUD, payout history, and analytics charts wired to Supabase + Clerk roles.
      </p>
    </div>
  );
}
