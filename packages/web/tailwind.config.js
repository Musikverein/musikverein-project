const tailwindForms = require("@tailwindcss/forms");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {},
    colors: {
      ...colors,
      gray: colors.trueGray,
      [`blue-gray`]: colors.blueGray,
      [`cool-gray`]: colors.coolGray,
      primary: {
        light: "#26A1FF",
        DEFAULT: "#0B7DD4",
        dark: "#034E87",
      },
      dark: {
        light: "#535353",
        DEFAULT: "#212121",
        dark: "#121212",
      },
      light: {
        light: "#fff",
        DEFAULT: "#f2f4f8",
        dark: "#b3b3b3",
      },
      accent: "#FF7D40",
      success: "#00CC45",
      warning: "#FFD219",
      error: "#FF4540",
      info: "#FFA926",
    },
  },
  variants: {
    /** @see https://tailwindcss.com/docs/configuring-variants#default-variants-reference */
    extend: {
      backgroundColor: [
        "responsive",
        "group-hover",
        "focus-within",
        "hover",
        "focus",
        "focus-visible",
      ],
      outline: ["responsive", "focus-within", "focus", "focus-visible"],
      ringWidth: ["responsive", "focus-within", "focus", "focus-visible"],
      ringColor: ["responsive", "focus-within", "focus", "focus-visible"],
      ringOpacity: ["responsive", "focus-within", "focus", "focus-visible"],
    },
  },
  plugins: [tailwindForms],
};
