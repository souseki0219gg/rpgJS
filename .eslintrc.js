module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
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
    "no-console": "error",
    camelcase: ["error", { properties: "never" }],
    semi: ["error", "always"],
    indent: ["error", 2]
  },
};
