import React from 'react'
import { Text, View } from 'react-native'

import SettingsHeader from '@/components/shared/SettingsHeader'

export default function PrivacyPolicyScreen({ navigation }) {
    return (
        <View className="flex-1 relative items-center pb-5">
            <SettingsHeader
                title="Privacy Policy"
                onPressLeftIcon={() => navigation.navigate('SettingsMain')}
            />
            <View className="pt-2.5 w-[90%] items-center">
                <Text className="textblack text-sm text-center mt-2">
                    This section will contain important information about using
                    the app.
                </Text>

                <View className="mt-4 px-4 py-2 bg-gray-300 rounded-xl">
                    <Text className="text-gray-600 text-xs">Coming soon</Text>
                </View>
            </View>
        </View>
    )
}
