import React, {useEffect, useRef, useState} from 'react';
import createStyles from '@src/utils/createStyles';
import {StyleSheet, TouchableOpacity, Dimensions, Platform} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import {ProgressBar, useTheme, IconButton, FAB} from 'react-native-paper';
import {generateId, hexToRGBA} from '@src/utils/common';
import RNFetchBlob from 'rn-fetch-blob';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import RecordInput from '@src/components/Input/RecordInput';
import TextArea from '@src/components/Input/TextArea';
import {AudioPlayer} from '@src/components/Player/AudioPlayer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {fs} = RNFetchBlob;

const buttonBgColor = hexToRGBA('#558B2F', 40);

const {width, height} = Dimensions.get('screen');

const AddBunker = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = getStyles({width, theme});
  const [currentScreen, setCurrentScreen] = useState('intro');
  const [bunkerText, setBunkerText] = useState('');
  const [feelingText, setFeelingText] = useState('');

  const handleClose = () => {
    navigation.navigate('HomeNavigation');
  };

  const handleKeyboardPress = () => {
    setCurrentScreen('bunkerText');
  };

  const handleStartRecordPress = () => {
    setCurrentScreen('recordAudio');
  };

  const handleStopRecordPress = () => {
    setCurrentScreen('showRecord');
  };

  const handleDeleteRecordPress = () => {
    setCurrentScreen('recordAudio');
  };

  const handleBunkerTextChange = text => {
    setBunkerText(text);
  };

  const handleFeelingTextChange = text => {
    setFeelingText(text);
  };

  const handleBunkerTextSubmitPress = () => {
    console.log('handleBunkerTextSubmitPress');
    setCurrentScreen('feelingText');
  };

  const handleSkipPress = () => {
    console.log('handleFeelingTextSubmitPress');
    navigation.navigate('CheersRoom');
  };

  const handleFeelingTextSubmitPress = () => {
    console.log('handleFeelingTextSubmitPress');
  };

  const getScreenTitle = (text = "Sup?! What's going on?") => {
    return (
      <Box
        marginHorizontal={40}
        marginTop={20}
        padding={15}
        borderRadius={15}
        bg={currentScreen !== 'bunkerText' ? buttonBgColor : null}
        alignItems="center"
        justifyContent="center">
        <Text
          fontSize={currentScreen !== 'bunkerText' ? 18 : 22}
          color={theme.colors.light2}
          fontWeight="500"
          fontFamily="Porcelain">
          {text}
        </Text>
      </Box>
    );
  };

  const getIntroScreen = () => {
    return (
      <>
        <Box f={1} justifyContent="center">
          {getScreenTitle()}
        </Box>
        <Box alignItems="center" mb={10}>
          <TouchableOpacity onPress={handleStartRecordPress}>
            <Box
              alignItems="center"
              justifyContent="center"
              backgroundColor={buttonBgColor}
              height={70}
              width={70}
              borderRadius={70}>
              <Icon name="microphone" size={42} color={theme.colors.light2} />
            </Box>
          </TouchableOpacity>
        </Box>
        <Box alignItems="center">
          <TouchableOpacity onPress={handleKeyboardPress}>
            <Box
              alignItems="center"
              justifyContent="center"
              backgroundColor={buttonBgColor}
              height={50}
              width={50}
              borderRadius={50}>
              <Icon name="keyboard" size={32} color={theme.colors.light2} />
            </Box>
          </TouchableOpacity>
        </Box>
      </>
    );
  };

  const getRecordScreen = () => {
    return (
      <>
        <Box f={1} justifyContent="center">
          {getScreenTitle()}
          <Box marginHorizontal={5}>
            <RecordInput />
          </Box>
        </Box>
        <Box alignItems="center">
          <TouchableOpacity onPress={handleStopRecordPress}>
            <Box
              alignItems="center"
              justifyContent="center"
              bg={buttonBgColor}
              height={80}
              width={80}
              borderRadius={80}>
              <Box bg="#D84315" height={30} width={30} borderRadius={30} />
            </Box>
          </TouchableOpacity>
        </Box>
      </>
    );
  };

  const displayRecordScreen = () => {
    return (
      <>
        <Box f={1} justifyContent="center">
          {getScreenTitle()}
          <Box marginHorizontal={5}>
            <AudioPlayer />
          </Box>
        </Box>
        <Box alignItems="center" mb={10}>
          <TouchableOpacity onPress={handleDeleteRecordPress}>
            <Box
              alignItems="center"
              justifyContent="center"
              backgroundColor={buttonBgColor}
              height={50}
              width={50}
              borderRadius={50}>
              <Icon name="delete" size={28} color={theme.colors.light2} />
            </Box>
          </TouchableOpacity>
        </Box>
        <Box alignItems="center" mb={10}>
          <TouchableOpacity onPress={handleSkipPress}>
            <Box
              alignItems="center"
              justifyContent="center"
              backgroundColor={buttonBgColor}
              height={70}
              width={70}
              borderRadius={70}>
              <Icon name="arrow-right" size={36} color={theme.colors.light2} />
            </Box>
          </TouchableOpacity>
        </Box>
      </>
    );
  };

  const getBunkerTextScreen = () => {
    return (
      <>
        <Box f={1} justifyContent="center">
          {getScreenTitle()}
          <Box marginHorizontal={5}>
            <Box>
              <TextArea
                numberOfLines={5}
                value={bunkerText}
                onChange={handleBunkerTextChange}
                placeholder="Share Your Activities & Seek Cheers..."
                showVolumeButton={false}
                showWordCount={false}
              />
            </Box>
            <Box
              alignItems="center"
              position="absolute"
              bottom={-8}
              left={0}
              right={0}>
              <TouchableOpacity onPress={handleBunkerTextSubmitPress}>
                <Box
                  alignItems="center"
                  justifyContent="center"
                  backgroundColor={buttonBgColor}
                  height={50}
                  width={50}
                  borderRadius={50}>
                  <Icon
                    name="arrow-down"
                    size={28}
                    color={theme.colors.light2}
                  />
                </Box>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </>
    );
  };

  const getBunkerFeelingScreen = () => {
    return (
      <>
        <Box f={1} justifyContent="center">
          {getScreenTitle('How are you feeling?')}
          <Box marginHorizontal={5}>
            <Box>
              <TextArea
                numberOfLines={5}
                value={feelingText}
                onChange={handleFeelingTextChange}
                placeholder="Share Your Activities & Seek Cheers..."
                showVolumeButton={false}
                showWordCount={false}
              />
            </Box>
            <Box
              alignItems="center"
              position="absolute"
              bottom={-8}
              left={0}
              right={0}>
              <TouchableOpacity onPress={handleSkipPress}>
                <Box
                  alignItems="center"
                  justifyContent="center"
                  backgroundColor={buttonBgColor}
                  height={50}
                  width={50}
                  borderRadius={50}>
                  <Text>SKIP</Text>
                </Box>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleFeelingTextSubmitPress}>
                <Box
                  alignItems="center"
                  justifyContent="center"
                  backgroundColor={buttonBgColor}
                  height={50}
                  width={50}
                  borderRadius={50}>
                  <Icon
                    name="arrow-down"
                    size={28}
                    color={theme.colors.light2}
                  />
                </Box>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Box f={1} flexDirection="col" justifyContent="center">
        <Box position="absolute" top={0} left={0} right={0} bottom={0}>
          <FastImage
            resizeMode="cover"
            source={require('@assets/images/night_road.jpeg')}
            style={styles.bgImage}
          />
        </Box>
        <Box alignItems="end" padding={20}>
          <TouchableOpacity onPress={handleClose}>
            <Icon name="close" size={24} color={theme.colors.light2} />
          </TouchableOpacity>
        </Box>
        {currentScreen === 'intro' ? getIntroScreen() : null}
        {currentScreen === 'recordAudio' ? getRecordScreen() : null}
        {currentScreen === 'showRecord' ? displayRecordScreen() : null}
        {currentScreen === 'bunkerText' ? getBunkerTextScreen() : null}
      </Box>
    </SafeAreaView>
  );
};

const getStyles = ({theme, width}) => {
  const styles = {
    bgImage: {
      height,
      width,
    },
  };
  return createStyles(styles);
};

export default AddBunker;
