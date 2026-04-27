import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import UserStore from '@/stores/UserStore'
import { supabase } from '@/utils/supabase'

export default function LogoutScreen({ navigation }) {
    const setLoggedOut = UserStore((state) => state.setLoggedOut)
    const handleLogout = async () => {
        // 🔹 put your logout logic here
        const { error } = await supabase.auth.signOut()

        if (error) {
            console.log('Logout error:', error.message)
        }
        console.log('User logged out')
        setLoggedOut()
    }
    return (
        <View className="flex-1 justify-center items-center px-6 bg-white">
            {/* Title */}
            <Text className="text-2xl font-bold mb-4 text-black">Logout</Text>

            {/* Message */}
            <Text className="text-base text-center mb-4 text-gray-700">
                Are you sure you want to logout?
            </Text>

            <Text className="text-base text-center mb-10 text-gray-700">
                You can log back in anytime. Thank you for using CollectorPlus!
            </Text>

            {/* Logout Button */}
            <TouchableOpacity
                onPress={handleLogout}
                className="w-[80%] py-3.5 rounded-lg mb-3 items-center bg-primary-100"
            >
                <Text className="text-white font-bold text-base">
                    Yes, log me out
                </Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('Buyer', { screen: 'BuyerDashboard' })
                }
                className="w-[80%] py-3.5 rounded-lg items-center bg-gray-400"
            >
                <Text className="text-white font-bold text-base">
                    No, take me back
                </Text>
            </TouchableOpacity>
        </View>
    )
}
