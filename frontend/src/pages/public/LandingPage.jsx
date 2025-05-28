import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import LoginForm from "../../components/auth/LoginForm";
import { useLoginFormik } from "../../hooks/auth/useLoginFormik";

import SignupForm from "../../components/auth/SignupForm";
import { useSignupFormik } from "../../hooks/auth/useSignupFormik";

import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";
import { useForgotFormik } from "../../hooks/auth/useForgotFormik";

function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [loadings, setLoadings] = useState(false);
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();

  // ✅ Auto-redirect if already authenticated
  useEffect(() => {
    if (!loading && user && role) {
      if (role === "admin") navigate("/admin", { replace: true });
      else if (role === "employee") navigate("/employee", { replace: true });
      else navigate("/", { replace: true });
    }
  }, [user, role, loading, navigate]);

  const handleFormSwitch = (formName) => {
    setLoadings(true);
    setTimeout(() => {
      setAuthMode(formName);
      setLoadings(false);
    }, 400);
  };

  const loginFormik = useLoginFormik(setLoadings, setAuthMode);
  const signupFormik = useSignupFormik(setLoadings, setAuthMode);
  const forgotFormik = useForgotFormik(setLoadings, setAuthMode);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans px-6 py-12">
      <main className="flex flex-col md:flex-row items-start justify-between max-w-7xl mx-auto gap-12">
        {/* Left Column - Marketing Content */}
        <div className="w-full md:w-1/2 space-y-10 text-left">
          <div>
            <h1 className="text-4xl font-bold text-blue-600">
              🔷 Shift Scheduler App
            </h1>
            <h2 className="text-2xl font-semibold mt-2">
              👨‍💼 Effortless Shift Management for Teams
            </h2>
            <p className="mt-4 text-lg">
              A full-stack web application for managing employee shifts — with
              role-based dashboards for Admins and Employees. Built using{" "}
              <strong>React</strong>, <strong>Node.js</strong>,{" "}
              <strong>Express</strong>, <strong>MongoDB</strong>, and{" "}
              <strong>JWT Authentication</strong>.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">🖥️ Preview the App</h3>
            <img
              src="/screenshots/admin-dashboard.png"
              alt="Admin Dashboard Preview"
              className="mt-4 rounded-xl shadow-md w-full max-w-2xl"
            />
            <p className="text-gray-600 mt-2">
              Admin Dashboard – manage and assign shifts in one place.
            </p>
          </div>

          <div className="max-w-xl text-left space-y-2">
            <h3 className="text-xl font-semibold">⚙️ Tech Stack</h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>Frontend:</strong> React.js, React Router, Axios
              </li>
              <li>
                <strong>Backend:</strong> Node.js, Express
              </li>
              <li>
                <strong>Database:</strong> MongoDB (Mongoose)
              </li>
              <li>
                <strong>Auth:</strong> JWT + Role-based Access
              </li>
              <li>
                <strong>Deployment:</strong> Netlify (frontend) + Render/Railway
                (backend)
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold">📂 Source Code & Docs</h3>
            <p>
              🔗{" "}
              <a
                href="https://github.com/your-username/shift-scheduler-app"
                target="_blank"
                className="text-blue-600 underline"
              >
                GitHub Repo
              </a>
            </p>
            <p>
              📄{" "}
              <a
                href="https://github.com/your-username/shift-scheduler-app#readme"
                target="_blank"
                className="text-blue-600 underline"
              >
                README & Setup Guide
              </a>
            </p>
          </div>
        </div>

        {/* Right Column - Auth Forms */}
        <div className="w-full md:w-1/2 space-y-6">
          <div className="space-y-4 text-center">
            <h3 className="text-xl font-semibold">🔐 Access the App</h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleFormSwitch("login")}
                className={`px-4 py-2 rounded ${
                  authMode === "login"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => handleFormSwitch("signup")}
                className={`px-4 py-2 rounded ${
                  authMode === "signup"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Sign Up
              </button>
              <button
                onClick={() => handleFormSwitch("forgot")}
                className={`px-4 py-2 rounded ${
                  authMode === "forgot"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Forgot Password
              </button>
            </div>
          </div>

          <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 flex flex-col">
            <div>
              {authMode === "login" && <LoginForm formik={loginFormik} />}
              {authMode === "signup" && <SignupForm formik={signupFormik} />}
              {authMode === "forgot" && (
                <ForgotPasswordForm formik={forgotFormik} />
              )}
            </div>
          </div>

          <p className="text-sm text-gray-500 text-center">
            Demo Credentials:
            <br />
            <code>admin@example.com / password123</code>
            <br />
            <code>employee@example.com / password123</code>
          </p>

          <div className="text-sm text-gray-400 text-center">
            Questions? Contact support@yourdomain.com
          </div>
        </div>
      </main>

      {/* Bottom Footer */}
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
  );
}

export default LandingPage;
