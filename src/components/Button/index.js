import React from 'react';
import {Button as PaperButton, useTheme} from 'react-native-paper';
import createStyles from '@src/utils/createStyles';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native';

const Button = mainProps => {
  const theme = useTheme();
  const {
    gradient = false,
    rounded = false,
    primary = true,
    mode = 'contained',
    style = {},
    contentStyle = {},
    labelStyle = {},
    disabledLabelStyle = {},
    size,
    position = 'start',
    bgColor = 'transparent',
    textColor,
    borderColor,
    borderWidth,
    children,
    onPress,
    containerStyle = {},
    backgroundStyle = {},
    colors,
    borderRadius = 0,
    ...props
  } = mainProps;
  const styles = getStyles({
    mode,
    size,
    position,
    rounded,
    gradient,
    bgColor,
    borderRadius,
    textColor,
    borderColor,
    borderWidth,
  });
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };
  const ThemeButton = (
    <PaperButton
      style={[styles.container, style]}
      contentStyle={[styles.contentStyle, contentStyle]}
      labelStyle={[
        styles.labelStyle,
        props.disabled ? disabledLabelStyle : labelStyle,
      ]}
      mode={mode}
      onPress={handlePress}
      {...props}
    />
  );
  return gradient && children ? (
    <TouchableOpacity style={[containerStyle]} {...props} onPress={handlePress}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={
          colors
            ? colors
            : primary
            ? [theme.colors.primary1, theme.colors.primary2]
            : [theme.colors.light1, theme.colors.light2]
        }
        style={[backgroundStyle]}>
        {children}
      </LinearGradient>
    </TouchableOpacity>
  ) : children ? (
    <TouchableOpacity
      style={[styles.buttonContainerStyle, containerStyle]}
      {...props}
      onPress={handlePress}>
      {children}
    </TouchableOpacity>
  ) : (
    ThemeButton
  );
};

const getStyles = ({
  mode,
  size,
  position,
  rounded,
  gradient,
  bgColor,
  borderRadius,
  textColor,
  borderColor,
  borderWidth,
}) => {
  const styles = {
    buttonContainerStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: gradient ? 'transparent' : bgColor,
      borderColor: gradient ? 'transparent' : borderColor,
      borderWidth: borderWidth ? borderWidth : 0,
      borderRadius: rounded ? 30 : borderRadius,
      paddingHorizontal:
        size === 'medium'
          ? 5
          : size === 'small'
          ? 0
          : size === 'large'
          ? 16
          : 10,
      paddingVertical:
        size === 'medium'
          ? 5
          : size === 'small'
          ? 0
          : size === 'large'
          ? 15
          : 10,
    },
    container: {
      backgroundColor: gradient ? 'transparent' : bgColor,
      borderRadius: rounded ? 30 : borderRadius,
      marginLeft: position === 'start' || position === 'full' ? 0 : 10,
      marginRight: position === 'end' || position === 'full' ? 0 : 10,
    },
    contentStyle: {
      paddingHorizontal:
        size === 'medium'
          ? 5
          : size === 'small'
          ? 0
          : size === 'large'
          ? 16
          : 10,
      paddingVertical:
        size === 'medium'
          ? 5
          : size === 'small'
          ? 0
          : size === 'large'
          ? 15
          : 10,
    },
    labelStyle: {
      color: textColor || ['outlined', 'text'].includes(mode) ? '#000' : '#FFF',
    },
  };
  return createStyles(styles);
};

export default Button;
