import React from 'react';
import {Button as PaperButton, Text, useTheme} from 'react-native-paper';
import createStyles from '@src/utils/createStyles';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity, Dimensions} from 'react-native';
import {getFontSize, getShadow} from '@src/utils/common';

const heightY = Dimensions.get('window').height;

const SecondaryButton = ({
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
        colors={colors ? colors : [theme.colors.light1, theme.colors.light2]}
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
      color: theme.colors.primary,
      fontWeight: '500',
      fontFamily: 'Montserrat-Bold',
    },
  };
  return createStyles(styles);
};

export default SecondaryButton;
