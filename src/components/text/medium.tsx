import React from 'react';
import {Text} from 'react-native';

import textStyles from 'src/theme/text';
import {RED} from 'src/theme/colors';

const MediumText = ({
  text,
  style,
  error,
  ...otherProps
}: {
  text: string;
  error?: boolean;
  style?: Object;
}) => (
  <Text
    style={[textStyles.mediumText, error ? {color: RED} : {}, style]}
    {...otherProps}>
    {text}
  </Text>
);

export default MediumText;
