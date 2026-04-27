import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Entypo from '@expo/vector-icons/Entypo'

import colors from '@/assets/themes/colors'

export default function SettingsMenuScreen({ navigation }) {
    const settingsDirectory = [
        {
            icon: (
                <FontAwesome
                    name="user"
                    size={20}
                    color={colors.primary.white}
                />
            ),
            text: 'Profile',
            onPress: () => navigation.navigate('Profile'),
        },
        {
            icon: (
                <FontAwesome
                    name="lock"
                    size={20}
                    color={colors.primary.white}
                />
            ),
            text: 'Account Password',
            onPress: () => navigation.navigate('ChangePassword'),
        },
        {
            icon: (
                <MaterialCommunityIcons
                    name="shield-alert"
                    size={20}
                    color={colors.primary.white}
                />
            ),
            text: 'Terms and Conditions',
            onPress: () => navigation.navigate('TermsConditions'),
            newSection: true,
        },
        {
            icon: (
                <MaterialIcons
                    name={'policy'}
                    size={20}
                    color={colors.primary.white}
                />
            ),
            text: 'Privacy Policy',
            onPress: () => navigation.navigate('PrivacyPolicy'),
        },
        {
            icon: (
                <MaterialIcons
                    name={'dashboard'}
                    size={20}
                    color={colors.primary.white}
                />
            ),
            text: 'Return to Dashboard',
            onPress: () =>
                navigation.navigate('MainMenuTab', {
                    screen: 'Home',
                }),
            newSection: true,
        },
        {
            icon: (
                <MaterialCommunityIcons
                    name="logout"
                    size={20}
                    color={colors.primary.white}
                />
            ),
            text: 'Log Out',
            onPress: () => navigation.navigate('Logout'),
        },
    ]
    return (
        <View className="flex-1 items-center pb-5 mt-10">
            <ScrollView className="w-full">
                <View className="w-full px-6 py-4">
                    {settingsDirectory.map(
                        ({ icon, text, onPress, newSection }, index) => {
                            const isMiscellaneous = [
                                'Terms and Conditions',
                                'Privacy Policy',
                            ].includes(text)

                            return (
                                <React.Fragment key={index}>
                                    {/* Section Divider */}
                                    {newSection && (
                                        <View className="border-t border-gray-300 my-4" />
                                    )}

                                    {/* Item */}
                                    <TouchableOpacity
                                        onPress={onPress}
                                        className="flex-row items-center justify-between mb-5"
                                        activeOpacity={0.7}
                                    >
                                        <View className="flex-row items-center flex-1">
                                            {/* Icon */}
                                            <View className="w-10 h-10 rounded-full bg-primary-100 items-center justify-center mr-4">
                                                {icon}
                                            </View>

                                            {/* Text */}
                                            <Text className="font-semibold text-lg text-black flex-shrink">
                                                {text}
                                            </Text>
                                        </View>

                                        {/* Optional indicator */}
                                        <Entypo
                                            name="chevron-right"
                                            size={24}
                                            color={colors.primary.colorOne}
                                        />
                                    </TouchableOpacity>
                                </React.Fragment>
                            )
                        }
                    )}
                </View>
            </ScrollView>
        </View>
    )
}
