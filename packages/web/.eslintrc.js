// "off" or 0 - turn the rule off
// "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
// "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
module.exports = {
  parser: "babel-eslint",
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:jsx-a11y/recommended",
    "prettier",
    "prettier/prettier",
    "prettier/react",
    "prettier/standard",
    "react-app",
    "react-app/jest",
  ],
  plugins: [
    "html",
    "react",
    "jsx-a11y",
    "markdown",
    "react-hooks",
    "jest",
    "import",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  parserOptions: {
    sourceType: "module",
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    "jest/globals": true,
  },
  rules: {
    "react/jsx-filename-extension": "off",
    "import/prefer-default-export": "off",
    "prefer-destructuring": "off",
    "object-shorthand": "off",
    "react/jsx-props-no-spreading": "off",
    "arrow-body-style": "off",
    "no-underscore-dangle": "off",
    "react/forbid-prop-types": "off",
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        assert: "htmlFor",
      },
    ],
  },
};
