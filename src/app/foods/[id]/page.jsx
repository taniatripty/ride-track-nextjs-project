"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactStars from "react-stars";

export default function FoodDetailsPage() {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchFood = async () => {
      try {
        const res = await fetch(`/api/foods/${id}`);
        const data = await res.json();
        if (data.success) {
          setFood(data.food);
        }
      } catch (error) {
        console.error("Error fetching food details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [id]);

  if (loading) {
    return <p className="text-center py-10">Loading food details...</p>;
  }

  if (!food) {
    return <p className="text-center py-10 text-gray-600">Food not found.</p>;
  }

  return (
    <div className="max-w-4xl mt-10 mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:flex gap-6">
        {/* Image */}
        <img
          src={food.image || "/asset/placeholder-food.jpg"}
          alt={food.name}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow"
        />

        {/* Content */}
        <div className="flex flex-col justify-between flex-grow mt-4 md:mt-0">
          <h2 className="text-3xl font-bold text-green-700">{food.name}</h2>
          <p className="text-gray-500 text-sm mb-2">{food.category}</p>
          <p className="text-gray-700 mb-4">{food.description}</p>

          {/* Price + Rating */}
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-green-700">${food.price}</span>
            <ReactStars
              count={5}
              value={food.rating}
              size={24}
              edit={false}
              color2={"#ffd700"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
