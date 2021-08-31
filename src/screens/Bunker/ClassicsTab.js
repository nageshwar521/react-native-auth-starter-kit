import React, {useEffect, useState} from 'react';
import {ScrollView, TextInput} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import {useDispatch, useSelector} from 'react-redux';
import Header from '@src/components/Header';
import {userLogout} from '@src/redux/actions/authActions';
import createStyles from '@src/utils/createStyles';
import CardItem from '@src/screens/Dashboard/CardItem';
import {
  Headline,
  IconButton,
  Paragraph,
  Title,
  useTheme,
} from 'react-native-paper';
import {getI18nMessage} from '@src/translations/messages';
import {homeTitleLabel} from '@src/translations/keys';
import MultiSelectList from '@src/components/MultiSelectList';
import {generateId} from '@src/utils/common';
import {DashboardItem} from '@src/modules/Dashboard/DashboardItem';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Container from '@src/components/Container';
import {useNavigation} from '@react-navigation/native';
import MatchItem from './MatchItem';
import {GradientWrapper} from '@src/components/Gradient/GradientWrapper';

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
    type: 'text',
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
    type: 'audio',
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
    type: 'text',
  },
];

const ClassicsTab = ({colors = []}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = getStyles({theme});
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const renderListItem = ({item}) => {
    return <MatchItem {...item} colors={colors} />;
  };

  const handleBackPress = () => {
    navigation.navigate('HomeNavigation');
  };

  return (
    <GradientWrapper
      height="auto"
      minHeight="auto"
      vertical
      colors={colors}
      backgroundStyle={{borderRadius: 0, paddingHorizontal: 10}}>
      <Box padding={10} paddingTop={30}>
        <Text paddingBottom={10} fontSize={18}>
          Classics are matches from your friends
        </Text>
        <MultiSelectList items={postsList} renderItem={renderListItem} />
      </Box>
    </GradientWrapper>
  );
};

const getStyles = ({theme}) => {
  const styles = {
    headerTitleStyle: {
      textAlign: 'center',
      justifyContent: 'center',
    },
    lastItem: {
      marginRight: 'auto',
    },
  };
  return createStyles(styles);
};

export default ClassicsTab;
