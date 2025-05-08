// App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AddShiftPage from "./pages/AddShiftPage";
import EditShiftPage from "./pages/EditShiftPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/shifts/add" element={<AddShiftPage />} />
        <Route path="/shifts/edit/:id" element={<EditShiftPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
