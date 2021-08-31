import React, {useEffect, useState} from 'react';
import {ScrollView, useWindowDimensions} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import {useDispatch, useSelector} from 'react-redux';
import Header from '@src/components/Header';
import {userLogout} from '@src/redux/actions/authActions';
import createStyles from '@src/utils/createStyles';
import CardItem from '../../screens/Dashboard/CardItem';
import {Avatar, Badge, useTheme} from 'react-native-paper';
import {getI18nMessage} from '@src/translations/messages';
import {homeTitleLabel} from '@src/translations/keys';
import MultiSelectList from '@src/components/MultiSelectList';
import {generateId, getShadow} from '@src/utils/common';
import {DashboardItem} from '@src/modules/Dashboard/DashboardItem';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PhotoItem from '@src/components/Image/PhotoItem';
import ClubItem from './ClubItem';

const todayMatchesList = [
  {
    imageUrl: 'https://picsum.photos/700',
    count: 3,
    datePosted: new Date(),
    title: 'Lorem ipsum dolor sit amet',
    description: 'consetetur sadipscing elitr, sed diam nonumy eirmod tempor',
  },
  {
    imageUrl: 'https://picsum.photos/700',
    count: 3,
    datePosted: new Date(),
    title: 'Lorem ipsum dolor sit amet',
    description: 'consetetur sadipscing elitr, sed diam nonumy eirmod tempor',
  },
  {
    imageUrl: 'https://picsum.photos/700',
    count: 3,
    datePosted: new Date(),
    title: 'Lorem ipsum dolor sit amet',
    description: 'consetetur sadipscing elitr, sed diam nonumy eirmod tempor',
  },
  {
    imageUrl: 'https://picsum.photos/700',
    count: 3,
    datePosted: new Date(),
    title: 'Lorem ipsum dolor sit amet',
    description: 'consetetur sadipscing elitr, sed diam nonumy eirmod tempor',
  },
  {
    imageUrl: 'https://picsum.photos/700',
    count: 3,
    datePosted: new Date(),
    title: 'Lorem ipsum dolor sit amet',
    description: 'consetetur sadipscing elitr, sed diam nonumy eirmod tempor',
  },
  {
    imageUrl: 'https://picsum.photos/700',
    count: 3,
    datePosted: new Date(),
    title: 'Lorem ipsum dolor sit amet',
    description: 'consetetur sadipscing elitr, sed diam nonumy eirmod tempor',
  },
  {
    imageUrl: 'https://picsum.photos/700',
    count: 3,
    datePosted: new Date(),
    title: 'Lorem ipsum dolor sit amet',
    description: 'consetetur sadipscing elitr, sed diam nonumy eirmod tempor',
  },
  {
    imageUrl: 'https://picsum.photos/700',
    count: 3,
    datePosted: new Date(),
    title: 'Lorem ipsum dolor sit amet',
    description: 'consetetur sadipscing elitr, sed diam nonumy eirmod tempor',
  },
  {
    imageUrl: 'https://picsum.photos/700',
    count: 3,
    datePosted: new Date(),
    title: 'Lorem ipsum dolor sit amet',
    description: 'consetetur sadipscing elitr, sed diam nonumy eirmod tempor',
  },
  {
    imageUrl: 'https://picsum.photos/700',
    count: 3,
    datePosted: new Date(),
    title: 'Lorem ipsum dolor sit amet',
    description: 'consetetur sadipscing elitr, sed diam nonumy eirmod tempor',
  },
  {
    imageUrl: 'https://picsum.photos/700',
    count: 3,
    datePosted: new Date(),
    title: 'Lorem ipsum dolor sit amet',
    description: 'consetetur sadipscing elitr, sed diam nonumy eirmod tempor',
  },
  {
    imageUrl: 'https://picsum.photos/700',
    count: 3,
    datePosted: new Date(),
    title: 'Lorem ipsum dolor sit amet',
    description: 'consetetur sadipscing elitr, sed diam nonumy eirmod tempor',
  },
  {
    imageUrl: 'https://picsum.photos/700',
    count: 3,
    datePosted: new Date(),
    title: 'Lorem ipsum dolor sit amet',
    description: 'consetetur sadipscing elitr, sed diam nonumy eirmod tempor',
  },
  {
    imageUrl: 'https://picsum.photos/700',
    count: 3,
    datePosted: new Date(),
    title: 'Lorem ipsum dolor sit amet',
    description: 'consetetur sadipscing elitr, sed diam nonumy eirmod tempor',
  },
  {
    imageUrl: 'https://picsum.photos/700',
    count: 3,
    datePosted: new Date(),
    title: 'Lorem ipsum dolor sit amet',
    description: 'consetetur sadipscing elitr, sed diam nonumy eirmod tempor',
  },
  {
    imageUrl: 'https://picsum.photos/700',
    count: 3,
    datePosted: new Date(),
    title: 'Lorem ipsum dolor sit amet',
    description: 'consetetur sadipscing elitr, sed diam nonumy eirmod tempor',
  },
];

const friendsList = [
  {
    imageUrl: 'https://picsum.photos/700',
    count: 3,
  },
  {
    imageUrl: 'https://picsum.photos/700',
    count: 3,
  },
  {
    imageUrl: 'https://picsum.photos/700',
    count: 3,
  },
  {
    imageUrl: 'https://picsum.photos/700',
    count: 3,
  },
];

const ClubbiesTab = ({viewType = 'grid'}) => {
  const theme = useTheme();
  const {height} = useWindowDimensions();
  const styles = getStyles({theme, height});
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const getControls = item => {
    return [
      {
        position: 'bottom_right',
        component: <Badge style={styles.badgeStyle}>{item.count}</Badge>,
      },
    ];
  };

  const getGridItem = title => {
    return (
      <DashboardItem
        title={title}
        buttonLabel="View all"
        headerContainerProps={{marginHorizontal: 20, marginBottom: 10}}>
        <Box
          paddingHorizontal={10}
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="between">
          <MultiSelectList
            numColumns={4}
            items={todayMatchesList}
            listProps={{
              columnWrapperStyle: {
                flex: 1,
                justifyContent: 'space-between',
              },
            }}
            renderItem={({item}) => {
              return (
                <PhotoItem
                  key={generateId()}
                  {...item}
                  containerStyle={styles.photoContainerStyle}
                  controls={getControls(item)}
                />
              );
            }}
          />
          {/* {todayMatchesList.map(matchItem => {
            return (
              <PhotoItem
                key={generateId()}
                {...matchItem}
                containerStyle={styles.photoContainerStyle}
                controls={getControls(matchItem)}
              />
            );
          })} */}
        </Box>
      </DashboardItem>
    );
  };

  const getListItem = () => {
    return (
      <Box
        paddingHorizontal={10}
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="between">
        {todayMatchesList.map(matchItem => {
          return (
            <ClubItem
              key={generateId()}
              {...matchItem}
              photos={friendsList}
              containerStyle={styles.photoContainerStyle}
            />
          );
        })}
      </Box>
    );
  };

  return (
    <Box paddingTop={10}>
      <ScrollView>
        {viewType === 'grid' ? getGridItem("Today's Matches") : getListItem()}
        {viewType === 'grid'
          ? getGridItem("Yesterday's Matches")
          : getListItem()}
      </ScrollView>
    </Box>
  );
};

const getStyles = ({theme, height}) => {
  const styles = {
    photoContainerStyle: {
      marginBottom: 10,
    },
    lastItem: {
      marginRight: 'auto',
    },
    titleStyle: {fontWeight: '500', fontSize: 18},
    badgeStyle: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.light2,
      fontWeight: '500',
    },
  };
  return createStyles(styles);
};

export default ClubbiesTab;
