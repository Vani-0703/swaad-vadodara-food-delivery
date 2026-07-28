import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";

/**
 * Creates a Stripe Checkout Session for the current cart.
 * Expects: { items: { name: string; price: number; quantity: number }[], restaurantName: string }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, restaurantName } = body as {
      items: { name: string; price: number; quantity: number }[];
      restaurantName: string;
    };

    if (!items?.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: { name: `${item.name} — ${restaurantName}` },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error", err);
    return NextResponse.json({ error: "Unable to start checkout" }, { status: 500 });
  }
}
