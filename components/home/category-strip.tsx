"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { categories } from "@/lib/data/categories";

export function CategoryStrip() {
  return (
    <section className="container-page py-12">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900 sm:text-3xl">Order by craving</h2>
          <p className="text-sm text-ink-400">Jump straight to what you're in the mood for</p>
        </div>
      </div>

      <div className="scrollbar-hide -mx-4 flex gap-4 overflow-x-auto px-4 pb-2">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
          >
            <Link
              href={`/restaurants?category=${encodeURIComponent(cat.name)}`}
              className="group flex w-24 shrink-0 flex-col items-center gap-2"
            >
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${cat.gradient} shadow-card transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-glow`}
              >
                <cat.icon className="h-8 w-8 text-white" />
              </div>
              <span className="text-center text-xs font-semibold text-ink-700">{cat.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
