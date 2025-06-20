import js from '@eslint/js';
import tsEslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  ...tsEslint.configs.recommended,
  prettierConfig, // Prettier와 충돌 방지
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', 'apps/**', 'packages/**', 'storybook/**'],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        project: ['./tsconfig.json'], // 루트 tsconfig
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'warn',
    },
  },
];
