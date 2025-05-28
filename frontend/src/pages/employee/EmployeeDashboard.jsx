import { useAuth } from "../../context/AuthContext";
export default function EmployeeDashboard() {
  const { shifts } = useAuth();

  return (
    <div className="flex-1 p-6 flex flex-col gap-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-100 p-4 rounded-2xl shadow-md">
          <h2 className="text-sm text-gray-600">Assigned Shifts</h2>
          <p className="text-2xl font-bold">{shifts.length}</p>
        </div>
        <div className="bg-indigo-100 p-4 rounded-2xl shadow-md">
          <h2 className="text-sm text-gray-600">Completed Shifts</h2>
          <p className="text-2xl font-bold">
            {
              shifts.filter((s) => {
                const shiftDate = new Date(s.date);
                const today = new Date();

                // Zero out time part for accurate date comparison
                shiftDate.setHours(0, 0, 0, 0);
                today.setHours(0, 0, 0, 0);

                return shiftDate < today;
              }).length
            }
          </p>
        </div>
        <div className="bg-indigo-100 p-4 rounded-2xl shadow-md">
          <h2 className="text-sm text-gray-600">Upcoming Shifts</h2>
          <p className="text-2xl font-bold">
            {
              shifts.filter((s) => {
                const shiftDate = new Date(s.date);
                const today = new Date();

                // Zero out time part for pure date comparison
                shiftDate.setHours(0, 0, 0, 0);
                today.setHours(0, 0, 0, 0);

                return shiftDate > today; // Count shifts with a future date
              }).length
            }
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        <table className="min-w-full text-sm table-fixed">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-center">Shift ID</th>
              <th className="px-4 py-3 text-center">Client</th>
              <th className="px-4 py-3 text-center">Team Members</th>
              <th className="px-4 py-3 text-center">Date</th>
              <th className="px-4 py-3 text-center">Start</th>
              <th className="px-4 py-3 text-center">End</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift) => (
              <tr key={shift.id} className="border-t text-gray-700">
                <td className="px-4 py-2 text-center">{shift.shiftId}</td>
                <td className="px-4 py-2 text-center">{shift.clientName}</td>
                <td className="px-4 py-2 text-center">
                  {shift.team?.length || 0}
                </td>
                <td className="px-4 py-2 text-center">
                  {new Date(shift.date).toLocaleDateString("en-GB")}
                </td>
                <td className="px-4 py-2 text-center">{shift.startTime}</td>
                <td className="px-4 py-2 text-center">{shift.endTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
