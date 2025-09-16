"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="hero  min-h-[90vh] bg-gradient-to-r from-gray-900 via-gray-800 to-black  text-white">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        
        {/* Right side - Banner Image */}
        <div className="relative w-full max-w-sm h-[350px]">
          <Image
            src={'/food1.jpg'}
            alt="Delicious Food"
            fill
            className="rounded-2xl shadow-2xl object-cover hover:scale-105 transition duration-500"
            priority
          />
        </div>

        {/* Left side - Banner Text */}
        <div>
          <h1 className="text-5xl font-extrabold leading-tight">
            Fresh & Delicious{" "}
            <span className="text-yellow-300">Foods</span>
            <br /> Delivered To You 🍔
          </h1>
          <p className="py-6 text-lg text-gray-100">
            Explore a wide variety of meals prepared with love. Order your
            favorite food and get it delivered fast, fresh, and hot!
          </p>
          <div className="flex gap-4">
            <Link href="/foods" className="btn btn-warning text-white text-lg px-6">
              Order Now
            </Link>
            <Link
              href="/about"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-green-600 text-lg px-6"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
