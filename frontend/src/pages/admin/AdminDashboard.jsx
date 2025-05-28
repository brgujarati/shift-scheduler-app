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
          <p className="text-2xl">Very Soon..</p>
        </div>
        <div className="bg-indigo-100 p-4 rounded-2xl shadow-md">
          <h2 className="text-sm text-gray-600">Completed This Month</h2>
          <p className="text-2xl font-bold">
            {" "}
            {
              shifts.filter((shift) => {
                const shiftDate = new Date(shift.date);
                const now = new Date();

                // Check if shift is in the current month and year
                const isSameMonth =
                  shiftDate.getMonth() === now.getMonth() &&
                  shiftDate.getFullYear() === now.getFullYear();

                // Optionally, check if status is "Completed"
                const isCompleted = shiftDate < now;

                return isSameMonth && isCompleted;
              }).length
            }
          </p>
        </div>
      </div>

      {/* Latest shifts table */}
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        <table className="min-w-full text-sm table-fixed">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="w-[14%] px-4 py-3 text-left">Shift ID</th>
              <th className="w-[12%] px-4 py-3 text-center">Team Members</th>
              <th className="w-[20%] px-4 py-3 text-left">Client</th>
              <th className="w-[14%] px-4 py-3 text-left">Date</th>
              <th className="w-[10%] px-4 py-3 text-left">Start</th>
              <th className="w-[10%] px-4 py-3 text-left">End</th>
              <th className="w-[10%] px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {shifts.slice(0, 5).map((shift) => (
              <tr key={shift._id} className="border-t text-gray-700">
                <td className="w-[14%] px-4 py-2">{shift.shiftId}</td>
                <td className="w-[12%] px-4 py-2 text-center">
                  {shift.team.length}
                </td>
                <td className="w-[20%] px-4 py-2">{shift.clientName}</td>
                <td className="w-[14%] px-4 py-2">
                  {shift.date.substring(0, 10)}
                </td>
                <td className="w-[10%] px-4 py-2">{shift.startTime}</td>
                <td className="w-[10%] px-4 py-2">{shift.endTime}</td>
                <td className="w-[10%] px-4 py-2">{"Assigned"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
