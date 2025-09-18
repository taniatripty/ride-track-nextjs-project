
// "use client";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function CartPage() {
//   const { data: session } = useSession();
//   const userEmail = session?.user?.email;
//   const [cartItems, setCartItems] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     if (!userEmail) return;

//     const fetchCart = async () => {
//       const res = await fetch(`/api/cart?email=${userEmail}`);
//       const data = await res.json();
//       if (data.success) setCartItems(data.cart || []);
//     };
//     fetchCart();
//   }, [userEmail]);

//   if (!session) return <p className="text-center py-10">Please login to see your cart.</p>;

//   return (
//     <div className="max-w-5xl mx-auto mt-10 p-4">
//       <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
//       <table className="min-w-full border border-gray-300 rounded-lg">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Food</th>
//             <th>Restaurant</th>
//             <th>Price</th>
//             <th>Qty</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cartItems.map((item, index) => (
//             <tr key={item._id}>
//               <td>{index + 1}</td>
//               <td>{item.name}</td>
//               <td>{item.restaurant}</td>
//               <td>${item.price}</td>
//               <td>{item.qty}</td>
//               <td>{item.status === "paid" ? "Paid ✅" : "Unpaid ❌"}</td>
//               <td>
//                 {item.status === "unpaid" && (
//                   <button
//                     onClick={() =>
//                       router.push(
//                         `/payment?amount=${item.price * item.qty * 100}&userEmail=${userEmail}&foodId=${item.foodId}`
//                       )
//                     }
//                   >
//                     Pay Now
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function CartPage() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!userEmail) return;

    const fetchCart = async () => {
      const res = await fetch(`/api/cart?email=${userEmail}`);
      const data = await res.json();
      if (data.success) setCartItems(data.cart || []);
    };
    fetchCart();
  }, [userEmail]);

  const handlePayNow = async (item) => {
    // Redirect to payment page
    router.push(
      `/payment?amount=${item.price * item.qty * 100}&userEmail=${userEmail}&foodId=${item.foodId}`
    );

    // Optimistically update status locally after payment (simulate successful payment)
    // In real scenario, you should update it after payment success callback
    setCartItems((prev) =>
      prev.map((c) =>
        c.foodId === item.foodId ? { ...c, status: "paid" } : c
      )
    );
  };

  if (!session)
    return <p className="text-center py-10 text-gray-700">Please login to see your cart.</p>;

  return (
    <div className="max-w-6xl mx-auto mt-16 p-6"> {/* Top margin added */}
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">🛒 Your Cart</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
          <thead className="bg-green-100 text-gray-700 uppercase text-sm font-semibold">
            <tr>
              <th className="border px-4 py-3 text-left">#</th>
              <th className="border px-4 py-3 text-left">Food</th>
              <th className="border px-4 py-3 text-left">Restaurant</th>
              <th className="border px-4 py-3 text-right">Price</th>
              <th className="border px-4 py-3 text-center">Qty</th>
              <th className="border px-4 py-3 text-center">Status</th>
              <th className="border px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {cartItems.map((item, index) => (
              <tr
                key={item._id}
                className="hover:bg-green-50 transition-colors duration-200"
              >
                <td className="border px-4 py-3">{index + 1}</td>
                <td className="border px-4 py-3 font-medium">{item.name}</td>
                <td className="border px-4 py-3">{item.restaurant}</td>
                <td className="border px-4 py-3 text-right">${item.price}</td>
                <td className="border px-4 py-3 text-center">{item.qty}</td>
                <td className="border px-4 py-3 text-center">
                  {item.status === "paid" ? (
                    <span className="text-green-600 font-semibold">Paid </span>
                  ) : (
                    <span className="text-red-500 font-semibold">Unpaid </span>
                  )}
                </td>
                <td className="border px-4 py-3 text-center">
                  {item.status === "unpaid" ? (
                    <button
                      onClick={() => handlePayNow(item)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Pay Now
                    </button>
                  ) : (
                    <span className="text-green-600 font-semibold">Successfully paid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {cartItems.length === 0 && (
          <p className="text-center text-gray-500 py-10">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}
