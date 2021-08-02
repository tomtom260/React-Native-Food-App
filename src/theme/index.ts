import colors from './colors';
import { space, lineHeights } from './spacing';
import sizes from './sizes';
import { fonts, fontWeights, fontSizes } from './fonts';

const theme = {
  colors,
  space,
  lineHeights,
  sizes,
  fonts,
  fontSizes,
  fontWeights,
};

export default theme;

export type ThemeType = typeof theme;
