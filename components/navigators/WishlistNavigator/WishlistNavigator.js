import { View, Text } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WishlistScreen from '../../screens/WishlistScreen';
import WishlistAddScreen from '../../screens/WishlistAddScreen';
import WishlistEditScreen from '../../screens/WishlistEditScreen';

const WishlistStack = createNativeStackNavigator();

const WishlistNavigator = () => {
    return (
        <WishlistStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="WishlistMain"
        >
            <WishlistStack.Screen
                name="WishlistMain"
                component={WishlistScreen}
                initialParams={{ key: Math.random().toString() }}
            />
            <WishlistStack.Screen
                name="WishlistAdd"
                component={WishlistAddScreen}
            />
            <WishlistStack.Screen
                name="WishlistEdit"
                component={WishlistEditScreen}
            />
        </WishlistStack.Navigator>
    )
}

export default WishlistNavigator