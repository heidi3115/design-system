// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jest-environment-jsdom',
  roots: ['<rootDir>/packages/ui'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: ['**/*.test.(ts|tsx|js|jsx)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.jest.json' }],
  },
};
