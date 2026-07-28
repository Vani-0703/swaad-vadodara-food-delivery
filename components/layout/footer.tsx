import Link from "next/link";
import { Instagram, Facebook, Twitter, MapPin, Mail, Phone } from "lucide-react";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Swaad", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Investor Relations", href: "#" },
    ],
  },
  {
    title: "For Restaurants",
    links: [
      { label: "Partner with us", href: "#" },
      { label: "Restaurant dashboard", href: "/dashboard/restaurant" },
      { label: "Apps for you", href: "#" },
    ],
  },
  {
    title: "For Delivery Partners",
    links: [
      { label: "Become a partner", href: "#" },
      { label: "Delivery dashboard", href: "/dashboard/delivery" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help & Support", href: "#" },
      { label: "Order history", href: "/orders" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-ink-900 text-white/80">
      <div className="container-page grid grid-cols-2 gap-10 py-16 md:grid-cols-6">
        <div className="col-span-2">
          <p className="font-display text-2xl font-extrabold text-white">
            Swaad<span className="text-turmeric-500">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
            Vadodara's favourite way to order food online — from Sankalp thalis to midnight pizzas, delivered fast and fresh.
          </p>
          <div className="mt-5 space-y-2 text-sm text-white/60">
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Alkapuri, Vadodara, Gujarat</p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> 1800-123-4567</p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@swaad.app</p>
          </div>
          <div className="mt-5 flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <span key={i} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-gradient-spice">
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="mb-4 text-sm font-bold uppercase tracking-wide text-white">{col.title}</p>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/60 transition-colors hover:text-turmeric-500">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Swaad Vadodara. Built with Next.js, Tailwind CSS & a lot of masala.
      </div>
    </footer>
  );
}
