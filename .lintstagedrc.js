const lintstagedrc = {
  '*.{ts,tsx,js,jsx,json}': ['eslint --fix', 'prettier --write'],
  '*.{md,css,scss}': ['prettier --write'],
};

export default lintstagedrc;
