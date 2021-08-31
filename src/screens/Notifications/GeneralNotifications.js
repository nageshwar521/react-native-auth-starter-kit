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
import {generateId, getShadow, hexToRGBA} from '@src/utils/common';
import {Box} from 'react-native-design-utility';
import {useNavigation} from '@react-navigation/native';
import MultiSelectList from '@src/components/MultiSelectList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DropdownInput} from '@src/components/Input';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import ListItem from '@src/components/ListItem';

const {width} = Dimensions.get('screen');

const notificationList = [
  {
    username: 'Marie Winter 1',
    text: 'Marie Winter 1',
    datePosted: moment().fromNow(),
    userImage: 'https://picsum.photos/700',
    postImage: 'https://picsum.photos/700',
    seen: false,
    type: 'like',
  },
  {
    username: 'Marie Winter 1',
    text: 'Marie Winter 1',
    datePosted: moment().fromNow(),
    userImage: 'https://picsum.photos/700',
    postImage: 'https://picsum.photos/700',
    seen: false,
    type: 'like',
  },
  {
    username: 'Marie Winter 1',
    text: 'Marie Winter 1',
    datePosted: moment().fromNow(),
    userImage: 'https://picsum.photos/700',
    postImage: 'https://picsum.photos/700',
    seen: true,
    type: 'comment',
  },
  {
    username: 'Marie Winter 1',
    text: 'Marie Winter 1',
    datePosted: moment().fromNow(),
    userImage: 'https://picsum.photos/700',
    postImage: 'https://picsum.photos/700',
    seen: true,
    type: 'comment',
  },
  {
    username: 'Marie Winter 1',
    text: 'Marie Winter 1',
    datePosted: moment().fromNow(),
    userImage: 'https://picsum.photos/700',
    postImage: 'https://picsum.photos/700',
    seen: true,
    type: 'comment',
  },
  {
    username: 'Marie Winter 1',
    text: 'Marie Winter 1',
    datePosted: moment().fromNow(),
    userImage: 'https://picsum.photos/700',
    postImage: 'https://picsum.photos/700',
    seen: true,
    type: 'like',
  },
  {
    username: 'Marie Winter 1',
    text: 'Marie Winter 1',
    datePosted: moment().fromNow(),
    userImage: 'https://picsum.photos/700',
    postImage: 'https://picsum.photos/700',
    seen: true,
    type: 'like',
  },
  {
    username: 'Marie Winter 1',
    text: 'Marie Winter 1',
    datePosted: moment().fromNow(),
    userImage: 'https://picsum.photos/700',
    postImage: 'https://picsum.photos/700',
    seen: true,
    type: 'like',
  },
  {
    username: 'Marie Winter 1',
    text: 'Marie Winter 1',
    datePosted: moment().fromNow(),
    userImage: 'https://picsum.photos/700',
    postImage: 'https://picsum.photos/700',
    seen: true,
    type: 'like',
  },
  {
    username: 'Marie Winter 1',
    text: 'Marie Winter 1',
    datePosted: moment().fromNow(),
    userImage: 'https://picsum.photos/700',
    postImage: 'https://picsum.photos/700',
    seen: true,
    type: 'like',
  },
];

const GeneralNotifications = () => {
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
    if (item.postImage) {
      return (
        <FastImage
          style={styles.listImageStyle}
          height={50}
          width={50}
          resizeMode="contain"
          source={{uri: item.postImage}}
        />
      );
    } else {
      return <List.Icon icon="image-outline" />;
    }
  };

  const renderListItem = ({item}) => {
    return (
      <ListItem
        title={item.text}
        description={item.datePosted}
        containerProps={{bg: 'transparent'}}
        titleStyle={styles.titleStyle}
        descStyle={styles.descStyle}
        centerContainerProps={{flex: 1}}
        getLeftComponent={getLeftComponent.bind(null, item)}
        getRightComponent={getRightComponent.bind(null, item)}
        containerProps={{
          p: 15,
          bg: !item.seen ? hexToRGBA(theme.colors.primary, 30) : 'transparent',
        }}
      />
    );
  };

  return (
    <Box marginTop={15}>
      <MultiSelectList
        items={notificationList}
        renderItem={renderListItem}
        listProps={{ItemSeparatorComponent: renderSeparator}}
      />
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
    titleStyle: {
      fontFamily: 'Montserrat-Bold',
      color: theme.colors.textDark,
    },
    descStyle: {
      fontFamily: 'Montserrat-Light',
      color: theme.colors.textDark,
    },
  };
  return createStyles(styles);
};

export {GeneralNotifications};
