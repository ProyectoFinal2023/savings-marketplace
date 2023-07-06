import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#457B9D",
        secondary: "#A8DADC",
        dark: "#1D3557",
        error: "#E63946",
        light: "#F1FAEE",
      },
    },
  },
  plugins: [],
} satisfies Config;
