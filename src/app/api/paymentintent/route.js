import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { amount } = await req.json();
    if (!amount) return NextResponse.json({ success: false, error: "Amount required" }, { status: 400 });

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
