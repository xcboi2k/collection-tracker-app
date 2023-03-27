import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainMenuScreen from '../../screens/MainMenuScreen';
import CollectionAddScreen from '../../screens/CollectionAddScreen';

const MainMenuStack = createNativeStackNavigator();

const MainMenuNavigator = () => {
    return (
        <MainMenuStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="Home"
        >
            <MainMenuStack.Screen
                name="HomeMain"
                component={MainMenuScreen}
            />
            <MainMenuStack.Screen
                name="CollectionAdd"
                component={CollectionAddScreen}
            />
        </MainMenuStack.Navigator>
    )
}

export default MainMenuNavigator