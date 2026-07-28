# Swaad 🍛 — Food Delivery Platform for Vadodara

A premium, Swiggy/Zomato-inspired food delivery web app built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and a hand-rolled Shadcn-style UI kit. Vibrant gradients, glassmorphism, and Framer Motion micro-interactions throughout — seeded with realistic Vadodara restaurant and menu data.

> **Status: Phase 1 (customer-facing app) is complete and fully explorable with local/mock data.** Auth, payments, database, and maps are wired end-to-end but need your API keys to go live — see [Connecting real services](#connecting-real-services) below. Restaurant Owner / Delivery Partner / Admin dashboards are included as functional demo views; see [Roadmap](#roadmap) for what's next.

---

## ✨ What's inside

- **30 realistic Vadodara restaurants** across Alkapuri, Sayajigunj, Fatehgunj, Manjalpur, Akota, Gotri, Race Course, Karelibaug and more — with ratings, price-for-two, delivery time, offers, tags, reviews, and photo galleries.
- **~300 menu items** spanning Pizza, Burgers, Biryani, South Indian, North Indian, Chinese, Gujarati Thali, Sandwiches, Cakes, Ice Cream, Juices, Coffee, Desserts, Beverages, Rolls & Wraps, and Snacks — each with veg/non-veg markers, bestseller tags, ratings, and images.
- **Full customer journey**: home → search/filter restaurants → restaurant menu → cart → coupon codes → checkout → payment → live order tracking → order history → wishlist.
- **Signature design language**: a "plate-ring" gradient rating badge (chili → mango → turmeric, echoing a thali rim), animated steam wisps on the hero, glassmorphic navbar and cards, and a warm spice-inspired palette — see [Design system](#design-system).
- **Auth-ready** with Clerk (sign in/up, protected routes via middleware).
- **Database-ready** with a complete Supabase schema (`lib/supabase/schema.sql`) including RLS policies.
- **Payments-ready** with Stripe Checkout Sessions (`/api/checkout`) and a webhook handler stub (`/api/webhooks/stripe`).
- **Maps-ready** live order tracking UI built on `@vis.gl/react-google-maps`, with a styled fallback when no API key is configured.
- Three role-based dashboards (Restaurant Owner, Delivery Partner, Admin) as working demo views over the seeded data.

---

## 🧱 Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, Server Components) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS + custom design tokens |
| Components | Hand-rolled Shadcn-style primitives (Radix UI under the hood) |
| Animation | Framer Motion |
| State | Zustand (cart, wishlist, orders — persisted to `localStorage`) |
| Auth | Clerk |
| Database | Supabase (Postgres + RLS) |
| Payments | Stripe Checkout |
| Maps | Google Maps via `@vis.gl/react-google-maps` |
| Icons | lucide-react |
| Deployment | Vercel |

---

## 🚀 Getting started

```bash
npm install
cp .env.example .env.local   # fill in your keys — see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app runs fully on local seed data (`lib/data/`) even with placeholder `.env` values — you only need real keys to enable sign-in, live payments, a real database, and live maps.

---

## 📁 Project structure

```
app/
  page.tsx                     Home (hero, categories, trending, offers, popular dishes)
  restaurants/page.tsx         Search + filter + browse all restaurants
  restaurant/[slug]/page.tsx   Restaurant detail, menu, reviews, gallery
  cart/page.tsx                Cart with coupon codes
  checkout/page.tsx            Address, payment method, order placement
  checkout/success/page.tsx    Order confirmation
  orders/page.tsx              Order history
  orders/[id]/page.tsx         Live order tracking (map + status timeline)
  wishlist/page.tsx            Saved restaurants
  dashboard/restaurant/        Restaurant owner dashboard (demo)
  dashboard/delivery/          Delivery partner dashboard (demo)
  dashboard/admin/             Admin dashboard (demo)
  sign-in/, sign-up/           Clerk auth pages
  api/checkout/route.ts        Creates a Stripe Checkout Session
  api/webhooks/stripe/route.ts Verifies + handles Stripe webhook events

components/
  ui/            Button, Card, Badge, Input, Sheet, Dialog, Tabs, Skeleton, Separator
  layout/        Navbar, Footer
  home/          Hero, CategoryStrip, TrendingRestaurants, PopularDishes, OfferBanner
  restaurant/    RestaurantCard, RestaurantFilters, RestaurantMenu, FoodItemCard
  cart/          CartDrawer
  orders/        OrderTrackingClient
  shared/        SafeImage, RatingBadge, VegDot, SearchBar, MapView

lib/
  types.ts                Shared TypeScript types
  data/restaurants.ts     30-restaurant seed generator
  data/menu-items.ts      Menu generator mapped from cuisines → categories
  data/image-pools.ts     Curated Unsplash image pools by food category
  data/coupons.ts         Coupon codes + validation logic
  store/                  Zustand stores: cart, wishlist, orders
  supabase/                Browser/server clients + schema.sql
  stripe/client.ts         Server-side Stripe SDK instance
```

---

## 🎨 Design system

The UI takes a distinct **"spice market"** direction rather than a generic red/orange food-app look:

- **Palette** — `chili` `#FF4757`, `mango` `#FF8A3D`, `turmeric` `#FFB800`, `berry` `#C2185B`, `basil` `#16A34A`, `ink` `#1A1025`, `cream` `#FFF9F2`.
- **Type** — Plus Jakarta Sans for display headings, Inter for body copy, Space Grotesk for prices/timers/data (a distinct "utility" voice for numbers).
- **Signature element** — the *plate-ring* rating badge: a conic gradient ring (chili → mango → turmeric) around every rating, echoing the rim of a thali, used consistently across restaurant cards, food cards, and the restaurant header.
- **Motion** — animated steam wisps rising off the hero headline, staggered card reveals on scroll, hover-lift on cards, and a live-updating order tracking timeline.
- All gradients/utilities are defined once in `tailwind.config.ts` and `app/globals.css` (`.glass`, `.plate-ring`, `.text-gradient-spice`, etc.) — reuse them rather than inlining new ones.

---

## 🔌 Connecting real services

The app is fully wired for these services — it just needs credentials in `.env.local`:

### Clerk (auth)
1. Create an app at [clerk.com](https://clerk.com).
2. Copy the publishable + secret keys into `.env.local`.
3. Protected routes (`/checkout`, `/orders`, `/dashboard`, `/wishlist`) are already gated in `middleware.ts`.

### Supabase (database)
1. Create a project at [supabase.com](https://supabase.com).
2. Run `lib/supabase/schema.sql` in the SQL editor to provision tables + RLS policies.
3. Copy the project URL + anon key into `.env.local`.
4. Swap the local Zustand stores for Supabase queries as you migrate off seed data (the shape of `Restaurant`, `MenuItem`, and `Order` in `lib/types.ts` matches the schema columns).

### Stripe (payments)
1. Grab your test keys from the [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys).
2. `/api/checkout` already creates a real Checkout Session from the cart.
3. Run `stripe listen --forward-to localhost:3000/api/webhooks/stripe` locally and copy the printed webhook secret into `.env.local`.
4. Wire the `checkout.session.completed` handler in `/api/webhooks/stripe/route.ts` to mark the matching Supabase order as `confirmed`.

### Google Maps (live tracking)
1. Enable the **Maps JavaScript API** in Google Cloud Console and create an API key.
2. Add it as `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.
3. Without a key, `MapView` renders a styled placeholder so the tracking page still looks intentional in local dev.

---

## 🖼️ A note on images

Restaurant, menu, and gallery images are pulled from curated Unsplash photo pools (`lib/data/image-pools.ts`) — free and royalty-free. Because this project was assembled without live network access to verify every URL, `SafeImage` (`components/shared/safe-image.tsx`) gracefully falls back to a branded gradient placeholder if any individual photo ever fails to load, so the UI never shows a broken image icon. Swap in your own photography or a DAM/CDN by editing `image-pools.ts` — the rest of the app just consumes `restaurant.banner` / `item.image` and doesn't care where they come from.

---

## 📈 Scaling the seed data

Restaurants and menu items are generated from compact data pools rather than hand-typed one by one:

- Add more restaurants: extend `restaurantSeeds` in `lib/data/restaurants.ts` (name, cuisines, area, veg-only flag, tags) — everything else (ratings, coordinates, offers, reviews, slug) is derived automatically.
- Add more dishes: extend the relevant category array in `itemPools` inside `lib/data/menu-items.ts` — every restaurant serving that category picks it up automatically.
- Add more areas: extend the `areas` array in `restaurants.ts` with a Vadodara locality + approximate lat/lng.

This is how you'd grow from 30 → 100+ restaurants and 300 → 500+ dishes without restructuring the app.

---

## 🗺️ Roadmap

Not yet built — natural next phases:

- **Restaurant owner dashboard**: order accept/reject actions, menu item CRUD, payout history, sales charts.
- **Delivery partner dashboard**: order queue, turn-by-turn navigation, real-time status updates that sync to the customer's tracking page via Supabase Realtime.
- **Admin dashboard**: restaurant approval queue, dispute resolution, coupon management, role assignment via Clerk organizations/metadata.
- **Push notifications**: order status updates via Supabase Realtime + a notification bell in the navbar.
- **Server-side data layer**: migrate `lib/data/*` seed arrays to real Supabase queries (Server Components + Route Handlers) once the schema is populated.
- Automated tests (Playwright for the checkout flow, Vitest for cart/coupon logic).

---

## 🚢 Deploying to Vercel

```bash
vercel
```

Or connect the repo in the Vercel dashboard, set the environment variables from `.env.example` in Project Settings, and deploy. `vercel.json` is pre-configured for the Next.js framework preset.

---

## 📄 License

Built as a portfolio/demo project. Swap in your own branding, images, and legal pages before any commercial use.
