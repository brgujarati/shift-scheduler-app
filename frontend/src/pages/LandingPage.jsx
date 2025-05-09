import { useState } from "react";
import ImageSlider from "../components/ImageSlider";
import { useFormik } from "formik";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

function LandingPage() {
  const currentYear = new Date().getFullYear();
  const [isFlipped, setIsFlipped] = useState(false);

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
          <div className="flex-1 p-4">
            <h2 className="text-lg font-semibold mb-2">App Description</h2>
            <p className="text-sm sm:text-base">
              The Shift Scheduler App is a powerful web application designed to
              help businesses efficiently manage employee work schedules. It
              provides an intuitive admin dashboard to create, update, and
              delete shifts, while employees can view their assigned shifts, set
              their availability, and request shift swaps. The Shift Scheduler
              App is a powerful web application designed to help businesses
              efficiently manage employee work schedules. It provides an
              intuitive admin dashboard to create, update, and delete shifts,
              while employees can view their assigned shifts, set their
              availability, and request shift swaps. The Shift Scheduler App is
              a powerful web application designed to help businesses efficiently
              manage employee work schedules. It provides an intuitive admin
              dashboard to create, update, and delete shifts, while employees
              can view their assigned shifts, set their availability, and
              request shift swaps.The Shift Scheduler App is a powerful web
              appaps.The Shift Scheduler App is a powerful web application
              designed to help businesses efficiently manage employee work
              schedules.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex justify-center w-full md:w-1/2 p-4 h-full overflow-y-auto">
          <div className="relative w-full max-w-md h-[430px] perspective">
            <div
              className={`transition-transform duration-700 transform ${
                isFlipped ? "rotate-y-180" : ""
              } w-full h-full relative`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <LoginForm formik={formik} onFlip={() => setIsFlipped(true)} />
              <SignupForm
                formik={signupFormik}
                onFlip={() => setIsFlipped(false)}
              />
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
