"use client";
import ReactStars from "react-stars";
import Link from "next/link";

export default function FoodCard({ food }) {
  return (
    <div className="card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col">
      {/* Image */}
      <figure>
        <img
          src={food.image || "/asset/placeholder-food.jpg"}
          alt={food.name}
          className="h-40 w-full object-cover"
        />
      </figure>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Food Name + Category */}
        <h3 className="text-lg font-semibold text-gray-800">{food.name}</h3>
        <p className="text-sm text-gray-500">{food.category}</p>

        {/* Price + Rating */}
        <div className="flex justify-between items-center mt-3">
          <p className="text-green-700 font-bold">${food.price}</p>
          <ReactStars
            count={5}
            value={food.rating}
            size={20}
            edit={false}
            color2={"#ffd700"}
          />
        </div>

        {/* Details Button */}
        <Link
          href={`/foods/${food._id}`}
          className="btn w-full mt-4 bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 text-white hover:from-green-700 hover:to-green-800"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
