import React, {useEffect, useState} from 'react';
import {ScrollView, TextInput} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import {useDispatch, useSelector} from 'react-redux';
import Header from '@src/components/Header';
import {userLogout} from '@src/redux/actions/authActions';
import createStyles from '@src/utils/createStyles';
import CardItem from '@src/screens/Dashboard/CardItem';
import {useTheme} from 'react-native-paper';
import {getI18nMessage} from '@src/translations/messages';
import {homeTitleLabel} from '@src/translations/keys';
import MultiSelectList from '@src/components/MultiSelectList';
import {generateId} from '@src/utils/common';
import {DashboardItem} from '@src/modules/Dashboard/DashboardItem';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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

const HomeTab = () => {
  const theme = useTheme();
  const styles = getStyles({theme});
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const renderListItem = ({item}) => {
    return <CardItem {...item} />;
  };

  return (
    <ScrollView>
      <Box padding={10}>
        <DashboardItem
          title="Friends"
          buttonLabel="View All"
          headerContainerProps={{marginHorizontal: 10, marginBottom: 0}}>
          <MultiSelectList
            items={postsList}
            listProps={{horizontal: true}}
            renderItem={renderListItem}
          />
        </DashboardItem>
        <DashboardItem
          title="Celebrities"
          buttonLabel="View All"
          headerContainerProps={{marginHorizontal: 10, marginBottom: 0}}>
          <MultiSelectList
            items={postsList}
            listProps={{horizontal: true}}
            renderItem={renderListItem}
          />
        </DashboardItem>
      </Box>
    </ScrollView>
  );
};

const getStyles = ({theme}) => {
  const styles = {
    lastItem: {
      marginRight: 'auto',
    },
  };
  return createStyles(styles);
};

export default HomeTab;
