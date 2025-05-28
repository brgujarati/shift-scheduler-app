import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ allowedRole }) {
  const { user, role, loading } = useAuth(); // ✅ move this to top

  useEffect(() => {}, [user, role, loading]);

  if (loading) return <div>Loading...</div>;
  if (!user || !role) return <Navigate to="/" replace />;

  if (allowedRole && role !== allowedRole) return <Navigate to="/" replace />;

  return <Outlet />;
}
