import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useTheme, List, Divider, IconButton} from 'react-native-paper';
import Container from '@src/components/Container';
import Button from '@src/components/Button';
import {getI18nMessage} from '@src/translations/messages';
import {
  backLabel,
  nextLabel,
  welcomeTitleLabel,
  welcomeSubTitleLabel,
  followLabel,
} from '@src/translations/keys';
import createStyles from '@src/utils/createStyles';
import Content from '@src/components/Content';
import {getShadow, hexToRGBA} from '@src/utils/common';
import {Box} from 'react-native-design-utility';
import {useNavigation} from '@react-navigation/native';
import Tabs from '@src/components/Tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DropdownInput} from '@src/components/Input';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import {ProfileImage} from '@src/modules/Profile/ProfileImage';
import {ProfileCard} from '@src/modules/Profile/ProfileCard';
import {PersonalDetails} from '@src/modules/Profile/PersonalDetails';
import {InterestsDetails} from '@src/modules/Profile/InterestsDetails';
import {CommentsDetails} from '@src/modules/Profile/CommentsDetails';
import ImageSlider from './ImageSlider';

const {width} = Dimensions.get('screen');

const tabList = [
  {
    value: 'personal-details',
    icon: 'account-outline',
    content: <PersonalDetails />,
  },
  {
    value: 'interests',
    icon: 'puzzle-outline',
    content: <InterestsDetails />,
  },
  {
    value: 'comments',
    icon: 'format-list-checkbox',
    content: <CommentsDetails />,
  },
  {
    value: 'posts',
    icon: 'format-list-text',
    content: <Content>Posts</Content>,
  },
];

const ProfileScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = getStyles({theme});
  const [currentTab, setCurrentTab] = useState('personal-details');
  const [showImagePreview, setShowImagePreview] = useState(false);

  const handleProfileImagePress = () => {
    console.log('handleProfileImagePress');
    setShowImagePreview(true);
  };

  const handleSliderClose = () => {
    setShowImagePreview(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Container>
          <ProfileCard
            onImagePress={handleProfileImagePress}
            containerProps={{mb: 20}}
          />
          <Tabs
            items={tabList}
            selectedValue={currentTab}
            onChange={value => setCurrentTab(value)}
            tabContentContainerProps={{pt: 10}}
          />
        </Container>
      </ScrollView>
      {showImagePreview ? (
        <Box
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          backgroundColor={hexToRGBA(theme.colors.dark1, 40)}>
          <ImageSlider onClose={handleSliderClose} />
        </Box>
      ) : null}
    </SafeAreaView>
  );
};

const getStyles = ({theme}) => {
  const styles = {
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    topButtonStyle: {
      padding: 15,
    },
    headlineStyle: {
      justifyContent: 'center',
      fontWeight: '500',
    },
    textStyle: {
      justifyContent: 'center',
      color: theme.colors.textDark,
    },
  };
  return createStyles(styles);
};

export {ProfileScreen};
