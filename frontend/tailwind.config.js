/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ["Arsenal", "sans-serif"],
      serif: ["Crimson Text", "serif"],
      monospace: ["Fira Code", "monospace"],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      gray: {
        DEFAULT: "#6C6C6C",
        light: "#E0DCD9",
        dark: "#2C2C2C",
      },
      brown: {
        default: "#6A4343",
      },
      blue: {
        DEFAULT: "#3372BB",
        light: "#77B3CE",
        muted: "#5175A6",
      },
      paper: {
        DEFAULT: "#E0DCD9",
        dark: "#B3A9B4",
        light: "#f2eeea",
      },
      purple: {
        DEFAULT: "#363879",
        dark: "#292E5A",
        light: "#9A85CB",
      },
    },
    extend: {},
  },
  plugins: [
    require("@headlessui/tailwindcss")({ prefix: "ui" }),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
}
