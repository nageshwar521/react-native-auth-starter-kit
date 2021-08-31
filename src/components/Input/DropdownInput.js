import React, {useState} from 'react';
import {TouchableOpacity, View, Dimensions} from 'react-native';
import {
  TextInput as TextInputField,
  Button,
  useTheme,
  Text,
} from 'react-native-paper';
import Content from '@src/components/Content';
import createStyles from '@src/utils/createStyles';
import {List, Dialog, Portal} from 'react-native-paper';
import {getI18nMessage} from '@src/translations/messages';
import TextInput from './TextInput';
import {gradientWrapper} from '@src/utils/gradientWrapper';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {getShadow} from '@src/utils/common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DropdownInput = ({
  style,
  onChange,
  minHeight = 40,
  value,
  items = [],
  placeholder,
  dropdownTitle = 'Select one',
  label,
  backgroundProps = {},
  inputProps = {},
  textProps = {},
  iconProps = {},
  backgroundStyle = {},
  inputStyle = {},
  inputTextStyle = {},
  inputIconStyle = {},
}) => {
  const theme = useTheme();
  const styles = getStyles({minHeight, theme, value});
  const currentTheme = useSelector(state => state.common.currentTheme);
  const primary = currentTheme === 'dark';
  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  const handleSelect = params => {
    // console.log('handleSelect', onChange);
    if (onChange) {
      onChange(params.value);
    }
    hideDialog();
  };

  const verticalGradient = {
    start: {x: 0, y: 0},
    end: {x: 0, y: 1},
  };

  const horizontalGradient = {
    start: {x: 0, y: 0},
    end: {x: 1, y: 0},
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.backgroundStyle, backgroundStyle]}
        onPress={() => setVisible(true)}
        {...inputProps}>
        <LinearGradient
          {...verticalGradient}
          colors={
            primary
              ? [theme.colors.dark1, theme.colors.dark2]
              : [theme.colors.light1, theme.colors.light2]
          }
          style={[styles.inputStyle, inputStyle]}
          {...backgroundProps}>
          <Text style={[styles.inputTextStyle, inputTextStyle]} {...textProps}>
            {value ? value.toString() : placeholder ? placeholder : label}
          </Text>
          <Icon
            size={24}
            name="chevron-down"
            style={[styles.inputIconStyle, inputIconStyle]}
            {...iconProps}
          />
        </LinearGradient>
      </TouchableOpacity>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{dropdownTitle}</Dialog.Title>
          <Dialog.Content>
            {items.map(item => {
              let iconProps = {
                right: props => (
                  <List.Icon {...props} color="transparent" icon="check" />
                ),
              };
              if (item.value === value) {
                iconProps = {
                  right: props => <List.Icon {...props} icon="check" />,
                };
              }
              return (
                <List.Item
                  key={item.label}
                  title={item.label}
                  onPress={handleSelect.bind(null, item)}
                  {...iconProps}
                />
              );
            })}
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
};

const getStyles = ({minHeight, value, theme}) => {
  const styles = {
    backgroundStyle: {
      borderRadius: 10,
      marginBottom: 15,
      height: 50,
      ...getShadow(),
    },
    inputStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
      height: 50,
      paddingLeft: 15,
      paddingRight: 15,
    },
    inputTextStyle: {
      color: value ? theme.colors.dark3 : theme.colors.border,
      fontSize: 18,
      paddingRight: 10,
      flexGrow: 1,
    },
    inputIconStyle: {
      color: value ? theme.colors.dark3 : theme.colors.border,
    },
  };
  return createStyles(styles);
};

export default DropdownInput;
