// components/ForgotPasswordForm.jsx
function ForgotPasswordForm({ formik }) {
  return (
    <>
      <h2 className="text-xl font-bold text-center mb-4">Forgot Password</h2>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
        <div>
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {formik.errors && formik.errors.general && (
          <p className="text-red-500 text-sm">{formik.errors.general}</p>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition duration-200 shadow"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default ForgotPasswordForm;
