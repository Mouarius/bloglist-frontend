const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: { content:['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    options: {
      safelist: [
        /data-theme$/,
      ]
    }, },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: require('daisyui/colors'),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    styled: true,
    themes: true,
    rtl: false,
  },
}
