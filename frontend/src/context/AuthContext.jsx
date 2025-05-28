import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, logoutUser } from "../services/authService";
import { getUserProfile, getAllEmployees } from "../services/userService";
import { getAllShifts, getShiftsByEmployee } from "../services/shiftService";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [shifts, setShifts] = useState([]);

  // Load profile + admin data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile();
        setUser(res.user);
        setRole(res.role);

        if (res.role === "admin") {
          await loadAdminData(); // 🔥 load both employees and shifts
        } else if (res.role === "employee") {
          await loadEmployeeShifts(res.user._id); // 🔥 pass the _id
        }
      } catch (err) {
        if (err.response?.status === 401) {
          console.log("🔐 No active session");
        } else {
          console.error("❌ Profile fetch error:", err.message);
        }
        setUser(null);
        setRole("");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Login logic
  const login = async (credentials) => {
    try {
      const res = await loginUser(credentials);
      if (res?.status === 200) {
        const profile = await getUserProfile();
        setUser(profile.user);
        setRole(profile.role);

        if (profile.role === "admin") {
          await loadAdminData(); // 🔥 load employees + shifts
        } else if (profile.role === "employee") {
          await loadEmployeeShifts(profile.user._id); // 🔥 load employee's shifts
        }

        return profile;
      } else {
        throw new Error("Login failed: invalid response");
      }
    } catch (err) {
      setUser(null);
      setRole("");
      throw err;
    }
  };

  // Logout logic
  const logout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.warn("Logout API failed:", err.message);
    } finally {
      setUser(null);
      setRole("");
      window.location.href = "/";
    }
  };

  // Refresh user profile
  const refreshUser = async () => {
    const res = await getUserProfile();
    setUser(res.user);
    setRole(res.role);
    return res;
  };

  // Load admin-specific data (employees + shifts)
  const loadAdminData = async () => {
    try {
      const empList = await getAllEmployees();
      setEmployees(empList.employees); // assuming { employees: [...] }

      const shiftList = await getAllShifts();
      setShifts(shiftList.shifts); // assuming { shifts: [...] }

      console.log("✅ Admin data refreshed");
    } catch (err) {
      console.error("❌ Failed to load admin data:", err.message);
    }
  };

  const loadEmployeeShifts = async (userId) => {
    try {
      if (!userId) {
        console.warn("No user ID provided for employee shift fetch.");
        return;
      }

      const shiftRes = await getShiftsByEmployee(userId); // uses service
      setShifts(shiftRes.shifts); // Assuming { shifts: [...] }
    } catch (err) {
      console.error("❌ Failed to load employee shifts:", err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        employees,
        shifts,
        login,
        loading,
        logout,
        refreshUser,
        refreshAdminData: loadAdminData, // 🔄 exposed as refreshAdminData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
