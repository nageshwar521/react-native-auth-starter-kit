import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {useTheme, List, Divider} from 'react-native-paper';
import Container from '@src/components/Container';
import Button from '@src/components/Button';
import {getI18nMessage} from '@src/translations/messages';
import {
  backLabel,
  nextLabel,
  addInterestsTitleLabel,
  addInterestsSubTitleLabel,
  educationJobDetailsTitleLabel,
  educationJobDetailsSubTitleLabel,
  occupationInterestLabel,
  locationsInterestLabel,
  selectOptionsLabel,
  welcomeTitleLabel,
  welcomeSubTitleLabel,
  followLabel,
  messageLabel,
} from '@src/translations/keys';
import createStyles from '@src/utils/createStyles';
import Content from '@src/components/Content';
import {getShadow} from '@src/utils/common';
import {Box} from 'react-native-design-utility';
import {useNavigation} from '@react-navigation/native';
import MultiSelectList from '@src/components/MultiSelectList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DropdownInput} from '@src/components/Input';
import FastImage from 'react-native-fast-image';
import Tabs from '@src/components/Tabs';
import {FollowingList} from '@src/modules/Likes/FollowingList';
import {FollowersList} from '@src/modules/Likes/FollowersList';
import {FriendsList} from '@src/modules/Likes/FriendsList';

const {width} = Dimensions.get('screen');

const followerList = [
  {
    label: 'Marie Winter 1',
    value: 'Marie Winter 1',
    subtitle: 'India',
    imageUrl: '',
  },
  {
    label: 'Marie Winter 2',
    value: 'Marie Winter 2',
    subtitle: 'United States',
    imageUrl: '',
  },
  {
    label: 'Marie Winter 3',
    value: 'Marie Winter 3',
    subtitle: 'Canada',
    imageUrl: '',
  },
  {
    label: 'Marie Winter 4',
    value: 'Marie Winter 4',
    subtitle: 'India',
    imageUrl: '',
  },
  {
    label: 'Marie Winter 5',
    value: 'Marie Winter 5',
    subtitle: 'India',
    imageUrl: '',
  },
];

const tabList = [
  {
    value: 'personal-details',
    label: 'Following',
    content: <FollowingList />,
  },
  {
    value: 'interests',
    label: 'Followers',
    content: <FollowersList />,
  },
  {
    value: 'comments',
    label: 'Friends',
    content: <FriendsList />,
  },
];

const LikesListScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = getStyles({theme});
  const [currentTab, setCurrentTab] = useState('personal-details');

  const titleProps = {
    type: 'title',
    boxProps: {},
    centerProps: {style: styles.headerTitleStyle},
  };

  const handleBackPress = () => {
    console.log('handleBackPress');
    navigation.navigate('Profile');
  };

  const handleSearchPress = () => {
    console.log('handleSearchPress');
  };

  const getHeaderRightComponent = () => {
    return (
      <TouchableOpacity onPress={handleSearchPress}>
        <Icon name="magnify" size={24} color={theme.colors.textDark} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Container
        showImage
        headerLeftIconProps={{
          name: 'arrow-left',
          size: 24,
          color: theme.colors.textDark,
        }}
        style={styles.container}
        title="Marie's"
        titleProps={titleProps}
        getRightComponent={getHeaderRightComponent}
        headerContainerProps={{align: 'center', paddingHorizontal: 20, mb: 10}}
        contentContainerProps={{p: 10}}
        headerLeftContainerProps={{onPress: handleBackPress}}>
        <Tabs
          items={tabList}
          selectedValue={currentTab}
          onChange={value => setCurrentTab(value)}
          tabContainerProps={{mb: 10}}
          tabContentContainerProps={{ppaddingHorizontal: 10}}
        />
      </Container>
    </SafeAreaView>
  );
};

const getStyles = ({theme}) => {
  const styles = {
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    headerTitleStyle: {paddingLeft: 10},
    labelStyle: {
      color: theme.colors.dark3,
      paddingBottom: 10,
    },
    titleStyle: {
      fontWeight: '500',
    },
    centerStyle: {},
    rightPaginationStyle: {},
    textInput: {
      fontSize: 18,
      fontFamily: 'Montserrat-SemiBold',
    },
    buttonBgSplitLeft: {
      marginRight: 5,
    },
    buttonBgSplitRight: {
      marginLeft: 5,
    },
    buttonSplitLeft: {
      flex: 1,
      fontSize: 18,
      fontFamily: 'Montserrat-SemiBold',
    },
    buttonSplitRight: {
      flex: 1,
      fontSize: 18,
      fontFamily: 'Montserrat-SemiBold',
    },
    continueButtonTextStyle: {
      color: theme.colors.light2,
      fontSize: 19,
      fontWeight: '500',
      fontFamily: 'Montserrat-SemiBold',
    },
    continueButtonContainerStyle: {
      flex: 1,
      borderRadius: 15,
      margin: 0,
      padding: 0,
      ...getShadow(),
    },
    backButtonTextStyle: {
      color: theme.colors.primary,
      fontSize: 19,
      fontWeight: '500',
      fontFamily: 'Montserrat-SemiBold',
    },
    backButtonContainerStyle: {
      borderRadius: 15,
      margin: 0,
      padding: 0,
      ...getShadow(),
    },
    listItemContainerStyle: {
      backgroundColor: theme.colors.bgPrimary,
    },
    listItemStyle: {
      borderRadius: 10,
    },
    dividerStyle: {
      backgroundColor: theme.colors.border,
    },
    listImageStyle: {borderRadius: 10},
    selectedListItemContainerStyle: {
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    rightMessageTextStyle: {
      fontFamily: 'Montserrat-Bold',
      fontSize: 12,
      fontWeight: '500',
      color: theme.colors.light2,
    },
    followStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      color: theme.colors.primary,
    },
    buttonContainerStyle: {
      margin: 8,
    },
  };
  return createStyles(styles);
};

export {LikesListScreen};
