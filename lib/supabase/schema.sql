-- Swaad Vadodara — Supabase schema
-- Run this in the Supabase SQL editor to provision the database.

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  clerk_user_id text unique not null,
  full_name text,
  phone text,
  role text not null default 'customer' check (role in ('customer', 'restaurant_owner', 'delivery_partner', 'admin')),
  created_at timestamptz default now()
);

create table if not exists restaurants (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references profiles(id),
  slug text unique not null,
  name text not null,
  description text,
  logo_url text,
  banner_url text,
  cuisines text[] not null default '{}',
  is_pure_veg boolean default false,
  address_line1 text,
  area text,
  city text default 'Vadodara',
  pincode text,
  lat double precision,
  lng double precision,
  rating numeric(2,1) default 0,
  rating_count int default 0,
  price_for_two int,
  delivery_time_minutes int,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists menu_items (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid references restaurants(id) on delete cascade,
  name text not null,
  description text,
  price numeric(10,2) not null,
  category text not null,
  image_url text,
  is_veg boolean default true,
  is_bestseller boolean default false,
  is_available boolean default true,
  created_at timestamptz default now()
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid references restaurants(id) on delete cascade,
  user_id uuid references profiles(id),
  rating int not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now()
);

create table if not exists coupons (
  code text primary key,
  description text,
  discount_percent int,
  flat_discount numeric(10,2),
  min_order numeric(10,2) default 0,
  max_discount numeric(10,2),
  active boolean default true
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references profiles(id),
  restaurant_id uuid references restaurants(id),
  delivery_partner_id uuid references profiles(id),
  status text not null default 'placed'
    check (status in ('placed','confirmed','preparing','picked_up','on_the_way','delivered','cancelled')),
  subtotal numeric(10,2) not null,
  discount numeric(10,2) default 0,
  delivery_fee numeric(10,2) default 0,
  total numeric(10,2) not null,
  coupon_code text references coupons(code),
  delivery_address text,
  delivery_lat double precision,
  delivery_lng double precision,
  stripe_payment_intent_id text,
  placed_at timestamptz default now(),
  eta timestamptz
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  menu_item_id uuid references menu_items(id),
  name text not null,
  price numeric(10,2) not null,
  quantity int not null default 1
);

create table if not exists wishlists (
  user_id uuid references profiles(id),
  restaurant_id uuid references restaurants(id),
  primary key (user_id, restaurant_id)
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  title text not null,
  body text,
  read boolean default false,
  created_at timestamptz default now()
);

-- Row Level Security
alter table profiles enable row level security;
alter table orders enable row level security;
alter table wishlists enable row level security;
alter table notifications enable row level security;

create policy "Users manage their own profile" on profiles
  for all using (clerk_user_id = auth.jwt() ->> 'sub');

create policy "Users see their own orders" on orders
  for select using (customer_id in (select id from profiles where clerk_user_id = auth.jwt() ->> 'sub'));

create policy "Users manage their own wishlist" on wishlists
  for all using (user_id in (select id from profiles where clerk_user_id = auth.jwt() ->> 'sub'));

create policy "Users see their own notifications" on notifications
  for select using (user_id in (select id from profiles where clerk_user_id = auth.jwt() ->> 'sub'));
