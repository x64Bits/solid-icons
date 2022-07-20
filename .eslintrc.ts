module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    quotes: ["error", "double"],
  },
  overrides: [
    {
      files: ["dist/**/*.js"],
      rules: {
        quotes: ["error", "double"],
      },
    },
  ],
};
