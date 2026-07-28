import type { Restaurant, CuisineType, Review, Offer } from "@/lib/types";
import { slugify } from "@/lib/utils";
import { pickBanner } from "@/lib/data/image-pools";

// ---- Vadodara areas with approximate coordinates ----
const areas = [
  { area: "Alkapuri", lat: 22.3145, lng: 73.1726 },
  { area: "Sayajigunj", lat: 22.3126, lng: 73.1943 },
  { area: "Fatehgunj", lat: 22.3225, lng: 73.1857 },
  { area: "Manjalpur", lat: 22.2775, lng: 73.1935 },
  { area: "Akota", lat: 22.2999, lng: 73.1746 },
  { area: "Gotri", lat: 22.3155, lng: 73.1489 },
  { area: "Vasna Road", lat: 22.2926, lng: 73.1774 },
  { area: "Race Course", lat: 22.3089, lng: 73.1808 },
  { area: "Karelibaug", lat: 22.3242, lng: 73.2064 },
  { area: "Waghodia Road", lat: 22.3187, lng: 73.2288 },
  { area: "Old Padra Road", lat: 22.2909, lng: 73.1866 },
  { area: "Ellora Park", lat: 22.2843, lng: 73.1948 },
  { area: "Sama", lat: 22.3392, lng: 73.1541 },
  { area: "Diwalipura", lat: 22.3271, lng: 73.1682 },
  { area: "Subhanpura", lat: 22.3225, lng: 73.1601 },
  { area: "Nizampura", lat: 22.3288, lng: 73.1889 },
];

const reviewTemplates = [
  "Food arrived hot and the packaging was excellent. Will order again!",
  "Portion size was generous and the flavours were spot on.",
  "Delivery was a bit late but the taste made up for it.",
  "Best in this area for the price. Highly recommend the combo.",
  "Loved the presentation, tasted just like restaurant dine-in quality.",
  "A bit spicy for my taste but overall a solid experience.",
  "Consistent quality every time I order from here.",
  "Great value for money, generous portions and fresh ingredients.",
  "The dish was fantastic, though it could arrive a little warmer.",
  "My family's weekend favourite. Never disappoints.",
];

const reviewerNames = [
  "Aarav Shah", "Priya Patel", "Kunal Mehta", "Riya Desai", "Devansh Trivedi",
  "Sneha Joshi", "Yash Parekh", "Ananya Rana", "Meet Solanki", "Diya Bhatt",
  "Karan Vaghela", "Isha Chokshi", "Rohan Pandya", "Nisha Rathod", "Om Bhavsar",
];

function makeReviews(seed: number, count: number): Review[] {
  return Array.from({ length: count }, (_, i) => {
    const idx = (seed + i * 7) % reviewTemplates.length;
    const nameIdx = (seed + i * 3) % reviewerNames.length;
    return {
      id: `rev-${seed}-${i}`,
      userName: reviewerNames[nameIdx],
      avatarSeed: `${reviewerNames[nameIdx]}${seed}`,
      rating: [4, 4, 5, 3, 5, 4][(seed + i) % 6],
      comment: reviewTemplates[idx],
      date: new Date(Date.now() - (seed + i) * 86400000 * 2).toISOString(),
    };
  });
}

const offerPool: Offer[] = [
  { code: "WELCOME50", label: "50% OFF up to ₹100", description: "On orders above ₹199", discountPercent: 50, minOrder: 199 },
  { code: "FLAT100", label: "Flat ₹100 OFF", description: "On orders above ₹399", flatDiscount: 100, minOrder: 399 },
  { code: "FREESHIP", label: "Free Delivery", description: "No delivery fee on this order", flatDiscount: 0, minOrder: 149 },
  { code: "COMBO20", label: "20% OFF", description: "On combo meals", discountPercent: 20, minOrder: 249 },
  { code: "SUPER30", label: "30% OFF up to ₹150", description: "On orders above ₹299", discountPercent: 30, minOrder: 299 },
];

interface RestaurantSeed {
  name: string;
  cuisines: CuisineType[];
  areaIndex: number;
  isPureVeg: boolean;
  tags: string[];
}

const restaurantSeeds: RestaurantSeed[] = [
  { name: "Sankalp Restaurant", cuisines: ["Gujarati", "Rajasthani"], areaIndex: 0, isPureVeg: true, tags: ["Thali", "Family Dining"] },
  { name: "Mandap Restaurant", cuisines: ["Gujarati"], areaIndex: 1, isPureVeg: true, tags: ["Unlimited Thali"] },
  { name: "Havmor Ice Cream & Desserts", cuisines: ["Desserts"], areaIndex: 7, isPureVeg: true, tags: ["Ice Cream", "Desserts"] },
  { name: "Rajwadu Village Restaurant", cuisines: ["Gujarati", "Rajasthani"], areaIndex: 10, isPureVeg: true, tags: ["Ethnic Dining", "Thali"] },
  { name: "Kansar Restaurant", cuisines: ["Gujarati"], areaIndex: 8, isPureVeg: true, tags: ["Thali"] },
  { name: "Chandan's Bhookkad", cuisines: ["Chinese", "Fast Food"], areaIndex: 13, isPureVeg: false, tags: ["Chinese", "Quick Bites"] },
  { name: "Sasural Restaurant", cuisines: ["North Indian", "Punjabi"], areaIndex: 9, isPureVeg: false, tags: ["North Indian"] },
  { name: "Domino's Pizza - Alkapuri", cuisines: ["Italian", "Fast Food"], areaIndex: 0, isPureVeg: false, tags: ["Pizza", "20 Min Delivery"] },
  { name: "Pizza Villa", cuisines: ["Italian", "Fast Food"], areaIndex: 2, isPureVeg: false, tags: ["Pizza"] },
  { name: "Burger Point", cuisines: ["Fast Food"], areaIndex: 12, isPureVeg: false, tags: ["Burgers", "Quick Bites"] },
  { name: "The Grill House", cuisines: ["Continental"], areaIndex: 5, isPureVeg: false, tags: ["Continental", "Grill"] },
  { name: "Dwarkesh Restaurant", cuisines: ["Gujarati"], areaIndex: 3, isPureVeg: true, tags: ["Thali", "Family Dining"] },
  { name: "Panchvati Gaurav Restaurant", cuisines: ["Gujarati"], areaIndex: 7, isPureVeg: true, tags: ["Unlimited Thali"] },
  { name: "Mirch Masala", cuisines: ["North Indian", "Punjabi"], areaIndex: 4, isPureVeg: false, tags: ["North Indian", "Curries"] },
  { name: "Cafe Motiveweight", cuisines: ["Continental"], areaIndex: 0, isPureVeg: false, tags: ["Cafe", "Coffee"] },
  { name: "Chai Break", cuisines: ["Beverages"], areaIndex: 1, isPureVeg: true, tags: ["Tea", "Snacks"] },
  { name: "South Indies", cuisines: ["South Indian"], areaIndex: 15, isPureVeg: true, tags: ["Dosa", "South Indian"] },
  { name: "Vadapav Junction", cuisines: ["Street Food"], areaIndex: 11, isPureVeg: true, tags: ["Street Food", "Quick Bites"] },
  { name: "Baroda Biryani House", cuisines: ["Biryani", "Mughlai"], areaIndex: 2, isPureVeg: false, tags: ["Biryani"] },
  { name: "Punjabi Rasoi", cuisines: ["Punjabi", "North Indian"], areaIndex: 6, isPureVeg: false, tags: ["North Indian"] },
  { name: "Sweet Bengal", cuisines: ["Desserts"], areaIndex: 14, isPureVeg: true, tags: ["Sweets", "Desserts"] },
  { name: "The Sandwich Shack", cuisines: ["Fast Food"], areaIndex: 8, isPureVeg: true, tags: ["Sandwiches", "Quick Bites"] },
  { name: "Cake Studio Vadodara", cuisines: ["Bakery", "Desserts"], areaIndex: 0, isPureVeg: true, tags: ["Cakes", "Bakery"] },
  { name: "Juice Junction", cuisines: ["Beverages"], areaIndex: 5, isPureVeg: true, tags: ["Juices", "Healthy"] },
  { name: "Dragon Wok", cuisines: ["Chinese"], areaIndex: 10, isPureVeg: false, tags: ["Chinese"] },
  { name: "Mama's Kitchen", cuisines: ["North Indian"], areaIndex: 3, isPureVeg: false, tags: ["Home Style", "North Indian"] },
  { name: "Rajasthani Bhoj", cuisines: ["Rajasthani", "Gujarati"], areaIndex: 1, isPureVeg: true, tags: ["Thali"] },
  { name: "Frostbite Ice Cream", cuisines: ["Desserts"], areaIndex: 7, isPureVeg: true, tags: ["Ice Cream"] },
  { name: "Cafe Noir", cuisines: ["Continental"], areaIndex: 2, isPureVeg: false, tags: ["Cafe", "Coffee", "Desserts"] },
  { name: "Baroda Biryani Center", cuisines: ["Biryani"], areaIndex: 8, isPureVeg: false, tags: ["Biryani"] },
];

function pseudoRandom(seed: number, min: number, max: number) {
  const x = Math.sin(seed * 999) * 10000;
  const frac = x - Math.floor(x);
  return min + frac * (max - min);
}

export const restaurants: Restaurant[] = restaurantSeeds.map((seed, i) => {
  const loc = areas[seed.areaIndex];
  const rating = Math.round((3.6 + pseudoRandom(i + 1, 0, 1.3)) * 10) / 10;
  const ratingCount = Math.round(200 + pseudoRandom(i + 2, 0, 4800));
  const deliveryTimeMinutes = Math.round(20 + pseudoRandom(i + 3, 0, 25));
  const priceForTwo = Math.round((200 + pseudoRandom(i + 4, 0, 500)) / 50) * 50;
  const distanceKm = Math.round(pseudoRandom(i + 5, 0.8, 6.5) * 10) / 10;

  return {
    id: `r${i + 1}`,
    slug: `${slugify(seed.name)}-${slugify(loc.area)}`,
    name: seed.name,
    logo: `https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURIComponent(seed.name)}&backgroundType=gradientLinear`,
    banner: pickBanner(i),
    cuisines: seed.cuisines,
    rating,
    ratingCount,
    priceForTwo,
    deliveryTimeMinutes,
    distanceKm,
    address: {
      line1: `${10 + i}, ${seed.name.split(" ")[0]} Complex`,
      area: loc.area,
      city: "Vadodara",
      pincode: `39000${(i % 9) + 1}`,
      lat: loc.lat + pseudoRandom(i + 6, -0.004, 0.004),
      lng: loc.lng + pseudoRandom(i + 7, -0.004, 0.004),
    },
    isPureVeg: seed.isPureVeg,
    isTrending: i % 4 === 0,
    isNew: i % 7 === 0,
    offers: [offerPool[i % offerPool.length], offerPool[(i + 2) % offerPool.length]],
    tags: seed.tags,
    reviews: makeReviews(i + 1, 4),
    gallery: [pickBanner(i + 1), pickBanner(i + 3), pickBanner(i + 5)],
  };
});

export function getRestaurantBySlug(slug: string) {
  return restaurants.find((r) => r.slug === slug);
}

export function getTrendingRestaurants() {
  return restaurants.filter((r) => r.isTrending);
}
