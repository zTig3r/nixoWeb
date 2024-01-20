
/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors")

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    colors: {
      primary: "#cf1df2",
      secondary: "#0acefa",
      nixo: "#94c6f3",
      navbar: "#1d232a",
      background: "#22262b",
      white: colors.white,
      black: colors.black,
      yellow: colors.yellow
    },
    extend: {},
  },
  plugins: [require('tailwindcss-animated')],
}

