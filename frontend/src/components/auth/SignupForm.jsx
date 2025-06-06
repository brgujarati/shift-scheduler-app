function SignupForm({ formik }) {
  return (
    <>
      <h2 className="text-xl font-bold text-center mb-4">Sign Up</h2>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
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
    </>
  );
}

export default SignupForm;
