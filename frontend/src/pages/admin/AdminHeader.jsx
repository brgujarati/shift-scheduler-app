import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; // Adjust path as needed

const AdminHeader = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="bg-white shadow flex items-center justify-between px-6 py-4">
      <h1 className="text-xl font-semibold capitalize">{user.role} Pannel</h1>

      <div className="relative flex items-center gap-4" ref={menuRef}>
        <span className="font-medium">{user?.name}</span>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300"
        >
          <img
            src={`${user.profilePicUrl}?t=${Date.now()}`}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-14 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
            <div className="px-4 py-2 text-sm text-gray-700 border-b">
              <span className="block font-semibold">User Code</span>
              <span className="text-gray-500">{user?.userCode}</span>
            </div>
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
