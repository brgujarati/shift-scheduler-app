import React from "react";

export default function ProfileEditor({ formData, handlers }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-4">Update Your Profile</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          name="phone"
          value={formData.phone}
          onChange={handlers.handleChange}
          placeholder="Phone Number"
          className="p-2 border rounded"
        />
        <input
          name="address1"
          value={formData.address1}
          onChange={handlers.handleChange}
          placeholder="Address Line 1"
          className="p-2 border rounded"
        />
        <input
          name="address2"
          value={formData.address2}
          onChange={handlers.handleChange}
          placeholder="Address Line 2"
          className="p-2 border rounded"
        />
        <input
          name="county"
          value={formData.county}
          onChange={handlers.handleChange}
          placeholder="County"
          className="p-2 border rounded"
        />
        <input
          name="country"
          value={formData.country}
          onChange={handlers.handleChange}
          placeholder="Country"
          className="p-2 border rounded"
        />

        <div className="flex justify-between gap-4">
          <button
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
            onClick={() => handlers.setShowReview(true)}
          >
            Cancel
          </button>
          <button
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
            onClick={handlers.handleConfirm}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
