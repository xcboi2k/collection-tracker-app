import React from 'react'
import { Image, Text, View } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'

import imagePlaceHolder from '@/assets/icon.png'
import UserStore from '@/stores/UserStore'
import colors from '@/assets/themes/colors'

const DashboardHeader = ({ title }) => {
    const user = UserStore((state) => state.user)
    console.log('user', user)
    return (
        <View className="w-full bg-primary-100 rounded-b-[30px] pb-6 pt-12 items-center">
            {/* Top Row */}
            <View className="w-[92%] flex-row items-center justify-between">
                {/* Greeting + Title */}
                <View className="w-[70%] flex-row items-center">
                    <Image
                        source={imagePlaceHolder}
                        className="w-[60px] h-[60px] rounded-full border-2 border-white bg-white mr-5"
                    />
                    <View className="w-full flex flex-col">
                        <Text className="text-white text-lg">Welcome!</Text>
                        <Text className="text-white text-2xl font-bold">
                            {user?.username}
                        </Text>
                    </View>
                </View>

                <View className="flex-row items-center w-auto">
                    <Entypo
                        name="menu"
                        size={40}
                        color={colors.primary.white}
                    />
                </View>
            </View>
        </View>
    )
}

export default DashboardHeader
