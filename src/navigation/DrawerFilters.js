import * as React from 'react';
import {Alert} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerContent,
  DrawerView,
  DrawerItem,
} from '@react-navigation/drawer';
import useLogout from '../hooks/useLogout';
import {useRoute} from '@react-navigation/core';
import TaskDetails from '../screens/Tasks/TaskDetails';
import TaskTabs from '../screens/Tasks/TaskTabs';
import {useTheme} from 'react-native-paper';
import createStyles from '../utils/createStyles';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  const route = useRoute();
  const {colors} = useTheme();
  const styles = getStyles({colors});

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
        },
      },
    ]);
  };
  const handleSubmitPress = () => {
    props.navigation.closeDrawer();
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerView style={styles.flexGrow} />
      <DrawerView>
        <DrawerItem label="Submit" onPress={() => handleSubmitPress()} />
      </DrawerView>
    </DrawerContentScrollView>
  );
};

const DrawerFilters = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
    />
  );
};

const getStyles = ({colors}) => {
  const styles = {
    drawerView: {
      flexGrow: 1,
    },
    flexGrow: {
      flexGrow: 1,
    },
  };

  return createStyles(styles);
};

export default DrawerFilters;
