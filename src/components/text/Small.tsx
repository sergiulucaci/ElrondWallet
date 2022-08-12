import React from 'react';
import {Text} from 'react-native';

import textStyles from 'src/theme/text';

const SmallText = ({
  text,
  style,
  ...otherProps
}: {
  text: string;
  style?: Object;
}) => (
  <Text style={[textStyles.smallText, style]} {...otherProps}>
    {text}
  </Text>
);

export default SmallText;
