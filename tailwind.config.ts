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
      flexBasis: {
        "1/3-gap-6": "calc(33.3% - (2/3 * 1.5rem))",
      },
    },
  },
  plugins: [],
} satisfies Config;
