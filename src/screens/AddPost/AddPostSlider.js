import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppIntroSlider from 'react-native-app-intro-slider';
import createStyles from '@utils/createStyles';
import {Box} from 'react-native-design-utility';
import {Title, Paragraph, useTheme} from 'react-native-paper';
import {generateId, getShadow} from '@src/utils/common';
import Button from '@src/components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Content from '@src/components/Content';
import AddPostHeader from './AddPostHeader';
import {ButtonGroup} from '@src/components/ButtonGroup/ButtonGroup';
import CameraPicker from '@src/components/CameraPicker';
import PostDetailsForm from '@src/modules/Posts/PostDetailsForm';
import PostTitleForm from '@src/modules/Posts/PostTitleForm';
import PostReview from '@src/modules/Posts/PostReview';
import moment from 'moment';

const {width, height} = Dimensions.get('screen');

const data = [
  {
    title: 'Explore your situation with cheers camera...',
    name: 'camera',
  },
  {
    title: 'Share your situational intelligence to create a happy world...',
    name: 'desc',
  },
  {
    title: 'Add Title to your situational view or interest...',
    name: 'content',
  },
  {
    title: 'Looking good! Let’s post it now...',
    name: 'review',
  },
];

const CARD_HEIGHT = 340;

const AddPostSlider = () => {
  const sliderRef = useRef();
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = getStyles({theme});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageList, setImageList] = useState([]);

  const totalSlides = data.length;

  const postData = {
    id: generateId(),
    title: 'Photography by Design',
    description: 'Photography by Design',
    bgUrl: '',
    userUrl: '',
    username: 'Nageshwar',
    userdesc: moment().fromNow(),
    likes: 0,
    comments: 0,
    shares: 0,
    views: 0,
  };

  const gotoBunker = () => {
    navigation.navigate('Bunker');
  };

  const handlePrevPress = () => {
    if (currentSlide > 0) {
      sliderRef.current?.goToSlide(currentSlide - 1);
      setCurrentSlide(currentSlide - 1);
      // setImageList([]);
    }
  };

  const handleNextPress = () => {
    const currentItem = data[currentSlide];
    if (currentItem.name === 'review') {
      navigation.navigate('Bunker');
    } else {
      if (currentSlide < totalSlides) {
        sliderRef.current?.goToSlide(currentSlide + 1);
        setCurrentSlide(currentSlide + 1);
      } else {
        gotoBunker();
        setCurrentSlide(0);
      }
    }
  };

  const handleSlideChange = current => {
    setCurrentSlide(current);
  };

  const handleCapture = data => {
    setImageList([
      ...imageList,
      {id: generateId(), type: 'image', imageData: data},
    ]);
  };

  const handleRemovePress = item => {
    const newImages = imageList.filter(img => img.id !== item.id);
    setImageList(newImages);
  };

  const handleClose = () => {
    navigation.navigate('HomeNavigation');
  };

  const getContent = item => {
    if (item.name === 'camera') {
      return (
        <Box>
          <CameraPicker
            fullscreen={false}
            onCapture={handleCapture}
            imageList={imageList}
          />
        </Box>
      );
    } else if (item.name === 'desc') {
      return (
        <PostDetailsForm
          imageList={imageList}
          onCapture={handleCapture}
          onRemove={handleRemovePress}
        />
      );
    } else if (item.name === 'content') {
      return <PostTitleForm imageList={imageList} />;
    } else {
      return <PostReview postData={postData} />;
    }
  };

  const renderItem = ({item}) => {
    const isRightDisabled = currentSlide === 0 && imageList.length === 0;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.bgPrimary}}>
        <Box f={1} paddingTop={20}>
          <AddPostHeader
            currentStep={currentSlide + 1}
            totalSteps={totalSlides}
            onClosePress={handleClose}
          />
          <Content type="title" centerProps={{style: styles.titleStyle}}>
            {item.title}
          </Content>
          <Box>{getContent(item)}</Box>
        </Box>
        <Box paddingHorizontal={20}>
          <ButtonGroup
            showLeft={currentSlide > 0}
            secondaryProps={{onPress: handlePrevPress, label: 'BACK'}}
            primaryProps={{
              onPress: handleNextPress,
              label: currentSlide > 0 ? 'NEXT' : 'SUBMIT',
            }}
          />
        </Box>
      </SafeAreaView>
    );
  };

  const _keyExtractor = item => item.title;

  return (
    <AppIntroSlider
      ref={sliderRef}
      showDoneButton={false}
      showNextButton={false}
      showPrevButton={false}
      showSkipButton={false}
      keyExtractor={_keyExtractor}
      renderItem={renderItem}
      renderPagination={() => null}
      data={data}
      onSlideChange={handleSlideChange}
    />
  );
};

const getStyles = ({theme}) => {
  const styles = {
    titleStyle: {color: theme.colors.textDark, paddingHorizontal: 20},
    contentStyle: {},
  };

  return createStyles(styles);
};

export default AddPostSlider;
