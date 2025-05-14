import React from "react";

const jobShifts = [
  {
    id: 1,
    date: "2025-05-04",
    client: "Merit Office Installations",
    company: "Relo-IT LTD",
    address: ["CMS, 78 Cannon Street", "London", "EC4N 6AG"],
    station: "Cannon Street",
    startTime: "09:00 AM",
    endTime: "05:00 PM",
    crew: [
      "Jimil Goswami (Team Lead)",
      "Virendra Chavda",
      "Abdulkarim Qureshi",
      "Brijesh Gujarati",
      "Meet Gadhesariya",
      "Muhammed Saleh",
    ],
    instructions:
      "Please report to Jimil Goswami on-site and follow instructions.",
    note: "Bring all tools. Wear plain black full sleeve uniform and carry physical ID.",
    contact: {
      name: "Jimil Goswami",
      title: "IT Manager",
      phone: "07880321841",
      email: "jimil.goswami@reloitltd.com",
    },
    website: "www.reloitltd.com",
    supportEmail: "info@reloitltd.com",
    fullAddress: "97 Merrion Avenue, Stanmore, London, HA7 4RY",
  },
  {
    id: 2,
    date: "2025-05-06",
    client: "Omega Tech",
    company: "Relo-IT LTD",
    address: ["45 Tech Park", "Milton Keynes", "MK9 1FH"],
    station: "Milton Keynes Central",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    crew: ["Brijesh Gujarati", "Abdulkarim Qureshi", "Virendra Chavda"],
    instructions: "Meet at reception and ask for floor manager.",
    note: "Safety shoes required. Bring ID badge.",
    contact: {
      name: "Nina Patel",
      title: "Site Manager",
      phone: "07945678910",
      email: "nina.patel@omegatech.com",
    },
    website: "www.omegatech.com",
    supportEmail: "support@omegatech.com",
    fullAddress: "45 Tech Park, Milton Keynes, MK9 1FH",
  },
  {
    id: 3,
    date: "2025-05-08",
    client: "Nova Systems",
    company: "Relo-IT LTD",
    address: ["Nova Plaza", "Birmingham", "B1 1AA"],
    station: "Birmingham New Street",
    startTime: "08:00 AM",
    endTime: "04:00 PM",
    crew: ["Jimil Goswami (Team Lead)", "Meet Gadhesariya"],
    instructions: "Pick up equipment from basement first.",
    note: "No parking available — use public transport.",
    contact: {
      name: "Emily Tran",
      title: "Coordinator",
      phone: "07778994412",
      email: "emily.tran@novasystems.com",
    },
    website: "www.novasystems.com",
    supportEmail: "help@novasystems.com",
    fullAddress: "Nova Plaza, Birmingham, B1 1AA",
  },
];

export default function MyShifts() {
  // Split into rows of 2
  const rows = [];
  for (let i = 0; i < jobShifts.length; i += 2) {
    rows.push(jobShifts.slice(i, i + 2));
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {jobShifts.map((shift) => (
        <div
          key={shift.id}
          className="bg-white border rounded-xl shadow px-6 py-4 text-sm text-gray-800 font-sans"
        >
          {/* HEADER */}
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-blue-600">
              🪪 JS#{shift.id} -{" "}
              {new Date(shift.date).toLocaleDateString("en-UK", {
                weekday: "long",
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
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
                🗓️ <strong>Job Date:</strong>{" "}
                {new Date(shift.date).toDateString()}
              </p>
              <p>
                🏢 <strong>Client:</strong> {shift.client}
              </p>
              <p>
                🏬 <strong>Company:</strong> {shift.company}
              </p>
              <div>
                <p className="font-semibold text-pink-600">📍 Site Address:</p>
                {shift.address.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              <p>
                🚉 <strong>Nearest Station:</strong> {shift.station}
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
                  {shift.crew.map((member, idx) => (
                    <li key={idx}>{member}</li>
                  ))}
                </ul>
              </div>
              <p className="text-red-600 font-medium">
                📋 {shift.instructions}
              </p>
              <p className="text-red-600 font-medium">❗ {shift.note}</p>
            </div>
          </div>

          {/* FOOTER */}
          <div className="w-full flex justify-center mt-6 mb-3">
            <div className="w-[95%] h-px bg-gray-300"></div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-6 text-xs text-gray-600">
            <div className="flex-1 space-y-1">
              <p>
                📞 <strong>{shift.contact.name}</strong> — {shift.contact.title}
                , {shift.company}
              </p>
              <p>
                {shift.contact.phone} | {shift.contact.email}
              </p>
              <p>
                🌐 {shift.website} | {shift.supportEmail}
              </p>
              <p>🏠 {shift.fullAddress}</p>
            </div>
            <div className="flex-1 space-y-1">
              <p>
                📞 <strong>{shift.contact.name}</strong> — {shift.contact.title}
                , {shift.company}
              </p>
              <p>
                {shift.contact.phone} | {shift.contact.email}
              </p>
              <p>
                🌐 {shift.website} | {shift.supportEmail}
              </p>
              <p>🏠 {shift.fullAddress}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
