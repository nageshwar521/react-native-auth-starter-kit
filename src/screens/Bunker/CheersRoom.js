import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  useWindowDimensions,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import {useDispatch, useSelector} from 'react-redux';
import createStyles from '@src/utils/createStyles';
import {IconButton, useTheme} from 'react-native-paper';
import {generateId, getShadow} from '@src/utils/common';
import Tabs from '@src/components/Tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ClassicsTab from './ClassicsTab';
import SupsTab from './SupsTab';
import JunkiesTab from './JunkiesTab';
import ListItem from '@src/components/ListItem';
import {SafeAreaView} from 'react-native-safe-area-context';
import RoundedButton from '@src/components/Button/RoundedButton';
import {BunkerFilter} from './BunkerFilter';
import {useNavigation} from '@react-navigation/native';

const {height} = Dimensions.get('screen');

const tabList = [
  {
    value: 'classics',
    label: 'Classics',
  },
  {
    value: 'sups',
    label: 'Sups',
  },
  {
    value: 'junkies',
    label: 'Junkies',
  },
];

const CheersRoom = () => {
  const theme = useTheme();
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const styles = getStyles({theme, height});
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState('classics');
  const [showMore, setShowMore] = useState(false);
  const [isOpenFilters, setIsOpenFilters] = useState(false);

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

  const classicsColors = ['#A1FFCE', '#FAFFD1'];
  const supsColors = ['#B2FEFA', '#0ED2F7'];
  const junkiesColors = ['#FBD3E9', '#BB377D'];

  const getTabContent = () => {
    if (currentTab === 'classics') {
      return <ClassicsTab colors={classicsColors} />;
    } else if (currentTab === 'sups') {
      return <SupsTab colors={supsColors} />;
    } else if (currentTab === 'junkies') {
      return <JunkiesTab colors={junkiesColors} />;
    }
  };

  const getShowMoreButton = () => {
    return (
      <Box
        alignItems="center"
        justifyContent="center"
        position="absolute"
        left={0}
        right={0}
        bottom={-35}
        {...getShadow()}>
        <TouchableOpacity onPress={() => setShowMore(!showMore)}>
          <Box
            alignItems="center"
            justifyContent="center"
            height={30}
            width={30}
            borderRadius={30}
            bg={theme.colors.light2}>
            <Icon
              name={showMore ? 'chevron-up' : 'chevron-down'}
              size={24}
              color={theme.colors.primary}
            />
          </Box>
        </TouchableOpacity>
      </Box>
    );
  };

  const getExtraContent = initialText => {
    return (
      <Box
        left={0}
        right={0}
        top={53}
        position="absolute"
        paddingHorizontal={20}
        paddingBottom={20}
        height={showMore ? 'auto' : 0}
        bg={theme.colors.bgPrimary}
        alignItems="center"
        justifyContent="center"
        zIndex={1000}
        {...getShadow({size: 2})}>
        {showMore ? (
          <Box>
            <Box>
              <Text style={styles.textStyle}>— Sup?! What’s going on?</Text>
              <Text style={styles.textStyle}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea
              </Text>
              <Text style={styles.textStyle}>
                — Anything important to note?
              </Text>
              <Text style={styles.textStyle}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea
              </Text>
            </Box>
            {getShowMoreButton()}
          </Box>
        ) : (
          <Box>
            <Box>
              <Text style={{fontFamily: 'Porcelain'}}>{initialText}...</Text>
            </Box>
            {getShowMoreButton()}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Box f={1} bg={theme.colors.bgPrimary}>
        <ListItem
          leftIcon="arrow-left"
          rightIcon="dots-horizontal"
          title="21 July 2021 - 21:10"
          titleStyle={styles.headerTitleStyle}
          centerContainerProps={{
            flexGrow: 1,
            alignItems: 'center',
          }}
          leftContainerProps={{bg: 'transparent'}}
          leftIconProps={{color: theme.colors.textDark}}
          rightContainerProps={{bg: 'transparent'}}
          rightIconProps={{color: theme.colors.textDark, size: 24}}
          getExtraData={() =>
            getExtraContent(
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
            )
          }
          containerProps={{
            height: 'auto',
            bg: theme.colors.bgPrimary,
            borderRadius: 0,
            ...getShadow({size: 0}),
          }}
        />
        <Box>
          <Tabs
            style={styles.tabsWrapperStyle}
            items={tabList}
            selectedValue={currentTab}
            onChange={value => setCurrentTab(value)}
            tabPosition="bottom"
            tabContainerProps={{}}
            tabContentContainerProps={{paddingTop: 40}}
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
    </SafeAreaView>
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
    headerTitleStyle: {
      textAlign: 'center',
      justifyContent: 'center',
      fontFamily: 'Porcelain',
    },
    textStyle: {fontFamily: 'Porcelain', color: theme.colors.textDark},
  };
  return createStyles(styles);
};

export default CheersRoom;
