import React, {useEffect, useRef, useState} from 'react';
import createStyles from '@src/utils/createStyles';
import {ScrollView, TouchableOpacity, Dimensions, Platform} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import {ProgressBar, useTheme, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MultiSelectList from '@src/components/MultiSelectList';
import Header from '@src/components/Header';
import {generateId} from '@src/utils/common';
import MemoryItem from './MemoryItem';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RoundedButton from '@src/components/Button/RoundedButton';
import RNFetchBlob from 'rn-fetch-blob';
import {BunkerFilter} from './BunkerFilter';
import {useNavigation} from '@react-navigation/native';

const {fs} = RNFetchBlob;

const {width} = Dimensions.get('screen');

const postData = [
  {
    id: generateId(),
    headerTitle: '20 July 2021',
    type: 'text',
    comments: [
      {
        title: 'Sup?! What’s going on?',
        desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea',
      },
      {
        title: 'Anything important to note?',
        desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea',
      },
    ],
  },
  {
    id: generateId(),
    headerTitle: '20 July 2021',
    type: 'audio',
    comments: [
      {
        title: 'Sup?! What’s going on?',
        audio_ios: `${fs.dirs.MainBundleDir}/assets/audio/bgm.m4r`,
        audio_android: fs.asset('assets/audio/bgm.mp3'),
      },
      {
        title: 'Anything important to note?',
        audio_ios: `${fs.dirs.MainBundleDir}/assets/audio/tokyo_drift.m4r`,
        audio_android: fs.asset('assets/audio/tokyo_drift.mp3'),
      },
    ],
  },
];

const audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.1);

const Memories = () => {
  const theme = useTheme();
  const styles = getStyles({width, theme});
  const navigation = useNavigation();
  const [totalSecs, setTotalSecs] = useState(0);
  const [currentSecs, setCurrentSecs] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpenFilters, setIsOpenFilters] = useState(false);

  audioRecorderPlayer.addPlayBackListener(e => {
    setTotalSecs(e.duration);
    setCurrentSecs(e.currentPosition);
  });

  const handlePlayPress = async () => {
    setIsPlaying(true);
    if (currentSecs > 0) {
      await audioRecorderPlayer.resumePlayer();
    } else {
      await audioRecorderPlayer.startPlayer();
      await audioRecorderPlayer.setVolume(1.0);
    }
  };

  const handlePausePress = async () => {
    setIsPlaying(false);
    await audioRecorderPlayer.pausePlayer();
  };

  const handleCheersRoomPress = () => {
    navigation.navigate('CheersRoom');
  };

  const getLeftButton = item => {
    return (
      <RoundedButton
        size={30}
        onPress={isPlaying ? handlePausePress : handlePlayPress}>
        <Icon
          size={22}
          color={theme.colors.light2}
          name={isPlaying ? 'pause' : 'play'}
        />
      </RoundedButton>
    );
  };

  const getProgress = item => {
    const progress = currentSecs / totalSecs;
    return (
      <ProgressBar
        style={{height: 2}}
        color={theme.colors.textDark}
        progress={isNaN(progress) ? 0 : progress}
      />
    );
  };

  const getTextContent = item => {
    return item.comments.map(comment => {
      return (
        <Box key={generateId()}>
          <Box flexDirection="row" alignItems="center" mb={5}>
            <Box
              height={3}
              width={10}
              mr={10}
              backgroundColor={theme.colors.dark1}
            />
            <Text fontFamily="Porcelain" fontWeight="500">
              {comment.title}
            </Text>
          </Box>
          <Box mb={5}>
            {item.type === 'text' ? (
              <Text fontFamily="Porcelain" fontWeight="500">
                {comment.title}
              </Text>
            ) : (
              <Box
                bg={theme.colors.light2}
                padding={5}
                borderRadius={10}
                flexDirection="row"
                alignItems="center">
                <Box>{getLeftButton(item)}</Box>
                <Box f={1} marginHorizontal={5}>
                  {getProgress(item)}
                </Box>
                <Box flexDirection="row" alignItems="center">
                  <Text fontFamily="Porcelain" color={theme.colors.textDark}>
                    {totalSecs}s
                  </Text>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      );
    });
  };

  const getItem = ({item}) => {
    const content = getTextContent(item);
    return (
      <Box>
        <MemoryItem
          {...item}
          content={content}
          onPress={handleCheersRoomPress}
        />
      </Box>
    );
  };

  const handleBackPress = () => {
    navigation.navigate('BunkerSlider');
  };

  useEffect(() => {
    return () => {
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
    };
  }, []);

  const handleFilterPress = () => {
    console.log('handleFilterPress');
    setIsOpenFilters(true);
  };

  const handleAddPress = () => {
    console.log('handleAddPress');
    navigation.navigate('AddBunker');
  };

  const handleHide = () => {
    setIsOpenFilters(false);
  };

  return (
    <Box f={1} bg={theme.colors.bgPrimary}>
      <Header title="Memories" onLeftPress={handleBackPress} />
      <Box paddingHorizontal={10} paddingBottom={100} paddingTop={10}>
        <MultiSelectList items={postData} renderItem={getItem} />
      </Box>
      <Box
        position="absolute"
        right={15}
        bottom={15}
        flexDirection="col"
        alignItems="center">
        <RoundedButton size={30} onPress={handleFilterPress}>
          <Icon size={18} color={theme.colors.light2} name="filter-variant" />
        </RoundedButton>
        <Box mb={10} />
        <RoundedButton size={40} onPress={handleAddPress}>
          <Icon size={22} color={theme.colors.light2} name="plus" />
        </RoundedButton>
      </Box>
      {isOpenFilters ? (
        <BunkerFilter isSortVisible onHide={handleHide} />
      ) : null}
    </Box>
  );
};

const getStyles = ({theme, width}) => {
  const itemWidth = width / 3;
  const itemHeight = width / 3;
  const styles = {
    userContainerStyle: {height: 70, alignItems: 'center'},
    userTitleStyle: {
      fontSize: 16,
      height: 25,
      minHeight: 25,
      fontWeight: '500',
    },
    userLeftStyle: {width: 50},
    containerStyle: {width: 'auto', backgroundColor: 'transparent'},
    cardContentStyle: {backgroundColor: 'transparent'},
    cardActionsStyle: {backgroundColor: 'transparent'},
    imageStyle: {height: 300},
  };
  return createStyles(styles);
};

export default Memories;
