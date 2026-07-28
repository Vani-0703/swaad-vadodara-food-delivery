import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Space_Grotesk } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700", "800"],
});
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const utility = Space_Grotesk({ subsets: ["latin"], variable: "--font-utility", weight: ["500", "700"] });

export const metadata: Metadata = {
  title: "Swaad — Food Delivery in Vadodara",
  description:
    "Order food online from 100+ restaurants in Vadodara. Fast delivery, live tracking, and the best of Gujarati, North Indian, Chinese and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${display.variable} ${body.variable} ${utility.variable}`}>
        <body className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-center" richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
