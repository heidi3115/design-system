import { config } from '@common/eslint-config/react-internal';

/** @type {import("eslint").Linter.Config} */
export default {
  ...config,
  rules: {
    'react/jsx-no-undef': 'error',
  },
};
