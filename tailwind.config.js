/** @type {import('tailwindcss').Config} */

const colorScheme = require('./src/assets/scripts/colors');
const spacing = require('./src/assets/scripts/spacing');
const maxWidth = require('./src/assets/scripts/max-width');
const borderRadius = require('./src/assets/scripts/border-radius');
const utilities = require('./src/assets/scripts/utilities');

const plugin = require('tailwindcss/plugin');

module.exports = {
  prefix: 'mc-',
  content: ['./index.html', './src/**/*.{vue,js,ts}', './docs/**/*.{md,ts,js}', './docs/locales/**/*.{md,ts,js}'],
  theme: {
    extend: {
      colors: colorScheme,
      spacing: spacing,
      maxWidth: maxWidth,
      borderRadius: borderRadius,
      // keep the rest unchanged
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        sm: '32px',
        md: '40px',
        lg: '48px',
        xl: '96px',
        xxl: '104px',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {};
      for (const [key, value] of Object.entries(utilities)) {
        newUtilities[`.${key}`] = value;
      }
      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
  corePlugins: {
    preflight: false,
  },
};
