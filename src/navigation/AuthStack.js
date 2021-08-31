import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {IntroSlider} from '@src/screens/IntroSlider/IntroSlider';
import {LoginScreen} from '@src/screens/Auth/LoginScreen';
import {RegisterScreen} from '@src/screens/Auth/RegisterScreen';
import {UploadBioScreen} from '@src/screens/Auth/UploadBioScreen';
import {AddInterestsScreen} from '@src/screens/Auth/AddInterestsScreen';
import {EducationProfessionScreen} from '@src/screens/Auth/EducationProfessionScreen';
import {WelcomeScreen} from '@src/screens/Auth/WelcomeScreen';
import {ProfileScreen} from '@src/screens/Auth/ProfileScreen';
import {LikesListScreen} from '@src/screens/Auth/LikesListScreen';
import {ForgotPasswordScreen} from '@src/screens/Auth/ForgotPasswordScreen';
import {AlertScreen} from '@src/screens/Auth/AlertScreen';

const Stack = createStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="IntroSlider" component={IntroSlider} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="UploadBio" component={UploadBioScreen} />
      <Stack.Screen name="AddInterests" component={AddInterestsScreen} />
      <Stack.Screen
        name="EducationCareer"
        component={EducationProfessionScreen}
      />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Likes" component={LikesListScreen} />
      <Stack.Screen name="Alert" component={AlertScreen} />
    </Stack.Navigator>
  );
}
