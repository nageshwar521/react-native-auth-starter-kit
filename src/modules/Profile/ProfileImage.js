import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {useTheme, List, Divider, Badge} from 'react-native-paper';
import Container from '@src/components/Container';
import Button from '@src/components/Button';
import {getI18nMessage} from '@src/translations/messages';
import {
  backLabel,
  nextLabel,
  welcomeTitleLabel,
  welcomeSubTitleLabel,
  followLabel,
} from '@src/translations/keys';
import createStyles from '@src/utils/createStyles';
import Content from '@src/components/Content';
import {getShadow, hexToRGBA} from '@src/utils/common';
import {Box} from 'react-native-design-utility';
import {useNavigation} from '@react-navigation/native';
import MultiSelectList from '@src/components/MultiSelectList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DropdownInput} from '@src/components/Input';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';

const {width} = Dimensions.get('screen');

const ProfileImage = ({imageUrl, percent = 70, count = 10, color, onPress}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = getStyles({theme});

  const handleUploadPress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={styles.imageContainerStyle}
      onPress={handleUploadPress}>
      <Progress.Circle
        style={styles.progressStyle}
        color={color || theme.colors.primary}
        borderWidth={0}
        thickness={4}
        size={width / 4}
        progress={percent / 100}
        direction="counter-clockwise"
      />
      <Box style={styles.imageWrapperStyle}>
        {imageUrl ? (
          <FastImage
            style={styles.imageStyle}
            height={50}
            width={50}
            resizeMode="contain"
            source={{uri: imageUrl}}
            {...props}
          />
        ) : (
          <Icon name="image-outline" size={44} color={theme.colors.textDark} />
        )}
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          p={5}
          style={styles.imageIconStyle}>
          <Icon size={18} color={theme.colors.light2} name="camera-outline" />
        </Box>
      </Box>
      <Box position="absolute" top={20} right={10}>
        <Badge style={styles.badgeStyle} size={25}>
          {count}
        </Badge>
      </Box>
    </TouchableOpacity>
  );
};

const getStyles = ({theme}) => {
  const styles = {
    progressStyle: {
      position: 'absolute',
    },
    imageIconStyle: {
      backgroundColor: hexToRGBA('#000', 30),
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageStyle: {borderRadius: 40, position: 'absolute'},
    imageContainerStyle: {
      borderRadius: 40,
      width: width / 4,
      height: width / 4,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: 5,
    },
    imageWrapperStyle: {
      borderRadius: 40,
      width: 80,
      height: 80,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: 5,
      ...getShadow(),
    },
    badgeStyle: {
      fontWeight: '500',
      backgroundColor: theme.colors.primary,
      color: theme.colors.light2,
      fontFamily: 'Montserrat-SemiBold',
    },
  };
  return createStyles(styles);
};

export {ProfileImage};
