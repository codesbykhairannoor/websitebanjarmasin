/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'martapura': '#091422',
        'sasirangan': '#F4C038',
        'borneo': '#00A896',
        'river': '#008075',
        'card-dark': 'rgba(15, 28, 48, 0.75)',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
