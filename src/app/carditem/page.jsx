"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function CartPage() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items for the logged-in user
  useEffect(() => {
    if (!userEmail) return;

    const fetchCart = async () => {
      try {
        const res = await fetch(`/api/cart?email=${userEmail}`);
        const data = await res.json();
        if (data.success) setCartItems(data.cart || []);
        else Swal.fire({ icon: "error", title: "Error", text: data.error });
      } catch (error) {
        Swal.fire({ icon: "error", title: "Error", text: error.message });
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userEmail]);

  if (!session) {
    return <p className="text-center py-10">Please login to see your cart.</p>;
  }

  if (loading) {
    return <p className="text-center py-10">Loading cart...</p>;
  }

  if (cartItems.length === 0) {
    return <p className="text-center py-10">Your cart is empty.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Your Cart</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-green-100">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Food</th>
              <th className="border px-4 py-2">Restaurant</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.restaurant}</td>
                <td className="border px-4 py-2">${item.price}</td>
                <td className="border px-4 py-2">{item.qty}</td>
                <td className="border px-4 py-2">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="border px-4 py-2">
                  {item.status === "paid" ? (
                    <span className="text-green-600 font-semibold">Paid</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Unpaid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
