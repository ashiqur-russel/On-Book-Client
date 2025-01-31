import { type Config } from "tailwindcss";
import baseTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Ensures dark mode support
  theme: {
    extend: {
      fontFamily: {
        sans: ["Mona Sans", "Poppins", ...baseTheme.fontFamily.sans],
        serif: ["Sora", "Space Grotesk", "serif"],
        mono: ["Source Code Pro", ...baseTheme.fontFamily.mono],
      },
      colors: {
        primary: "#AC6AFF",
        secondary: "#FFC876",
        accent: "#FF776F",
        success: "#7ADB78",
        info: "#858DFF",
        warning: "#FF98E2",
        danger: "#FF776F",
        neutral: "#FAF8F6",
        dark: "#15131D",
      },
    },
  },
  plugins: [],
} satisfies Config;
