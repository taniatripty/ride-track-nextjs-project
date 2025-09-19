"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function RidersPage() {
  const [riders, setRiders] = useState([]);

  // ✅ Fetch riders
  useEffect(() => {
    fetch("/api/riders")
      .then((res) => res.json())
      .then((data) => setRiders(data.riders || []));
  }, []);

  // ✅ Approve rider
  const handleApprove = async (id) => {
    const res = await fetch("/api/riders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      Swal.fire("Approved!", "Rider request approved.", "success");
      setRiders(riders.map(r => r._id === id ? { ...r, role: "rider", status: "approved" } : r));
    } else {
      Swal.fire("Error", "Failed to approve rider.", "error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Rider Requests</h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Role</th>
            <th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider) => (
            <tr key={rider._id}>
              <td>{rider.name}</td>
              <td>{rider.email}</td>
              <td>{rider.phone}</td>
              <td>{rider.role}</td>
              <td>{rider.status}</td>
              <td>
                {rider.status === "pending" ? (
                  <button
                    onClick={() => handleApprove(rider._id)}
                    className="btn btn-success btn-sm"
                  >
                    Approve
                  </button>
                ) : (
                  <span className="text-green-600 font-bold">Approved</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
