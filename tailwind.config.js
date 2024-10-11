
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
      box: "#1b1e22",
      twitch: "#a970ff",
      green: "#00e022",
      red: "#ff0000",
      white: colors.white,
      black: colors.black
    },
    extend: {},
  },
  plugins: [require('tailwindcss-animated')],
}

