

"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart, FaHeart, FaUsers, FaMotorcycle } from "react-icons/fa";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const user = session?.user || {};
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 text-white">
      <div className="navbar container mx-auto px-4">
        {/* Left Side */}
        <div className="navbar-start flex items-center gap-2">
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn btn-ghost text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <Link href="/" className="btn btn-ghost text-xl font-bold text-white">
            Foodie
          </Link>
        </div>

        {/* Center Menu - Desktop */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-base font-medium">
            <li><Link href="/addfood">Add Foods</Link></li>
            <li><Link href="/carditem" className="flex items-center gap-1"><FaShoppingCart /> Cart</Link></li>
            <li><Link href="/favorites" className="flex items-center gap-1"><FaHeart /> Favorites</Link></li>
             <li><Link href="/berider" className="flex items-center gap-1"><FaMotorcycle /> Be a rider</Link></li>
            {user.role === "admin" && (
              <li><Link href="/admin/users" className="flex items-center gap-1"><FaUsers /> Admin Panel</Link></li>
            )}
          </ul>
        </div>

        {/* Right Side */}
        <div className="navbar-end flex items-center gap-2">
          {status === "authenticated" ? (
            <>
              <div className="flex items-center gap-2">
                <Image
                  src={user.image || "/asset/user.jpg"}
                  width={40}
                  height={40}
                  alt={user.name || "User"}
                  className="rounded-full border border-white"
                />
                <div className="hidden sm:flex flex-col text-left">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs">{user.email}</p>
                  {user.role && (
                    <p className="text-xs font-medium text-yellow-300">{user.role.toUpperCase()}</p>
                  )}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-sm bg-white text-green-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-sm bg-white text-green-700 hover:bg-gray-100">Login</Link>
              <Link href="/register" className="btn btn-sm bg-white text-green-700 hover:bg-gray-100">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white text-gray-700 shadow-lg lg:hidden">
            <ul className="flex flex-col gap-2 p-4">
              <li><Link href="/addfood">Add Foods</Link></li>
              <li><Link href="/carditem" className="flex items-center gap-1"><FaShoppingCart /> Cart</Link></li>
              <li><Link href="/favorites" className="flex items-center gap-1"><FaHeart /> Favorites</Link></li>
               <li><Link href="/berider" className="flex items-center gap-1"><FaMotorcycle /> Be a rider</Link></li>
              {user.role === "admin" && (
                <li><Link href="/admin/users" className="flex items-center gap-1"><FaUsers /> Admin Panel</Link></li>
              )}
              {status === "authenticated" && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn w-full bg-green-600 text-white hover:bg-green-700"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// "use client";

// import { signOut, useSession } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import { FaShoppingCart, FaHeart, FaUsers, FaMotorcycle } from "react-icons/fa";
// import { useState } from "react";

// export default function Navbar() {
//   const { data: session, status } = useSession();
//   const user = session?.user || {};
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleLogout = async () => {
//     await signOut({ callbackUrl: "/login" });
//   };

//   // Avoid rendering menu until session is ready
//   if (status === "loading") return null;

//   return (
//     <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 text-white">
//       <div className="navbar container mx-auto px-4">
//         {/* Left Side */}
//         <div className="navbar-start flex items-center gap-2">
//           <div className="lg:hidden">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="btn btn-ghost text-white"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>
//           <Link href="/" className="btn btn-ghost text-xl font-bold text-white">
//             Foodie
//           </Link>
//         </div>

//         {/* Center Menu */}
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal px-1 text-base font-medium items-center gap-2">
//             <li><Link href="/addfood">Add Foods</Link></li>
//             <li><Link href="/carditem" className="flex items-center gap-1"><FaShoppingCart /> Cart</Link></li>
//             <li><Link href="/favorites" className="flex items-center gap-1"><FaHeart /> Favorites</Link></li>
//             <li><Link href="/berider" className="flex items-center gap-1"><FaMotorcycle /> Be a rider</Link></li>
//             {user.role === "admin" && (
//               <li><Link href="/admin/users" className="flex items-center gap-1"><FaUsers /> Admin Panel</Link></li>
//             )}
//           </ul>
//         </div>

//         {/* Right Side */}
//         <div className="navbar-end flex items-center gap-2">
//           {status === "authenticated" ? (
//             <>
//               <div className="flex items-center gap-2">
//                 <Image
//                   src={user.image || "/asset/user.jpg"}
//                   width={40}
//                   height={40}
//                   alt={user.name || "User"}
//                   className="rounded-full border border-white"
//                 />
//                 <div className="hidden sm:flex flex-col text-left">
//                   <p className="text-sm font-bold text-white">{user.name}</p>
//                   <p className="text-xs text-white">{user.email}</p>
//                   {user.role && (
//                     <p className="text-xs font-medium text-yellow-300">{user.role.toUpperCase()}</p>
//                   )}
//                 </div>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="btn btn-sm bg-white text-green-700 hover:bg-gray-100"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link href="/login" className="btn btn-sm bg-white text-green-700 hover:bg-gray-100">Login</Link>
//               <Link href="/register" className="btn btn-sm bg-white text-green-700 hover:bg-gray-100">Register</Link>
//             </>
//           )}
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="absolute top-full left-0 w-full bg-white text-gray-700 shadow-lg lg:hidden">
//             <ul className="flex flex-col gap-2 p-4">
//               <li><Link href="/addfood">Add Foods</Link></li>
//               <li><Link href="/carditem" className="flex items-center gap-1"><FaShoppingCart /> Cart</Link></li>
//               <li><Link href="/favorites" className="flex items-center gap-1"><FaHeart /> Favorites</Link></li>
//               <li><Link href="/berider" className="flex items-center gap-1"><FaMotorcycle /> Be a rider</Link></li>
//               {user.role === "admin" && (
//                 <li><Link href="/admin/users" className="flex items-center gap-1"><FaUsers /> Admin Panel</Link></li>
//               )}
//               {status === "authenticated" && (
//                 <li>
//                   <button
//                     onClick={handleLogout}
//                     className="btn w-full bg-green-600 text-white hover:bg-green-700"
//                   >
//                     Logout
//                   </button>
//                 </li>
//               )}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
