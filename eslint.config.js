// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ['apps/**', 'packages/**'],
  extends: ['@common/eslint-config/library'],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },

  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
