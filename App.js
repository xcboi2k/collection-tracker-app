import React, { useState } from "react";
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import colors from "./assets/themes/colors";
import MainApp from './components/MainApp/MainApp'

export default function App() {
  let [fontsLoaded] = useFonts({
    "Inter-Bold": require('./assets/fonts/Inter-Bold.otf'),
    "Inter-Light": require('./assets/fonts/Inter-Light.otf'),
    "Inter-Regular": require('./assets/fonts/Inter-Regular.otf'),
    "Inter-Medium": require('./assets/fonts/Inter-Medium.otf'),
    "Inter-Black": require('./assets/fonts/Inter-Black.otf'),
    "Inter-Italic": require('./assets/fonts/Inter-Italic.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
    <>
      <StatusBar backgroundColor={colors.primary.colorOne}/>
      <MainApp/>
    </>
    
  );
}