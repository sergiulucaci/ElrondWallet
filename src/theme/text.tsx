import {StyleSheet} from 'react-native';

import {BLACK_87} from 'src/theme/colors';

const smallText = 12;
const mediumText = 15;
const largeText = 17;

const textStyles = StyleSheet.create({
  smallText: {
    color: BLACK_87,
    fontSize: smallText,
  },
  mediumText: {
    color: BLACK_87,
    fontSize: mediumText,
    lineHeight: 24,
  },
  largeText: {
    color: BLACK_87,
    fontWeight: '400',
    fontSize: largeText,
  },
});
export default textStyles;
