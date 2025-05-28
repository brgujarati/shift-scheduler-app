import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const useLoginFormik = (setLoading) => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ context setters

  return useFormik({
    initialValues: { email: "", password: "", role: "" },
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const userRole = await login(values); // ✅ handles login + profile fetch + context set

        // ✅ Redirect after context is set
        if (userRole.role === "admin") navigate("/admin", { replace: true });
        else if (userRole.role === "employee")
          navigate("/employee", { replace: true });
        else navigate("/", { replace: true });

        resetForm();
      } catch (err) {
        console.error("Login error:", err.response?.data || err.message);
        alert(err.response?.data?.message || "Login failed.");
      } finally {
        setLoading(false);
      }
    },
  });
};
