import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SettingsMenuScreen from '../screens/settings/SettingsMenuScreen'
import ProfileScreen from '../screens/settings/ProfileScreen'
import ChangePasswordScreen from '../screens/settings/ChangePasswordScreen'
import TermsConditionsScreen from '../screens/settings/TermsConditionsScreen'
import PrivacyPolicyScreen from '../screens/settings/PrivacyPolicyScreen'
import LogoutScreen from '../screens/settings/LogoutScreen'

const SettingsStack = createNativeStackNavigator()

const SettingsNavigator = () => {
    return (
        <SettingsStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="SettingsMain"
            id=""
        >
            <SettingsStack.Screen
                name="SettingsMain"
                component={SettingsMenuScreen}
                initialParams={{ key: Math.random().toString() }}
            />
            <SettingsStack.Screen name="Profile" component={ProfileScreen} />
            <SettingsStack.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
            />
            <SettingsStack.Screen
                name="TermsConditions"
                component={TermsConditionsScreen}
            />
            <SettingsStack.Screen
                name="PrivacyPolicy"
                component={PrivacyPolicyScreen}
            />
            <SettingsStack.Screen name="Logout" component={LogoutScreen} />
        </SettingsStack.Navigator>
    )
}

export default SettingsNavigator
