import React from 'react';
import {Button as PaperButton} from 'react-native-paper';
import createStyles from '../../utils/createStyles';

const Button = ({
  mode = 'contained',
  style = {},
  contentStyle = {},
  labelStyle = {},
  disabledLabelStyle = {},
  size = 'medium',
  position = 'start',
  ...props
}) => {
  const styles = getStyles({mode, size, position});
  return (
    <PaperButton
      style={[styles.container, style]}
      contentStyle={[styles.contentStyle, contentStyle]}
      labelStyle={[
        styles.labelStyle,
        props.disabled ? disabledLabelStyle : labelStyle,
      ]}
      mode={mode}
      {...props}
    />
  );
};

const getStyles = ({mode, size, position}) => {
  const styles = {
    container: {
      marginLeft: position === 'start' || position === 'full' ? 0 : 10,
      marginRight: position === 'end' || position === 'full' ? 0 : 10,
    },
    contentStyle: {padding: size === 'medium' ? 5 : size === 'small' ? 0 : 10},
    labelStyle: {color: ['outlined', 'text'].includes(mode) ? '#000' : '#FFF'},
  };
  return createStyles(styles);
};

export default Button;
