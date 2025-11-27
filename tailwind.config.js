/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "fashion-cream": "#f8f5f2",
        "fashion-black": "#111111",
        "fashion-pink": "#ff4f9a",
        "fashion-gray": "#777777",
      },
      fontFamily: {
        vogue: ['"Playfair Display"', "serif"],
        luxury: ['"Cormorant Garamond"', "serif"], // Zarif alt başlıklar
        sans: ['"Montserrat"', "sans-serif"],
        
    signature: ['"Dancing Script"', "cursive"],
      },
    },
  },
  plugins: [],
  extend: {
  fontFamily: {
    signature: ['"Great Vibes"', 'cursive'],
    vogue: ['"Playfair Display"', 'serif'],
  },
},

};
