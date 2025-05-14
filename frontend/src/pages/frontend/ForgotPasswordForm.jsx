// components/ForgotPasswordForm.jsx
import { useState } from "react";

export default function ForgotPasswordForm({ onFlip }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const isMatch = name === "test" && email === "test@example.com"; // fake check
    if (isMatch) {
      alert(
        "Form submitted:\n" +
          JSON.stringify({ name, email, newPassword }, null, 2)
      );
      onFlip("login"); // return to login
    } else {
      setError("Name and Email do not match our records.");
      setName("");
      setEmail("");
      setNewPassword("");
    }
  };

  return (
    <div
      className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-lg p-8 flex flex-col"
      style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
    >
      <h2 className="text-xl font-semibold mb-4 text-center">
        Forgot Password
      </h2>
      <p className="text-sm text-gray-600 mb-4 text-center">
        Enter your name, email, and new password to reset.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => onFlip("login")}
            className="text-gray-600 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
}
