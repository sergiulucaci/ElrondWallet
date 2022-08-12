import React from 'react';
import {Text} from 'react-native';

import textStyles from 'src/theme/text';

const LargeText = ({
  text,
  style,
  ...otherProps
}: {
  text: string;
  style?: Object;
}) => (
  <Text style={[textStyles.largeText, style]} {...otherProps}>
    {text}
  </Text>
);

export default LargeText;
