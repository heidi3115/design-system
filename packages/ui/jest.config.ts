import baseConfig from '@common/jest-config';
import type { Config } from 'jest';

const appConfig: Config = {
  ...baseConfig,
  rootDir: './',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
};

export default appConfig;
