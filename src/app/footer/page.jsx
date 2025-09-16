"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Brand + About */}
        <div>
          <h2 className="text-2xl font-bold mb-2">FoodiesHub</h2>
          <p className="text-sm text-gray-100">
            Your ultimate food destination 🍴.  
            Discover delicious recipes, fresh ingredients,  
            and doorstep delivery to make your meals special.  
            Eat healthy, stay happy!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Explore</h3>
          <ul className="space-y-2 text-gray-100">
            <li>
              <Link href="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link href="/menu" className="hover:underline">Our Menu</Link>
            </li>
            <li>
              <Link href="/offers" className="hover:underline">Special Offers</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <p className="text-sm mb-3 text-gray-100">Stay connected for food deals & updates 🍕</p>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" target="_blank" className="hover:text-gray-300">
              <FaFacebookF size={20} />
            </Link>
            <Link href="https://twitter.com" target="_blank" className="hover:text-gray-300">
              <FaTwitter size={20} />
            </Link>
            <Link href="https://instagram.com" target="_blank" className="hover:text-gray-300">
              <FaInstagram size={20} />
            </Link>
            <Link href="https://github.com" target="_blank" className="hover:text-gray-300">
              <FaGithub size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-8 border-t border-green-400 pt-4 text-center text-sm text-gray-200">
        © {new Date().getFullYear()} FoodiesHub. Taste the freshness, delivered with love ❤️.
      </div>
    </footer>
  );
}
