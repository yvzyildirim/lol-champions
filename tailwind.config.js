/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  theme: {
    extend: {
      colors: {
        dark: "#111111",
        "dark-gray": "#262626",
        primary: "#A6DC77",
        "light-primary": "#AFC29E",
        gray: "#333333",
        "light-gray": " #666",
        "extra-light-gray": "#e3e3e3",
        "line-gray": "#474747",
        "text-gray": "#b2b2b2",
        ice: "#FDFBEF",
        yellow: "#AE8D43",
        blue: "#03268E",
        green: "#1CA1B4",
        pink: "#E725A8",
        "dark-yellow": " #463A23",
      },
    },
  },
  plugins: [],
};
