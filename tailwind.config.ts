import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        chili: { DEFAULT: "#FF4757", 50: "#FFF1F2", 100: "#FFE0E2", 500: "#FF4757", 600: "#E6293B", 700: "#C41E2E" },
        turmeric: { DEFAULT: "#FFB800", 50: "#FFF8E1", 100: "#FFEDB3", 500: "#FFB800", 600: "#E6A400" },
        mango: { DEFAULT: "#FF8A3D", 500: "#FF8A3D", 600: "#F5701A" },
        berry: { DEFAULT: "#C2185B", 500: "#C2185B", 600: "#A01249" },
        basil: { DEFAULT: "#16A34A", 500: "#16A34A" },
        ink: { DEFAULT: "#1A1025", 50: "#F5F2F7", 100: "#EAE4EF", 300: "#B3A6C0", 400: "#6B5B7A", 700: "#2B1B34", 900: "#1A1025" },
        cream: { DEFAULT: "#FFF9F2", 100: "#FFF9F2", 200: "#FFF2E3" },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "#FF4757", foreground: "#FFFFFF" },
        secondary: { DEFAULT: "#FFF2E3", foreground: "#1A1025" },
        muted: { DEFAULT: "#F5F2F7", foreground: "#6B5B7A" },
        accent: { DEFAULT: "#FFB800", foreground: "#1A1025" },
        destructive: { DEFAULT: "#E6293B", foreground: "#FFFFFF" },
        card: { DEFAULT: "#FFFFFF", foreground: "#1A1025" },
        popover: { DEFAULT: "#FFFFFF", foreground: "#1A1025" },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-utility)", "monospace"],
      },
      backgroundImage: {
        "gradient-spice": "linear-gradient(135deg, #FF4757 0%, #FF8A3D 50%, #FFB800 100%)",
        "gradient-berry": "linear-gradient(135deg, #C2185B 0%, #FF4757 100%)",
        "gradient-mesh": "radial-gradient(at 20% 20%, rgba(255,71,87,0.35) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(255,184,0,0.30) 0px, transparent 50%), radial-gradient(at 50% 80%, rgba(194,24,91,0.25) 0px, transparent 50%)",
        "gradient-ring": "conic-gradient(from 0deg, #FF4757, #FF8A3D, #FFB800, #FF4757)",
      },
      borderRadius: {
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
        "3xl": "2.5rem",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(26, 16, 37, 0.12)",
        glow: "0 0 40px rgba(255, 71, 87, 0.25)",
        card: "0 4px 24px rgba(26, 16, 37, 0.08)",
        "card-hover": "0 16px 40px rgba(26, 16, 37, 0.16)",
      },
      keyframes: {
        "steam": {
          "0%, 100%": { transform: "translateY(0) scaleY(1)", opacity: "0.6" },
          "50%": { transform: "translateY(-14px) scaleY(1.15)", opacity: "0.15" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: {
        steam: "steam 3.5s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
