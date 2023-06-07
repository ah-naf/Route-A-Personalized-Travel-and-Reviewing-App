/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      primary: ['"Alegreya Sans"', "sans-serif"],
      secondary: ["Ubuntu", "sans-serif"],
    },
  },
  plugins: [],
};
