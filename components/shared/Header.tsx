import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import Icon from '../common/Icon'

const Header = ({ title, onPressLeftIcon }) => {
    return (
        <View className="w-full items-center p-1 h-[17%] bg-blue-600 rounded-b-[25px]">
            {/* Inner container */}
            <View className="w-[92%] flex-row items-center mt-7">
                {/* Back button */}
                <TouchableOpacity onPress={onPressLeftIcon} className="mr-1">
                    <Icon
                        name="arrow-back" // replace ICON_NAMES.SYSTEM_ICONS.BACK
                        color="#ffffff" // replace colors.primary.colorTwo
                        size={32}
                    />
                </TouchableOpacity>

                {/* Title */}
                <Text className="ml-2.5 text-[20px] font-bold text-white">
                    {title}
                </Text>
            </View>
        </View>
    )
}

export default Header
