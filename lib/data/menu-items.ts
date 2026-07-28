import type { MenuItem, FoodCategory, CuisineType } from "@/lib/types";
import { restaurants } from "@/lib/data/restaurants";
import { pickFoodImage } from "@/lib/data/image-pools";

// Maps each cuisine to the food categories that restaurant should serve
const cuisineToCategories: Record<CuisineType, FoodCategory[]> = {
  Gujarati: ["Gujarati Thali", "Desserts", "Beverages", "Snacks"],
  "North Indian": ["North Indian", "Beverages", "Rolls & Wraps"],
  "South Indian": ["South Indian", "Beverages", "Snacks"],
  Chinese: ["Chinese", "Rolls & Wraps", "Beverages"],
  Italian: ["Pizza", "Beverages", "Desserts"],
  "Fast Food": ["Burgers", "Sandwiches", "Rolls & Wraps", "Beverages"],
  Bakery: ["Cakes", "Desserts", "Beverages"],
  Desserts: ["Desserts", "Ice Cream", "Cakes"],
  Beverages: ["Juices", "Coffee", "Beverages"],
  "Street Food": ["Snacks", "Rolls & Wraps", "Beverages"],
  Continental: ["Sandwiches", "Coffee", "Desserts"],
  Mughlai: ["Biryani", "North Indian", "Beverages"],
  Punjabi: ["North Indian", "Beverages", "Snacks"],
  Rajasthani: ["Gujarati Thali", "Desserts", "Beverages"],
  Biryani: ["Biryani", "Beverages", "Desserts"],
};

const itemPools: Record<FoodCategory, { name: string; desc: string; veg: boolean; price: [number, number] }[]> = {
  Pizza: [
    { name: "Margherita Pizza", desc: "Classic delight with mozzarella and fresh basil", veg: true, price: [199, 299] },
    { name: "Farmhouse Pizza", desc: "Loaded with onion, capsicum, tomato and mushroom", veg: true, price: [249, 349] },
    { name: "Peppy Paneer Pizza", desc: "Juicy paneer, crisp capsicum and spicy red pepper", veg: true, price: [279, 379] },
    { name: "Cheese Burst Pizza", desc: "Extra layer of molten mozzarella in every bite", veg: true, price: [299, 399] },
    { name: "Chicken Tikka Pizza", desc: "Spicy chicken tikka chunks with onions", veg: false, price: [329, 429] },
    { name: "BBQ Chicken Pizza", desc: "Smoky barbecue chicken with tangy sauce", veg: false, price: [349, 449] },
    { name: "Veggie Supreme Pizza", desc: "Loaded with seven garden fresh vegetables", veg: true, price: [289, 389] },
    { name: "Corn & Cheese Pizza", desc: "Sweet corn kernels smothered in cheese", veg: true, price: [229, 329] },
  ],
  Burgers: [
    { name: "Classic Veg Burger", desc: "Crispy veg patty with lettuce and mayo", veg: true, price: [89, 129] },
    { name: "Aloo Tikki Burger", desc: "Spiced potato patty with tangy chutney", veg: true, price: [79, 119] },
    { name: "Crispy Chicken Burger", desc: "Golden fried chicken fillet with slaw", veg: false, price: [139, 189] },
    { name: "Cheese Maharaja Burger", desc: "Double patty loaded with cheese slices", veg: true, price: [149, 199] },
    { name: "Paneer Tikka Burger", desc: "Chargrilled paneer patty with mint mayo", veg: true, price: [119, 159] },
    { name: "Double Patty Burger", desc: "Two juicy patties stacked with cheese", veg: false, price: [179, 229] },
  ],
  Biryani: [
    { name: "Hyderabadi Chicken Biryani", desc: "Fragrant basmati rice slow cooked with chicken", veg: false, price: [219, 299] },
    { name: "Veg Dum Biryani", desc: "Aromatic rice layered with mixed vegetables", veg: true, price: [169, 229] },
    { name: "Mutton Biryani", desc: "Tender mutton pieces in spiced saffron rice", veg: false, price: [289, 369] },
    { name: "Paneer Biryani", desc: "Soft paneer cubes in richly spiced rice", veg: true, price: [199, 259] },
    { name: "Egg Biryani", desc: "Boiled eggs tossed in masala dum rice", veg: false, price: [159, 209] },
  ],
  "South Indian": [
    { name: "Masala Dosa", desc: "Crispy rice crepe with spiced potato filling", veg: true, price: [89, 139] },
    { name: "Plain Dosa", desc: "Golden crisp dosa served with chutney and sambar", veg: true, price: [69, 109] },
    { name: "Idli Sambar", desc: "Steamed rice cakes with lentil sambar", veg: true, price: [69, 99] },
    { name: "Medu Vada", desc: "Crispy lentil doughnuts served with chutney", veg: true, price: [79, 109] },
    { name: "Rava Dosa", desc: "Crispy semolina crepe, lacy and golden", veg: true, price: [99, 149] },
    { name: "Mysore Masala Dosa", desc: "Dosa with spicy red chutney and potato masala", veg: true, price: [109, 159] },
  ],
  "North Indian": [
    { name: "Paneer Butter Masala", desc: "Paneer cubes in creamy tomato gravy", veg: true, price: [189, 249] },
    { name: "Dal Makhani", desc: "Slow cooked black lentils with butter and cream", veg: true, price: [159, 209] },
    { name: "Butter Chicken", desc: "Tandoori chicken in silky tomato butter gravy", veg: false, price: [249, 319] },
    { name: "Shahi Paneer", desc: "Paneer in a rich cashew and cream gravy", veg: true, price: [199, 259] },
    { name: "Chole Bhature", desc: "Spiced chickpea curry with fluffy fried bread", veg: true, price: [129, 179] },
    { name: "Kadai Paneer", desc: "Paneer tossed with capsicum in kadai masala", veg: true, price: [189, 249] },
    { name: "Malai Kofta", desc: "Soft paneer dumplings in creamy cashew gravy", veg: true, price: [199, 259] },
  ],
  Chinese: [
    { name: "Veg Hakka Noodles", desc: "Stir fried noodles with crunchy vegetables", veg: true, price: [129, 169] },
    { name: "Chicken Manchurian", desc: "Fried chicken tossed in tangy Manchurian sauce", veg: false, price: [189, 249] },
    { name: "Veg Fried Rice", desc: "Wok tossed rice with fresh diced vegetables", veg: true, price: [119, 159] },
    { name: "Chilli Paneer", desc: "Crispy paneer in spicy chilli garlic sauce", veg: true, price: [169, 219] },
    { name: "Schezwan Noodles", desc: "Fiery schezwan sauce tossed noodles", veg: true, price: [139, 179] },
    { name: "Spring Rolls", desc: "Crispy rolls stuffed with vegetables", veg: true, price: [99, 139] },
  ],
  "Gujarati Thali": [
    { name: "Gujarati Special Thali", desc: "Unlimited rotli, shaak, dal, rice and sweet", veg: true, price: [199, 279] },
    { name: "Undhiyu", desc: "Winter special mixed vegetable slow cooked dish", veg: true, price: [149, 199] },
    { name: "Dhokla", desc: "Steamed and fluffy gram flour cake", veg: true, price: [69, 99] },
    { name: "Khandvi", desc: "Rolled gram flour delicacy tempered with mustard", veg: true, price: [79, 109] },
    { name: "Fafda Jalebi", desc: "Crispy fafda paired with syrupy jalebi", veg: true, price: [89, 129] },
    { name: "Handvo", desc: "Savoury baked lentil and rice cake", veg: true, price: [89, 119] },
  ],
  Sandwiches: [
    { name: "Veg Club Sandwich", desc: "Triple layer sandwich with fresh vegetables", veg: true, price: [99, 139] },
    { name: "Grilled Cheese Sandwich", desc: "Golden grilled bread oozing with cheese", veg: true, price: [89, 129] },
    { name: "Bombay Sandwich", desc: "Street style sandwich with mint chutney", veg: true, price: [79, 119] },
    { name: "Paneer Tikka Sandwich", desc: "Grilled sandwich stuffed with spiced paneer", veg: true, price: [119, 159] },
    { name: "Chicken Sandwich", desc: "Shredded chicken with mayo and greens", veg: false, price: [129, 179] },
  ],
  Cakes: [
    { name: "Chocolate Truffle Cake", desc: "Rich layers of chocolate sponge and ganache", veg: true, price: [349, 599] },
    { name: "Red Velvet Cake", desc: "Velvety cocoa sponge with cream cheese frosting", veg: true, price: [399, 649] },
    { name: "Black Forest Cake", desc: "Classic cherry and chocolate shavings cake", veg: true, price: [329, 549] },
    { name: "Pineapple Cake", desc: "Light sponge with fresh pineapple cream", veg: true, price: [299, 499] },
    { name: "Butterscotch Cake", desc: "Crunchy praline bits with butterscotch cream", veg: true, price: [329, 549] },
  ],
  "Ice Cream": [
    { name: "Vanilla Ice Cream Tub", desc: "Classic creamy vanilla, 500ml tub", veg: true, price: [149, 219] },
    { name: "Chocolate Sundae", desc: "Chocolate ice cream with hot fudge and nuts", veg: true, price: [129, 179] },
    { name: "Kesar Pista Ice Cream", desc: "Saffron and pistachio royal indulgence", veg: true, price: [159, 229] },
    { name: "Belgian Chocolate Ice Cream", desc: "Deep dark Belgian chocolate scoop", veg: true, price: [169, 239] },
  ],
  Juices: [
    { name: "Fresh Orange Juice", desc: "Cold pressed juice from fresh oranges", veg: true, price: [69, 99] },
    { name: "Watermelon Juice", desc: "Chilled and refreshing summer watermelon juice", veg: true, price: [59, 89] },
    { name: "Mixed Fruit Juice", desc: "Blend of seasonal fresh fruits", veg: true, price: [79, 109] },
    { name: "Sugarcane Juice", desc: "Freshly pressed sugarcane with mint and lemon", veg: true, price: [49, 79] },
  ],
  Coffee: [
    { name: "Cappuccino", desc: "Rich espresso topped with silky milk foam", veg: true, price: [99, 149] },
    { name: "Cold Coffee", desc: "Chilled blended coffee with ice cream", veg: true, price: [109, 159] },
    { name: "Cafe Latte", desc: "Smooth espresso with steamed milk", veg: true, price: [109, 159] },
    { name: "Filter Coffee", desc: "South Indian style strong filter coffee", veg: true, price: [49, 79] },
  ],
  Desserts: [
    { name: "Gulab Jamun", desc: "Soft milk dumplings soaked in rose syrup", veg: true, price: [69, 109] },
    { name: "Rasmalai", desc: "Soft paneer discs in saffron milk", veg: true, price: [99, 149] },
    { name: "Jalebi", desc: "Crispy spirals soaked in sugar syrup", veg: true, price: [59, 99] },
    { name: "Kaju Katli", desc: "Rich cashew fudge diamonds", veg: true, price: [149, 249] },
  ],
  Beverages: [
    { name: "Masala Chai", desc: "Spiced Indian tea brewed with fresh ginger", veg: true, price: [29, 49] },
    { name: "Lassi", desc: "Thick and creamy sweet yogurt drink", veg: true, price: [69, 99] },
    { name: "Mango Shake", desc: "Seasonal mango blended with milk", veg: true, price: [89, 129] },
    { name: "Buttermilk (Chaas)", desc: "Spiced and refreshing churned yogurt drink", veg: true, price: [39, 59] },
  ],
  "Rolls & Wraps": [
    { name: "Paneer Roll", desc: "Spiced paneer wrapped in soft rumali roti", veg: true, price: [99, 139] },
    { name: "Chicken Kathi Roll", desc: "Grilled chicken wrapped with onions and chutney", veg: false, price: [129, 179] },
    { name: "Veg Frankie", desc: "Mumbai style stuffed vegetable roll", veg: true, price: [79, 119] },
  ],
  Snacks: [
    { name: "Samosa", desc: "Crispy fried pastry with spiced potato filling", veg: true, price: [29, 49] },
    { name: "Pav Bhaji", desc: "Buttery mashed vegetable mash with soft pav", veg: true, price: [99, 149] },
    { name: "Vada Pav", desc: "Mumbai's favourite spiced potato fritter burger", veg: true, price: [29, 49] },
    { name: "Dabeli", desc: "Kutchi spiced potato stuffed bun", veg: true, price: [39, 59] },
  ],
};

function pseudoRandom(seed: number, min: number, max: number) {
  const x = Math.sin(seed * 777) * 10000;
  const frac = x - Math.floor(x);
  return min + frac * (max - min);
}

function buildMenuForRestaurant(restaurantId: string, cuisines: CuisineType[], seed: number): MenuItem[] {
  const categorySet = new Set<FoodCategory>();
  cuisines.forEach((c) => cuisineToCategories[c].forEach((cat) => categorySet.add(cat)));

  const items: MenuItem[] = [];
  let itemIndex = 0;
  categorySet.forEach((category) => {
    const pool = itemPools[category];
    pool.forEach((base, i) => {
      const priceRange = base.price;
      const price = Math.round((priceRange[0] + pseudoRandom(seed + itemIndex, 0, priceRange[1] - priceRange[0])) / 10) * 10;
      items.push({
        id: `${restaurantId}-item-${itemIndex}`,
        restaurantId,
        name: base.name,
        description: base.desc,
        price,
        category,
        image: pickFoodImage(category, itemIndex + seed),
        isVeg: base.veg,
        isBestseller: (seed + itemIndex) % 5 === 0,
        rating: Math.round((3.7 + pseudoRandom(seed + itemIndex + 1, 0, 1.2)) * 10) / 10,
        ratingCount: Math.round(20 + pseudoRandom(seed + itemIndex + 2, 0, 900)),
        spiceLevel: base.veg ? (((seed + i) % 3) as 0 | 1 | 2) : (((seed + i) % 4) as 0 | 1 | 2 | 3),
      });
      itemIndex++;
    });
  });
  return items;
}

export const menuItems: MenuItem[] = restaurants.flatMap((r, i) =>
  buildMenuForRestaurant(r.id, r.cuisines, i * 13 + 3)
);

export function getMenuForRestaurant(restaurantId: string) {
  return menuItems.filter((item) => item.restaurantId === restaurantId);
}

export function getPopularDishes(limit = 12) {
  return [...menuItems].sort((a, b) => b.ratingCount - a.ratingCount).slice(0, limit);
}

export function searchMenuItems(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return menuItems.filter(
    (item) => item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
  );
}
