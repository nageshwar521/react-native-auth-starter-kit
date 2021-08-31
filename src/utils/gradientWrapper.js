import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from 'react-native-paper';
import {getShadow} from './common';
import createStyles from './createStyles';

const gradientWrapper = MainComponent => {
  return ({
    style = {},
    vertical,
    backgroundStyle,
    minHeight = 40,
    primary,
    colors,
    ...props
  }) => {
    const theme = useTheme();

    const verticalGradient = {
      start: {x: 0, y: 0},
      end: {x: 0, y: 1},
    };

    const horizontalGradient = {
      start: {x: 0, y: 0},
      end: {x: 1, y: 0},
    };
    const styles = getStyles({minHeight});
    const compStyle = {...styles.componentStyle, ...style};

    // console.log(vertical, 'vertical');

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
        <MainComponent
          style={compStyle}
          {...props}
          vertical={vertical}
          minHeight={minHeight}
        />
      </LinearGradient>
    );
  };
};

const getStyles = ({minHeight}) => {
  const styles = {
    backgroundStyle: {
      borderRadius: 10,
      margin: 0,
      height: minHeight + 15,
      marginBottom: 15,
    },
    componentStyle: {
      borderRadius: 10,
      backgroundColor: 'transparent',
      minHeight,
      height: minHeight,
      ...getShadow(),
    },
  };
  return createStyles(styles);
};

export {gradientWrapper};
