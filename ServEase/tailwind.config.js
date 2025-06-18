/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        benne: ["Benne", "serif"],
      },
      colors: {
        white: "#fff",
        black: "#000",
        whitesmoke: "#f8f7f3",
        tan: "#a68465",
        gray: {
          100: "#2e231d",
          200: "#050f1a",
        },
        slategray: "#5c6c7e",
        dimgray: "#604c3d",
        gainsboro: "#e5e5e5",
      },
      fontFamily: {
        "dm-sans": "DM Sans",
        poppins: "Poppins",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
