import React from 'react'
import { Image, Text, View } from 'react-native'

import imagePlaceHolder from '@/assets/icon.png'

const DashboardHeader = ({ title }) => {
    return (
        <View className="w-full bg-primary-100 rounded-b-[30px] pb-6 pt-10 items-center">
            {/* Top Row */}
            <View className="w-[92%] flex-row items-center justify-between">
                {/* Greeting + Title */}
                <View>
                    <Text className="text-white text-2xl font-bold mt-1">
                        {title}
                    </Text>
                </View>

                {/* Avatar */}
                <Image
                    source={imagePlaceHolder}
                    className="w-12 h-12 rounded-full border-2 border-white bg-white"
                />
            </View>
        </View>
    )
}

export default DashboardHeader
