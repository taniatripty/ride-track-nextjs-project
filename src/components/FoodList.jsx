"use client";
import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";


export default function FoodList() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch("/api/foods");
        const data = await res.json();
        if (data.success) {
          setFoods(data.foods);
        }
      } catch (error) {
        console.error("Error fetching foods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading foods...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
        🍴 Our Delicious Foods
      </h2>

      {foods.length === 0 ? (
        <p className="text-center text-gray-600">No foods available yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {foods.map((food) => (
            <FoodCard key={food._id} food={food}  />
          ))}
        </div>
      )}
    </div>
  );
}
