import React, {useEffect, useState} from 'react';
import {TouchableOpacity, useWindowDimensions} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import {useDispatch, useSelector} from 'react-redux';
import Header from '@src/components/Header';
import createStyles from '@src/utils/createStyles';
import CardItem from './CardItem';
import {useTheme} from 'react-native-paper';
import {getI18nMessage} from '@src/translations/messages';
import {homeTitleLabel} from '@src/translations/keys';
import MultiSelectList from '@src/components/MultiSelectList';
import {generateId, getShadow} from '@src/utils/common';
import HomeTab from '@src/modules/Home/HomeTab';
import Tabs from '@src/components/Tabs';
import ExploreTab from '@src/modules/Home/ExploreTab';
import ClubbiesTab from '@src/modules/Home/ClubbiesTab';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    value: 'home',
    label: 'Home',
    content: <HomeTab />,
  },
  {
    value: 'explore',
    label: 'Explore',
    content: <ExploreTab />,
  },
  {
    value: 'clubbies',
    label: 'Clubbies',
    content: <ClubbiesTab />,
  },
];

const DashboardScreen = () => {
  const theme = useTheme();
  const {height} = useWindowDimensions();
  const styles = getStyles({theme, height});
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = React.useState('home');
  const [viewType, setViewType] = useState('grid');

  const layoutTogglePress = () => {
    console.log('layoutTogglePress');
    setViewType(viewType === 'grid' ? 'list' : 'grid');
  };

  const handleFilterPress = () => {
    console.log('handleFilterPress');
  };

  const getTabContent = () => {
    if (currentTab === 'home') {
      return <HomeTab />;
    } else if (currentTab === 'explore') {
      return <ExploreTab />;
    } else if (currentTab === 'clubbies') {
      return <ClubbiesTab viewType={viewType} />;
    }
  };

  return (
    <Box f={1} bg={theme.colors.bgPrimary}>
      <Header
        leftIcon={false}
        title={getI18nMessage(homeTitleLabel)}
        containerProps={{style: {flexGrow: 1}}}
      />
      <Box>
        <Tabs
          style={styles.tabsWrapperStyle}
          items={tabList}
          contentProps={{viewType}}
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
        {currentTab === 'clubbies' ? (
          <>
            <TouchableOpacity
              style={styles.filterLeftButtonStyle}
              onPress={layoutTogglePress}>
              <Icon
                name="view-grid-outline"
                size={22}
                style={styles.filterButtonTextStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterRightButtonStyle}
              onPress={handleFilterPress}>
              <Icon
                name="filter-variant"
                size={22}
                style={styles.filterButtonTextStyle}
              />
            </TouchableOpacity>
          </>
        ) : null}
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
      left: 70,
      right: 70,
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
      flex: 0,
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

export default DashboardScreen;
