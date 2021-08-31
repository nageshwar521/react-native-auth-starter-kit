import {getShadow} from '@src/utils/common';
import createStyles from '@src/utils/createStyles';
import {gradientWrapper} from '@src/utils/gradientWrapper';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Box} from 'react-native-design-utility';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';

const Thumbnail = ({
  boxProps = {},
  imageUrl,
  buttonProps = {},
  gradient = true,
  vertical = true,
  colors,
  backgroundStyle = {},
}) => {
  const [uploadedImg, setUploadedImg] = useState('');
  const {width = 150, height = 150, ...otherBoxProps} = boxProps;
  const theme = useTheme();
  const styles = getStyles({theme});
  const currentTheme = useSelector(state => state.common.currentTheme);
  const primary = currentTheme === 'dark';
  const handleChange = () => {
    if (onChange) {
      onChange(uploadedImg);
    }
  };
  const handlePress = () => {
    // console.log('handlePress');
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
    <TouchableOpacity onPress={handlePress} {...buttonProps}>
      <LinearGradient
        {...(vertical ? {...verticalGradient} : {...horizontalGradient})}
        colors={
          primary
            ? [theme.colors.dark1, theme.colors.dark2]
            : [theme.colors.light1, theme.colors.light2]
        }
        style={[styles.backgroundStyle, backgroundStyle]}>
        <Box
          width={width}
          height={height}
          alignItems="center"
          justifyContent="center"
          {...otherBoxProps}>
          {imageUrl ? (
            <FastImage resizeMode="contain" source={{uri: imageUrl}} />
          ) : (
            <Icon name="camera-outline" size={42} />
          )}
        </Box>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const getStyles = () => {
  const styles = {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      ...getShadow(),
    },
    backgroundStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      marginBottom: 15,
    },
  };
  return createStyles(styles);
};

export default Thumbnail;
