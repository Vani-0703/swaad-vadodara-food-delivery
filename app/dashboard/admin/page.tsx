import { Users, Store, ShoppingBag, IndianRupee } from "lucide-react";
import { restaurants } from "@/lib/data/restaurants";
import { menuItems } from "@/lib/data/menu-items";
import { formatINR } from "@/lib/utils";

const stats = [
  { label: "Total restaurants", value: restaurants.length.toString(), icon: Store, gradient: "from-chili-500 to-mango-500" },
  { label: "Menu items live", value: menuItems.length.toString(), icon: ShoppingBag, gradient: "from-basil-500 to-turmeric-500" },
  { label: "Registered users", value: "12,480", icon: Users, gradient: "from-berry-500 to-chili-500" },
  { label: "Platform GMV (30d)", value: formatINR(2840000), icon: IndianRupee, gradient: "from-turmeric-500 to-mango-500" },
];

export default function AdminDashboard() {
  return (
    <div className="container-page py-10">
      <h1 className="font-display text-3xl font-extrabold text-ink-900">Admin Dashboard</h1>
      <p className="mt-1 text-sm text-ink-400">Platform-wide overview — connect Supabase views for live metrics.</p>

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
        <h2 className="mb-4 font-display text-lg font-bold text-ink-900">Restaurants on the platform</h2>
        <div className="max-h-96 space-y-2 overflow-y-auto">
          {restaurants.map((r) => (
            <div key={r.id} className="flex items-center justify-between border-b border-ink-900/5 py-2 last:border-0">
              <div>
                <p className="text-sm font-semibold text-ink-900">{r.name}</p>
                <p className="text-xs text-ink-400">{r.address.area} · {r.cuisines.join(", ")}</p>
              </div>
              <span className="rounded-full bg-basil-500/10 px-3 py-1 text-xs font-semibold text-basil-500">Active</span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-xs text-ink-400">
        Roadmap: restaurant approval queue, dispute resolution, coupon management, and role assignment via Clerk organizations.
      </p>
    </div>
  );
}
