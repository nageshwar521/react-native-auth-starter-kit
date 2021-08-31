import {getShadow} from '@src/utils/common';
import createStyles from '@src/utils/createStyles';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';

const GradientWrapper = ({
  colors,
  vertical,
  backgroundStyle,
  minHeight = 40,
  height = 40,
  children,
}) => {
  const theme = useTheme();
  const currentTheme = useSelector(state => state.common.currentTheme);
  const primary = currentTheme === 'dark';

  const verticalGradient = {
    start: {x: 0, y: 0},
    end: {x: 0, y: 1},
  };

  const horizontalGradient = {
    start: {x: 0, y: 0},
    end: {x: 1, y: 0},
  };
  const styles = getStyles({minHeight, height});

  return (
    <LinearGradient
      {...(vertical ? {...verticalGradient} : {...horizontalGradient})}
      colors={
        colors
          ? colors
          : primary
          ? [theme.colors.primary1, theme.colors.primary2]
          : [theme.colors.light1, theme.colors.light2]
      }
      style={[styles.backgroundStyle, backgroundStyle]}>
      {children}
    </LinearGradient>
  );
};

const getStyles = ({minHeight, height}) => {
  const styles = {
    backgroundStyle: {
      borderRadius: 10,
      margin: 0,
      height: height,
      marginBottom: 15,
    },
    componentStyle: {
      borderRadius: 10,
      backgroundColor: 'transparent',
      minHeight,
      height: height,
      ...getShadow(),
    },
  };
  return createStyles(styles);
};

export {GradientWrapper};
