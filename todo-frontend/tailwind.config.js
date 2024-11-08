/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-800-50": "rgba(31, 41, 55, 0.5)", // Customize as needed
      },
    },
  },
  plugins: [],
};
