/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}", // <-- ADD THIS LINE
  ],
  theme: {
    extend: {
      colors: {
        "brand-tan": "#a68465",
        "brand-crimson": "#ee1d52",
        "brand-brown": {
          DEFAULT: "#604c3d", // dimgray
          100: "#402f27",
          200: "#38281b",
          300: "#2e231d",
          400: "#241f1b",
        },
        "brand-blue": {
          DEFAULT: "#5c6c7e", // slategray
          dark: "#050f1a",
        },
        offwhite: {
          DEFAULT: "#f8f7f3", // whitesmoke
          100: "#fbf7f4", // snow
          200: "#efebe2", // linen
        },
        "brand-cream": "#e0d9c9", // antiquewhite
        white: "#fff",
        black: "#000",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        benne: ["Benne", "serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
