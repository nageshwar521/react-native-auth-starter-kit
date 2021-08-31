import Content from '@src/components/Content';
import createStyles from '@src/utils/createStyles';
import React, {useRef, useState} from 'react';
import {ScrollView, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import {Box} from 'react-native-design-utility';
import FastImage from 'react-native-fast-image';
import {IconButton, Portal, Text, useTheme} from 'react-native-paper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {TextInput} from '@src/components/Input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getShadow} from '@src/utils/common';

const {width} = Dimensions.get('screen');

const PostTitleForm = ({imageList = [], onRemove}) => {
  const theme = useTheme();
  const imageListRef = useRef(null);
  const styles = getStyles({width, theme});

  const handleImageRemove = imageData => {
    if (onRemove) {
      onRemove(imageData);
    }
  };

  const handleCameraPress = () => {
    setIsCameraOpen(true);
  };

  const renderImageItem = ({item}) => {
    return (
      <Box key={`${JSON.stringify(item)}`} paddingTop={15} paddingBottom={20}>
        {item.type === 'image' ? (
          <>
            <FastImage
              style={styles.cameraImageStyle}
              source={{uri: item.imageData.uri}}
              resizeMode="cover"
            />
            <Box position="absolute" top={0} right={5}>
              <TouchableOpacity
                style={styles.removeImageButtonStyle}
                onPress={handleImageRemove.bind(null, item)}>
                <Icon name="minus" size={18} color={theme.colors.light2} />
              </TouchableOpacity>
            </Box>
          </>
        ) : (
          <TouchableOpacity
            onPress={handleCameraPress}
            style={styles.cameraButtonStyle}>
            <SimpleLineIcons
              name="camera"
              size={64}
              color={theme.colors.border}
              style={styles.cameraIconStyle}
            />
          </TouchableOpacity>
        )}
      </Box>
    );
  };

  const handleScroll = () => {
    if (imageListRef.current && imageList.length > 0) {
      imageListRef.current.scrollToEnd({animated: true});
    }
  };

  return (
    <Box>
      <Box paddingHorizontal={15}>
        <ScrollView ref={imageListRef} horizontal>
          {imageList.map(item => {
            return renderImageItem({item});
          })}
        </ScrollView>
      </Box>
      <Box marginBottom={20} paddingHorizontal={20}>
        <Text style={styles.contentStyle}>
          But I must explain to you how all this mistaken idea of denouncing
          pleasure and praising pain was born and I will give you a complete
          account of the system, and expound the actual teachings of the great
          explorer of the truth
        </Text>
      </Box>
      <Box paddingHorizontal={20}>
        <TextInput
          gradient
          placeholder="Add Title Here"
          style={styles.textInput}
          vertical
        />
      </Box>
    </Box>
  );
};

const getStyles = ({theme, width}) => {
  const itemWidth = width / 3;
  const itemHeight = width / 3;
  const styles = {
    imageListStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 15,
    },
    cameraImageStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      height: itemHeight,
      width: itemWidth,
      backgroundColor: theme.colors.bgSecondary,
      borderRadius: 15,
      marginRight: 15,
    },
    cameraButtonStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      height: itemHeight,
      width: itemWidth,
      backgroundColor: theme.colors.bgSecondary,
      borderRadius: 15,
    },
    cameraIconStyle: {},
    removeImageButtonStyle: {
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      padding: 5,
    },
    textInput: {
      fontSize: 18,
      fontFamily: 'Montserrat-SemiBold',
      ...getShadow({size: 0}),
    },
    contentStyle: {
      color: theme.colors.textDark,
    },
  };
  return createStyles(styles);
};

export default PostTitleForm;
