function LoginForm({ formik }) {
  return (
    <>
      <h2 className="text-xl font-bold text-center mb-4">Log in</h2>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
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
        <div>
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Enter your password"
            className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
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
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition duration-200 shadow"
        >
          LOG IN
        </button>
      </form>
    </>
  );
}

export default LoginForm;
