
"use client";

import Swal from "sweetalert2";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { registerUser } from "../actions/auth/registerUser";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (!name || !email || !password || !confirmPassword) {
      Swal.fire({ icon: "error", title: "All fields are required" });
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 6 characters, contain 1 uppercase letter and 1 digit",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password mismatch",
        text: "Password and confirm password must match",
      });
      return;
    }

    let imageUrl = null;
    setLoading(true);

    // Upload image to ImgBB
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
        } else {
          Swal.fire({
            icon: "error",
            title: "Image Upload Failed",
            text: data.error?.message || "",
          });
          setLoading(false);
          return;
        }
      } catch (error) {
        Swal.fire({ icon: "error", title: "Image Upload Error", text: error.message });
        setLoading(false);
        return;
      }
    }

    // Register user
    const result = await registerUser({ name, email, password, image: imageUrl });
    setLoading(false);

    if (result?.error) {
      Swal.fire({ icon: "error", title: "Registration Failed", text: result.error });
    } else {
      Swal.fire({
        icon: "success",
        title: "Registered Successfully",
        text: "You will be redirected to Home!",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => router.push("/"));
      form.reset();
      setImagePreview(null);
    }
  };

  return (
    <div className="flex mt-4 items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-xl shadow-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-600 mb-1">Name</label>
            <input name="name" placeholder="Your name" className="input input-bordered w-full" />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input name="email" type="email" placeholder="Your email" className="input input-bordered w-full" />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-600 mb-1">Profile Image</label>
            <input type="file" name="image" accept="image/*" onChange={handleImageChange} className="input w-full" />
            {imagePreview && (
              <img src={imagePreview} alt="preview" className="mt-2 w-24 h-24 object-cover rounded-full" />
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Your password"
              className="input input-bordered w-full pr-10"
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-gray-600 mb-1">Confirm Password</label>
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="input input-bordered w-full pr-10"
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn w-full bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 text-white py-2 rounded hover:from-green-700 hover:to-green-800 transition"
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="divider">OR</div>

        {/* Google Login Button */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="btn w-full bg-white text-gray-800 border hover:bg-gray-100 flex items-center justify-center gap-2"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>
      </div>
    </div>
  );
}
