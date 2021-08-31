import React from 'react';
import {Button as PaperButton, Text, useTheme} from 'react-native-paper';
import createStyles from '@src/utils/createStyles';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native';
import {getFontSize, getShadow} from '@src/utils/common';

const PrimaryButton = ({
  containerStyle = {},
  backgroundStyle = {},
  labelStyle = {},
  minHeight = 50,
  label,
  getContent,
  children,
  vertical = false,
  colors,
  borderRadius = 10,
  margin = {},
  onPress,
  ...props
}) => {
  const theme = useTheme();
  const styles = getStyles({
    theme,
    minHeight,
    borderRadius,
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
        ) : getContent ? (
          getContent()
        ) : (
          children
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const getStyles = ({theme, minHeight, borderRadius, margin}) => {
  const styles = {
    containerStyle: {
      height: minHeight,
      minHeight,
      flex: 1,
      borderRadius,
      ...margin,
      ...getShadow(),
    },
    backgroundStyle: {
      height: minHeight,
      minHeight,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      borderRadius,
    },
    labelStyle: {
      color: theme.colors.light2,
      fontWeight: '500',
      fontFamily: 'Montserrat-Bold',
    },
  };
  return createStyles(styles);
};

export default PrimaryButton;
