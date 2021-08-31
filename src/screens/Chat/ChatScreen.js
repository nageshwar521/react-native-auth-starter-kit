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
import {ClubbiesChat} from './ClubbiesChat';
import {FriendsChat} from './FriendsChat';
import {useNavigation} from '@react-navigation/native';
import RoundedButton from '@src/components/Button/RoundedButton';
import ChatFilters from './ChatFilters';

const tabList = [
  {
    value: 'friends',
    label: 'Friends',
  },
  {
    value: 'clubbies',
    label: 'Clubbies',
  },
];

const ChatScreen = () => {
  const theme = useTheme();
  const {height} = useWindowDimensions();
  const styles = getStyles({theme, height});
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = React.useState('friends');
  const navigation = useNavigation();

  const getTabContent = () => {
    if (currentTab === 'friends') {
      return <FriendsChat />;
    } else if (currentTab === 'clubbies') {
      return <ClubbiesChat />;
    }
  };

  const handleBackPress = () => {
    navigation.navigate('HomeNavigation');
  };

  const handleNewChatPress = () => {
    navigation.navigate('NewChatSearch');
  };

  return (
    <Box f={1} bg={theme.colors.bgPrimary}>
      <Header
        leftIcon="arrow-left"
        title="Cheers"
        containerProps={{style: {flexGrow: 1}}}
        onLeftPress={handleBackPress}
      />
      <Box paddingBottom={100}>
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
      <Box position="absolute" right={20} bottom={100}>
        <RoundedButton size={60} onPress={handleNewChatPress}>
          <Icon size={32} name="plus" color={theme.colors.light1} />
        </RoundedButton>
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
      left: 30,
      right: 30,
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

export default ChatScreen;
