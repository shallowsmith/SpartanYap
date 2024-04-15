/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/*.{js,jsx}", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
});
