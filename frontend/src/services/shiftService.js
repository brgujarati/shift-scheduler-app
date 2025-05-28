import api from "../api/axios";

// ✅ Fetch all shifts (Admin)
export const getAllShifts = async () => {
  const response = await api.get("/shifts");
  return response.data;
};

// ✅ Create a new shift
export const createShift = async (shiftData) => {
  const response = await api.post("/shifts", shiftData);
  return response.data;
};

// ✅ Update an existing shift
export const updateShift = async (id, updatedData) => {
  const response = await api.put(`/shifts/${id}`, updatedData);
  return response.data;
};

// ✅ Delete a shift
export const deleteShift = async (id) => {
  const response = await api.delete(`/shifts/${id}`);
  return response.data;
};

// 🔥 New: Get shifts for a specific employee (by ID)
export const getShiftsByEmployee = async (employeeId) => {
  const response = await api.get(`/shifts/employee/${employeeId}`);
  return response.data; // Assuming the backend sends { shifts: [...] }
};
