import React from 'react';
import {List, Searchbar, useTheme, IconButton} from 'react-native-paper';
import createStyles from '@src/utils/createStyles';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native';
import {getShadow} from '@src/utils/common';
import {useSelector} from 'react-redux';

const SearchBar = ({
  searchTxt,
  onSearchChange,
  searchBarProps = {},
  backgroundProps = {},
  onPress,
  colors,
  vertical = false,
  leftIcon = 'magnify',
  leftIconProps = {},
  rightIcon,
  rightIconProps = {},
  placeholder = 'Search',
  title = '',
  containerStyle = {},
  backgroundStyle = {},
}) => {
  const theme = useTheme();
  const styles = getStyles({theme});
  const currentTheme = useSelector(state => state.common.currentTheme);
  const primary = currentTheme === 'dark';

  const verticalGradient = {
    start: {x: 0, y: 0},
    end: {x: 0, y: 1},
  };

  const horizontalGradient = {
    start: {x: 0, y: 0},
    end: {x: 1, y: 0},
  };

  const handleSearchChange = query => {
    if (onSearchChange) {
      onSearchChange();
    }
  };

  const handleSearchPress = () => {
    navigation.navigate('Search');
  };

  let leftComponentProps = {};
  if (leftIcon) {
    leftComponentProps = {
      left: props => (
        <List.Icon
          color={theme.colors.textDark}
          icon={leftIcon}
          {...leftIconProps}
        />
      ),
    };
  }

  let rightComponentProps = {};
  if (rightIcon) {
    rightComponentProps = {
      right: props => (
        <IconButton
          color={theme.colors.primary}
          icon={rightIcon}
          {...rightIconProps}
        />
      ),
    };
  }

  if (onPress) {
    return (
      <LinearGradient
        {...(vertical ? {...verticalGradient} : {...horizontalGradient})}
        colors={
          colors
            ? colors
            : primary
            ? [theme.colors.dark1, theme.colors.dark2]
            : [theme.colors.light1, theme.colors.light2]
        }
        style={[styles.backgroundStyle, backgroundStyle]}
        {...backgroundProps}>
        <List.Item
          titleStyle={styles.searchTitleStyle}
          title={title}
          onPress={onPress}
          {...searchBarProps}
          {...leftComponentProps}
          {...rightComponentProps}
        />
      </LinearGradient>
    );
  }
  return (
    <LinearGradient
      {...verticalGradient}
      colors={
        primary
          ? [theme.colors.dark1, theme.colors.dark2]
          : [theme.colors.light1, theme.colors.light2]
      }
      style={[styles.backgroundStyle, backgroundStyle]}
      {...backgroundProps}>
      <Searchbar
        style={[styles.container, containerStyle]}
        placeholder={placeholder}
        onChangeText={handleSearchChange}
        value={searchTxt}
        onPress={handleSearchPress}
        iconColor={theme.colors.textDark}
        placeholderTextColor={theme.colors.textDark}
        theme={{colors: {text: theme.colors.textDark}}}
        {...searchBarProps}
        {...leftComponentProps}
        {...rightComponentProps}
      />
    </LinearGradient>
  );
};

const getStyles = ({theme}) => {
  const styles = {
    container: {
      backgroundColor: 'transparent',
      borderRadius: 10,
      height: 50,
      ...getShadow({size: 0}),
    },
    backgroundStyle: {
      borderRadius: 10,
      margin: 15,
      height: 50,
      ...getShadow(),
    },
    searchInputStyle: {
      color: theme.colors.textDark,
    },
    searchTitleStyle: {
      color: theme.colors.textDark,
    },
  };
  return createStyles(styles);
};

export {SearchBar};
