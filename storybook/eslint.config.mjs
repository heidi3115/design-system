import { config } from '@common/eslint-config/react-internal';

/** @type {import("eslint").Linter.Config} */
export default config;

// TODO: 아래설정으로 하면 린트가 안먹음 원인파악 필요
// import { config } from '@common/eslint-config/react-internal';

// /** @type {import("eslint").Linter.Config} */
// const extendedConfig = {
//   ...config,
//   parserOptions: {
//     ...config.parserOptions,
//     project: Array.isArray(config.parserOptions?.project)
//       ? [...config.parserOptions.project, 'tsconfig.json']
//       : [config.parserOptions?.project || 'tsconfig.json'],
//   },
// };

// export default extendedConfig;
