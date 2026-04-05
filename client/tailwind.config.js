/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1A2A2A",
        mint: "#BCE4C9",
        peach: "#F7C5A8",
      },
      fontFamily: {
        heading: ["Sora", "sans-serif"],
        body: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};
