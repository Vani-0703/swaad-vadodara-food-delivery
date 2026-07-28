import { notFound } from "next/navigation";
import { Clock, MapPin, Leaf, Star } from "lucide-react";
import { SafeImage } from "@/components/shared/safe-image";
import { RatingBadge } from "@/components/shared/rating-badge";
import { Badge } from "@/components/ui/badge";
import { RestaurantMenu } from "@/components/restaurant/restaurant-menu";
import { getRestaurantBySlug, restaurants } from "@/lib/data/restaurants";
import { getMenuForRestaurant } from "@/lib/data/menu-items";
import { formatINR } from "@/lib/utils";

export function generateStaticParams() {
  return restaurants.map((r) => ({ slug: r.slug }));
}

export default async function RestaurantDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const restaurant = getRestaurantBySlug(slug);
  if (!restaurant) notFound();

  const menu = getMenuForRestaurant(restaurant.id);

  return (
    <div>
      <div className="relative h-64 w-full overflow-hidden sm:h-80">
        <SafeImage src={restaurant.banner} alt={restaurant.name} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/20 to-transparent" />
        <div className="container-page absolute bottom-0 left-0 right-0 pb-6 text-white">
          <div className="flex flex-wrap items-center gap-2">
            {restaurant.tags.map((tag) => (
              <Badge key={tag} className="bg-white/15 text-white backdrop-blur">
                {tag}
              </Badge>
            ))}
            {restaurant.isPureVeg && (
              <Badge className="bg-basil-500 text-white">
                <Leaf className="h-3 w-3" /> Pure Veg
              </Badge>
            )}
          </div>
          <h1 className="mt-3 font-display text-3xl font-black sm:text-4xl">{restaurant.name}</h1>
          <p className="mt-1 text-white/80">{restaurant.cuisines.join(", ")}</p>
        </div>
      </div>

      <div className="container-page -mt-6 relative z-10">
        <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-ink-900/5 bg-white p-4 shadow-card">
          <RatingBadge rating={restaurant.rating} size="md" />
          <span className="text-sm text-ink-400">{restaurant.ratingCount.toLocaleString("en-IN")}+ ratings</span>
          <span className="hidden h-6 w-px bg-ink-900/10 sm:block" />
          <span className="flex items-center gap-1.5 text-sm font-semibold text-ink-700">
            <Clock className="h-4 w-4 text-chili-500" /> {restaurant.deliveryTimeMinutes} mins
          </span>
          <span className="hidden h-6 w-px bg-ink-900/10 sm:block" />
          <span className="flex items-center gap-1.5 text-sm font-semibold text-ink-700">
            <MapPin className="h-4 w-4 text-chili-500" /> {restaurant.address.area}, {restaurant.address.city}
          </span>
          <span className="hidden h-6 w-px bg-ink-900/10 sm:block" />
          <span className="text-sm font-semibold text-ink-700">{formatINR(restaurant.priceForTwo)} for two</span>
        </div>

        {restaurant.offers.length > 0 && (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
            {restaurant.offers.map((offer) => (
              <div
                key={offer.code}
                className="flex min-w-[240px] shrink-0 items-center gap-3 rounded-2xl border border-dashed border-turmeric-500 bg-turmeric-500/5 p-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-turmeric-500/15 font-black text-turmeric-600">
                  %
                </div>
                <div>
                  <p className="text-sm font-bold text-ink-900">{offer.label}</p>
                  <p className="text-xs text-ink-400">
                    {offer.description} · Code: <span className="font-mono font-bold">{offer.code}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="mb-4 font-display text-xl font-bold text-ink-900">Menu</h2>
            <RestaurantMenu items={menu} />
          </div>

          <div>
            <h2 className="mb-4 font-display text-xl font-bold text-ink-900">Reviews</h2>
            <div className="space-y-4">
              {restaurant.reviews.map((review) => (
                <div key={review.id} className="rounded-2xl border border-ink-900/5 bg-white p-4 shadow-card">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-ink-900">{review.userName}</p>
                    <span className="flex items-center gap-1 text-xs font-bold text-turmeric-600">
                      <Star className="h-3.5 w-3.5 fill-turmeric-500 text-turmeric-500" /> {review.rating}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-ink-400">{review.comment}</p>
                </div>
              ))}
            </div>

            <h2 className="mb-3 mt-8 font-display text-xl font-bold text-ink-900">Gallery</h2>
            <div className="grid grid-cols-3 gap-2">
              {restaurant.gallery.map((img, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                  <SafeImage src={img} alt={`${restaurant.name} gallery ${i + 1}`} fill sizes="150px" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
