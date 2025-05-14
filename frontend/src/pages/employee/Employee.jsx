import { Link, Outlet } from "react-router-dom";

export default function Employee() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-md hidden md:block">
        <div className="p-4 font-bold text-lg">Shift Scheduler</div>
        <nav className="flex flex-col gap-2 p-4">
          <Link
            to="/employee/dashboard"
            className="text-gray-700 hover:text-indigo-500"
          >
            Dashboard
          </Link>
          <Link
            to="/employee/shifts"
            className="text-gray-700 hover:text-indigo-500"
          >
            My Shifts
          </Link>
          <Link
            to="/employee/profile"
            className="text-gray-700 hover:text-indigo-500"
          >
            Profile
          </Link>
          <Link
            to="/employee/settings"
            className="text-gray-700 hover:text-indigo-500"
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <header className="bg-white shadow flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-semibold">Employee Panel</h1>
          <div className="flex items-center gap-4">
            <span>Employee</span>
            <Link
              to="/employee/profile"
              className="bg-gray-100 rounded-full p-2"
            >
              👤
            </Link>
          </div>
        </header>

        {/* Dynamic content renders here */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

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
