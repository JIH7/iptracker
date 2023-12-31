/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.html'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        'veryDarkGray': 'hsl(0, 0%, 17%)',
        'darkGray': 'hsl(0, 0%, 59%)',
      },
      borderWidth: {
        '1':'1px',
      },
    },
  },
  plugins: [],
}

