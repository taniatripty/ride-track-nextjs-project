"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (data.success) setUsers(data.users || []);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleMakeAdmin = async (email) => {
    const res = await fetch("/api/makeAdmin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();

    if (data.success) {
      Swal.fire("Success", data.message, "success");
      setUsers(users.map(u => u.email === email ? { ...u, role: "admin" } : u));
    } else {
      Swal.fire("Error", data.error, "error");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <table className="min-w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{idx + 1}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                {user.role !== "admin" && (
                  <button
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={() => handleMakeAdmin(user.email)}
                  >
                    Make Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
// "use client";

// import { useSession } from "next-auth/react";
// import Swal from "sweetalert2";

// export default function ManageUsers({ users = [] }) {
//   const { update } = useSession();

//   const makeAdmin = async (email) => {
//     const res = await fetch("/api/makeAdmin", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email }),
//     });

//     const data = await res.json();

//     if (data.success) {
//       Swal.fire("Success!", "User promoted to Admin", "success");

//       // 🔄 Refresh session instantly so Navbar updates
//       await update();
//     } else {
//       Swal.fire("Error", data.error || "Something went wrong", "error");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">Manage Users</h1>
//       {users.map((u) => (
//         <div
//           key={u.email}
//           className="flex items-center justify-between border-b py-2"
//         >
//           <div>
//             <p>{u.name}</p>
//             <p className="text-sm text-gray-600">{u.email}</p>
//             <p className="text-xs text-blue-600">{u.role}</p>
//           </div>
//           {u.role !== "admin" && (
//             <button
//               onClick={() => makeAdmin(u.email)}
//               className="btn btn-sm bg-green-600 text-white"
//             >
//               Make Admin
//             </button>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
