import { createTheme } from '@mantine/core';

import components from './overrides';

export const theme = createTheme({
  components,
  cursorType: 'pointer',
  fontFamily: 'Inter, sans-serif',
  colors: {
    primary: [
      '#fff4e6',
      '#ffe4cc',
      '#ffc999',
      '#ffa666',
      '#ff8433',
      '#ff6b1a',
      '#eb7803',
      '#d16a00',
      '#b85c00',
      '#9f4e00',
    ],
  },
  primaryColor: 'primary',
  breakpoints: {
    xs: '30em',
    sm: '40em',
    md: '48em',
    lg: '64em',
    xl: '80em',
    '2xl': '96em',
    '3xl': '120em',
    '4xl': '160em',
  },
});
