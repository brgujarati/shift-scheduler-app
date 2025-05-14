// src/pages/AdminDashboard.jsx

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-indigo-100 p-4 rounded-2xl shadow-md">
          <h2 className="text-sm text-gray-600">Total Shifts</h2>
          <p className="text-2xl font-bold">24</p>
        </div>
        <div className="bg-indigo-100 p-4 rounded-2xl shadow-md">
          <h2 className="text-sm text-gray-600">Total Employees</h2>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="bg-indigo-100 p-4 rounded-2xl shadow-md">
          <h2 className="text-sm text-gray-600">Total Clients</h2>
          <p className="text-2xl font-bold">5</p>
        </div>
        <div className="bg-indigo-100 p-4 rounded-2xl shadow-md">
          <h2 className="text-sm text-gray-600">Completed This Week</h2>
          <p className="text-2xl font-bold">18</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Shift ID</th>
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-left">Client</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Start</th>
              <th className="px-4 py-3 text-left">End</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">001</td>
              <td className="px-4 py-2">John Doe</td>
              <td className="px-4 py-2">Merit Office Installations</td>
              <td className="px-4 py-2">2025-05-09</td>
              <td className="px-4 py-2">09:00</td>
              <td className="px-4 py-2">17:00</td>
              <td className="px-4 py-2">Assigned</td>
            </tr>
            {/* more rows */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
