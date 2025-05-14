import React, { useState } from "react";

export default function EmployeeDashboard({ shifts = [] }) {
  return (
    <div className="flex-1 p-6 flex flex-col gap-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-100 p-4 rounded-2xl shadow-md">
          <h2 className="text-sm text-gray-600">Assigned Shifts</h2>
          <p className="text-2xl font-bold">
            {shifts.filter((s) => s.status === "Assigned").length}
          </p>
        </div>
        <div className="bg-indigo-100 p-4 rounded-2xl shadow-md">
          <h2 className="text-sm text-gray-600">Completed Shifts</h2>
          <p className="text-2xl font-bold">
            {shifts.filter((s) => s.status === "Completed").length}
          </p>
        </div>
        <div className="bg-indigo-100 p-4 rounded-2xl shadow-md">
          <h2 className="text-sm text-gray-600">Upcoming Shifts</h2>
          <p className="text-2xl font-bold">
            {shifts.filter((s) => s.status === "Upcoming").length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Shift ID</th>
              <th className="px-4 py-3 text-left">Client</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Start</th>
              <th className="px-4 py-3 text-left">End</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift) => (
              <tr key={shift.id}>
                <td className="px-4 py-2">{shift.id}</td>
                <td className="px-4 py-2">{shift.client}</td>
                <td className="px-4 py-2">{shift.date}</td>
                <td className="px-4 py-2">{shift.start}</td>
                <td className="px-4 py-2">{shift.end}</td>
                <td className="px-4 py-2">{shift.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
