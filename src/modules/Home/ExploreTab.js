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
import {
  Button,
  useTheme,
  Card,
  List,
  Text,
  Searchbar,
} from 'react-native-paper';
import MultiSelectList from '@src/components/MultiSelectList';
import {generateId, getShadow} from '@src/utils/common';
import {DashboardItem} from '@src/modules/Dashboard/DashboardItem';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SearchBar} from '../../components/Search/SearchBar';
import {useNavigation} from '@react-navigation/native';
import Content from '@src/components/Content';
import FastImage from 'react-native-fast-image';
import PostBlock from './PostBlock';
import TagBlock from './TagBlock';
import InterestBlock from './InterestBlock';
import ImageBlock from './ImageBlock';
import {GradientWrapper} from '@src/components/Gradient/GradientWrapper';

const {width} = Dimensions.get('screen');

const postWidth = width / 2 - 20;
const interestWidth = width / 2 - 50;
const interestHeight = interestWidth - 50;

const keywords = ['Trending', 'Philosophy for design', 'When nature hurts'];

const ExploreTab = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = getStyles({theme, width});
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [keyword, setKeyword] = React.useState(keywords[0]);

  const handleKeywordPress = keyword => {
    setKeyword(keyword);
  };

  const renderKeywordItem = ({item}) => {
    const isActive = item === keyword;
    return (
      <TouchableOpacity
        style={[
          styles.keywordButtonStyle,
          isActive ? styles.keywordSelectedButtonStyle : null,
        ]}
        onPress={handleKeywordPress.bind(null, item)}>
        <Content
          centerProps={{
            style: [
              styles.keywordButtonTextStyle,
              isActive ? styles.keywordSelectedButtonTextStyle : null,
            ],
          }}>
          {item}
        </Content>
      </TouchableOpacity>
    );
  };

  const handleSearchPress = () => {
    navigation.navigate('Search');
  };

  return (
    <ScrollView>
      <Box paddingTop={20} paddingBottom={200}>
        <Box {...getShadow()} marginHorizontal={20}>
          <TouchableOpacity onPress={handleSearchPress}>
            <GradientWrapper minHeight={50} height={50}>
              <Searchbar style={{backgroundColor: 'transparent', padding: 3}} />
            </GradientWrapper>
          </TouchableOpacity>
        </Box>
        <Box>
          <MultiSelectList
            items={keywords}
            listProps={{horizontal: true}}
            renderItem={renderKeywordItem}
          />
        </Box>
        {keyword === 'Trending' ? <PostBlock /> : null}
        {keyword === 'Trending' ? <TagBlock /> : null}
        {keyword === 'Trending' ? <InterestBlock /> : null}
        {keyword === 'Trending' || keyword === 'Philosophy for design' ? (
          <ImageBlock />
        ) : null}
      </Box>
    </ScrollView>
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

export default ExploreTab;
