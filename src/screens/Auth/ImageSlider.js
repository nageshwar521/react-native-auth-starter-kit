import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppIntroSlider from 'react-native-app-intro-slider';
import createStyles from '@utils/createStyles';
import {Box} from 'react-native-design-utility';
import {Title, Paragraph, useTheme, Portal} from 'react-native-paper';
import {generateId, getShadow, hexToRGBA} from '@src/utils/common';
import {SafeAreaView} from 'react-native-safe-area-context';
import CameraPicker from '@src/components/CameraPicker';
import RoundedButton from '@src/components/Button/RoundedButton';
import FastImage from 'react-native-fast-image';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import deviceSize from 'react-native-device-size';

const {width, height} = Dimensions.get('screen');

const data = [
  {
    id: generateId(),
    image: require('@assets/images/preview1.jpeg'),
  },
  {
    id: generateId(),
    image: require('@assets/images/preview2.jpeg'),
  },
  {
    id: generateId(),
    image: require('@assets/images/preview3.jpeg'),
  },
  {
    id: generateId(),
    image: require('@assets/images/preview4.jpeg'),
  },
  {
    id: generateId(),
    image: require('@assets/images/preview5.jpeg'),
  },
];

const sliderWidth = width / 3;
const containerHeight = height / 2;

const ImageSlider = ({onClose}) => {
  const scrollViewRef = useRef();
  const theme = useTheme();
  const navigation = useNavigation();
  const [scrollWidth, setScrollWidth] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [imageList, setImageList] = useState(data);
  const styles = getStyles({theme});

  const totalSlides = data.length;

  const gotoBunker = () => {
    navigation.navigate('Bunker');
  };

  const handlePrevPress = () => {
    if (currentSlide > 0) {
      scrollViewRef.current?.goToSlide(currentSlide - 1);
      setCurrentSlide(currentSlide - 1);
      // setImageList([]);
    }
  };

  const handleNextPress = () => {
    if (currentSlide < totalSlides) {
      scrollViewRef.current?.goToSlide(currentSlide + 1);
      setCurrentSlide(currentSlide + 1);
    } else {
      gotoBunker();
      setCurrentSlide(0);
    }
  };

  const handleSlideChange = current => {
    setCurrentSlide(current);
  };

  const handleCapture = data => {
    setImageList([...imageList, {id: generateId(), image: data.uri}]);
  };

  const handleRemovePress = item => {
    const newImages = imageList.filter(img => img.id !== item.id);
    setImageList(newImages);
  };

  const handleClose = () => {
    // navigation.navigate('Profile');
    if (onClose) onClose();
  };

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
  };

  const handleImagePress = () => {};

  const renderItem = ({item}) => {
    const currentItem = data[currentSlide];
    return (
      <SafeAreaView style={styles.slideContainer} key={item.image}>
        <TouchableOpacity onPress={handleImagePress}>
          <FastImage
            source={item.image}
            style={[
              styles.image,
              currentItem.id === item.id ? styles.currentImage : null,
            ]}
          />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  const handleSwipeLeft = state => {
    console.log('handleSwipeLeft');
    console.log(scrollViewRef.current);
    // scrollViewRef.current?.scrollTo();
  };

  const handleSwipeRight = state => {
    console.log('handleSwipeRight');
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <Box
      f={1}
      flexDirection="col"
      backgroundColor={hexToRGBA(theme.colors.dark1, 40)}
      alignItems="center"
      justifyContent="center">
      <Box height={containerHeight} alignItems="center" justifyContent="center">
        <Box alignItems="center" justifyContent="center">
          <Box m={10}>
            <TouchableOpacity
              style={styles.cameraButtonStyle}
              onPress={handleClose}>
              <Icon name="close" color={theme.colors.light2} size={32} />
            </TouchableOpacity>
          </Box>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            contentContainerStyle={{
              flex: 1,
              alignItems: 'center',
              paddingLeft: width / 2 - sliderWidth / 2,
              paddingRight: width / 2 - sliderWidth / 2,
            }}>
            {imageList.map(imageItem => {
              return renderItem({item: imageItem});
            })}
          </ScrollView>
          <Box flexGrow={1} />
          <RoundedButton
            size={deviceSize === 'normal' ? 50 : 80}
            onPress={handleOpenCamera}>
            <Icon
              name="camera-outline"
              color="rgba(255, 255, 255, .9)"
              size={deviceSize === 'normal' ? 22 : 32}
            />
          </RoundedButton>
        </Box>
      </Box>
      {isCameraOpen ? (
        <Portal>
          <CameraPicker
            imageList={imageList}
            onCapture={handleCapture}
            onClose={handleCloseCamera}
          />
        </Portal>
      ) : null}
    </Box>
  );
};

const getStyles = ({theme}) => {
  const styles = {
    slideContainer: {
      width: sliderWidth,
      height: sliderWidth,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleStyle: {color: theme.colors.textDark},
    contentStyle: {},
    cameraButtonStyle: {
      padding: 15,
    },
    image: {
      height: 70,
      width: 70,
      borderRadius: 100,
    },
    currentImage: {
      height: 200,
      width: 200,
    },
  };

  return createStyles(styles);
};

export default ImageSlider;
