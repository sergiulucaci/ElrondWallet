import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {MediumText} from 'src/components/text';
import {BLUE, WHITE} from 'src/theme/colors';

const Button = ({
  text,
  disabled,
  onPress,
  containerStyle,
  textStyle,
  ...otherProps
}: {
  text: string;
  onPress: Function;
  disabled?: boolean;
  containerStyle?: Object;
  textStyle?: Object;
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      activeOpacity={0.7}
      style={[
        styles.button,
        {...(disabled ? {opacity: 0.5} : {})},
        containerStyle,
      ]}
      disabled={disabled}
      {...otherProps}>
      <MediumText text={text} style={[styles.buttonText, textStyle]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: BLUE,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 18,
    display: 'flex',
    justifyContent: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: WHITE,
  },
});

export default Button;
