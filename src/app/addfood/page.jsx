
// "use client";

// import { useState, useEffect } from "react";
// import Swal from "sweetalert2";

// export default function AddFoodForm() {
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [rating, setRating] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [restaurants, setRestaurants] = useState([]);

//   // Fetch restaurants from API
//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       try {
//         const res = await fetch("/api/restaurants");
//         const data = await res.json();
//         if (data.success) setRestaurants(data.data);
//       } catch (error) {
//         console.error("Error fetching restaurants:", error);
//       }
//     };
//     fetchRestaurants();
//   }, []);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       let imageUrl = "";

//       if (imageFile) {
//         const formData = new FormData();
//         formData.append("image", imageFile);

//         const imgbbRes = await fetch(
//           `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
//           { method: "POST", body: formData }
//         );
//         const imgbbData = await imgbbRes.json();
//         if (imgbbData.success) imageUrl = imgbbData.data.url;
//         else throw new Error("Image upload failed");
//       }

//       const form = e.target;
//       const food = {
//         name: form.name.value.trim(),
//         restaurant: form.restaurant.value,
//         description: form.description.value.trim(),
//         price: parseFloat(form.price.value),
//         category: form.category.value,
//         rating,
//         image: imageUrl,
//       };

//       if (!food.name || !food.restaurant || !food.description || !food.price) {
//         Swal.fire({ icon: "error", title: "All fields are required" });
//         setLoading(false);
//         return;
//       }

//       const res = await fetch("/api/foods", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(food),
//       });

//       const data = await res.json();
//       setLoading(false);

//       if (data?.success) {
//         Swal.fire({
//           icon: "success",
//           title: "Food Added!",
//           text: "Your food has been added successfully.",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//         form.reset();
//         setImageFile(null);
//         setImagePreview(null);
//         setRating(0);
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: data?.error || "Something went wrong.",
//         });
//       }
//     } catch (error) {
//       setLoading(false);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error.message || "Something went wrong.",
//       });
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen mt-8">
//       <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8">
//         <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
//           🍕 Add New Food
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Food Name */}
//             <div>
//               <label className="block mb-1 font-medium text-gray-700">
//                 Food Name
//               </label>
//               <input
//                 name="name"
//                 type="text"
//                 placeholder="Enter food name"
//                 className="input input-bordered w-full"
//                 required
//               />
//             </div>

//             {/* Restaurant Dropdown */}
//             <div>
//               <label className="block mb-1 font-medium text-gray-700">
//                 Restaurant
//               </label>
//               <select name="restaurant" className="select select-bordered w-full" required>
//                 <option value="">Select Restaurant</option>
//                 {restaurants.map((r) => (
//                   <option key={r._id} value={r.name}>
//                     {r.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Category */}
//             <div>
//               <label className="block mb-1 font-medium text-gray-700">
//                 Category
//               </label>
//               <select name="category" className="select select-bordered w-full" required>
//                 <option>Fast Food</option>
//                 <option>Beverages</option>
//                 <option>Desserts</option>
//                 <option>Main Course</option>
//                 <option>Snacks</option>
//                 <option>Drinks</option>
//               </select>
//             </div>

//             {/* Price */}
//             <div>
//               <label className="block mb-1 font-medium text-gray-700">Price</label>
//               <input
//                 name="price"
//                 type="number"
//                 step="0.1"
//                 placeholder="Enter price"
//                 className="input input-bordered w-full"
//                 required
//               />
//             </div>

//             {/* Rating */}
//             <div>
//               <label className="block mb-1 font-medium text-gray-700">Rating</label>
//               <input
//                 name="rating"
//                 type="number"
//                 min="1"
//                 max="5"
//                 step="0.1"
//                 value={rating}
//                 onChange={(e) => setRating(parseFloat(e.target.value))}
//                 placeholder="Rating (1 - 5)"
//                 className="input input-bordered w-full"
//                 required
//               />
//             </div>

//             {/* Description */}
//             <div className="md:col-span-2">
//               <label className="block mb-1 font-medium text-gray-700">Description</label>
//               <textarea
//                 name="description"
//                 placeholder="Enter food description"
//                 className="textarea textarea-bordered w-full"
//                 rows="3"
//                 required
//               ></textarea>
//             </div>

//             {/* Image Upload */}
//             <div className="md:col-span-2">
//               <label className="block mb-1 font-medium text-gray-700">Food Image</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="file-input file-input-bordered w-full"
//                 required
//               />
//               {imagePreview && (
//                 <img
//                   src={imagePreview}
//                   alt="preview"
//                   className="mt-3 w-40 h-40 object-cover rounded-lg shadow"
//                 />
//               )}
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="btn w-full bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 text-white hover:from-green-700 hover:to-green-800"
//           >
//             {loading ? "Adding..." : "Add Food"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function AddFoodForm() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  // Fetch restaurants from API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch("/api/restaurants");
        const data = await res.json();
        if (data.success) setRestaurants(data.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };
    fetchRestaurants();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const imgbbRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          { method: "POST", body: formData }
        );
        const imgbbData = await imgbbRes.json();
        if (imgbbData.success) imageUrl = imgbbData.data.url;
        else throw new Error("Image upload failed");
      }

      const form = e.target;
      const food = {
        name: form.name.value.trim(),
        restaurant: form.restaurant.value,
        description: form.description.value.trim(),
        price: parseFloat(form.price.value),
        category: form.category.value,
        cuisine: form.cuisine.value, // ✅ Added cuisine field
        rating,
        image: imageUrl,
      };

      if (
        !food.name ||
        !food.restaurant ||
        !food.description ||
        !food.price ||
        !food.cuisine
      ) {
        Swal.fire({ icon: "error", title: "All fields are required" });
        setLoading(false);
        return;
      }

      const res = await fetch("/api/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(food),
      });

      const data = await res.json();
      setLoading(false);

      if (data?.success) {
        Swal.fire({
          icon: "success",
          title: "Food Added!",
          text: "Your food has been added successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
        form.reset();
        setImageFile(null);
        setImagePreview(null);
        setRating(0);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data?.error || "Something went wrong.",
        });
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          🍕 Add New Food
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Food Name */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Food Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter food name"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Restaurant Dropdown */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Restaurant
              </label>
              <select
                name="restaurant"
                className="select select-bordered w-full"
                required
              >
                <option value="">Select Restaurant</option>
                {restaurants.map((r) => (
                  <option key={r._id} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                className="select select-bordered w-full"
                required
              >
                <option>Fast Food</option>
                <option>Beverages</option>
                <option>Desserts</option>
                <option>Main Course</option>
                <option>Snacks</option>
                <option>Drinks</option>
              </select>
            </div>

            {/* Cuisine */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Cuisine
              </label>
              <select
                name="cuisine"
                className="select select-bordered w-full"
                required
              >
                <option value="">Select Cuisine</option>
                <option>Italian</option>
                <option>Chinese</option>
                <option>Indian</option>
                <option>Bangladeshi</option>
                <option>Thai</option>
                <option>Mexican</option>
                <option>American</option>
                <option>Japanese</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Price
              </label>
              <input
                name="price"
                type="number"
                step="0.1"
                placeholder="Enter price"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Rating
              </label>
              <input
                name="rating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value))}
                placeholder="Rating (1 - 5)"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Enter food description"
                className="textarea textarea-bordered w-full"
                rows="3"
                required
              ></textarea>
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium text-gray-700">
                Food Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input file-input-bordered w-full"
                required
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="preview"
                  className="mt-3 w-40 h-40 object-cover rounded-lg shadow"
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-full bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 text-white hover:from-green-700 hover:to-green-800"
          >
            {loading ? "Adding..." : "Add Food"}
          </button>
        </form>
      </div>
    </div>
  );
}
