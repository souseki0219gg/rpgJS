/* eslint-disable no-undef */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  ignorePatterns: ["docs", "node_modules"],
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "no-console": "warn",
    camelcase: ["error", { properties: "never" }],
    semi: ["error", "always"],
    indent: ["error", 2],
    "no-warning-comments": [
      "warn",
      { "terms": ["todo", "fixme"], "location": "anywhere" }
    ]
  },
};
