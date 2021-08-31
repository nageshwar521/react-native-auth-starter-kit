import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {useTheme, Text, Divider, Title} from 'react-native-paper';
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
import {generateId, getShadow, hexToRGBA} from '@src/utils/common';
import {Box} from 'react-native-design-utility';
import {useNavigation} from '@react-navigation/native';
import MultiSelectList from '@src/components/MultiSelectList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import Header from '@src/components/Header';
import {SearchBar} from '@src/components/Search/SearchBar';
import ChatMessageItem from './ChatMessageItem';

const {width} = Dimensions.get('screen');

const messageList = [
  {
    title: moment().subtract(2, 'days').fromNow(),
    data: [
      {
        type: 'message',
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.',
        userImage: 'https://picsum.photos/700',
        userType: 'other',
      },
      {
        type: 'message',
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.',
        userImage: 'https://picsum.photos/700',
        userType: 'me',
      },
    ],
  },
  {
    title: moment().subtract(1, 'days').fromNow(),
    data: [
      {
        type: 'message',
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.',
        userImage: 'https://picsum.photos/700',
        userType: 'other',
      },
      {
        type: 'message',
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.',
        userImage: 'https://picsum.photos/700',
        userType: 'me',
      },
    ],
  },
  {
    title: moment().subtract(0, 'days').fromNow(),
    data: [
      {
        type: 'message',
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.',
        userImage: 'https://picsum.photos/700',
        userType: 'other',
      },
      {
        type: 'message',
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.',
        userImage: 'https://picsum.photos/700',
        userType: 'me',
      },
    ],
  },
];

const StartChat = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = getStyles({theme});

  const handleChange = (fieldName, value) => {
    setFormData({...formData, [fieldName]: value});
  };

  const handleMessagePress = () => {
    console.log('handleMessagePress');
  };

  const renderSeparator = () => {
    return <Divider style={styles.dividerStyle} />;
  };

  const getLeftComponent = item => {
    if (item.userImage) {
      return (
        <FastImage
          style={styles.listImageStyle}
          resizeMode="contain"
          source={{uri: item.userImage}}
        />
      );
    } else {
      return <Icon icon="image-outline" />;
    }
  };

  const getRightComponent = item => {
    if (!item.isOnline) {
      return (
        <Box
          height={10}
          width={10}
          bg={theme.colors.accent}
          position="absolute"
          top={20}
          right={20}
          borderRadius={20}
        />
      );
    } else {
      return null;
    }
  };

  const getTitle = item => {
    return (
      <Box flexDirection="row" alignItems="center">
        <Box>
          <Title style={styles.titleStyle}>{item.text}</Title>
        </Box>
      </Box>
    );
  };

  const renderListItem = ({item}) => {
    return (
      <ChatMessageItem
        {...item}
        imagePosition={item.userType === 'other' ? 'left' : 'right'}
      />
    );
  };

  const getChatTitle = () => {
    return (
      <Box flexDirection="row" flex={1}>
        <Box>
          <Text style={styles.titleStyle}>Marie</Text>
        </Box>
        <Box
          height={10}
          width={10}
          borderRadius={10}
          bg={theme.colors.primary}
        />
      </Box>
    );
  };

  const handleBackPress = () => {
    navigation.navigate('Chat');
  };

  return (
    <Box f={1} bg={theme.colors.bgPrimary}>
      <Header
        leftIcon="arrow-left"
        getTitle={getChatTitle}
        notificationIcon={false}
        searchIcon={false}
        onLeftPress={handleBackPress}
        actions={['tune']}
      />
      <Box p={10} paddingBottom={200}>
        <MultiSelectList
          type="sections"
          items={messageList}
          renderItem={renderListItem}
        />
      </Box>
      <Box position="absolute" left={10} right={10} bottom={20}>
        <SearchBar rightIcon="add" />
      </Box>
    </Box>
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
      fontSize: 32,
      fontFamily: 'Montserrat-ExtraBold',
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
      backgroundColor: 'transparent',
      marginBottom: 15,
      marginTop: 15,
      paddingHorizontal: 15,
    },
    listItemStyle: {
      borderRadius: 10,
    },
    dividerStyle: {
      backgroundColor: theme.colors.border,
    },
    listImageStyle: {borderRadius: 10, height: 50, width: 50},
    selectedListItemContainerStyle: {
      backgroundColor: hexToRGBA(theme.colors.primary, 40),
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
    descStyle: {
      fontFamily: 'Montserrat-Light',
      color: theme.colors.textDark,
    },
  };
  return createStyles(styles);
};

export {StartChat};
