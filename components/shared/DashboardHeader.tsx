import React from 'react'
import { Image, Text, View } from 'react-native'

import imagePlaceHolder from '../../../assets/icon.png'

const DashboardHeader = ({ title }) => {
    return (
        <View className="w-full items-center p-1 h-[17%] bg-blue-600 rounded-b-[25px]">
            {/* Inner container */}
            <View className="w-[92%] flex-row items-center justify-between mt-7">
                {/* Title */}
                <Text className="font-bold text-[20px] text-white ml-2.5">
                    {title}
                </Text>

                {/* User image */}
                <Image
                    source={imagePlaceHolder}
                    className="w-10 h-10 rounded-full ml-auto"
                />
            </View>
        </View>
    )
}

export default DashboardHeader
