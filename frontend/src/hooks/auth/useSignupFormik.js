// hooks/useSignupFormik.js
import { useFormik } from "formik";
import { registerUser } from "../../services/authService";

export const useSignupFormik = (setLoading, setAuthMode) => {
  return useFormik({
    initialValues: { name: "", signupEmail: "", signupPassword: "" },
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        await registerUser({
          name: values.name,
          email: values.signupEmail,
          password: values.signupPassword,
        });
        alert("Signup successful! 🎉 Please login now.");
        setAuthMode("login");
        resetForm();
      } catch (err) {
        console.error("Signup error:", err.response?.data || err.message);
        alert(err.response?.data?.message || "Signup failed.");
      } finally {
        setLoading(false);
      }
    },
  });
};
