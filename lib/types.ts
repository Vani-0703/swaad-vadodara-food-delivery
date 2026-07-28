export type CuisineType =
  | "Gujarati"
  | "North Indian"
  | "South Indian"
  | "Chinese"
  | "Italian"
  | "Fast Food"
  | "Bakery"
  | "Desserts"
  | "Beverages"
  | "Street Food"
  | "Continental"
  | "Mughlai"
  | "Punjabi"
  | "Rajasthani"
  | "Biryani";

export type FoodCategory =
  | "Pizza"
  | "Burgers"
  | "Biryani"
  | "South Indian"
  | "North Indian"
  | "Chinese"
  | "Gujarati Thali"
  | "Sandwiches"
  | "Cakes"
  | "Ice Cream"
  | "Juices"
  | "Coffee"
  | "Desserts"
  | "Beverages"
  | "Rolls & Wraps"
  | "Snacks";

export interface Address {
  line1: string;
  area: string;
  city: string;
  pincode: string;
  lat: number;
  lng: number;
}

export interface Review {
  id: string;
  userName: string;
  avatarSeed: string;
  rating: number;
  comment: string;
  date: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  category: FoodCategory;
  image: string;
  isVeg: boolean;
  isBestseller: boolean;
  rating: number;
  ratingCount: number;
  spiceLevel?: 0 | 1 | 2 | 3;
}

export interface Offer {
  code: string;
  label: string;
  description: string;
  discountPercent?: number;
  flatDiscount?: number;
  minOrder?: number;
}

export interface Restaurant {
  id: string;
  slug: string;
  name: string;
  logo: string;
  banner: string;
  cuisines: CuisineType[];
  rating: number;
  ratingCount: number;
  priceForTwo: number;
  deliveryTimeMinutes: number;
  distanceKm: number;
  address: Address;
  isPureVeg: boolean;
  isTrending: boolean;
  isNew: boolean;
  offers: Offer[];
  tags: string[];
  reviews: Review[];
  gallery: string[];
}

export interface CartLine {
  itemId: string;
  restaurantId: string;
  quantity: number;
}

export interface Coupon {
  code: string;
  description: string;
  discountPercent?: number;
  flatDiscount?: number;
  minOrder: number;
  maxDiscount?: number;
}

export type OrderStatus =
  | "placed"
  | "confirmed"
  | "preparing"
  | "picked_up"
  | "on_the_way"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  restaurantId: string;
  items: { itemId: string; quantity: number; price: number; name: string }[];
  status: OrderStatus;
  total: number;
  placedAt: string;
  eta: string;
  address: string;
}
