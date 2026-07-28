"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MapPin, Menu, ShoppingBag, X } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/shared/search-bar";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { useCartStore } from "@/lib/store/cart-store";

const navLinks = [
  { href: "/restaurants", label: "Restaurants" },
  { href: "/restaurants?category=Biryani", label: "Biryani" },
  { href: "/restaurants?category=Pizza", label: "Pizza" },
  { href: "/wishlist", label: "Wishlist" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <header className="sticky top-0 z-40 glass shadow-glass">
      <div className="container-page flex h-20 items-center gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <motion.div
            whileHover={{ rotate: -8, scale: 1.05 }}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-spice text-lg font-black text-white shadow-glow"
          >
            S
          </motion.div>
          <div className="hidden sm:block">
            <p className="font-display text-xl font-extrabold leading-none text-ink-900">
              Swaad<span className="text-gradient-spice">.</span>
            </p>
            <p className="flex items-center gap-1 text-[11px] font-medium text-ink-400">
              <MapPin className="h-3 w-3" /> Vadodara
            </p>
          </div>
        </Link>

        <div className="hidden flex-1 md:block">
          <SearchBar />
        </div>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-ink-700 transition-colors hover:text-chili-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Link href="/wishlist" className="hidden sm:block">
            <Button variant="ghost" size="icon" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>

          <Button variant="ghost" size="icon" className="relative" onClick={() => setCartOpen(true)} aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-chili-500 text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Button>

          <SignedOut>
            <SignInButton mode="modal">
              <Button size="sm" className="hidden sm:inline-flex">
                Sign in
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen((v) => !v)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div className="px-4 pb-3 md:hidden">
        <SearchBar />
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="border-t border-ink-900/10 bg-white lg:hidden"
        >
          <nav className="container-page flex flex-col gap-1 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </header>
  );
}
