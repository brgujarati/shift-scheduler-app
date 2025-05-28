import { useState } from "react";
import EditShiftForm from "../../components/shifts/EditShiftForm";
import { updateShift, deleteShift } from "../../services/shiftService";
import { useAuth } from "../../context/AuthContext"; // adjust path as needed

export default function ManageShifts() {
  const [selectedShift, setSelectedShift] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { shifts, refreshAdminData } = useAuth();

  //Edit Shift
  const handleEdit = (shift) => {
    setSelectedShift(shift);
    setShowEditModal(true);
  };

  //Edit Shift
  const closeModals = () => {
    setSelectedShift(null); // ✅ clear shift
    setShowEditModal(false); // ✅ hide modal
  };

  //Edit Shift
  const handleUpdate = async (updatedShift) => {
    try {
      const shiftId = selectedShift._id;

      const res = await updateShift(shiftId, updatedShift);
      alert("✅ Shift updated successfully!");
      setShowEditModal(false);
      setSelectedShift(null);
      await refreshAdminData(); // ✅ Admin view refreshed — both shifts + employees
    } catch (err) {
      console.error("❌ Shift update failed:", err.message);
      alert("❌ Failed to update shift.");
    }
  };

  //Delete Shift
  const handleDelete = (shift) => {
    console.log("🗑️ Shift to delete:", shift);
    setSelectedShift(shift); // ✅ this is the missing line
    setShowDeleteModal(true);
  };

  //Delete Shift
  const handleConfirmDelete = async () => {
    try {
      await deleteShift(selectedShift._id); // ✅ API call
      await refreshAdminData(); // ✅ Refresh shift list
      setShowDeleteModal(false); // ✅ Close modal
      setSelectedShift(null); // ✅ Clear selection
      alert("✅ Shift deleted successfully!");
    } catch (err) {
      console.error("❌ Delete failed:", err.message);
      alert("❌ Failed to delete shift.");
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Shift ID</th>
              <th className="px-4 py-3 text-left">Team Members</th>
              <th className="px-4 py-3 text-left">Client</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Start</th>
              <th className="px-4 py-3 text-left">End</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(shifts) &&
              shifts.map((shift) => (
                <tr
                  key={shift._id}
                  className="border-t hover:bg-gray-50 text-gray-800"
                >
                  <td className="px-4 py-2">{shift.shiftId}</td>
                  <td className="px-4 py-2">
                    {shift.team?.length || 0} Members
                  </td>
                  <td className="px-4 py-2">{shift.clientName}</td>
                  <td className="px-4 py-2">{shift.date}</td>
                  <td className="px-4 py-2">{shift.startTime}</td>
                  <td className="px-4 py-2">{shift.endTime}</td>
                  <td className="px-4 py-2">{shift.status || "Assigned"}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(shift)}
                        className="bg-indigo-400 text-white px-4 py-2 rounded hover:bg-indigo-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(shift)}
                        className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedShift && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="w-full max-w-3xl p-4">
            <EditShiftForm
              shift={selectedShift}
              onCancel={closeModals}
              onSubmit={handleUpdate}
            />
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedShift && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[350px] text-center">
            <p className="mb-4">
              Are you sure you want to delete shift{" "}
              <strong>{selectedShift._id}</strong>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
