module.exports = {
  '*.{ts,tsx,js,jsx,json}': ['eslint --max-warnings=0 --fix', 'prettier --write'],
  '*.{md,css,scss}': ['prettier --write'],
};
