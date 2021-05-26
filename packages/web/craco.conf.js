const path = require('path');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssFocusVisible = require('postcss-focus-visible');

module.exports = {
  style: {
    postcss: {
      plugins: [tailwindcss, postcssFocusVisible, autoprefixer],
    },
  },
};
