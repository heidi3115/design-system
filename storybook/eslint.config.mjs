import { config } from '@common/eslint-config/react-internal';

/** @type {import("eslint").Linter.Config} */
const extendedConfig = {
  ...config,
  parserOptions: {
    ...config.parserOptions,
    project: Array.isArray(config.parserOptions?.project)
      ? [...config.parserOptions.project, 'tsconfig.json']
      : [config.parserOptions?.project || 'tsconfig.json'],
  },
};

export default extendedConfig;
