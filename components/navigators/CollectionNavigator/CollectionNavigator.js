import { View, Text } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CollectionScreen from '../../screens/CollectionScreen';
import CollectionEditScreen from '../../screens/CollectionEditScreen';

const CollectionStack = createNativeStackNavigator();

const CollectionNavigator = () => {
    return (
        <CollectionStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="Collection"
        >
            <CollectionStack.Screen
                name="CollectionMain"
                component={CollectionScreen}
                initialParams={{ key: Math.random().toString() }}
            />
            <CollectionStack.Screen
                name="CollectionEdit"
                component={CollectionEditScreen}
            />
        </CollectionStack.Navigator>
    )
}

export default CollectionNavigator