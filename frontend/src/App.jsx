// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/frontend/LandingPage";

import Admin from "./pages/admin/Admin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddShift from "./pages/admin/AddShift";
import ManageShifts from "./pages/admin/ManageShifts";
import EmployeeList from "./pages/admin/EmployeeList";
import AdminSettings from "./pages/admin/AdminSettings";

import Employee from "./pages/employee/Employee";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import MyShifts from "./pages/employee/MyShifts";
import ProfileForm from "./pages/employee/ProfileForm";
import Settings from "./pages/employee/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<LandingPage />} />

        {/* Admin layout with nested routes */}
        <Route path="/admin" element={<Admin />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="add-shift" element={<AddShift />} />
          <Route path="manage-shifts" element={<ManageShifts />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Employee layout with nested routes */}
        <Route path="/employee" element={<Employee />}>
          <Route index element={<EmployeeDashboard />} /> {/* default view */}
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="shifts" element={<MyShifts />} />
          <Route path="profile" element={<ProfileForm />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
