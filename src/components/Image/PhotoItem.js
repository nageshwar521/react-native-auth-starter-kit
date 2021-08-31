import React from 'react';
import {TouchableOpacity, useWindowDimensions} from 'react-native';
import {Box} from 'react-native-design-utility';
import createStyles from '@src/utils/createStyles';
import {Avatar, useTheme} from 'react-native-paper';
import {getI18nMessage} from '@src/translations/messages';
import {homeTitleLabel} from '@src/translations/keys';
import {generateId} from '@src/utils/common';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PhotoItem = ({
  imageUrl,
  imageProps = {},
  iconProps = {},
  controls = [],
  topLeftProps = {},
  topRightProps = {},
  bottomLeftProps = {},
  bottomRightProps = {},
  containerProps = {},
  containerStyle = {},
}) => {
  const theme = useTheme();
  const {width} = useWindowDimensions();
  const styles = getStyles({theme, width});

  return (
    <TouchableOpacity
      style={[styles.containerStyle, containerStyle]}
      {...containerProps}>
      {imageUrl ? (
        <FastImage
          source={{uri: imageUrl}}
          style={styles.imageStyle}
          {...imageProps}
        />
      ) : (
        <Icon size={24} icon="account" {...iconProps} />
      )}
      {controls.map(control => {
        if (control.position === 'top_left') {
          return (
            <Box
              key={generateId()}
              position="absolute"
              left={5}
              top={5}
              {...topLeftProps}>
              {control.component}
            </Box>
          );
        } else if (control.position === 'top_right') {
          return (
            <Box
              key={generateId()}
              position="absolute"
              right={5}
              top={5}
              {...topRightProps}>
              {control.component}
            </Box>
          );
        } else if (control.position === 'bottom_left') {
          return (
            <Box
              key={generateId()}
              position="absolute"
              bottom={5}
              left={5}
              {...bottomLeftProps}>
              {control.component}
            </Box>
          );
        }
        return (
          <Box
            key={generateId()}
            position="absolute"
            bottom={5}
            right={5}
            {...bottomRightProps}>
            {control.component}
          </Box>
        );
      })}
    </TouchableOpacity>
  );
};

const getStyles = ({theme, width}) => {
  const styles = {
    containerStyle: {
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: width / 4 - 15,
      height: width / 4 - 15,
    },
    lastItem: {
      marginRight: 'auto',
    },
    buttonTextStyle: {color: theme.colors.primary},
    titleStyle: {fontWeight: '500', fontSize: 18},
    imageStyle: {
      borderRadius: 10,
      width: width / 4 - 35,
      height: width / 4 - 35,
    },
  };
  return createStyles(styles);
};

export default PhotoItem;
