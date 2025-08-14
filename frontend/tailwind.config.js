/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background))",
        popover: "rgb(var(--popover))",
        "popover-foreground": "rgb(var(--popover-foreground))",
        accent: "rgb(var(--accent))",
        "accent-foreground": "rgb(var(--accent-foreground))",
      },
    },
  },
  plugins: [],
};
