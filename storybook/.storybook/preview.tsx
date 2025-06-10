import '@common/ui/src/styles/globals.css';
import '@common/ui/src/styles/fonts/defaultFonts.css';
import '../src/stories/index.css';

import type { Preview } from '@storybook/react';
import { useLayoutEffect } from 'react';
import { palette } from '@common/tokens';

const WithTailwindTheme = (Story, context) => {
  const bg = context.globals.backgrounds?.value ?? palette.juiBackground.default.main;

  useLayoutEffect(() => {
    const root = document.documentElement;

    if (bg === palette.juiBackground.default.main) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [bg]);

  return (
    <div className="storybook-wrapper bg-juiBackground-paper p-5">
      <Story />
    </div>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: palette.juiBackground.default.light },
        { name: 'dark', value: palette.juiBackground.default.main },
      ],
    },
    staticDirs: ['../public'],
  },
  decorators: [WithTailwindTheme],
};

export default preview;
