import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Content from '../Content';
import Button from '../Button';
import {Box} from 'react-native-design-utility';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {generateId, getShadow} from '@src/utils/common';
import {useNavigation} from '@react-navigation/native';
import createStyles from '@src/utils/createStyles';
import {Paragraph, Dialog, Portal, useTheme, Text} from 'react-native-paper';
import {useSelector} from 'react-redux';

const Modal = ({
  visible,
  title,
  children,
  contentProps = {},
  onHide,
  position = 'bottom',
  contentStyle = {},
  containerStyle = {},
  titleStyle = {},
  closeButtonStyle = {},
  closeIconProps = {},
}) => {
  const theme = useTheme();
  const currentTheme = useSelector(state => state.common.currentTheme);
  const primary = currentTheme === 'dark';
  const styles = getStyles({theme, primary});
  const handleHide = () => {
    if (onHide) {
      onHide();
    }
  };

  let extraProps = {};
  if (position === 'center') {
    extraProps = {top: 0};
  }

  return (
    <Portal>
      <Dialog
        style={[styles.container, containerStyle]}
        visible={visible}
        onDismiss={handleHide}>
        <Box
          position="absolute"
          left={0}
          right={0}
          bottom={0}
          style={[styles.content, contentStyle]}
          {...extraProps}>
          <Box flexDirection="row">
            {title ? (
              <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
            ) : null}
            <Box flexGrow={1} />
            <TouchableOpacity
              style={[styles.closeButtonStyle, closeButtonStyle]}
              onPress={handleHide}>
              <Icon
                name="close"
                size={24}
                color={theme.colors.textDark}
                {...closeIconProps}
              />
            </TouchableOpacity>
          </Box>
          <Box paddingHorizontal={13} paddingBottom={20} {...contentProps}>
            {children}
          </Box>
        </Box>
      </Dialog>
    </Portal>
  );
};

const getStyles = ({theme, primary}) => {
  const styles = {
    container: {flex: 1, backgroundColor: 'transparent', marginHorizontal: 0},
    content: {
      backgroundColor: theme.colors.bgPrimary,
    },
    closeButtonStyle: {color: theme.colors.textDark, padding: 10},
    titleStyle: {
      fontSize: 18,
      color: primary ? theme.colors.light2 : theme.colors.black,
      fontWeight: '500',
      paddingVertical: 15,
      paddingLeft: 15,
    },
  };
  return createStyles(styles);
};

export default Modal;
