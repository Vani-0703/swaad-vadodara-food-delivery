"use client";

import { motion } from "framer-motion";
import { MapPin, Sparkles } from "lucide-react";
import { SearchBar } from "@/components/shared/search-bar";

const floatingBadges = [
  { label: "100+ Restaurants", top: "12%", left: "6%", delay: 0 },
  { label: "30 min delivery", top: "70%", left: "8%", delay: 0.4 },
  { label: "4.5★ Avg rating", top: "20%", left: "88%", delay: 0.8 },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-900">
      <div className="absolute inset-0 bg-gradient-mesh" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.08),transparent_60%)]" />

      <div className="container-page relative py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-dark mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-white/90"
          >
            <MapPin className="h-3.5 w-3.5 text-turmeric-500" /> Delivering across Vadodara
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl font-black leading-[1.05] text-white sm:text-6xl"
          >
            Vadodara's <span className="relative inline-block">
              <span className="text-gradient-spice">real</span>
              {/* Signature: animated steam wisps rising off the headline, echoing a hot thali */}
              <svg className="pointer-events-none absolute -top-6 left-1/2 h-8 w-10 -translate-x-1/2 opacity-70" viewBox="0 0 40 32" fill="none">
                <path d="M6 30C6 30 2 22 8 16C14 10 8 4 8 2" stroke="white" strokeWidth="2" strokeLinecap="round" className="origin-bottom animate-steam" />
                <path d="M20 30C20 30 16 22 22 16C28 10 22 4 22 2" stroke="white" strokeWidth="2" strokeLinecap="round" className="origin-bottom animate-steam [animation-delay:0.6s]" />
                <path d="M34 30C34 30 30 22 36 16C42 10 36 4 36 2" stroke="white" strokeWidth="2" strokeLinecap="round" className="origin-bottom animate-steam [animation-delay:1.1s]" />
              </svg>
            </span> swaad,<br /> delivered hot.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-lg text-white/70"
          >
            From Alkapuri's favourite thalis to Fatehgunj's late-night biryani — order from 100+ local restaurants in minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-8 max-w-xl"
          >
            <SearchBar placeholder="Search 'Sankalp', 'Biryani', 'Pizza'..." />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-5 flex items-center justify-center gap-1.5 text-sm text-turmeric-500"
          >
            <Sparkles className="h-4 w-4" /> Flat 50% OFF on your first order — use WELCOME50
          </motion.div>
        </div>

        {floatingBadges.map((b) => (
          <motion.div
            key={b.label}
            className="glass-dark absolute hidden rounded-2xl px-4 py-2 text-xs font-semibold text-white lg:block"
            style={{ top: b.top, left: b.left }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: b.delay, ease: "easeInOut" }}
          >
            {b.label}
          </motion.div>
        ))}
      </div>

      <svg className="block w-full text-cream" viewBox="0 0 1440 60" fill="currentColor">
        <path d="M0 40C240 10 480 60 720 40C960 20 1200 10 1440 40V60H0V40Z" />
      </svg>
    </section>
  );
}
