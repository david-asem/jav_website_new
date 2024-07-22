/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./view/**/*.hbs"],
  theme: {
    extend: {
      fontFamily: {
        'satoshi': ['Satoshi', 'sans-serif']
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.text-justify': {
          'text-align': 'justify',
        },
      })
    }
  ],
}
