import { Bike, IndianRupee, MapPin, Star } from "lucide-react";
import { MapView } from "@/components/shared/map-view";
import { restaurants } from "@/lib/data/restaurants";

const activeOrder = restaurants[3];

export default function DeliveryPartnerDashboard() {
  return (
    <div className="container-page py-10">
      <h1 className="font-display text-3xl font-extrabold text-ink-900">Delivery Partner Dashboard</h1>
      <p className="mt-1 text-sm text-ink-400">Demo view — wire to Supabase realtime + Google Maps directions for live routing.</p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
        <MapView
          center={{ lat: activeOrder.address.lat, lng: activeOrder.address.lng }}
          destination={{ lat: activeOrder.address.lat, lng: activeOrder.address.lng }}
          riderPosition={{ lat: activeOrder.address.lat + 0.006, lng: activeOrder.address.lng - 0.004 }}
          className="h-80 w-full lg:h-full"
        />

        <div className="space-y-4">
          <div className="rounded-2xl border border-ink-900/5 bg-white p-5 shadow-card">
            <p className="flex items-center gap-2 font-display font-bold text-ink-900">
              <Bike className="h-4 w-4 text-chili-500" /> Active delivery
            </p>
            <p className="mt-2 text-sm text-ink-700">Pickup from {activeOrder.name}</p>
            <p className="flex items-center gap-1 text-xs text-ink-400">
              <MapPin className="h-3 w-3" /> {activeOrder.address.area}, Vadodara
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-basil-500 to-turmeric-500 p-5 text-white shadow-glow">
              <IndianRupee className="h-5 w-5" />
              <p className="mt-2 font-display text-xl font-black">₹840</p>
              <p className="text-xs text-white/85">Earnings today</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-chili-500 to-berry-500 p-5 text-white shadow-glow">
              <Star className="h-5 w-5" />
              <p className="mt-2 font-display text-xl font-black">4.8</p>
              <p className="text-xs text-white/85">Partner rating</p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-ink-400">
        Roadmap: order queue with accept/decline, turn-by-turn navigation, and status update actions synced to the customer's tracking page.
      </p>
    </div>
  );
}
