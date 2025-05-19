module.exports = {
  '*.{ts,tsx,js,jsx,json}': ['turbo lint --filter=...[HEAD^]', 'prettier --write'],
  '*.{md,css,scss}': ['prettier --write'],
};
