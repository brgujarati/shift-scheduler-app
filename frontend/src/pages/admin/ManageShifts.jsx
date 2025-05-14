import { useState } from "react";
import dummyShifts from "../../dummyShifts.json";
import EditShiftForm from "./EditShiftForm";

export default function ManageShifts() {
  const [shifts, setShifts] = useState(dummyShifts);

  const [selectedShift, setSelectedShift] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editedEmployee, setEditedEmployee] = useState("");
  const [editedClient, setEditedClient] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedStart, setEditedStart] = useState("");
  const [editedEnd, setEditedEnd] = useState("");
  const [editedStatus, setEditedStatus] = useState("");

  const handleEdit = (shift) => {
    setSelectedShift(shift);
    setEditedEmployee(shift.employee);
    setEditedClient(shift.client);
    setEditedDate(shift.date);
    setEditedStart(shift.start);
    setEditedEnd(shift.end);
    setEditedStatus(shift.status);
    setShowEditModal(true);
  };

  const handleDelete = (shift) => {
    setSelectedShift(shift);
    setShowDeleteModal(true);
  };

  const closeModals = () => {
    setSelectedShift(null);
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setShifts((prev) =>
      prev.map((s) =>
        s.id === selectedShift.id
          ? {
              ...s,
              employee: editedEmployee,
              client: editedClient,
              date: editedDate,
              start: editedStart,
              end: editedEnd,
              status: editedStatus,
            }
          : s
      )
    );
    closeModals();
  };

  const handleConfirmDelete = () => {
    setShifts((prev) => prev.filter((s) => s.id !== selectedShift.id));
    closeModals();
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
            {shifts.map((shift) => (
              <tr
                key={shift.id}
                className="border-t hover:bg-gray-50 text-gray-800"
              >
                <td className="px-4 py-2">{shift.id}</td>
                <td className="px-4 py-2">
                  {shift.teamMembers?.length || 0} Members
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
              onSubmit={(updatedShift) => {
                setShifts((prev) =>
                  prev.map((s) =>
                    s.id === selectedShift.id ? { ...s, ...updatedShift } : s
                  )
                );
                closeModals();
              }}
            />
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[350px] text-center">
            <p className="mb-4">
              Are you sure you want to delete shift{" "}
              <strong>{selectedShift.id}</strong>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={closeModals}
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
