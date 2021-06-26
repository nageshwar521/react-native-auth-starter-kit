import * as React from 'react';
import {Appbar, IconButton} from 'react-native-paper';
import createStyles from '../../utils/createStyles';
import {useTheme} from 'react-native-paper';
import Button from '../Button';

const Header = ({
  leftIcon = 'menu',
  title,
  subtitle = '',
  actions = [],
  onLeftPress,
  onActionPress,
  titleStyle = {},
  subtitleStyle = {},
}) => {
  const {colors} = useTheme();
  const styles = getStyles();

  const handleActionPress = (data) => {
    if (actions.length > 0 && onActionPress) {
      onActionPress(data);
    }
  };

  const handleToggleSidebar = () => {
    console.log('handleToggleSidebar');
    if (onLeftPress) {
      onLeftPress();
    }
  };

  return (
    <Appbar.Header>
      {/* <Appbar.BackAction color={colors.textLight} onPress={_goBack} /> */}
      <IconButton
        color={colors.textLight}
        icon={leftIcon}
        onPress={handleToggleSidebar}
      />
      <Appbar.Content
        titleStyle={[styles.titleStyle, titleStyle]}
        subtitleStyle={[styles.subtitleStyle, subtitleStyle]}
        title={title}
        subtitle={subtitle}
      />
      {actions.map((actionItem) => {
        return actionItem.icon ? (
          <IconButton
            color={colors.textLight}
            key={actionItem.type}
            icon={actionItem.icon}
            onPress={handleActionPress.bind(null, actionItem)}
            disabled={actionItem.disabled}
          />
        ) : (
          <Button
            position="full"
            size="small"
            mode="text"
            labelStyle={styles.buttonTextStyle}
            disabledLabelStyle={styles.disabledButtonTextStyle}
            key={actionItem.type}
            onPress={handleActionPress.bind(null, actionItem)}
            disabled={actionItem.disabled}>
            {actionItem.label}
          </Button>
        );
      })}
    </Appbar.Header>
  );
};

const getStyles = () => {
  const styles = {
    titleStyle: {
      color: '#FFF',
    },
    subtitleStyle: {
      color: '#FFF',
    },
    buttonTextStyle: {
      color: '#FFF',
    },
    disabledButtonTextStyle: {
      color: '#CCC',
    },
  };
  return createStyles(styles);
};

export default Header;
