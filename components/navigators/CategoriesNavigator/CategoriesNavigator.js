import { View, Text } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CategoriesScreen from '../../screens/CategoriesScreen';
import CategoriesAddScreen from '../../screens/CategoriesAddScreen';
import CategoriesEditScreen from '../../screens/CategoriesEditScreen';

const CategoriesStack = createNativeStackNavigator();

const CategoriesNavigator = () => {
    return (
        <CategoriesStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="Categories"
        >
            <CategoriesStack.Screen
                name="CategoriesMain"
                component={CategoriesScreen}
                initialParams={{ key: Math.random().toString() }}
            />
            <CategoriesStack.Screen
                name="CategoriesAdd"
                component={CategoriesAddScreen}
            />
            <CategoriesStack.Screen
                name="CategoriesEdit"
                component={CategoriesEditScreen}
            />
        </CategoriesStack.Navigator>
    )
}

export default CategoriesNavigator