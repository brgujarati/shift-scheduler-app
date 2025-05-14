import React from "react";

const employees = [
  {
    id: "EMP001",
    name: "John Doe",
    role: "Driver",
    email: "john.doe@example.com",
    phone: "07123 456789",
    joined: "2023-08-01",
    address: "123 Relocation St, London",
    emergencyContact: "Jane Doe - 07111 222333",
    photo: "https://via.placeholder.com/80",
  },
  {
    id: "EMP002",
    name: "Jane Smith",
    role: "Porter",
    email: "jane.smith@example.com",
    phone: "07123 987654",
    joined: "2023-09-15",
    address: "456 Packing Ave, Manchester",
    emergencyContact: "John Smith - 07111 888222",
    photo: "https://via.placeholder.com/80",
  },
  {
    id: "EMP003",
    name: "Emma Brown",
    role: "Supervisor",
    email: "emma.brown@example.com",
    phone: "07123 222333",
    joined: "2024-01-10",
    address: "789 Delivery Rd, Birmingham",
    emergencyContact: "Mike Brown - 07110 444999",
    photo: "https://via.placeholder.com/80",
  },
];

function IDCard({ emp }) {
  return (
    <div className="bg-white border rounded-xl shadow flex p-4 gap-4 w-full">
      <img
        src={emp.photo}
        alt="profile"
        className="w-24 h-24 rounded-lg border"
      />
      <div className="text-sm text-gray-700 space-y-1">
        <h2 className="text-xl font-semibold text-indigo-600">{emp.name}</h2>
        <p>
          <strong>Role:</strong> {emp.role}
        </p>
        <p>
          <strong>ID:</strong> {emp.id}
        </p>
        <p>
          <strong>Email:</strong> {emp.email}
        </p>
        <p>
          <strong>Phone:</strong> {emp.phone}
        </p>
        <p>
          <strong>Address:</strong> {emp.address}
        </p>
        <p>
          <strong>Emergency Contact:</strong> {emp.emergencyContact}
        </p>
        <p>
          <strong>Date Joined:</strong> {emp.joined}
        </p>
      </div>
    </div>
  );
}

export default function EmpList() {
  // Split employees into pairs (chunks of 2)
  const rows = [];
  for (let i = 0; i < employees.length; i += 2) {
    rows.push([employees[i], employees[i + 1]]);
  }

  return (
    <div className="p-6 space-y-6">
      {rows.map((pair, idx) => (
        <div key={idx} className="flex gap-6">
          <div className="flex-1">{pair[0] && <IDCard emp={pair[0]} />}</div>
          <div className="flex-1">
            {pair[1] ? <IDCard emp={pair[1]} /> : <div className="h-full" />}
          </div>
        </div>
      ))}
    </div>
  );
}
