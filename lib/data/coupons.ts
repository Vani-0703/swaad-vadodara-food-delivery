import type { Coupon } from "@/lib/types";

export const coupons: Coupon[] = [
  { code: "WELCOME50", description: "50% off up to ₹100 on your first order", discountPercent: 50, minOrder: 199, maxDiscount: 100 },
  { code: "FLAT100", description: "Flat ₹100 off on orders above ₹399", flatDiscount: 100, minOrder: 399 },
  { code: "SUPER30", description: "30% off up to ₹150 on orders above ₹299", discountPercent: 30, minOrder: 299, maxDiscount: 150 },
  { code: "FREESHIP", description: "Free delivery on orders above ₹149", flatDiscount: 0, minOrder: 149 },
  { code: "BARODA20", description: "20% off up to ₹80 for Vadodara foodies", discountPercent: 20, minOrder: 249, maxDiscount: 80 },
];

export function applyCoupon(code: string, subtotal: number) {
  const coupon = coupons.find((c) => c.code.toLowerCase() === code.toLowerCase());
  if (!coupon) return { valid: false as const, message: "Invalid coupon code" };
  if (subtotal < coupon.minOrder) {
    return { valid: false as const, message: `Add items worth ₹${coupon.minOrder - subtotal} more to use this coupon` };
  }
  let discount = 0;
  if (coupon.discountPercent) {
    discount = Math.round((subtotal * coupon.discountPercent) / 100);
    if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);
  } else if (coupon.flatDiscount) {
    discount = coupon.flatDiscount;
  }
  return { valid: true as const, discount, coupon };
}
