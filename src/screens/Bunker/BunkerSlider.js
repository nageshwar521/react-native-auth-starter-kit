import React, {useRef, useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppBunkerSlider from 'react-native-app-intro-slider';
import createStyles from '@utils/createStyles';
import {Box, Text} from 'react-native-design-utility';
import {Title, Paragraph, useTheme} from 'react-native-paper';
import {getShadow} from '@src/utils/common';
import Button from '@src/components/Button';
import RoundedButton from '@src/components/Button/RoundedButton';
import FastImage from 'react-native-fast-image';
import PrimaryButton from '@src/components/Button/PrimaryButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import Container from '@src/components/Container';

const {width, height} = Dimensions.get('screen');

const sliderImageWidth = width - 200;
const sliderBoxWidth = width - 100;

const data = [
  {
    title: 'Welcome to Bunker',
    text: 'Private space to express feelings, activities, memories, thoughts, emotions and receive personalized advised, feedback, insights, entertainment, infotainment anonymously.',
    image: require('@assets/images/slide1.png'),
    bg: 'bgPrimary',
  },
];

const CARD_HEIGHT = 340;

const BunkerSlider = () => {
  const sliderRef = useRef();
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = getStyles({theme});
  const [nextSlide, setNextSlide] = useState(1);

  const gotoRegister = () => {
    navigation.navigate('Memories');
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
      <SafeAreaView style={{flex: 1}}>
        <Container>
          <Box
            f={1}
            padding={30}
            flexDirection="col"
            alignItems="center"
            justifyContent="center"
            bg={theme.colors.bgPrimary}>
            <Box
              bg={theme.colors.light1}
              borderRadius={20}
              padding={20}
              alignItems="center">
              <Box>
                <FastImage
                  resizeMode="contain"
                  source={item.image}
                  style={styles.image}
                />
              </Box>
              <Box justifyContent="center" marginTop={20}>
                <Text style={styles.title}>{item.title}</Text>
              </Box>
              <Box justifyContent="center">
                <Text style={styles.content}>{item.text}</Text>
              </Box>
            </Box>
            <Box
              f={1}
              marginVertical={20}
              flexDirection="col"
              alignItems="center"
              justifyContent="end">
              {nextSlide < data.length ? (
                <PrimaryButton
                  containerStyle={styles.btnContainerStyle}
                  backgroundStyle={styles.btnBackgroundStyle}
                  onPress={handleNextPress}>
                  <Text color={theme.colors.light2}>NEXT</Text>
                </PrimaryButton>
              ) : (
                <PrimaryButton
                  containerStyle={styles.btnContainerStyle}
                  backgroundStyle={styles.btnBackgroundStyle}
                  onPress={gotoRegister}>
                  <Text color={theme.colors.light2}>SUBMIT</Text>
                </PrimaryButton>
              )}
            </Box>
          </Box>
        </Container>
      </SafeAreaView>
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
      <AppBunkerSlider
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
      marginBottom: 20,
    },
    content: {
      fontSize: 18,
      color: theme.colors.dark1,
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
    btnContainerStyle: {
      flex: 0,
      width: 200,
    },
    btnBackgroundStyle: {
      flex: 0,
      width: 200,
    },
  };

  return createStyles(styles);
};

export {BunkerSlider};
