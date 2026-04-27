import { View, Text } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import WishlistScreen from '../screens/main/WishlistScreen'
import WishlistAddScreen from '../screens/main/WishlistAddScreen'
import WishlistEditScreen from '../screens/main/WishlistEditScreen'

const WishlistStack = createNativeStackNavigator()

const WishlistNavigator = () => {
    return (
        <WishlistStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="WishlistMain"
            id=""
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
