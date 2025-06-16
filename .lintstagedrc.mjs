const lintstagedrc = {
  '*.{ts,tsx,js,jsx,json}': ['eslint --fix --quiet', 'prettier --write'],
  '*.{md,css,scss}': ['prettier --write'],
  'packages/ui/**/*.{ts,tsx,js,jsx,json}': ['pnpm ui lint'],
};

export default lintstagedrc;
