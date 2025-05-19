import '@common/ui/src/styles/globals.css';
import '@common/ui/src/styles/fonts/defaultFonts.css';

import type { Preview } from '@storybook/react';
import { palette } from '@common/tokens';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: palette.juiGrey.a100 }, // 기본 흰색 배경
        { name: 'dark', value: palette.juiBackground.default }, // 어두운 테마용
      ],
    },
    staticDirs: ['../public'],
  },
};

export default preview;
