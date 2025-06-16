import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import turboPlugin from 'eslint-plugin-turbo';
import tsEslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import('eslint').Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tsEslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'no-restricted-syntax': ['off'],
      'no-param-reassign': ['off'],
      'no-nested-ternary': ['off'],
      'react/prop-types': ['off'],
      'react/destructuring-assignment': ['off'],
      'react/require-default-props': ['off'],
      'react/jsx-props-no-spreading': ['off'],
      '@typescript-eslint/ban-ts-comment': ['off'],
      '@typescript-eslint/naming-convention': ['off'],
      'jsx-a11y/aria-role': ['off'],
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': ['error'],
      'jsx-a11y/no-noninteractive-element-interactions': ['off'],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'function', next: '*' },
        { blankLine: 'always', prev: '*', next: 'function' },
        { blankLine: 'always', prev: 'block-like', next: 'multiline-expression' },
        { blankLine: 'always', prev: '*', next: 'block-like' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
        { blankLine: 'always', prev: 'expression', next: ['const', 'let', 'var'] },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: 'expression' },
        {
          blankLine: 'any',
          prev: 'multiline-expression',
          next: 'multiline-expression',
        },
        { blankLine: 'always', prev: '*', next: 'multiline-expression' },
        { blankLine: 'always', prev: 'multiline-expression', next: '*' },
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
      'no-console': ['error', { allow: ['warn'] }],
    },
  },
  {
    ignores: [
      'dist/**',
      '.next/**',
      'node_modules/**',
      'coverage/**',
      'build/**',
      '.storybook/**',
      'storybook-static/**',
    ],
  },
];
