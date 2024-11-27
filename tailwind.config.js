/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      DMsans: ["DM Sans", "serif"],
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        brandColor: "#1E0E62",
        textColor: "#A7A1C2",
      },
    },
  },
  plugins: [],
};
