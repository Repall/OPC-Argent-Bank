/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#42b983", // Couleur principale
        secondary: "#2c3e50", // Couleur secondaire
        background: "#12002b", // Couleur de fond
      },
      backgroundImage: {
        'back-tree': "url('/public/img/back-tree.jpeg')",
      }
    },
  },
  plugins: [],
};
