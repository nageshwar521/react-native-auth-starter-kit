import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppIntroSlider from 'react-native-app-intro-slider';
import createStyles from '@utils/createStyles';
import {Box} from 'react-native-design-utility';
import {Title, Paragraph, useTheme} from 'react-native-paper';
import {getShadow} from '@src/utils/common';
import Button from '@src/components/Button';
import RoundedButton from '@src/components/Button/RoundedButton';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('screen');

const sliderImageWidth = width - 200;
const sliderBoxWidth = width - 100;

const data = [
  {
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('@assets/images/slide1.png'),
    bg: 'bgPrimary',
  },
  {
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('@assets/images/slide2.png'),
    bg: 'bgPrimary',
  },
  {
    title: 'Rocket guy',
    text: "I'm already out of descriptions",
    image: require('@assets/images/slide3.png'),
    bg: 'bgPrimary',
  },
];

const CARD_HEIGHT = 340;

const IntroSlider = () => {
  const sliderRef = useRef();
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = getStyles({theme});
  const [nextSlide, setNextSlide] = useState(1);

  const gotoRegister = () => {
    navigation.navigate('Register');
  };

  const handleNextPress = () => {
    const currentNextSlide =
      nextSlide >= data.length - 1 ? data.length - 1 : nextSlide;
    if (currentNextSlide <= data.length - 1) {
      sliderRef.current?.goToSlide(currentNextSlide);
      setNextSlide(currentNextSlide + 1);
    }
  };

  const handleStepPress = i => {
    const currentNextSlide = i === 0 ? 1 : i + 1;
    sliderRef.current?.goToSlide(i, true);
    setNextSlide(currentNextSlide);
  };

  const _renderItem = ({item}) => {
    return (
      <Box
        f={1}
        padding={50}
        flexDirection="col"
        alignItems="center"
        justifyContent="center"
        bg={theme.colors.bgPrimary}>
        <Box>
          <FastImage
            resizeMode="contain"
            source={item.image}
            style={styles.image}
          />
        </Box>
        <Box flexGrow={1} />
        <Box
          f={1}
          bg={theme.colors.light1}
          borderRadius={20}
          padding={10}
          width={sliderBoxWidth}
          alignItems="center">
          <Box f={1} justifyContent="center">
            <Text style={styles.title}>{item.title}</Text>
          </Box>
          <Box f={1} justifyContent="center">
            <Text style={styles.content}>{item.text}</Text>
          </Box>
          <Box f={1}>
            {nextSlide < data.length ? (
              <RoundedButton size={60} onPress={handleNextPress}>
                <Icon
                  name="ios-arrow-forward-outline"
                  color="rgba(255, 255, 255, .9)"
                  size={32}
                />
              </RoundedButton>
            ) : (
              <RoundedButton size={60} onPress={gotoRegister}>
                <Icon
                  name="ios-arrow-forward-outline"
                  color="rgba(255, 255, 255, .9)"
                  size={32}
                />
              </RoundedButton>
            )}
          </Box>
        </Box>
      </Box>
    );
  };

  const _keyExtractor = item => item.title;

  const _renderPagination = activeIndex => {
    return (
      <View style={styles.paginationContainer}>
        <SafeAreaView>
          <View style={styles.paginationDots}>
            {data.length > 1 &&
              data.map((_, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.dot,
                    i === activeIndex
                      ? {backgroundColor: theme.colors.primary}
                      : {backgroundColor: 'rgba(0, 0, 0, .2)'},
                  ]}
                  onPress={handleStepPress.bind(null, i)}
                />
              ))}
          </View>
        </SafeAreaView>
      </View>
    );
  };

  return (
    <Box f={1}>
      <StatusBar translucent backgroundColor="transparent" />
      <AppIntroSlider
        ref={sliderRef}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
        renderPagination={() => null}
        data={data}
      />
    </Box>
  );
};

const getStyles = ({theme}) => {
  const styles = {
    image: {
      width: sliderImageWidth,
      height: sliderImageWidth,
    },
    text: {
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
    },
    title: {
      fontSize: 28,
      color: theme.colors.dark1,
      fontWeight: 'bold',
    },
    content: {
      fontSize: 20,
      color: theme.colors.dark2,
      textAlign: 'center',
    },
    cardStyle: {
      width: sliderBoxWidth,
      height: sliderBoxWidth,
      backgroundColor: theme.colors.light1,
      borderRadius: 20,
      paddingVertical: 40,
      paddingHorizontal: 20,
      alignItems: 'center',
      ...getShadow(),
    },
    paginationContainer: {
      // position: 'absolute',
      // bottom: CARD_HEIGHT + 100,
      // left: 16,
      // right: 16,
    },
    paginationDots: {
      height: 16,
      margin: 16,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 4,
    },
  };

  return createStyles(styles);
};

export {IntroSlider};
