/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
module.exports = {
    darkMode: ['class'],
    mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
  	screen: {
  		xxl: '1918'
  	},
  	extend: {
  		colors: {
  			blueGray: 'colors.blueGray'
  		},
  		animation: {
  			fade: 'fadeIn .2s ease-in-out',
  			greenfade: 'greenfadeIn 0.5s ease-in-out'
  		},
  		keyframes: {
  			fadeIn: {
  				from: {
  					opacity: '0'
  				},
  				to: {
  					opacity: '1'
  				}
  			},
  			greenfadeIn: {
  				'0%': {
  					backgroundColor: 'colors.green[400]'
  				},
  				'100%': {
  					backgroundColor: 'rgba(0, 255, 0, 0)'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-spinner': {
          // Hide the arrows for all browsers
          '&::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            'margin': 0,
          },
          '&::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            'margin': 0,
          },
          // Hide the arrows for Firefox
          '&': {
            '-moz-appearance': 'textfield',
          },
        },
      });
    },
      require("tailwindcss-animate")
],
}

