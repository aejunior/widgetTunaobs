/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx,ts}", "./src/components/**/*.{html,tsx,ts}"],

  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
