"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function RestaurantTable() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRestaurants = async () => {
    try {
      const res = await fetch("/api/restaurants");
      const data = await res.json();
      console.log("API response:", data); // debug response

      if (data.success) {
        // Use whichever key your backend returns
        setRestaurants(data.restaurants || data.data || []); 
      } else {
        setRestaurants([]);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error || "Failed to fetch restaurants",
        });
      }
    } catch (error) {
      setRestaurants([]);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
        Restaurants
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-green-100">
            <tr>
              <th className="border px-4 py-2 text-left">#</th>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Image</th>
              <th className="border px-4 py-2 text-left">Location</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : restaurants.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No restaurants found
                </td>
              </tr>
            ) : (
              restaurants.map((restaurant, index) => (
                <tr key={restaurant._id || index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{restaurant.name}</td>
                  <td className="border px-4 py-2">
                    {restaurant.image ? (
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="border px-4 py-2">{restaurant.location}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
