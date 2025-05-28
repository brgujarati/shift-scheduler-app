import { useAuth } from "../../context/AuthContext";

export default function AdminDashboard() {
  const { shifts, employees } = useAuth();

  return (
    <div className="flex flex-col gap-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-indigo-100 p-4 rounded-2xl shadow-md">
          <h2 className="text-sm text-gray-600">Total Shifts</h2>
          <p className="text-2xl font-bold">{shifts.length}</p>
        </div>
        <div className="bg-indigo-100 p-4 rounded-2xl shadow-md">
          <h2 className="text-sm text-gray-600">Total Employees</h2>
          <p className="text-2xl font-bold">{employees.length}</p>
        </div>
        <div className="bg-indigo-100 p-4 rounded-2xl shadow-md">
          <h2 className="text-sm text-gray-600">Total Clients</h2>
          <p className="text-2xl font-bold">4</p>
        </div>
        <div className="bg-indigo-100 p-4 rounded-2xl shadow-md">
          <h2 className="text-sm text-gray-600">Completed This Week</h2>
          <p className="text-2xl font-bold">4</p>
        </div>
      </div>

      {/* Latest shifts table */}
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Shift ID</th>
              <th className="px-4 py-3 text-left">Team Size</th>
              <th className="px-4 py-3 text-left">Client</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Start</th>
              <th className="px-4 py-3 text-left">End</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {shifts.slice(0, 5).map((shift) => (
              <tr key={shift._id} className="border-t text-gray-700">
                <td className="px-4 py-2">{shift.shiftId}</td>
                <td className="px-4 py-2">{shift.team?.length || 0}</td>
                <td className="px-4 py-2">{shift.clientName}</td>
                <td className="px-4 py-2">{shift.date?.substring(0, 10)}</td>
                <td className="px-4 py-2">{shift.startTime}</td>
                <td className="px-4 py-2">{shift.endTime}</td>
                <td className="px-4 py-2">{shift.status || "Assigned"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
