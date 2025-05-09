// components/LoginForm.jsx
function LoginForm({ formik, onFlip }) {
  return (
    <div
      className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-lg p-8 flex flex-col"
      style={{ transform: "rotateY(0deg)" }}
    >
      <h2 className="text-xl font-bold text-center mb-4">Log in</h2>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Enter email address"
            className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        {/* Password */}
        <div>
          <label className="text-sm font-medium text-gray-700 flex justify-between">
            Password
            <a href="#" className="text-sm text-indigo-600 hover:underline">
              Forgot Password?
            </a>
          </label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Enter your password"
            className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        {/* Role */}
        <div>
          <label className="text-sm font-medium text-gray-700">Role</label>
          <select
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded font-semibold"
        >
          LOG IN
        </button>
      </form>
      <p className="text-center text-sm mt-4 text-gray-600">
        Don't have an account?{" "}
        <span
          className="text-indigo-600 font-medium hover:underline cursor-pointer"
          onClick={onFlip}
        >
          Signup
        </span>
      </p>
    </div>
  );
}

export default LoginForm;
