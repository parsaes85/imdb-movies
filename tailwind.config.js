/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBg: "#17181A",
        movieBg: "#212224",
        mainTextColor: "#b1b2bb",
        secondTextColor: "#828285",
      },
    },
  },
  plugins: [],
};
