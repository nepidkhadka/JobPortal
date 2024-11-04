/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "16px",
        md: "14px",
        sm: "12px",
      },
      colors: {
        background: "hsl(210, 20%, 95%)",
        foreground: "hsl(210, 24%, 16%)",
        card: {
          DEFAULT: "hsl(210, 22%, 98%)",
          foreground: "hsl(210, 16%, 12%)",
        },
        popover: {
          DEFAULT: "hsl(210, 18%, 95%)",
          foreground: "hsl(210, 14%, 15%)",
        },
        primary: {
          DEFAULT: "#6366f1", // Your primary color
          foreground: "#ffffff", // Adjust as needed for foreground readability
        },
        secondary: {
          DEFAULT: "hsl(45, 100%, 50%)",
          foreground: "hsl(45, 85%, 20%)",
        },
        muted: {
          DEFAULT: "hsl(210, 15%, 80%)",
          foreground: "hsl(210, 10%, 40%)",
        },
        accent: {
          // DEFAULT: "hsl(340, 80%, 60%)",
          // foreground: "hsl(340, 60%, 30%)",
          DEFAULT: "hsl(210, 12%, 80%)",
          foreground: "hsl(210, 10%, 40%)",
        },
        destructive: {
          DEFAULT: "hsl(0, 70%, 50%)",
          foreground: "#ffffff",
        },
        border: "hsl(210, 16%, 88%)",
        input: "hsl(210, 20%, 90%)",
        ring: "hsl(210, 24%, 85%)",
        chart: {
          1: "hsl(200, 80%, 50%)",
          2: "hsl(220, 80%, 50%)",
          3: "hsl(240, 80%, 50%)",
          4: "hsl(260, 80%, 50%)",
          5: "hsl(280, 80%, 50%)",
        },
      },
      container: {
        padding: "10px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
