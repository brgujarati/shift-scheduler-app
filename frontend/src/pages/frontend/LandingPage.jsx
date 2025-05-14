import { useState } from "react";
import { useFormik } from "formik";
import ImageSlider from "./ImageSlider";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgotPasswordForm from "./ForgotPasswordForm"; // Optional if you add it
import AppDescription from "./AppDescription";

function LandingPage() {
  const currentYear = new Date().getFullYear();
  const [activeForm, setActiveForm] = useState("login"); // 'login', 'signup', 'forgot'
  const [loading, setLoading] = useState(false);

  const getFlipClass = () => {
    switch (activeForm) {
      case "login":
        return "";
      case "signup":
        return "rotate-y-180";
      case "forgot":
        return "rotate-y-180"; // Use same rotation as signup
      default:
        return "";
    }
  };
  const handleFormSwitch = (formName) => {
    setLoading(true);
    setTimeout(() => {
      setActiveForm(formName);
      setLoading(false);
    }, 400); // Match your animation duration
  };
  const formik = useFormik({
    initialValues: { email: "", password: "", role: "" },
    onSubmit: (values) => alert("Form submitted: " + JSON.stringify(values)),
  });

  const signupFormik = useFormik({
    initialValues: { name: "", signupEmail: "", signupPassword: "" },
    onSubmit: (values) =>
      alert("Signup form submitted: " + JSON.stringify(values)),
  });

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] justify-between bg-indigo-200 m-10 p-8">
      <section className="flex flex-col md:flex-row flex-1 gap-4 items-stretch">
        {/* Left side */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 gap-4 h-full">
          <div className="flex-1 p-4">
            <h2 className="text-2xl font-bold">Welcome to Shift Scheduler</h2>
          </div>
          <div className="p-4 w-full max-w-md">
            <ImageSlider />
          </div>
          <AppDescription />
        </div>

        {/* Right side */}
        <div className="flex justify-center w-full md:w-1/2 p-4 h-full overflow-y-auto">
          <div className="relative w-full max-w-md h-[430px] perspective">
            {loading && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-lg">
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            <div
              className={`transition-transform duration-[900ms] ease-in-out transform ${getFlipClass()} w-full h-full relative`}
              style={{ transformStyle: "preserve-3d", willChange: "transform" }}
            >
              {activeForm === "login" ? (
                <LoginForm formik={formik} onFlip={handleFormSwitch} />
              ) : activeForm === "signup" ? (
                <SignupForm formik={signupFormik} onFlip={handleFormSwitch} />
              ) : activeForm === "forgot" ? (
                <ForgotPasswordForm onFlip={handleFormSwitch} />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-4 p-4 rounded text-sm text-center">
        &copy; {currentYear} Shift Scheduler App. All rights reserved.
      </footer>
    </div>
  );
}

export default LandingPage;
