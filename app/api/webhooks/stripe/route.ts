import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";
import Stripe from "stripe";

/**
 * Stripe webhook handler — verifies the signature then updates order status
 * in Supabase. Wire STRIPE_WEBHOOK_SECRET from `stripe listen` or the
 * Stripe Dashboard before going live.
 */
export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      // TODO: mark the matching order as 'confirmed' in Supabase using the
      // session metadata / client_reference_id you attach at checkout creation.
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
