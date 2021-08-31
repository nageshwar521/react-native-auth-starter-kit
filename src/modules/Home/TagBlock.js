import React from 'react';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Box} from 'react-native-design-utility';
import {useDispatch, useSelector} from 'react-redux';
import createStyles from '@src/utils/createStyles';
import CardItem from '../../screens/Dashboard/CardItem';
import {Button, useTheme, Card, List, Text} from 'react-native-paper';
import MultiSelectList from '@src/components/MultiSelectList';
import {generateId, getShadow} from '@src/utils/common';
import {DashboardItem} from '@src/modules/Dashboard/DashboardItem';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SearchBar} from '../../components/Search/SearchBar';
import {useNavigation} from '@react-navigation/native';
import Content from '@src/components/Content';
import FastImage from 'react-native-fast-image';

const {width} = Dimensions.get('screen');

const postWidth = width / 2 - 20;
const interestWidth = width / 2 - 50;
const interestHeight = interestWidth - 50;
const imageWidth = width / 3;
const imageBigWidth = width / 2;

const hashTagsList = [
  {
    id: generateId(),
    tagName: 'newtrend',
    count: 100,
  },
  {
    id: generateId(),
    tagName: 'newimage',
    count: 100,
  },
  {
    id: generateId(),
    tagName: 'newtrend',
    count: 100,
  },
  {
    id: generateId(),
    tagName: 'newtrend',
    count: 100,
  },
];

const keywords = ['Trending', 'Philosophy for design', 'When nature hurts'];

const TagBlock = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = getStyles({theme, width});
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const renderTagItem = ({item}) => {
    return (
      <List.Item
        style={styles.tagItemStyle}
        left={props => (
          <List.Icon {...props} style={{marginRight: 0}} icon="pound" />
        )}
        title={`#${item.tagName}`}
        description={`${item.count}k posts`}
      />
    );
  };

  return (
    <Box>
      <DashboardItem
        title="#tags"
        headerContainerProps={{marginHorizontal: 15, marginBottom: 0}}>
        <MultiSelectList
          items={hashTagsList}
          listProps={{horizontal: true}}
          renderItem={renderTagItem}
        />
      </DashboardItem>
    </Box>
  );
};

const getStyles = ({theme, width}) => {
  const styles = {
    lastItem: {
      marginRight: 'auto',
    },
    backgroundStyle: {},
    buttonTextStyle: {color: theme.colors.primary},
    keywordButtonStyle: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 10,
      backgroundColor: theme.colors.light2,
      marginVertical: 15,
      marginLeft: 15,
      ...getShadow(),
    },
    keywordButtonTextStyle: {
      fontWeight: '500',
      color: theme.colors.dark3,
    },
    keywordSelectedButtonStyle: {
      backgroundColor: theme.colors.primary,
    },
    keywordSelectedButtonTextStyle: {
      color: theme.colors.light2,
      fontWeight: '500',
    },
    lastItemstyle: {marginRight: 0},
    postCardItemStyle: {
      backgroundColor: 'transparent',
      marginVertical: 15,
      marginLeft: 15,
    },
    postCardItemImageStyle: {width: postWidth, borderRadius: 15},
    interestCardItemImageStyle: {
      width: interestWidth,
      height: interestHeight,
      borderRadius: 15,
      marginBottom: 10,
    },
    interestTitle: {},
    tagItemStyle: {
      borderRadius: 10,
      width: postWidth,
      marginVertical: 15,
      marginLeft: 15,
      backgroundColor: theme.colors.light2,
      ...getShadow(),
    },
  };
  return createStyles(styles);
};

export default TagBlock;
