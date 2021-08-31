import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {Box, Text} from 'react-native-design-utility';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getShadow} from '@src/utils/common';
import {useNavigation} from '@react-navigation/native';
import createStyles from '@src/utils/createStyles';
import {GradientWrapper} from '@src/components/Gradient/GradientWrapper';
// import deviceSize from 'react-native-device-size';

const {width, height} = Dimensions.get('screen');

const ChatMessageItem = ({
  view = 'list',
  onPress,
  containerProps = {},
  userImage,
  leftIcon = 'image-outline',
  leftIconProps = {},
  text,
  textStyle = {},
  centerContainerProps = {},
  listImageStyle = {},
  listIconStyle = {},
  imagePosition = 'left',
  getExtraData,
  imageItems = [],
}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const gridWidth = width / 2 - 40;
  const imageWidth = gridWidth / 2 - 20;
  const styles = getStyles({theme, view, imageWidth});

  let leftComponent = (
    <Icon
      style={[styles.listIconStyle, listIconStyle]}
      size={24}
      name={leftIcon}
      {...leftIconProps}
    />
  );

  if (userImage) {
    leftComponent = (
      <FastImage
        style={[styles.listImageStyle, listImageStyle]}
        resizeMode="contain"
        source={{uri: userImage}}
      />
    );
  }

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  const getContent = () => {
    return (
      <Box
        paddingHorizontal={20}
        paddingVertical={10}
        borderRadius={15}
        bg={imagePosition === 'right' ? theme.colors.light2 : 'transparent'}
        {...centerContainerProps}>
        <Box>
          {text ? (
            <Text style={[styles.contentStyle, styles.descStyle, textStyle]}>
              {text}
            </Text>
          ) : null}
        </Box>
        {imageItems.map(imageItem => {
          return (
            <Box key={imageItem.uri}>
              <FastImage
                style={[styles.imageItemStyle, imageItemStyle]}
                height={100}
                resizeMode="contain"
                source={{uri: imageItem.uri}}
              />
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Box
        p={10}
        marginRight={imagePosition === 'left' ? 50 : 0}
        marginLeft={imagePosition === 'right' ? 50 : 0}
        style={styles.container}
        alignItems="center"
        {...containerProps}>
        {imagePosition === 'left' ? (
          <Box
            zIndex={1000}
            p={5}
            bg={theme.colors.bgPrimary}
            position="absolute"
            top={0}
            left={10}
            borderRadius={10}
            alignItems="center"
            justifyContent="center">
            {leftComponent}
          </Box>
        ) : null}
        {imagePosition === 'left' ? (
          <GradientWrapper minHeight={0} height="auto">
            {getContent()}
          </GradientWrapper>
        ) : (
          getContent()
        )}
        {imagePosition === 'right' ? (
          <Box
            p={5}
            bg={theme.colors.light2}
            position="absolute"
            top={0}
            right={10}
            borderRadius={10}
            alignItems="center"
            justifyContent="center">
            {leftComponent}
          </Box>
        ) : null}
      </Box>
      {getExtraData ? getExtraData() : null}
    </TouchableOpacity>
  );
};

const getStyles = ({theme}) => {
  const styles = {
    container: {
      borderRadius: 10,
      paddingHorizontal: 20,
      ...getShadow(),
    },
    titleStyle: {
      color: theme.colors.dark3,
      fontSize: 20,
      fontWeight: '500',
    },
    descStyle: {
      color: theme.colors.dark3,
    },
    listItemContainerStyle: {
      backgroundColor: theme.colors.primary,
    },
    listItemStyle: {
      borderRadius: 10,
    },
    listImageStyle: {borderRadius: 10, height: 30, width: 30, ...getShadow()},
    listIconStyle: {
      color: theme.colors.light2,
    },
    selectedListItemContainerStyle: {
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    rightIconStyle: {
      margin: 0,
      top: -3,
      color: theme.colors.light2,
    },
    buttonStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      color: theme.colors.primary,
    },
    buttonContainerStyle: {
      margin: 8,
      width: 80,
      height: 40,
    },
  };
  return createStyles(styles);
};

export default ChatMessageItem;
