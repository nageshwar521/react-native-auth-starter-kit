import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TaskList from './TaskList';
import TaskSettings from './TaskSettings';
import createStyles from '../../utils/createStyles';
import {useTheme, Text, Badge, Surface} from 'react-native-paper';
// import Button from '../../components/Button';

function CustomTabs({state, descriptors, navigation}) {
  const {colors} = useTheme();
  const styles = getStyles({colors});
  return (
    <Surface style={styles.surface}>
      <View style={styles.row}>
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
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const Icon = options.tabBarIcon;

          return (
            <TouchableOpacity
              key={label}
              onPress={onPress}
              style={[
                styles.tabButton,
                isFocused ? styles.tabButtonActive : null,
              ]}>
              <Icon
                style={[
                  styles.tabButtonIcon,
                  isFocused ? styles.tabButtonIconActive : null,
                ]}
              />
              <Text
                style={[
                  styles.tabButtonLabel,
                  isFocused ? styles.tabButtonLabelActive : null,
                ]}>
                {label}
              </Text>
              {options.tabBarBadge ? (
                <Badge style={styles.tabButtonBadge}>
                  {options.tabBarBadge}
                </Badge>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>
    </Surface>
  );
}

const Tab = createBottomTabNavigator();

const TaskTabs = () => {
  const {colors} = useTheme();
  const styles = getStyles({colors});

  return (
    <Tab.Navigator
      initialRouteName="taskList"
      tabBarOptions={{
        inactiveBackgroundColor: colors.primary,
      }}
      tabBar={(props) => <CustomTabs {...props} />}>
      <Tab.Screen
        name="taskList"
        component={TaskList}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({color, size, style}) => (
            <MaterialCommunityIcons
              name="calendar-check"
              color={color}
              size={size}
              style={style}
            />
          ),
        }}
      />
      <Tab.Screen
        name="taskSettings"
        component={TaskSettings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size, style}) => (
            <MaterialCommunityIcons
              name="file-cog-outline"
              color={color}
              size={size}
              style={style}
            />
          ),
          tabBarBadge: 3,
        }}
      />
    </Tab.Navigator>
  );
};

const getStyles = ({colors}) => {
  const styles = {
    surface: {
      elevation: 4,
    },
    row: {
      flexDirection: 'row',
      margin: 0,
      padding: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabButton: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    tabButtonActive: {},
    tabButtonIcon: {
      fontSize: 20,
      color: '#000',
      padding: 5,
      paddingTop: 15,
    },
    tabButtonIconActive: {
      color: colors.primary,
      fontWeight: 'bold',
    },
    tabButtonLabel: {
      fontSize: 16,
      color: '#000',
      padding: 5,
      paddingBottom: 15,
    },
    tabButtonLabelActive: {
      color: colors.primary,
      fontWeight: 'bold',
    },
    tabButtonBadge: {
      position: 'absolute',
      left: '52%',
      top: '2%',
      fontWeight: 'bold',
    },
  };

  return createStyles(styles);
};

export default TaskTabs;
