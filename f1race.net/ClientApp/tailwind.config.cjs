/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1320px",
    },
    extend: {
      colors: {
        white: "#ffffff",
        black: "#000000",
        "race-red": "#E5001F",
        "ring-light": "#00D4FF",
      },
      fontFamily: {
        sans: ["Titillium Web", "sans-serif"],
        serif: ["Merriweather", "serif"],
        exo: ["Exo", "sans-serif"],
        f1: ["Formula1", "Orbitron", "sans-serif"],
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("./src/plugins/svg.cjs"),
    require("./src/plugins/transform3d.cjs"),
  ],
};
