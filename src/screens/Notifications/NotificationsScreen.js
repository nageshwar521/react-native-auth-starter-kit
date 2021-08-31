import React, {useEffect, useState} from 'react';
import {TouchableOpacity, useWindowDimensions} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import {useDispatch, useSelector} from 'react-redux';
import Header from '@src/components/Header';
import createStyles from '@src/utils/createStyles';
import {useTheme} from 'react-native-paper';
import {generateId, getShadow} from '@src/utils/common';
import Tabs from '@src/components/Tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GeneralNotifications} from './GeneralNotifications';
import {ClubbiesNotifications} from './ClubbiesNotifications';
import {BunkerNotifications} from './BunkerNotifications';
import {useNavigation} from '@react-navigation/native';

const postsList = [
  {
    id: generateId(),
    title: 'Photography by Design',
    description: 'Photography by Design',
    bgUrl: '',
    userUrl: '',
    username: 'Nageshwar',
    datePosted: Date.now(),
    likes: 0,
    comments: 0,
    shares: 0,
    views: 0,
  },
  {
    id: generateId(),
    title: 'Photography by Design',
    description: 'Photography by Design',
    bgUrl: '',
    userUrl: '',
    username: 'Nageshwar',
    datePosted: Date.now(),
    likes: 0,
    comments: 0,
    shares: 0,
    views: 0,
  },
  {
    id: generateId(),
    title: 'Photography by Design',
    description: 'Photography by Design',
    bgUrl: '',
    userUrl: '',
    username: 'Nageshwar',
    datePosted: Date.now(),
    likes: 0,
    comments: 0,
    shares: 0,
    views: 0,
  },
];

const tabList = [
  {
    value: 'general',
    label: 'General',
  },
  {
    value: 'clubbies',
    label: 'Clubbies',
  },
  {
    value: 'bunker',
    label: 'Bunker',
  },
];

const NotificationsScreen = () => {
  const theme = useTheme();
  const {height} = useWindowDimensions();
  const styles = getStyles({theme, height});
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = React.useState('general');
  const navigation = useNavigation();

  const getTabContent = () => {
    if (currentTab === 'general') {
      return <GeneralNotifications />;
    } else if (currentTab === 'clubbies') {
      return <ClubbiesNotifications />;
    } else if (currentTab === 'bunker') {
      return <BunkerNotifications />;
    }
  };

  const handleBackPress = () => {
    navigation.navigate('HomeNavigation');
  };

  return (
    <Box f={1} bg={theme.colors.bgPrimary}>
      <Header
        leftIcon="arrow-left"
        title="Notifications"
        notificationIcon={false}
        containerProps={{style: {flexGrow: 1}}}
        onLeftPress={handleBackPress}
      />
      <Box>
        <Tabs
          style={styles.tabsWrapperStyle}
          items={tabList}
          selectedValue={currentTab}
          onChange={value => setCurrentTab(value)}
          tabPosition="bottom"
          tabContainerProps={{}}
          tabsWrapperProps={{bg: theme.colors.light2, borderRadius: 12}}
          labelStyle={styles.tabLabelStyle}
          selectedButtonStyle={styles.selectedTabButtonStyle}
          selectedLabelStyle={styles.selectedTabLabelStyle}
          buttonStyle={styles.tabButtonStyle}
          firstTabStyle={styles.firstTabStyle}
          lastTabStyle={styles.lastTabStyle}
          getTabContent={getTabContent}
        />
      </Box>
    </Box>
  );
};

const getStyles = ({theme, height}) => {
  const styles = {
    lastItem: {
      marginRight: 'auto',
    },
    tabsWrapperStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: (height * 70) / 100,
      left: 0,
      right: 0,
      ...getShadow(),
    },
    titleStyle: {fontWeight: '500', fontSize: 18},
    tabButtonStyle: {
      flexDirection: 'row',
      borderBottomWidth: 0,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 0,
      backgroundColor: theme.colors.light2,
    },
    firstTabStyle: {
      borderTopLeftRadius: 12,
      borderBottomLeftRadius: 12,
    },
    lastTabStyle: {
      borderTopRightRadius: 12,
      borderBottomRightRadius: 12,
    },
    tabLabelStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      paddingHorizontal: 20,
      fontFamily: 'Montserrat-Bold',
    },
    selectedTabButtonStyle: {
      backgroundColor: theme.colors.primary,
      borderBottomWidth: 0,
      paddingBottom: 0,
      borderRadius: 12,
    },
    selectedTabLabelStyle: {
      color: theme.colors.light2,
      fontWeight: '500',
    },
    filterLeftButtonStyle: {
      position: 'absolute',
      left: 12,
      top: (height * 70) / 100,
      backgroundColor: theme.colors.primary,
      padding: 10,
      borderRadius: 8,
      ...getShadow(),
    },
    filterRightButtonStyle: {
      position: 'absolute',
      right: 12,
      top: (height * 70) / 100,
      backgroundColor: theme.colors.primary,
      padding: 10,
      borderRadius: 8,
      ...getShadow(),
    },
    filterButtonTextStyle: {
      color: theme.colors.light2,
      fontWeight: '500',
    },
  };
  return createStyles(styles);
};

export default NotificationsScreen;
