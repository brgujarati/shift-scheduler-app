function SignupForm({ formik, onFlip }) {
  return (
    <div
      className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-lg p-8 flex flex-col"
      style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
    >
      <h2 className="text-xl font-bold text-center mb-4">Sign Up</h2>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
        {/* Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Enter your name"
            className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="signupEmail"
            value={formik.values.signupEmail}
            onChange={formik.handleChange}
            placeholder="Enter email address"
            className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        {/* Password */}
        <div>
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="signupPassword"
            value={formik.values.signupPassword}
            onChange={formik.handleChange}
            placeholder="Create password"
            className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded font-semibold"
        >
          SIGN UP
        </button>
      </form>
      <p className="text-center text-sm mt-4 text-gray-600">
        Already have an account?{" "}
        <span
          className="text-indigo-600 font-medium hover:underline cursor-pointer"
          onClick={() => onFlip("login")}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default SignupForm;
