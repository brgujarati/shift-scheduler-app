import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/routing/ProtectedRoute";

// Public Pages
import LandingPage from "../pages/public/LandingPage";

// Admin Pages
import AdminLayout from "../layouts/AdminLayout";
// Admin Pages
import {
  AdminDashboard,
  AddShift,
  ManageShifts,
  EmployeeList,
  AdminProfile,
  AdminSettings,
} from "../pages/admin";

// Employee Pages

import EmployeeLayout from "../layouts/EmployeeLayout";
import {
  EmployeeDashboard,
  MyShifts,
  ProfileForm,
  Settings,
} from "../pages/employee";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />

      {/* ✅ Admin Protected Routes */}
      <Route element={<ProtectedRoute allowedRole="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="add-shift" element={<AddShift />} />
          <Route path="manage-shifts" element={<ManageShifts />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Route>

      {/* ✅ Employee Protected Routes */}
      <Route element={<ProtectedRoute allowedRole="employee" />}>
        <Route path="/employee" element={<EmployeeLayout />}>
          <Route index element={<EmployeeDashboard />} />
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="shifts" element={<MyShifts />} />
          <Route path="profile" element={<ProfileForm />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
