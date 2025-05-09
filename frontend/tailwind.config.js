/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: "#e0e0ff",
        customGreen: "#d0ffd0",
      },
    },
  },
  plugins: [],
};
