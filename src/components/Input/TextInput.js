import React from 'react';
import {View} from 'react-native';
import {TextInput as TextInputField, useTheme} from 'react-native-paper';
import createStyles from '@src/utils/createStyles';
import {getShadow} from '@src/utils/common';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {Box} from 'react-native-design-utility';

const TextInput = ({
  onChange,
  mode = 'outlined',
  style = {},
  size = 'small',
  autoCapitalize = 'none',
  gradient = true,
  vertical = true,
  label = '',
  placeholder,
  underlineColor = 'transparent',
  outlineColor = 'transparent',
  autoCorrect = false,
  height = 40,
  backgroundProps = {},
  inputProps = {},
}) => {
  const theme = useTheme();
  const currentTheme = useSelector(state => state.common.currentTheme);
  const primary = currentTheme === 'dark';
  const styles = getStyles({theme, primary, height});

  const handleChange = val => {
    if (onChange) {
      onChange(val);
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
    <Box {...getShadow()}>
      <LinearGradient
        {...verticalGradient}
        colors={
          primary
            ? [theme.colors.dark1, theme.colors.dark2]
            : [theme.colors.light1, theme.colors.light2]
        }
        style={[styles.backgroundStyle]}
        {...backgroundProps}>
        <TextInputField
          onChangeText={handleChange}
          style={[styles.textInputStyle, style]}
          dense={size === 'small'}
          mode={mode}
          autoCorrect={autoCorrect}
          autoCapitalize={autoCapitalize}
          placeholder={placeholder || `Enter ${label}`}
          outlineColor="transparent"
          underlineColor="transparent"
          theme={{colors: {primary: 'transparent'}}}
          placeholderTextColor={
            primary ? theme.colors.border : theme.colors.border
          }
          {...inputProps}
        />
      </LinearGradient>
    </Box>
  );
};

const getStyles = ({theme, height}) => {
  const styles = {
    textInputStyle: {
      backgroundColor: 'transparent',
      borderRadius: 10,
      height: height,
      justifyContent: 'center',
      color: theme.colors.textDark,
    },
    backgroundStyle: {
      borderRadius: 10,
      marginBottom: 15,
      height: height + 15,
    },
  };
  return createStyles(styles);
};

export default TextInput;
