// Curated Unsplash photo pools, grouped by theme.
// Format helper appends sizing params for optimized delivery.
function u(id: string) {
  return `https://images.unsplash.com/${id}?q=80&w=1200&auto=format&fit=crop`;
}

export const restaurantBanners = [
  u("photo-1517248135467-4c7edcad34c4"),
  u("photo-1414235077428-338989a2e8c0"),
  u("photo-1517244683847-7456b63c5969"),
  u("photo-1552566626-52f8b828add9"),
  u("photo-1466978913421-dad2ebd01d17"),
  u("photo-1555396273-367ea4eb4db5"),
  u("photo-1571091718767-18b5b1457add"),
  u("photo-1590846406792-0adc7f938f1d"),
  u("photo-1590846406792-e58c05f0d4d5"),
  u("photo-1600891964092-4316c288032e"),
  u("photo-1552566626-52f8b828add9"),
  u("photo-1552566626-52f8b828add9"),
];

export const restaurantLogosSeeds = Array.from({ length: 40 }, (_, i) => `resto${i}`);

export const foodImages: Record<string, string[]> = {
  Pizza: [
    u("photo-1513104890138-7c749659a591"),
    u("photo-1585238341267-9034ea3a4b90"),
    u("photo-1548365328-8b849e6c7a0b"),
    u("photo-1600628421066-f6bda6a7b1e8"),
    u("photo-1546069901-ba9599a7e63c"),
  ],
  Burgers: [
    u("photo-1550547660-d9450f859349"),
    u("photo-1565299624946-b28f40a0ae38"),
    u("photo-1571091718767-18b5b1457add"),
    u("photo-1586190848861-99aa4a171e90"),
    u("photo-1553979459-d2229ba7433b"),
  ],
  Biryani: [
    u("photo-1633945274405-b6c8069047b0"),
    u("photo-1589302168068-964664d93dc0"),
    u("photo-1631515243349-e0cb75fb8d3a"),
    u("photo-1631292784640-2b24be784d5d"),
  ],
  "South Indian": [
    u("photo-1610192244261-3f33de3f55e4"),
    u("photo-1630383249896-424e482df921"),
    u("photo-1589301760014-d929f3979dbc"),
    u("photo-1606491956689-2ea866880c84"),
  ],
  "North Indian": [
    u("photo-1585937421612-70a008356fbe"),
    u("photo-1601050690597-df0568f70950"),
    u("photo-1565557623262-b51c2513a641"),
    u("photo-1631452180519-c014fe946bc7"),
    u("photo-1567337710282-00832b415979"),
  ],
  Chinese: [
    u("photo-1585032226651-759a68395797"),
    u("photo-1547592166-23ac45744acd"),
    u("photo-1552611052-33e04de081de"),
    u("photo-1552611052-a7ff56ede1b1"),
  ],
  "Gujarati Thali": [
    u("photo-1601050690597-df0568f70950"),
    u("photo-1631452180519-c014fe946bc7"),
    u("photo-1567188040759-fb8a883dc6d8"),
    u("photo-1596797038530-2c107229654b"),
  ],
  Sandwiches: [
    u("photo-1481070555726-e2fe8357725c"),
    u("photo-1553909489-cd47e0907980"),
    u("photo-1539252554935-80c7f5290b3c"),
    u("photo-1567234669003-dce7a7a88821"),
  ],
  Cakes: [
    u("photo-1488900128323-21503983a07e"),
    u("photo-1578985545062-69928b1d9587"),
    u("photo-1571115177098-24ec42ed204d"),
    u("photo-1622597467836-f3285f2131b8"),
    u("photo-1535141192574-5d4897c12636"),
  ],
  "Ice Cream": [
    u("photo-1497034825429-c343d7c6a68f"),
    u("photo-1497515114629-f71d768fd07c"),
    u("photo-1560008581-09826d1de69e"),
    u("photo-1567206563064-6f60f40a2b57"),
  ],
  Juices: [
    u("photo-1600271886742-f049cd451bba"),
    u("photo-1546833999-b9f581a1996d"),
    u("photo-1613478223719-2ab802602423"),
    u("photo-1560526860-1f0e56380b3a"),
  ],
  Coffee: [
    u("photo-1497034825429-c343d7c6a68f"),
    u("photo-1509042239860-f550ce710b93"),
    u("photo-1447933601403-0c6688de566e"),
    u("photo-1495474472287-4d71bcdd2085"),
    u("photo-1541167760496-1628856ab772"),
  ],
  Desserts: [
    u("photo-1571877227200-a0d98ea607e9"),
    u("photo-1601303516534-bf0b1eb63c14"),
    u("photo-1606313564200-e75d5e30476c"),
    u("photo-1587314168485-3236d6710814"),
  ],
  Beverages: [
    u("photo-1544145945-f90425340c7e"),
    u("photo-1571934811356-5cc061b6821f"),
    u("photo-1497534446932-c925b458314e"),
    u("photo-1546171753-97d7676e4602"),
  ],
  "Rolls & Wraps": [
    u("photo-1626700051175-6818013e1d4f"),
    u("photo-1600628421066-f6bda6a7b1e8"),
    u("photo-1584208632869-05fa2b2a5934"),
  ],
  Snacks: [
    u("photo-1601050690597-df0568f70950"),
    u("photo-1606491956689-2ea866880c84"),
    u("photo-1630383249896-424e482df921"),
    u("photo-1589301760014-d929f3979dbc"),
  ],
};

export function pickFoodImage(category: string, index: number) {
  const pool = foodImages[category] ?? foodImages["North Indian"];
  return pool[index % pool.length];
}

export function pickBanner(index: number) {
  return restaurantBanners[index % restaurantBanners.length];
}
