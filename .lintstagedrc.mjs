const lintstagedrc = {
  '*.{md,css,scss}': ['prettier --write'],
  'packages/ui/**/*.{ts,tsx,js,jsx}': ['pnpm ui lint'],
  'packages/utils/**/*.{ts,tsx,js,jsx}': ['pnpm utils lint'],
  'apps/next-app/**/*.{ts,tsx,js,jsx}': ['pnpm next-app eslint'],
  'apps/react-app/**/*.{ts,tsx,js,jsx}': ['pnpm react-app lint'],
  'storybook/**/*.{ts,tsx,js,jsx}': ['pnpm storybook lint'],

  // '**/*.{ts,tsx,js,jsx,json}': {
  //   title: 'Run eslint fix and prettier',
  //   task: async () => {
  //     // eslint --fix 실행
  //     await execAsync('eslint', ['--fix', '--ext', '.ts,.tsx,.js,.jsx,.json'], { stdio: 'inherit' });
  //     // prettier 실행
  //     await execAsync('prettier', ['--write', '.'], { stdio: 'inherit' });
  //   },
  //   globOptions: {
  //     ignore: [
  //       'packages/ui/**/*',
  //       'packages/utils/**/*',
  //       'apps/next-app/**/*',
  //       'apps/react-app/**/*',
  //       'storybook/**/*',
  //     ],
  //   },
  // },
};

export default lintstagedrc;
