import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Content from '@src/components/Content';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-paper';
import {generateId, getShadow} from '@src/utils/common';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import HomeTab from '@src/modules/Home/HomeTab';
import DashboardScreen from '@src/screens/Dashboard/DashboardScreen';
import {Box} from 'react-native-design-utility';
import AddPostSlider from '@src/screens/AddPost/AddPostSlider';
import PostList from '@src/modules/Posts/PostList';
import {ProfileScreen} from '@src/screens/Auth/ProfileScreen';
import ChatScreen from '@src/screens/Chat/ChatScreen';
import {BunkerSlider} from '@src/screens/Bunker/BunkerSlider';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({state, descriptors, navigation}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <Box
      flexDirection="row"
      pb={insets.bottom}
      bg={theme.colors.bgPrimary}
      padding={10}
      style={{...getShadow()}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName = 'home-outline';
        let IconComponent = Icon;
        let labelText = label;
        if (label === 'Dashboard') {
          IconComponent = Ionicons;
          labelText = 'Home';
        } else if (label === 'Bunker') {
          iconName = 'inbox-outline';
        } else if (label === 'Post') {
          IconComponent = Ionicons;
          iconName = 'add-circle-outline';
        } else if (label === 'Chat') {
          iconName = 'comment-multiple-outline';
        } else if (label === 'Profile') {
          iconName = 'account-circle-outline';
        }

        return (
          <TouchableOpacity
            key={generateId()}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              padding: 10,
            }}>
            <IconComponent
              name={iconName}
              size={24}
              style={{
                color: isFocused ? theme.colors.primary : theme.colors.border,
                fontWeight: isFocused ? '500' : '300',
              }}
            />
            <Content
              centerProps={{
                style: {
                  color: isFocused ? theme.colors.primary : theme.colors.border,
                  fontWeight: isFocused ? '500' : '300',
                },
              }}>
              {labelText}
            </Content>
          </TouchableOpacity>
        );
      })}
    </Box>
  );
};

const HomeNavigation = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{minHeight: 20}}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Bunker" component={BunkerSlider} />
      <Tab.Screen name="Post" component={AddPostSlider} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export {HomeNavigation};
