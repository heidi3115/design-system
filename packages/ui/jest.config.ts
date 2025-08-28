import type { Config } from 'jest';

import baseConfig from '@common/jest-config';

const appConfig: Config = {
  ...baseConfig,
  rootDir: './',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
};

export default appConfig;
