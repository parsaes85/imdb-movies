/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './mainJs/*.js', './jsModules/*.js'],
  theme: {
    extend: {
      colors: {
        mainBg: '#17181A',
        movieBg: '#212224',
        mainTextColor: '#b1b2bb',
        secondTextColor: '#828285'
      }
    },
  },
  plugins: [],
}
