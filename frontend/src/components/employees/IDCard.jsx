// src/components/employees/IDCard.jsx
import React from "react";

export default function IDCard({ emp }) {
  return (
    <div className="bg-white border rounded-xl shadow flex p-4 gap-4 w-full">
      <img
        src={emp.profilePicUrl}
        alt="profile"
        className="w-24 h-24 rounded-lg border"
      />
      <div className="text-sm text-gray-700 space-y-1">
        <h2 className="text-xl font-semibold text-indigo-600">{emp.name}</h2>
        <p>
          <strong>ID:</strong> {emp.userCode}
        </p>
        <p>
          <strong>Email:</strong> {emp.email}
        </p>
        <p>
          <strong>Phone:</strong> {emp.phone}
        </p>
        <p>
          <strong>Address:</strong>{" "}
          {[emp.address1, emp.address2].filter(Boolean).join(", ")}
        </p>
        <p>
          <strong>Date Joined:</strong>{" "}
          {emp.createdAt ? new Date(emp.createdAt).toLocaleDateString() : "N/A"}
        </p>
      </div>
    </div>
  );
}
