
"use client";
import { useSearchParams } from "next/navigation";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentPage() {
  const params = useSearchParams();
  const amount = parseInt(params.get("amount"));
  const userEmail = params.get("userEmail");
  const foodId = params.get("foodId");

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} userEmail={userEmail} foodId={foodId} />
    </Elements>
  );
}
