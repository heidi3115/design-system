import type { Config } from 'jest';

import baseConfig from '@common/jest-config';

const config: Config = {
  ...baseConfig,
  rootDir: './',
  testMatch: ['<rootDir>/src/**/*.(test|spec).{ts,tsx}'],
};

export default config;
