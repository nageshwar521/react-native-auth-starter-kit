import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Box} from 'react-native-design-utility';
import {IconButton, useTheme} from 'react-native-paper';
import Button from '@src/components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import createStyles from '@src/utils/createStyles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {hexToRGBA} from '@src/utils/common';

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const getCameraHeight = ({fullscreen = true, extraHeight = 0}) => {
  const {height, width} = Dimensions.get('screen');
  let cameraHeight = width;
  if (fullscreen) {
    cameraHeight = height - extraHeight;
  }
  return cameraHeight;
};

const CameraPicker = ({
  imageList,
  onCapture,
  fullscreen = true,
  onClose,
  ratio = '1:1',
  cameraHeight,
  cameraWidth,
}) => {
  const {top, bottom} = useSafeAreaInsets();
  const {height, width} = Dimensions.get('screen');
  const customCameraHeight =
    cameraHeight || getCameraHeight({fullscreen, extraHeight: top + bottom});
  const customCameraWidth = cameraWidth || width;
  const theme = useTheme();
  const cameraRef = useRef(null);
  const [cameraType, setCameraType] = useState('back');
  const [cameraFlash, setCameraFlash] = useState('off');
  const [cameraZoom, setCameraZoom] = useState(0);
  const [cameraAutoFocus, setCameraAutoFocus] = useState(0);
  const styles = getStyles({
    theme,
    top,
    bottom,
    fullscreen,
    height,
    cameraHeight: customCameraHeight,
  });

  const toggleFacing = () => {
    setCameraType(cameraType === 'back' ? 'front' : 'back');
  };

  const toggleFlash = () => {
    setCameraFlash(flashModeOrder[cameraFlash]);
  };

  const toggleFocus = () => {
    setCameraAutoFocus(cameraAutoFocus === 'on' ? 'off' : 'on');
  };

  const zoomOut = () => {
    setCameraZoom(cameraZoom - 0.1 < 0 ? 0 : cameraZoom - 0.1);
  };

  const zoomIn = () => {
    setCameraZoom(cameraZoom + 0.1 > 1 ? 1 : cameraZoom + 0.1);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync();
      if (onCapture) {
        onCapture(data);
      }
    }
  };

  const renderImage = () => {
    return (
      <FastImage
        source={{uri: imageList[0].imageData.uri}}
        style={{
          height: customCameraHeight,
          width: customCameraHeight,
        }}
        resizeMode="cover"
      />
    );
  };

  const renderCamera = () => {
    return (
      <RNCamera
        ref={cameraRef}
        style={[styles.cameraStyle, fullscreen ? styles.cameraFullStyle : null]}
        type={cameraType}
        flashMode={cameraFlash}
        autoFocus={'on'}
        zoom={cameraZoom}
        ratio={ratio}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        <Box
          height={
            Platform.OS === 'android'
              ? fullscreen
                ? customCameraHeight - 80
                : customCameraHeight
              : customCameraHeight
          }
          width={fullscreen ? customCameraWidth : customCameraHeight}
          alignItems="center">
          <Box position="absolute" top={0} left={0} m={10}>
            <TouchableOpacity
              style={styles.cameraButtonStyle}
              onPress={toggleFlash}>
              <Icon
                name={cameraFlash === 'on' ? 'flash-off' : 'flash'}
                color={theme.colors.light2}
                size={18}
              />
            </TouchableOpacity>
          </Box>
          <Box position="absolute" top={0} right={0} m={10}>
            <TouchableOpacity
              style={styles.cameraButtonStyle}
              onPress={handleClose}>
              <Icon name="close" color={theme.colors.light2} size={18} />
            </TouchableOpacity>
          </Box>
          <Box position="absolute" bottom={15} right={0} m={10}>
            <TouchableOpacity
              style={styles.cameraButtonStyle}
              onPress={toggleFacing}>
              <Icon name="repeat" color={theme.colors.light2} size={18} />
            </TouchableOpacity>
          </Box>
          <Box f={1} />
          <Box flexDirection="row" justifyContent="center" marginBottom={20}>
            <Button
              position="full"
              rounded
              gradient
              backgroundStyle={styles.captureBackgroundStyle}
              onPress={takePicture}>
              <Ionicons
                name="ios-camera"
                color={theme.colors.light2}
                size={32}
              />
            </Button>
          </Box>
        </Box>
      </RNCamera>
    );
  };
  return (
    <View style={styles.container}>
      {!fullscreen && imageList.length > 0 ? renderImage() : renderCamera()}
    </View>
  );
};

const getStyles = ({theme, top, bottom, cameraHeight}) => {
  const styles = {
    container: {
      flex: 1,
      alignItems: 'center',
    },
    cameraStyle: {
      flex: 1,
      justifyContent: 'space-between',
      height: cameraHeight,
      position: 'absolute',
    },
    cameraFullStyle: {
      top,
      bottom,
      height: cameraHeight,
    },
    cameraButtonStyle: {
      padding: 15,
      borderRadius: 30,
      backgroundColor: hexToRGBA(theme.colors.dark3, 40),
    },
    captureBackgroundStyle: {
      padding: 15,
      borderRadius: 30,
    },
  };
  return createStyles(styles);
};

export default CameraPicker;
