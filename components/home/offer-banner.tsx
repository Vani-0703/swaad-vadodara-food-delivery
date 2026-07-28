"use client";

import { motion } from "framer-motion";
import { Percent, Truck, Gift } from "lucide-react";

const offers = [
  { icon: Percent, title: "50% OFF", subtitle: "First order · WELCOME50", gradient: "from-chili-500 to-mango-500" },
  { icon: Truck, title: "Free Delivery", subtitle: "On orders above ₹149", gradient: "from-basil-500 to-turmeric-500" },
  { icon: Gift, title: "Flat ₹100 OFF", subtitle: "On orders above ₹399 · FLAT100", gradient: "from-berry-500 to-chili-500" },
];

export function OfferBanner() {
  return (
    <section className="container-page py-12">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {offers.map((offer, i) => (
          <motion.div
            key={offer.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${offer.gradient} p-6 text-white shadow-glow`}
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
            <offer.icon className="h-8 w-8" />
            <p className="mt-4 font-display text-2xl font-black">{offer.title}</p>
            <p className="mt-1 text-sm text-white/85">{offer.subtitle}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
