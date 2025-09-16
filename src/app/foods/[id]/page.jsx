

// "use client";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import ReactStars from "react-stars";
// import Swal from "sweetalert2";

// export default function FoodDetailsPage() {
//   const { id } = useParams();
//   const [food, setFood] = useState(null);

//   useEffect(() => {
//     if (!id) return;
//     const fetchFood = async () => {
//       const res = await fetch(`/api/foods/${id}`);
//       const data = await res.json();
//       if (data.success) setFood(data.food);
//     };
//     fetchFood();
//   }, [id]);

//   const handleAddToCart = async () => {
//     const res = await fetch("/api/cart", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         userId: "12345", // TODO: replace with real logged-in user
//         foodId: food._id,
//         name: food.name,
//         price: food.price,
//         image: food.image,
//         restaurant: food.restaurant,
//         qty: 1,
//       }),
//     });
//     const data = await res.json();
//     if (data.success) {
//       Swal.fire({ icon: "success", title: "Added to Cart", timer: 1500, showConfirmButton: false });
//     } else {
//       Swal.fire({ icon: "error", title: "Error", text: data.error });
//     }
//   };

//   if (!food) return <p className="text-center py-10">Loading...</p>;

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
//       <img src={food.image} alt={food.name} className="w-full h-64 object-cover rounded-lg mb-4" />
//       <h2 className="text-3xl font-bold text-green-700">{food.name}</h2>
//       <p className="text-gray-600">{food.description}</p>
//       <p className="mt-2 font-bold text-green-700">Restaurant: {food.restaurant}</p>
//       <p className="font-bold">Cuisine: {food.cuisine}</p>
//       <div className="flex justify-between items-center mt-3">
//         <span className="text-xl text-green-700 font-bold">${food.price}</span>
//         <ReactStars count={5} value={food.rating} size={24} edit={false} color2="#ffd700" />
//       </div>
//       <button onClick={handleAddToCart} className="btn mt-4 w-full bg-green-600 text-white hover:bg-green-700">
//         Add to Cart
//       </button>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactStars from "react-stars";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

export default function FoodDetailsPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const userEmail = session?.user?.email; // Logged-in user email
  const [food, setFood] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchFood = async () => {
      try {
        const res = await fetch(`/api/foods/${id}`);
        const data = await res.json();
        if (data.success) setFood(data.food);
      } catch (error) {
        console.error("Error fetching food:", error);
      }
    };
    fetchFood();
  }, [id]);

  const handleAddToCart = async () => {
    if (!userEmail) {
      Swal.fire({ icon: "warning", title: "Login Required", text: "Please login first" });
      return;
    }

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail,
          foodId: food._id,
          name: food.name,
          price: food.price,
          image: food.image,
          restaurant: food.restaurant,
          qty: 1,
        }),
      });

      const data = await res.json();
      if (data.success) {
        Swal.fire({ icon: "success", title: "Added to Cart", timer: 1500, showConfirmButton: false });
      } else {
        Swal.fire({ icon: "error", title: "Error", text: data.error });
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error.message });
    }
  };

  if (!food) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <img src={food.image} alt={food.name} className="w-full h-64 object-cover rounded-lg mb-4" />
      <h2 className="text-3xl font-bold text-green-700">{food.name}</h2>
      <p className="text-gray-600">{food.description}</p>
      <p className="mt-2 font-bold text-green-700">Restaurant: {food.restaurant}</p>
      <p className="font-bold">Cuisine: {food.cuisine}</p>
      <div className="flex justify-between items-center mt-3">
        <span className="text-xl text-green-700 font-bold">${food.price}</span>
        <ReactStars count={5} value={food.rating} size={24} edit={false} color2="#ffd700" />
      </div>
      <button onClick={handleAddToCart} className="btn mt-4 w-full bg-green-600 text-white hover:bg-green-700">
        Add to Cart
      </button>
    </div>
  );
}
