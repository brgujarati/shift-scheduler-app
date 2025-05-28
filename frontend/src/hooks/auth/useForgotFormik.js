// hooks/useForgotFormik.js
import { useFormik } from "formik";
import { forgotPassword } from "../../services/authService";

export const useForgotFormik = (setLoading, setActiveForm) =>
  useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      setLoading(true);
      try {
        await forgotPassword(values); // this should accept { name, email, newPassword }
        alert("✅ Password reset successful!");
        setActiveForm("login");
        resetForm();
      } catch (err) {
        alert(err.response?.data?.message || "❌ Failed to reset password.");
      } finally {
        setLoading(false);
      }
    },
  });
