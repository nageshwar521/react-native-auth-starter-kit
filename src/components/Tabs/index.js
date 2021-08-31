import * as React from 'react';
import {generateId} from '@src/utils/common';
import {TouchableOpacity} from 'react-native';
import createStyles from '@src/utils/createStyles';
import {Text, ToggleButton, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Box} from 'react-native-design-utility';
import Content from '../Content';

const Tabs = ({
  items = [],
  showTabContent = true,
  selectedValue,
  onChange,
  style = {},
  buttonStyle = {},
  selectedButtonStyle = {},
  iconStyle = {},
  selectedIconStyle = {},
  labelStyle = {},
  selectedLabelStyle = {},
  containerProps = {},
  tabContainerProps = {},
  tabsWrapperProps = {},
  tabContentContainerProps = {},
  tabPosition = 'top',
  firstTabStyle = {},
  lastTabStyle = {},
  contentProps = {},
  getTabContent,
  tabLabelColor,
  selectedTabLabelColor,
}) => {
  const theme = useTheme();
  const tabTextColor = tabLabelColor || theme.colors.border;
  const selectedTabTextColor = selectedTabLabelColor || theme.colors.primary;
  const styles = getStyles({theme, tabTextColor, selectedTabTextColor});
  const [currentTab, setCurrentTab] = React.useState(selectedValue);

  const handleChange = selectedValue => {
    setCurrentTab(selectedValue);
    if (onChange) {
      onChange(selectedValue);
    }
  };

  const getContent = () => {
    const selectedTab = items.find(item => item.value === selectedValue);
    return selectedTab.content;
  };

  const getTabs = () => {
    return (
      <Box
        flexDirection="row"
        style={[styles.container, style]}
        {...tabContainerProps}>
        <Box f={1} flexDirection="row" {...tabsWrapperProps}>
          {items.map(
            (
              {
                buttonProps = {},
                icon,
                iconProps = {},
                label,
                labelProps = {},
                value,
              },
              index,
            ) => {
              const isFirst = index === 0;
              const isLast = index === items.length - 1;
              const isSelected = value === selectedValue;
              const defaultLabelStyle = [
                styles.labelStyle,
                labelStyle,
                isSelected ? styles.selectedLabelStyle : null,
                isSelected ? selectedLabelStyle : null,
              ];

              return (
                <TouchableOpacity
                  key={`${index}_${generateId()}`}
                  onPress={handleChange.bind(null, value)}
                  style={[
                    styles.buttonStyle,
                    buttonStyle,
                    isSelected ? styles.selectedButtonStyle : null,
                    isSelected ? selectedButtonStyle : null,
                    isFirst ? firstTabStyle : null,
                    isLast ? lastTabStyle : null,
                  ]}
                  {...buttonProps}>
                  {icon ? (
                    <Icon
                      size={24}
                      name={icon}
                      style={[
                        styles.iconStyle,
                        iconStyle,
                        isSelected ? styles.selectedIconStyle : null,
                        selectedIconStyle,
                      ]}
                      {...iconProps}
                    />
                  ) : null}
                  {label ? (
                    <Text style={defaultLabelStyle} {...labelProps}>
                      {label}
                    </Text>
                  ) : null}
                </TouchableOpacity>
              );
            },
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Box {...containerProps}>
      {tabPosition === 'top' ? getTabs() : null}
      {showTabContent ? (
        <Box {...tabContentContainerProps}>
          {getTabContent
            ? getTabContent({contentProps, currentTab})
            : getContent()}
        </Box>
      ) : null}
      {tabPosition === 'bottom' ? getTabs() : null}
    </Box>
  );
};

const getStyles = ({theme, tabTextColor, selectedTabTextColor}) => {
  const styles = {
    container: {
      justifyContent: 'space-between',
    },
    buttonStyle: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      borderWidth: 0,
      borderBottomWidth: 4,
      borderColor: 'transparent',
      paddingBottom: 5,
      marginHorizontal: 20,
    },
    selectedButtonStyle: {
      borderColor: theme.colors.primary,
    },
    iconStyle: {
      color: tabTextColor,
    },
    selectedIconStyle: {
      color: selectedTabTextColor,
    },
    labelStyle: {
      fontSize: 14,
      color: tabTextColor,
      fontWeight: '500',
      fontFamily: 'Montserrat-ExtraBold',
    },
    selectedLabelStyle: {
      color: selectedTabTextColor,
      fontWeight: '500',
      fontFamily: 'Montserrat-ExtraBold',
    },
  };
  return createStyles(styles);
};

export default Tabs;
