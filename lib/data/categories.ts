import {
  Pizza,
  Beef,
  Soup,
  UtensilsCrossed,
  Sandwich,
  CakeSlice,
  IceCreamCone,
  CupSoda,
  Coffee,
  Cookie,
  Salad,
  Flame,
} from "lucide-react";
import type { FoodCategory } from "@/lib/types";

export interface CategoryDef {
  name: FoodCategory;
  icon: typeof Pizza;
  gradient: string;
}

export const categories: CategoryDef[] = [
  { name: "Pizza", icon: Pizza, gradient: "from-chili-500 to-mango-500" },
  { name: "Burgers", icon: Beef, gradient: "from-mango-500 to-turmeric-500" },
  { name: "Biryani", icon: UtensilsCrossed, gradient: "from-berry-500 to-chili-500" },
  { name: "South Indian", icon: Salad, gradient: "from-basil-500 to-turmeric-500" },
  { name: "North Indian", icon: Soup, gradient: "from-chili-600 to-berry-500" },
  { name: "Chinese", icon: Flame, gradient: "from-turmeric-500 to-chili-500" },
  { name: "Gujarati Thali", icon: UtensilsCrossed, gradient: "from-turmeric-500 to-mango-500" },
  { name: "Sandwiches", icon: Sandwich, gradient: "from-basil-500 to-mango-500" },
  { name: "Cakes", icon: CakeSlice, gradient: "from-berry-500 to-mango-500" },
  { name: "Ice Cream", icon: IceCreamCone, gradient: "from-chili-500 to-berry-600" },
  { name: "Juices", icon: CupSoda, gradient: "from-basil-500 to-turmeric-500" },
  { name: "Coffee", icon: Coffee, gradient: "from-ink-700 to-berry-600" },
  { name: "Desserts", icon: Cookie, gradient: "from-mango-500 to-berry-500" },
  { name: "Beverages", icon: CupSoda, gradient: "from-turmeric-500 to-basil-500" },
];
