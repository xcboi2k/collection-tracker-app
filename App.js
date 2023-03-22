import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  let [fontsLoaded] = useFonts({
    "Inter-Bold": require('assets/fonts/Inter-Bold.otf'),
    "Inter-Light": require('assets/fonts/Inter-Light.otf'),
    "Inter-Regular": require('assets/fonts/Inter-Regular.otf'),
    "Inter-Medium": require('assets/fonts/Inter-Medium.otf'),
    "Inter-Black": require('assets/fonts/Inter-Black.otf'),
    "Inter-Italic": require('assets/fonts/Inter-Italic.otf'),
  });
  
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
