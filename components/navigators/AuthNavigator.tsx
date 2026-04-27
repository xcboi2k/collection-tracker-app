import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from '../screens/auth/LoginScreen'
import SignUpScreen from '../screens/auth/SignUpScreen'

const AuthStack = createNativeStackNavigator()

const AuthNavigator = () => {
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="Login"
            id=""
        >
            <AuthStack.Screen
                name="Login"
                component={LoginScreen}
                initialParams={{ key: Math.random().toString() }}
            />
            <AuthStack.Screen name="SignUp" component={SignUpScreen} />
        </AuthStack.Navigator>
    )
}

export default AuthNavigator
