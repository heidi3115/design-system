const lintstagedrc = {
  '*.{ts,tsx,js,jsx,json}': ['eslint --fix --quiet', 'prettier --write'],
  '*.{md,css,scss}': ['prettier --write'],
};

export default lintstagedrc;
