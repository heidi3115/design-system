const lintstagedrc = {
  '*.{ts,tsx,js,jsx,json}': ['eslint --fix --quiet', 'prettier --write'],
  '*.{md,css,scss}': ['prettier --write'],
  'packages/ui/**/*.{ts,tsx,js,jsx,json}': ['pnpm ui lint'],
  'packages/utils/**/*.{ts,tsx,js,jsx,json}': ['pnpm utils lint'],
  'apps/next-app/**/*.{ts,tsx,js,jsx,json}': ['pnpm next-app eslint'],
  'apps/reaect-app/**/*.{ts,tsx,js,jsx,json}': ['pnpm react-app lint'],
  'storybook/**/*.{ts,tsx,js,jsx,json}': ['pnpm storybook lint'],
};

export default lintstagedrc;
