/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      boxShadow:{
        'all' : 'rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px'
        
      }
    },
  },
  plugins:[
    require("daisyui"),
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar'),
    require('tw-elements/dist/plugin'),
  ],

  daisyui: {
    themes: ["cupcake", "dark", "light","night"],
  },
  
}

