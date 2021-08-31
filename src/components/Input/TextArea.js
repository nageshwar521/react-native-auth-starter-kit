import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {
  IconButton,
  TextInput as TextInputField,
  useTheme,
} from 'react-native-paper';
import createStyles from '@src/utils/createStyles';
import LinearGradient from 'react-native-linear-gradient';
import {getShadow} from '@src/utils/common';
import {Box} from 'react-native-design-utility';
import Content from '../Content';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

const TextArea = ({
  onChange,
  mode = 'outlined',
  style = {},
  backgroundStyle = {},
  size = 'small',
  autoCapitalize = 'none',
  gradient = false,
  vertical = false,
  label = '',
  placeholder,
  underlineColor = 'transparent',
  outlineColor = 'transparent',
  autoCorrect = false,
  numberOfLines = 8,
  colors,
  showWordCount = true,
  showVolumeButton = true,
  ...props
}) => {
  const theme = useTheme();
  const minHeight = numberOfLines * 5;
  const styles = getStyles({minHeight, theme});
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

  const handleChange = val => {
    if (onChange) {
      onChange(val);
    }
  };

  return (
    <Box {...getShadow()}>
      <LinearGradient
        {...(vertical ? {...verticalGradient} : {...horizontalGradient})}
        colors={
          colors
            ? colors
            : primary
            ? [theme.colors.dark1, theme.colors.dark3]
            : [theme.colors.light1, theme.colors.light2]
        }
        style={[styles.backgroundStyle, backgroundStyle]}>
        <TextInputField
          onChangeText={handleChange}
          style={[styles.textInput, style]}
          dense={size === 'small'}
          mode={mode}
          autoCorrect={autoCorrect}
          autoCapitalize={autoCapitalize}
          placeholder={placeholder || `Enter ${label}`}
          outlineColor="transparent"
          underlineColor="transparent"
          theme={{colors: {primary: 'transparent'}}}
          placeholderTextColor={theme.colors.border}
          multiline
          numberOfLines={numberOfLines}
          textAlignVertical="top"
          {...props}
        />
        {showWordCount || showVolumeButton ? (
          <Box
            flexDirection="row"
            justifyContent="end"
            position="absolute"
            right={0}
            bottom={0}>
            {showWordCount ? (
              <Box alignItems="center" justifyContent="center">
                <Content centerProps={{style: styles.textLimitStyle}}>
                  200/200
                </Content>
              </Box>
            ) : null}
            {showVolumeButton ? (
              <TouchableOpacity style={styles.volumeButtonStyle}>
                <Icon
                  size={24}
                  name="volume-medium"
                  style={styles.volumeButtonTextStyle}
                />
              </TouchableOpacity>
            ) : null}
          </Box>
        ) : null}
      </LinearGradient>
    </Box>
  );
};

const getStyles = ({minHeight, theme}) => {
  const styles = {
    backgroundStyle: {
      marginBottom: 15,
      minHeight: minHeight * 5 + 5,
      height: minHeight * 5 + 5,
      borderRadius: 15,
      ...getShadow(),
    },
    textInput: {
      backgroundColor: 'transparent',
      height: '100%',
    },
    textLimitStyle: {
      marginRight: 5,
      color: theme.colors.border,
    },
    volumeButtonStyle: {
      backgroundColor: theme.colors.border,
      justifyContent: 'center',
      borderTopLeftRadius: 10,
      paddingHorizontal: 5,
      paddingVertical: 6,
    },
    volumeButtonTextStyle: {
      color: theme.colors.textDark,
    },
  };
  return createStyles(styles);
};

export default TextArea;
