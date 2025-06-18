const lintstagedrc = {
  '*.{md,css,scss}': ['prettier --write'],
  'packages/ui/**/*.{ts,tsx,js,jsx}': ['pnpm ui lint'],
  'packages/utils/**/*.{ts,tsx,js,jsx}': ['pnpm utils lint'],
  'apps/next-app/**/*.{ts,tsx,js,jsx}': ['pnpm next-app eslint'],
  'apps/react-app/**/*.{ts,tsx,js,jsx}': ['pnpm react-app lint'],
  'storybook/**/*.{ts,tsx,js,jsx}': ['pnpm storybook lint'],
};

export default lintstagedrc;
