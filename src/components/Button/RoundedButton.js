import React from 'react';
import {Button as PaperButton, Text, useTheme} from 'react-native-paper';
import createStyles from '@src/utils/createStyles';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native';
import Content from '../Content';
import {getShadow} from '@src/utils/common';

const RoundedButton = ({
  containerStyle = {},
  backgroundStyle = {},
  labelStyle = {},
  size = 80,
  label,
  children,
  vertical = false,
  colors,
  margin = {},
  onPress,
  ...props
}) => {
  const theme = useTheme();
  const styles = getStyles({
    theme,
    size,
    margin,
  });

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  const verticalGradient = {
    start: {x: 0, y: 0},
    end: {x: 0, y: 1},
  };

  const horizontalGradient = {
    start: {x: 0, y: 0},
    end: {x: 1, y: 0},
  };

  return (
    <TouchableOpacity
      style={[styles.containerStyle, containerStyle]}
      onPress={handlePress}
      {...props}>
      <LinearGradient
        {...(vertical ? {...verticalGradient} : {...horizontalGradient})}
        colors={
          colors ? colors : [theme.colors.primary1, theme.colors.primary2]
        }
        style={[styles.backgroundStyle, backgroundStyle]}>
        {label ? (
          <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
        ) : (
          children
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const getStyles = ({theme, size, margin}) => {
  const styles = {
    containerStyle: {
      ...margin,
      height: size,
      width: size,
      borderRadius: size,
      ...getShadow(),
    },
    backgroundStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: size,
      height: size,
      width: size,
    },
    labelStyle: {
      color: theme.colors.light2,
      fontWeight: '500',
      fontFamily: 'Montserrat-Bold',
    },
  };
  return createStyles(styles);
};

export default RoundedButton;
