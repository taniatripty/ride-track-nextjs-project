
// "use client";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";

// export default function CheckoutForm({ amount, userEmail, foodId }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // 1️⃣ Create PaymentIntent
//     const res = await fetch("/api/paymentintent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount }),
//     });
//     const { clientSecret } = await res.json();

//     // 2️⃣ Confirm payment
//     const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: { card: elements.getElement(CardElement) },
//     });

//     if (error) {
//       Swal.fire({ icon: "error", title: "Payment Failed", text: error.message });
//       setLoading(false);
//       return;
//     }

//     if (paymentIntent.status === "succeeded") {
//       // 3️⃣ Update cart status
//       await fetch("/api/cart", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ updateStatus: true, userEmail, foodId, status: "paid" }),
//       });

//       Swal.fire({ icon: "success", title: "Payment Successful" }).then(() =>
//         router.push("/cartitem")
//       );
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-6 mt-18 max-w-md mx-auto border rounded-lg shadow">
//       <CardElement className="p-3 border rounded-md" />
//       <button type="submit" disabled={!stripe || loading}>
//         {loading ? "Processing..." : `Pay $${amount / 100}`}
//       </button>
//     </form>
//   );
// }

"use client";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function CheckoutForm({ amount, userEmail, foodId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Create PaymentIntent
      const res = await fetch("/api/paymentintent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const { clientSecret } = await res.json();

      // 2️⃣ Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (error) {
        Swal.fire({ icon: "error", title: "Payment Failed", text: error.message });
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        // 3️⃣ Update cart status
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ updateStatus: true, userEmail, foodId, status: "paid" }),
        });

        Swal.fire({ icon: "success", title: "Payment Successful" }).then(() =>
          router.push("/carditem")
        );
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">💳 Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6 p-4 border rounded-lg shadow-inner bg-gray-50">
          <CardElement options={{ style: { base: { fontSize: '16px', color: '#374151', '::placeholder': { color: '#9ca3af' } } } }} />
        </div>
        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-all duration-200 
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 active:scale-95'}`}
        >
          {loading ? "Processing..." : `Pay $${(amount / 100).toFixed(2)}`}
        </button>
      </form>
    </div>
  );
}
