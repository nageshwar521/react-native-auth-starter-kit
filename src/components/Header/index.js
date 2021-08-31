import * as React from 'react';
import {Appbar, IconButton} from 'react-native-paper';
import createStyles from '@src/utils/createStyles';
import {useTheme} from 'react-native-paper';
import Button from '../Button';
import Content from '../Content';
import {useNavigation} from '@react-navigation/native';

const Header = ({
  leftIcon,
  title,
  getTitle,
  subtitle = '',
  actions = [],
  onLeftPress,
  onActionPress,
  containerProps = {},
  titleContainerStyle = {},
  titleStyle = {},
  subtitleStyle = {},
  searchIcon = true,
  notificationIcon = true,
  titleLeftSize = 0,
  getExtraContent,
}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = getStyles({theme, leftIcon, titleLeftSize});

  const handleSearch = () => {
    navigation.navigate('Search');
  };

  const handleNotifications = () => {
    navigation.navigate('Notifications');
  };

  const handleLeftPress = () => {
    if (onLeftPress) {
      onLeftPress();
    }
  };

  const handleActionPress = action => {
    if (onActionPress) {
      onActionPress(action);
    }
  };

  return (
    <Appbar.Header
      theme={{colors: {primary: theme.colors.bgPrimary}}}
      {...containerProps}
      style={{height: 'auto'}}>
      {leftIcon ? (
        <Appbar.Action size={30} icon={leftIcon} onPress={handleLeftPress} />
      ) : null}
      {getTitle ? (
        getTitle()
      ) : (
        <Appbar.Content
          style={[styles.titleContainerStyle, titleContainerStyle]}
          titleStyle={[styles.titleStyle, titleStyle]}
          subtitleStyle={[styles.subtitleStyle, subtitleStyle]}
          title={title}
          subtitle={subtitle}
        />
      )}
      {searchIcon ? (
        <Appbar.Action size={30} icon="magnify" onPress={handleSearch} />
      ) : null}
      {notificationIcon ? (
        <Appbar.Action
          size={30}
          icon="bell-outline"
          onPress={handleNotifications}
        />
      ) : null}
      {actions.map(action => {
        return (
          <Appbar.Action
            key={action}
            size={30}
            icon={action}
            onPress={handleActionPress.bind(null, action)}
          />
        );
      })}
    </Appbar.Header>
  );
};

const getStyles = ({theme, leftIcon, titleLeftSize}) => {
  const styles = {
    titleStyle: {
      color: theme.colors.textDark,
      fontWeight: '500',
      fontFamily: 'Montserrat-Bold',
      fontSize: 24,
    },
    titleContainerStyle: {
      alignItems: 'flex-start',
      left: titleLeftSize,
    },
  };
  return createStyles(styles);
};

export default Header;
