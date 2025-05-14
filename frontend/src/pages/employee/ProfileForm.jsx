import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    id: "EMP001",
    role: "",
    phone: "",
    address1: "",
    address2: "",
    county: "",
    country: "",
  });

  const [showReview, setShowReview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = () => {
    alert("Profile confirmed!");
    navigate("/employee/dashboard");
  };

  const handleCancel = () => {
    navigate("/employee/dashboard");
  };

  return (
    <main className="flex-1 p-6">
      <div className="w-full flex justify-start">
        <div className="max-w-xl w-full">
          {!showReview ? (
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-bold mb-4">Update Your Profile</h2>
              <div className="grid grid-cols-1 gap-4">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="p-2 border rounded"
                >
                  <option value="">Select Role</option>
                  <option value="Driver">Driver</option>
                  <option value="Porter">Porter</option>
                  <option value="Supervisor">Supervisor</option>
                </select>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="p-2 border rounded"
                />
                <input
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  placeholder="Address Line 1"
                  className="p-2 border rounded"
                />
                <input
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  placeholder="Address Line 2"
                  className="p-2 border rounded"
                />
                <input
                  name="county"
                  value={formData.county}
                  onChange={handleChange}
                  placeholder="County"
                  className="p-2 border rounded"
                />
                <input
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                  className="p-2 border rounded"
                />
                <div className="flex justify-between gap-4">
                  <button
                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                    onClick={() => setShowReview(true)}
                  >
                    Review
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border rounded-xl shadow p-6">
              <div className="flex flex-col items-center">
                <img
                  src="https://via.placeholder.com/80"
                  alt="profile"
                  className="w-24 h-24 rounded-full border mb-4"
                />
                <div className="text-center text-sm text-gray-800 space-y-1">
                  <h2 className="text-xl font-bold text-indigo-600">
                    {formData.name}
                  </h2>
                  <p>
                    <strong>ID:</strong> {formData.id}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {formData.role}
                  </p>
                  <p>
                    <strong>Phone:</strong> {formData.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {formData.address1},{" "}
                    {formData.address2}
                  </p>
                  <p>
                    <strong>County:</strong> {formData.county}
                  </p>
                  <p>
                    <strong>Country:</strong> {formData.country}
                  </p>
                </div>
                <div className="flex justify-between gap-4 mt-6">
                  <button
                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
                    onClick={() => setShowReview(false)}
                  >
                    Back
                  </button>
                  <button
                    className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                    onClick={handleConfirm}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
