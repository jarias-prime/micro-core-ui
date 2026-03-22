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
      spacing,
      maxWidth,
      borderRadius,
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {};
      for (const [key, value] of Object.entries(utilities)) {
        newUtilities[`.${key}`] = value;
      }
      addUtilities(newUtilities);
    }),
  ],
};
