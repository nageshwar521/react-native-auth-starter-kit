import CameraPicker from '@src/components/CameraPicker';
import Content from '@src/components/Content';
import TextArea from '@src/components/Input/TextArea';
import {generateId, getShadow} from '@src/utils/common';
import createStyles from '@src/utils/createStyles';
import React, {useRef, useState} from 'react';
import {ScrollView, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import {Box} from 'react-native-design-utility';
import FastImage from 'react-native-fast-image';
import {IconButton, Portal, useTheme} from 'react-native-paper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SearchBar} from '@src/components/Search/SearchBar';

const {width} = Dimensions.get('screen');

const PostDetailsForm = ({imageList = [], onCapture, onRemove}) => {
  const theme = useTheme();
  const imageListRef = useRef(null);
  const styles = getStyles({width, theme});
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [desc, setDesc] = useState('');

  const handleImageRemove = imageData => {
    if (onRemove) {
      onRemove(imageData);
    }
  };

  const handleDescChange = text => {
    setDesc(text);
  };

  const handleCameraPress = () => {
    setIsCameraOpen(true);
  };

  const handleCapture = data => {
    setIsCameraOpen(false);
    if (onCapture) {
      onCapture(data);
      handleScroll();
    }
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
      {isCameraOpen ? (
        <Portal>
          <CameraPicker
            imageList={imageList}
            onCapture={handleCapture}
            onClose={() => setIsCameraOpen(false)}
          />
        </Portal>
      ) : null}
      <Box paddingHorizontal={20}>
        <ScrollView ref={imageListRef} horizontal>
          {[...imageList, {id: generateId(), type: 'button'}].map(item => {
            return renderImageItem({item});
          })}
        </ScrollView>
      </Box>
      <Box paddingHorizontal={20}>
        <TextArea
          gradient
          vertical
          value={desc}
          onChange={handleDescChange}
          placeholder="Write a description for your post or you can record one..."
        />
      </Box>
      <Box
        width={width}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        marginBottom={15}>
        <Content centerProps={{style: styles.orTextStyle}}>Or</Content>
      </Box>
      <SearchBar
        placeholder="Record your thoughts..."
        searchBarProps={{
          icon: 'microphone-outline',
        }}
      />
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
    orTextStyle: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    recordButtonStyle: {
      padding: 10,
      backgroundColor: theme.colors.primary,
      ...getShadow(),
    },
    recordButtonTextStyle: {
      color: theme.colors.light2,
    },
  };
  return createStyles(styles);
};

export default PostDetailsForm;
