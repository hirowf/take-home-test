/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        brand: "#091d50",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
