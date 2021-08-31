import React from 'react';
import {Box} from 'react-native-design-utility';
import {SearchBar} from '@src/components/Search/SearchBar';
import MultiSelectList from '@src/components/MultiSelectList';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {List, useTheme} from 'react-native-paper';
import createStyles from '@src/utils/createStyles';
import Content from '@src/components/Content';

const searchResults = [
  {
    title: 'Marie Winter',
    description: 'Person',
  },
  {
    title: 'Marie Winter',
    description: 'Post',
  },
  {
    title: 'Marie Winter',
    description: 'Situational Interest',
  },
  {
    title: 'Marie Winter',
    description: '#Tag',
  },
];

const SearchScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = getStyles({theme});

  const handleBackPress = () => {
    navigation.navigate('HomeNavigation');
  };

  const renderListItem = ({item}) => {
    return (
      <List.Item
        title={item.title}
        titleStyle={styles.searchResultTitleStyle}
        right={props => (
          <Box justifyContent="center">
            <Content {...props} style={styles.searchResultTextStyle}>
              {item.description}
            </Content>
          </Box>
        )}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Box f={1} p={10} bg={theme.colors.bgPrimary}>
        <SearchBar
          searchBarProps={{onIconPress: handleBackPress, icon: 'arrow-left'}}
        />
        <Box paddingTop={20}>
          <MultiSelectList items={searchResults} renderItem={renderListItem} />
        </Box>
      </Box>
    </SafeAreaView>
  );
};

const getStyles = ({theme}) => {
  const styles = {
    container: {
      backgroundColor: 'transparent',
      borderRadius: 10,
    },
    searchResultTitleStyle: {
      fontWeight: '500',
      color: theme.colors.textDark,
    },
    searchResultTextStyle: {
      color: theme.colors.textDark,
    },
  };
  return createStyles(styles);
};

export default SearchScreen;
