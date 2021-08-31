import React, {useEffect, useState} from 'react';
import {TouchableOpacity, useWindowDimensions} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import {useDispatch, useSelector} from 'react-redux';
import Header from '@src/components/Header';
import createStyles from '@src/utils/createStyles';
import {IconButton, useTheme} from 'react-native-paper';
import {generateId, getShadow} from '@src/utils/common';
import Tabs from '@src/components/Tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ClubbiesChat} from './ClubbiesChat';
import {FriendsChat} from './FriendsChat';
import {useNavigation} from '@react-navigation/native';
import RoundedButton from '@src/components/Button/RoundedButton';
import PrimaryButton from '@src/components/Button/PrimaryButton';

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

const ChatFilters = ({filterItems = [], selectedItem = ''}) => {
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

  return (
    <Box alignItems="center" justify="between" flexDirection="row">
      <Box f={1} alignItems="center" justify="between" flexDirection="row">
        <Box flex={0.6} alignItems="center" justify="between">
          <IconButton icon="filter-variant" size={24} />
        </Box>
        {filterItems.map(filterItem => {
          const isSelected = filterItem.label === selectedItem;
          return (
            <TouchableOpacity
              key={generateId()}
              style={[
                styles.filterItemStyle,
                isSelected ? styles.selectedFilterItemStyle : null,
              ]}>
              <Text
                style={[
                  styles.filterItemTextStyle,
                  isSelected ? styles.selectedFilterItemTextStyle : null,
                ]}>
                {filterItem.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Box>
    </Box>
  );
};

const getStyles = ({theme, height}) => {
  const styles = {
    filterItemStyle: {
      flex: 1,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.primary,
      borderRadius: 15,
      paddingHorizontal: 10,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 5,
    },
    selectedFilterItemStyle: {
      backgroundColor: theme.colors.primary,
    },
    filterItemTextStyle: {
      color: theme.colors.primary,
    },
    selectedFilterItemTextStyle: {
      color: theme.colors.light1,
      fontWeight: '500',
      fontFamily: 'Montserrat-ExtraBold',
    },
  };
  return createStyles(styles);
};

export default ChatFilters;
