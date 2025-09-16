"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function AddRestaurant() {
  const [form, setForm] = useState({ name: "", location: "" });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.location) {
      Swal.fire({ icon: "error", title: "All fields are required" });
      return;
    }

    setLoading(true);

    // Upload image to ImgBB
    let imageUrl = null;
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      try {
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        if (data.success) {
          imageUrl = data.data.url;
        }
      } catch (error) {
        Swal.fire({ icon: "error", title: "Image Upload Failed" });
        setLoading(false);
        return;
      }
    }

    // Save to DB
    const res = await fetch("/api/restaurants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, image: imageUrl }),
    });

    const result = await res.json();
    setLoading(false);

    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Restaurant Added",
        timer: 2000,
        showConfirmButton: false,
      });
      setForm({ name: "", location: "" });
      setImagePreview(null);
      setImageFile(null);
    } else {
      Swal.fire({ icon: "error", title: "Error", text: result.error });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Add Restaurant</h2>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Restaurant Name"
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="input input-bordered w-full"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input w-full"
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-2 w-full h-40 object-cover rounded-lg"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn w-full bg-gradient-to-r from-green-600 to-green-700 text-white"
        >
          {loading ? "Adding..." : "Add Restaurant"}
        </button>
      </form>
    </div>
  );
}
