import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'JASON',
  brandImage: 'images/jmachine-logo.png',
  brandUrl: '/',
  brandTarget: '_self',
});

addons.setConfig({
  theme,
});
