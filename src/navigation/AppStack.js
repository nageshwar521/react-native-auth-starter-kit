import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeNavigation} from './HomeNavigation';
import SearchScreen from '@src/screens/SearchScreen';
import AddPostSlider from '@src/screens/AddPost/AddPostSlider';
import PostList from '@src/modules/Posts/PostList';
import NotificationsScreen from '@src/screens/Notifications/NotificationsScreen';
import {NewChatSearch} from '@src/screens/Chat/NewChatSearch';
import {StartChat} from '@src/screens/Chat/StartChat';
import Memories from '@src/screens/Bunker/Memories';
import AddBunker from '@src/screens/Bunker/AddBunker';
import CheersRoom from '@src/screens/Bunker/CheersRoom';

const Stack = createStackNavigator();

export function AppStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeNavigation" component={HomeNavigation} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="AddPost" component={AddPostSlider} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="NewChatSearch" component={NewChatSearch} />
      <Stack.Screen name="StartChat" component={StartChat} />
      <Stack.Screen name="PostList" component={PostList} />
      <Stack.Screen name="Memories" component={Memories} />
      <Stack.Screen name="AddBunker" component={AddBunker} />
      <Stack.Screen name="CheersRoom" component={CheersRoom} />
    </Stack.Navigator>
  );
}
