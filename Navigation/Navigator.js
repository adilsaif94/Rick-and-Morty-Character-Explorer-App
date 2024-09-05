import { StatusBar } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from '../Screens/HomePage';
import CharacterListPage from '../Screens/CharacterListPage';
import ViewCharacter from '../Screens/ViewCharacter';
import FavouriteCharacter from '../Screens/FavouriteCharacter';
import SplashScreen from '../Screens/SplashScreen';



const Stack = createNativeStackNavigator();

const Navigators = () => {
  return (
    <>
      <StatusBar backgroundColor="#69c706" barStyle="light-content" />
      <Stack.Navigator screenOptions={{ headerShown: false, }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="CharacterListPage" component={CharacterListPage} />
        <Stack.Screen name="ViewCharacter" component={ViewCharacter} />
        <Stack.Screen name="FavouriteCharacter" component={FavouriteCharacter} />
      </Stack.Navigator>
    </>

  );
};


export default Navigators

