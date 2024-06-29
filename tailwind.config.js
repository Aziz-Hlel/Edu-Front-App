/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blueGray: colors.blueGray,
      },
      animation: {
        fade: 'fadeIn .2s ease-in-out',
        greenfade: 'greenfadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        greenfadeIn: {
          '0%': { backgroundColor: colors.green[400] },
          '100%': { backgroundColor: 'rgba(0, 255, 0, 0)' },
        },
      }
    },
  },
  plugins: [],
}

