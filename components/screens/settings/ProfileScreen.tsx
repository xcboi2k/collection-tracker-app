import React from 'react'
import { Text, View } from 'react-native'

import SettingsHeader from '@/components/shared/SettingsHeader'
import UserStore from '@/stores/UserStore'

export default function ProfileScreen({ navigation }) {
    const user = UserStore((state) => state.user)
    return (
        <View className="flex-1 relative items-center pb-5">
            <SettingsHeader
                title="Profile"
                onPressLeftIcon={() => navigation.navigate('SettingsMain')}
            />
            <View className="w-full bg-primary-100 rounded-b-3xl items-center pb-6 pt-8">
                {/* Avatar */}
                <View className="w-20 h-20 rounded-full bg-white items-center justify-center mb-3">
                    <Text className="text-primary-100 text-2xl font-bold">
                        {user?.username?.[0]?.toUpperCase()}
                    </Text>
                </View>

                {/* Username */}
                <Text className="text-white text-lg font-bold">
                    {user?.username}
                </Text>

                {/* Email */}
                <Text className="text-white/80 text-sm mt-1">
                    {user?.email}
                </Text>
            </View>
        </View>
    )
}
