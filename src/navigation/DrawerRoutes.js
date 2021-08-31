import * as React from 'react';
import {Alert} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import useLogout from '@src/hooks/useLogout';
import {navigateOutside} from '@src/utils/navigationOutside';
import {useRoute} from '@react-navigation/core';
import TaskDetails from '@screens/Tasks/TaskDetails';
import TaskTabs from '@screens/Tasks/TaskTabs';
import {Divider} from 'react-native-paper';
import ProfileCard from '@screens/Profile/ProfileCard';

const Drawer = createDrawerNavigator();

export const drawerItemsMain = [
  {
    key: 'Home',
    title: 'Home',
    routes: [{nav: 'MainDrawer', routeName: 'Home', title: 'Home'}],
  },
  {
    key: 'Settings',
    title: 'Settings',
    routes: [
      {nav: 'MainDrawer', routeName: 'Settings1', title: 'Settings 1'},
      {nav: 'MainDrawer', routeName: 'Settings2', title: 'Settings 2'},
    ],
  },
];

const CustomDrawerContent = props => {
  const route = useRoute();
  const {userLogout, logoutStatus} = useLogout();

  React.useEffect(() => {
    if (logoutStatus === 'success') {
      navigateOutside({
        name: 'Login',
      });
      props.navigation.closeDrawer();
    }
  }, [logoutStatus]);

  const handleAlert = () => {
    console.log('handleAlert');
    Alert.alert('Logout', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          console.log('userLogout');
          userLogout();
        },
      },
    ]);
  };
  const handleTasksPress = () => {
    navigateOutside({
      name: 'Tasks',
    });
    props.navigation.closeDrawer();
  };
  return (
    <DrawerContentScrollView {...props}>
      <ProfileCard />
      <DrawerItem label="Tasks" onPress={handleTasksPress} />
      <Divider />
      <DrawerItem label="Expenses" onPress={handleTasksPress} />
      <Divider />
      <DrawerItem label="Logout" onPress={() => handleAlert()} />
    </DrawerContentScrollView>
  );
};

const DrawerRoutes = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Tasks"
      drawerContent={props => (
        <CustomDrawerContent drawerItems={drawerItemsMain} {...props} />
      )}>
      <Drawer.Screen name="Tasks" component={TaskTabs} />
      <Drawer.Screen name="TaskDetails" component={TaskDetails} />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
