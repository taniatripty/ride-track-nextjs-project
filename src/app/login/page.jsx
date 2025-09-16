"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    if (res.error)
      Swal.fire({ icon: "error", title: "Login Failed", text: res.error });
    else
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1500,
      }).then(() => (window.location.href = "/"));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>

        {/* Email Field */}
        <div>
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            className="input input-bordered w-full mb-4"
          />
        </div>

        {/* Password Field with Toggle */}
        <div className="relative">
          <label className="block text-gray-600 mb-1">Password</label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            className="input input-bordered w-full pr-10 mb-4"
          />
          <span
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiFillEyeInvisible size={20} />
            ) : (
              <AiFillEye size={20} />
            )}
          </span>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="btn w-full bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 text-white mb-4 hover:from-green-700 hover:to-green-800 transition"
        >
          Login
        </button>

        <div className="divider">OR</div>

        {/* Google Login */}
        <button
          onClick={() => signIn("google")}
          className="btn w-full mb-2 bg-white text-gray-800 border hover:bg-gray-100 flex items-center justify-center gap-2"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>
      </form>
    </div>
  );
}
