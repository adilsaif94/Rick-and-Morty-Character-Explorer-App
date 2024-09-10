import { StatusBar } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from '../Screens/HomePage';
import CharacterListPage from '../Screens/CharacterListPage';
import ViewCharacter from '../Screens/ViewCharacter';
import FavouriteCharacter from '../Screens/FavouriteCharacter';
import SplashScreen from '../Screens/SplashScreen';
import LogoPage from '../Screens/loginSignupWithApi/LogoPage';
import Welcome from '../Screens/loginSignupWithApi/Welcome';
import SignIn from '../Screens/loginSignupWithApi/SignIn';
import SignUp from '../Screens/loginSignupWithApi/SignUp';
import UserDashboard from '../Screens/loginSignupWithApi/UserDashboard';




const Stack = createNativeStackNavigator();

const Navigators = () => {
  return (
    <>
      {/* <StatusBar backgroundColor="#69c706" barStyle="light-content" />
      <Stack.Navigator screenOptions={{ headerShown: false, }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="CharacterListPage" component={CharacterListPage} />
        <Stack.Screen name="ViewCharacter" component={ViewCharacter} />
        <Stack.Screen name="FavouriteCharacter" component={FavouriteCharacter} />
      </Stack.Navigator> */}
     
      <Stack.Navigator screenOptions={{ headerShown: false, }}>
        <Stack.Screen name="LogoPage" component={LogoPage} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
      </Stack.Navigator>
    </>

  );
};


export default Navigators

