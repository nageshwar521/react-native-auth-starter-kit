import React, {useState} from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import createStyles from '@src/utils/createStyles';
import Content from '@src/components/Content';
import {Box} from 'react-native-design-utility';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ProfileImage} from '@src/modules/Profile/ProfileImage';
import {ExploreSections} from './ExploreSections';

const {width} = Dimensions.get('screen');

const ProfileCard = ({containerProps = {}, onImagePress}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = getStyles({theme});
  const [exploreVisible, setExploreVisible] = useState(false);

  const handleSharePress = () => {
    console.log('handleSharePress');
  };

  const handleSettingsPress = () => {
    console.log('handleSettingsPress');
    navigation.navigate('AppStack');
  };

  const handleExploreHide = () => {
    setExploreVisible(false);
  };

  const handleNamePress = () => {
    setExploreVisible(true);
  };

  const handleImagePress = () => {
    console.log('handleImagePress');
    if (onImagePress) {
      onImagePress();
    }
  };

  return (
    <Box {...containerProps}>
      <Box position="absolute" top={-10} left={-10}>
        <TouchableOpacity
          style={styles.topButtonStyle}
          onPress={handleSharePress}>
          <Ionicons
            name="ios-share-social-outline"
            size={28}
            color={theme.colors.textDark}
          />
        </TouchableOpacity>
      </Box>
      <Box alignItems="center" justifyContent="center">
        <TouchableOpacity onPress={handleImagePress}>
          <ProfileImage />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNamePress}>
          <Content type="headline" centerProps={{style: styles.headlineStyle}}>
            Marie Winter
          </Content>
        </TouchableOpacity>
        <Content centerProps={{style: styles.textStyle}}>
          Joined on 12-10-2021
        </Content>
        <Content centerProps={{style: styles.textStyle}}>
          Live in Pune, India
        </Content>
        <Content centerProps={{style: styles.textStyle}}>
          Born as Female
        </Content>
        <Content centerProps={{style: styles.textStyle}}>
          Born on 12-11-1992
        </Content>
      </Box>
      <Box position="absolute" top={-10} right={-10}>
        <TouchableOpacity
          style={styles.topButtonStyle}
          onPress={handleSettingsPress}>
          <Icon name="cog-outline" size={28} color={theme.colors.textDark} />
        </TouchableOpacity>
      </Box>
      <ExploreSections isVisible={exploreVisible} onHide={handleExploreHide} />
    </Box>
  );
};

const getStyles = ({theme}) => {
  const styles = {
    topButtonStyle: {
      padding: 15,
    },
    headlineStyle: {
      justifyContent: 'center',
      fontWeight: '500',
      color: theme.colors.textDark,
    },
    textStyle: {
      justifyContent: 'center',
      color: theme.colors.textDark,
    },
  };
  return createStyles(styles);
};

export {ProfileCard};
