import React from "react";

export default function ProfileReview({ formData, loading, handlers, user }) {
  return (
    <div className="bg-white border rounded-xl shadow p-6">
      <div className="flex flex-col items-center">
        {/* Profile Picture Section */}
        <div className="relative w-24 h-24 mb-4">
          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-60 rounded-full">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-gray-600 mt-2">Uploading the file…</p>
            </div>
          ) : (
            <>
              <img
                src={`${user.profilePicUrl}?t=${Date.now()}`}
                alt="profile"
                className="w-24 h-24 rounded-full border object-cover"
              />
              <label
                htmlFor="profilePicUpload"
                className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow cursor-pointer hover:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 5a2 2 0 012-2h1.586a1 1 0 01.707.293l.707.707h3.414l.707-.707A1 1 0 0114.414 3H16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
                </svg>
                <input
                  id="profilePicUpload"
                  type="file"
                  accept="image/*"
                  onChange={handlers.handleProfilePicChange}
                  className="hidden"
                />
              </label>
            </>
          )}
        </div>

        {/* Name */}
        <h2 className="text-xl font-bold text-purple-700 mb-4">
          {formData.name}
        </h2>

        {/* Details Grid */}
        <div className="w-full max-w-sm mx-auto">
          <div className="grid grid-cols-[100px_1fr] gap-y-2 text-sm text-gray-800">
            <span className="font-medium">ID:</span>
            <span>{formData.id}</span>

            <span className="font-medium">Email:</span>
            <span>{formData.email}</span>

            <span className="font-medium">Role:</span>
            <span>{formData.role}</span>

            <span className="font-medium">Phone:</span>
            <span>{formData.phone}</span>

            <span className="font-medium">Address:</span>
            <span>
              {formData.address1}, {formData.address2}
            </span>

            <span className="font-medium">County:</span>
            <span>{formData.county}</span>

            <span className="font-medium">Country:</span>
            <span>{formData.country}</span>
          </div>
        </div>

        {/* Edit Button */}
        <div className="mt-6">
          <button
            className="bg-yellow-500 text-white py-2 px-6 rounded hover:bg-yellow-600"
            onClick={() => handlers.setShowReview(false)}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
