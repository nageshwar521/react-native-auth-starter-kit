import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import Content from '../Content';
import Button from '../Button';
import {Box, Text} from 'react-native-design-utility';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getShadow} from '@src/utils/common';
import {useNavigation} from '@react-navigation/native';
import createStyles from '@src/utils/createStyles';
// import deviceSize from 'react-native-device-size';

const {width, height} = Dimensions.get('screen');

const ListItem = ({
  view = 'list',
  direction = 'initial',
  onPress,
  containerProps = {},
  imageUrl,
  imageProps = {},
  leftIcon,
  leftIconProps = {},
  rightIcon,
  rightIconProps = {},
  title,
  getTitle,
  description,
  titleStyle = {},
  descStyle = {},
  titleProps = {},
  titleContainerProps = {},
  descProps = {},
  descContainerProps = {},
  leftContainerProps = {},
  centerContainerProps = {},
  rightContainerProps = {},
  getDescription,
  shadow = true,
  showButton = false,
  buttonIcon,
  buttonProps = {},
  buttonIconProps = {},
  listImageStyle = {},
  listIconStyle = {},
  getLeftComponent,
  getRightComponent,
  getExtraData,
  contentWrapperProps = {},
}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const gridWidth = width / 2 - 40;
  const imageWidth = gridWidth / 2 - 20;
  const styles = getStyles({theme, view, shadow, imageWidth});
  // console.log(deviceSize, 'deviceSize');

  let flexDirection = 'row';
  if (view === 'list') {
    if (direction === 'reverse') {
      flexDirection = 'row-reverse';
    }
  } else if (view === 'grid') {
    if (direction === 'reverse') {
      flexDirection = 'column-reverse';
    } else {
      flexDirection = 'column';
    }
  }

  let leftComponent = '';
  if (imageUrl) {
    leftComponent = (
      <FastImage
        style={[styles.listImageStyle, listImageStyle]}
        height={50}
        width={50}
        resizeMode="contain"
        source={{uri: imageUrl}}
        {...imageProps}
      />
    );
  } else if (leftIcon) {
    leftComponent = (
      <Icon
        color={theme.colors.light2}
        size={view === 'grid' ? imageWidth / 2 : 24}
        name={leftIcon}
        {...leftIconProps}
      />
    );
  }
  // console.log(containerProps, 'containerProps');

  let rightComponent = '';
  if (rightIcon) {
    rightComponent = <Icon {...rightIconProps} name={rightIcon} />;
  } else if (showButton) {
    rightComponent = (
      <TouchableOpacity {...buttonProps}>
        <Icon
          name={buttonIcon}
          size={24}
          color={theme.colors.light2}
          {...buttonIconProps}
        />
      </TouchableOpacity>
    );
  }

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  const content = (
    <>
      <Box
        p={view === 'grid' ? 20 : 10}
        width={view === 'grid' ? gridWidth : 'auto'}
        height={view === 'grid' ? gridWidth : 'auto'}
        style={styles.container}
        bg={theme.colors.light1}
        flexDirection={flexDirection}
        alignItems="center"
        borderRadius={10}
        {...getShadow()}
        {...containerProps}>
        <Box flexDirection="row" alignItems="center" {...contentWrapperProps}>
          {leftComponent ? (
            <Box
              p={5}
              borderRadius={10}
              width={view === 'grid' ? imageWidth : 'auto'}
              height={view === 'grid' ? imageWidth : 'auto'}
              alignItems="center"
              justifyContent="center"
              bg={theme.colors.primary}
              {...leftContainerProps}>
              {leftComponent}
            </Box>
          ) : getLeftComponent ? (
            getLeftComponent()
          ) : null}
          <Box
            alignItems={view === 'grid' ? 'center' : 'start'}
            paddingHorizontal={view === 'grid' ? 5 : 10}
            paddingVertical={view === 'grid' ? 10 : 0}
            {...centerContainerProps}>
            {getTitle ? (
              getTitle()
            ) : title ? (
              <Text
                style={[styles.contentStyle, styles.titleStyle, titleStyle]}>
                {title}
              </Text>
            ) : null}
            {getDescription ? (
              getDescription()
            ) : description ? (
              <Text style={[styles.contentStyle, styles.descStyle, descStyle]}>
                {description}
              </Text>
            ) : null}
          </Box>
          {rightComponent ? (
            <Box {...rightContainerProps}>{rightComponent}</Box>
          ) : getRightComponent ? (
            getRightComponent()
          ) : null}
        </Box>
      </Box>
      {getExtraData ? getExtraData() : null}
    </>
  );

  return onPress ? (
    <TouchableOpacity onPress={handlePress}>{content}</TouchableOpacity>
  ) : (
    content
  );
};

const getStyles = ({theme, view, shadow, imageWidth}) => {
  const styles = {
    titleStyle: {
      color: theme.colors.dark3,
      fontSize: view === 'grid' ? 20 : 20,
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
    listImageStyle: {borderRadius: 10},
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

export default ListItem;
