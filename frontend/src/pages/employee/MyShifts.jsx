import React from "react";
import { useAuth } from "../../context/AuthContext";

export default function MyShifts() {
  const { shifts } = useAuth();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {shifts.map((shift) => (
        <div
          key={shift._id}
          className="bg-white border rounded-xl shadow px-6 py-4 text-sm text-gray-800 font-sans"
        >
          {/* HEADER */}
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-blue-600">
              🪪 {shift.shiftId} {/* shiftId from array */}
            </h2>
            <div className="w-full flex justify-center">
              <div className="w-[95%] h-px bg-gray-300"></div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex flex-col lg:flex-row gap-6 mt-4">
            {/* Left */}
            <div className="flex-1 space-y-2">
              <p>
                🗓️ <strong>Job Date:</strong> {shift.date}
              </p>
              <p>
                🏢 <strong>Client:</strong> {shift.clientName}
              </p>
              <p>
                🏬 <strong>Company:</strong> Relo-IT LTD {/* static */}
              </p>
              <div>
                <p className="font-semibold text-pink-600">📍 Site Address:</p>
                {shift.siteAddress.split(",").map((line, i) => (
                  <p key={i}>{line.trim()}</p> // trim whitespace
                ))}
              </div>
              <p>
                🚉 <strong>Nearest Station:</strong> {shift.nearestStation}
              </p>
              <p>
                🕘 <strong>Start Time:</strong> {shift.startTime}
              </p>
              <p>
                🕔 <strong>End Time:</strong> {shift.endTime}
              </p>
            </div>

            {/* Right */}
            <div className="flex-1 space-y-3">
              <div>
                <p className="font-semibold text-purple-700">
                  👥 Crew Members:
                </p>
                <ul className="list-disc list-inside ml-2">
                  {shift.team?.map((member, idx) => (
                    <li key={idx}>{member.name}</li> // If populate is working, use member.name
                  ))}
                </ul>
              </div>
              <p className="text-red-600 font-medium">📋 {shift.instruction}</p>
              <p className="text-red-600 font-medium">
                ❗ Bring all tools. Wear plain black full sleeve uniform and
                carry physical ID.
              </p>
            </div>
          </div>

          {/* FOOTER */}
          <div className="w-full flex justify-center mt-6 mb-3">
            <div className="w-[95%] h-px bg-gray-300"></div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-6 text-xs text-gray-600">
            <div className="flex-1 space-y-1">
              <p>
                📞 <strong>Jimil Goswami</strong> — IT Manager, Relo-IT LTD
              </p>
              <p>07880321841 | jimil.goswami@reloitltd.com</p>
              <p>🌐 www.reloitltd.com | info@reloitltd.com</p>
              <p>🏠 97 Merrion Avenue, Stanmore, London, HA7 4RY</p>
            </div>
            <div className="flex-1 space-y-1">
              <p>
                📞 <strong>Jimil Goswami</strong> — IT Manager, Relo-IT LTD
              </p>
              <p>07880321841 | jimil.goswami@reloitltd.com</p>
              <p>🌐 www.reloitltd.com | info@reloitltd.com</p>
              <p>🏠 97 Merrion Avenue, Stanmore, London, HA7 4RY</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
