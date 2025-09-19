
// "use client";

// import { signOut, useSession } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import { FaShoppingCart, FaHeart } from "react-icons/fa";
// import Swal from "sweetalert2";

// export default function Navbar() {
//   const { data: session, status } = useSession();
//   console.log(session)

//   const handleLogout = async () => {
//     await signOut({ redirect: false });
//     Swal.fire({
//       icon: "success",
//       title: "Logged Out",
//       text: "You have successfully logged out!",
//       timer: 1500,
//       showConfirmButton: false,
//     }).then(() => {
//       window.location.href = "/login"; // redirect after alert
//     });
//   };

//   const user = session?.user || {};
//   console.log(user)

//   return (
//     <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 text-white">
//       <div className="navbar container mx-auto">
//         {/* Left side */}
//         <div className="navbar-start">
//           <div className="dropdown">
//             <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
//               </svg>
//             </div>
//             {/* Mobile Menu */}
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content mt-3 z-10 w-52 p-2 shadow bg-white text-gray-700 rounded-box"
//             >
//               <li><Link href="/addfood">Add Foods</Link></li>
//               <li><Link href="/carditem"><FaShoppingCart /> Cart</Link></li>
//               <li><Link href="/favorites"><FaHeart /> Favorites</Link></li>
//             </ul>
//           </div>
//           <Link href="/" className="btn btn-ghost text-xl font-bold text-white">
//             Foodie
//           </Link>
//         </div>

//         {/* Center Menu (Desktop) */}
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal px-1 text-base font-medium">
//             <li><Link href="/addfood">Add Foods</Link></li>
//             <li>
//               <Link href="/carditem" className="flex items-center gap-1">
//                 <FaShoppingCart /> Cart
//               </Link>
//             </li>
//             <li>
//               <Link href="/favorites" className="flex items-center gap-1">
//                 <FaHeart /> Favorites
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Right Side */}
//         <div className="navbar-end gap-3">
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
//                 <div className="hidden sm:block text-left">
//                   <p className="text-sm font-semibold">{user.name }</p>
//                   <p className="text-xs">{user.email}</p>
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
//               <Link
//                 href="/login"
//                 className="btn btn-sm bg-white text-green-700 hover:bg-gray-100"
//               >
//                 Login
//               </Link>
//               <Link
//                 href="/register"
//                 className="btn btn-sm bg-white text-green-700 hover:bg-gray-100"
//               >
//                 Register
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
 
"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart, FaHeart, FaUsers } from "react-icons/fa";


export default function Navbar() {
  const { data: session, status } = useSession();
  const user = session?.user || {};
console.log(user)
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 text-white">
      <div className="navbar container mx-auto">
        {/* Left side */}
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost text-xl font-bold text-white">
            Foodie
          </Link>
        </div>

        {/* Center Menu (Desktop) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-base font-medium">
            <li><Link href="/addfood">Add Foods</Link></li>
            <li><Link href="/carditem"><FaShoppingCart /> Cart</Link></li>
            <li><Link href="/favorites"><FaHeart /> Favorites</Link></li>
            {user.role === "admin" && (
              <li><Link href="/admin/users"><FaUsers /> Admin Panel</Link></li>
            )}
          </ul>
        </div>

        {/* Right Side */}
        <div className="navbar-end gap-3">
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
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs">{user.email}</p>
                  {user.role && (
                    <p className="text-xs font-medium text-yellow-300">
                      {user.role.toUpperCase()}
                    </p>
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
              <Link href="/login" className="btn btn-sm bg-white text-green-700">
                Login
              </Link>
              <Link href="/register" className="btn btn-sm bg-white text-green-700">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
