import { Outlet, Link } from "react-router-dom";
import AdminHeader from "../pages/admin/AdminHeader";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-md flex flex-col">
        <div className="p-4 font-bold text-lg">Shift Scheduler</div>
        <nav className="flex flex-col gap-2 p-4 flex-1">
          <Link
            to="/admin/dashboard"
            className="text-left text-gray-700 hover:text-indigo-500"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/add-shift"
            className="text-left text-gray-700 hover:text-indigo-500"
          >
            Add Shift
          </Link>
          <Link
            to="/admin/manage-shifts"
            className="text-left text-gray-700 hover:text-indigo-500"
          >
            Manage Shifts
          </Link>
          <Link
            to="/admin/employees"
            className="text-left text-gray-700 hover:text-indigo-500"
          >
            Employee List
          </Link>
          <Link
            to="/admin/profile"
            className="text-left text-gray-700 hover:text-indigo-500"
          >
            Profile
          </Link>

          <Link
            to="/admin/settings"
            className="text-left text-gray-700 hover:text-indigo-500"
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Right side */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <AdminHeader />

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet /> {/* 👈 Dynamic route content */}
        </main>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 py-2">
          © {new Date().getFullYear()} Shift Scheduler App.{" "}
          <a
            href="https://github.com/brgujarati/shift-scheduler-app"
            className="underline text-indigo-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </footer>
      </div>
    </div>
  );
}
