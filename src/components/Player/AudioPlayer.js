import React, {useState} from 'react';
import {useTheme, Switch, Button, ProgressBar} from 'react-native-paper';
import createStyles from '@src/utils/createStyles';
import {Box, Text} from 'react-native-design-utility';
import {useNavigation} from '@react-navigation/native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RoundedButton from '@src/components/Button/RoundedButton';
import RNFetchBlob from 'rn-fetch-blob';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const screenWidth = Dimensions.get('screen').width;

const audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.1);

const AudioPlayer = ({path = ''}) => {
  const theme = useTheme();
  const styles = getStyles({theme});
  const navigation = useNavigation();
  const [totalSecs, setTotalSecs] = useState(0);
  const [currentSecs, setCurrentSecs] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const getLeftButton = () => {
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

  const getProgress = () => {
    const progress = currentSecs / totalSecs;
    return (
      <ProgressBar
        style={{height: 2}}
        color={theme.colors.textDark}
        progress={isNaN(progress) ? 0 : progress}
      />
    );
  };

  return (
    <Box
      bg={theme.colors.light2}
      padding={5}
      borderRadius={10}
      flexDirection="row"
      alignItems="center">
      <Box>{getLeftButton()}</Box>
      <Box f={1} marginHorizontal={5}>
        {getProgress()}
      </Box>
      <Box flexDirection="row" alignItems="center">
        <Text color={theme.colors.textDark}>{totalSecs}s</Text>
      </Box>
    </Box>
  );
};

const getStyles = ({theme}) => {
  const styles = {};
  return createStyles(styles);
};

export {AudioPlayer};
