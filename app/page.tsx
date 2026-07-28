import { Hero } from "@/components/home/hero";
import { CategoryStrip } from "@/components/home/category-strip";
import { TrendingRestaurants } from "@/components/home/trending-restaurants";
import { OfferBanner } from "@/components/home/offer-banner";
import { PopularDishes } from "@/components/home/popular-dishes";
import { restaurants, getTrendingRestaurants } from "@/lib/data/restaurants";
import { getPopularDishes } from "@/lib/data/menu-items";

export default function HomePage() {
  const trending = getTrendingRestaurants();
  const popular = getPopularDishes(12);

  return (
    <>
      <Hero />
      <CategoryStrip />
      <TrendingRestaurants restaurants={trending.length ? trending : restaurants} />
      <OfferBanner />
      <PopularDishes dishes={popular} />
    </>
  );
}
