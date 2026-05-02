/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FAF7F2",
        ivory: "#F5EFE6",
        beige: "#E8DDD0",
        sage: {
          50: "#F2F5EE",
          100: "#E2EAD8",
          200: "#C9D6B6",
          300: "#A8BC8F",
          400: "#8DA572",
          500: "#6F8A57",
          600: "#566E43",
          700: "#445737",
          800: "#36462C",
          900: "#283322",
        },
        gold: {
          DEFAULT: "#C9A961",
          light: "#D9BE7E",
          dark: "#A88945",
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "ui-serif", "Georgia", "serif"],
        display: ['"Playfair Display"', "ui-serif", "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(86, 110, 67, 0.18)",
        envelope: "0 30px 60px -20px rgba(54, 70, 44, 0.35)",
      },
      backgroundImage: {
        "paper-grain":
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.6), transparent 40%), radial-gradient(circle at 80% 80%, rgba(168,188,143,0.15), transparent 50%)",
      },
      keyframes: {
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        floatY: "floatY 6s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
