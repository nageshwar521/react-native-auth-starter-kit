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

const interestsList = [
  {
    id: generateId(),
    bgUrl: 'https://picsum.photos/700',
    title: 'Philosophy for design',
  },
  {
    id: generateId(),
    bgUrl: 'https://picsum.photos/800',
    title: 'Philosophy for design',
  },
  {
    id: generateId(),
    bgUrl: 'https://picsum.photos/900',
    title: 'Philosophy for design',
  },
];

const InterestBlock = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = getStyles({theme, width});
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const renderInterestItem = ({item}) => {
    return (
      <Box bg={theme.colors.light2} p={10} borderRadius={15} marginRight={15}>
        <Card.Cover
          style={styles.interestCardItemImageStyle}
          source={{uri: item.bgUrl}}
        />
        <Text style={styles.interestTitle}>{item.title}</Text>
      </Box>
    );
  };

  return (
    <Box>
      <DashboardItem
        title="Popular Situational Interests"
        headerContainerProps={{marginHorizontal: 15, marginBottom: 0}}>
        <Box paddingHorizontal={15} marginVertical={10}>
          <MultiSelectList
            items={interestsList}
            listProps={{horizontal: true}}
            renderItem={renderInterestItem}
          />
        </Box>
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

export default InterestBlock;
