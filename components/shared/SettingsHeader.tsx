import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import Icon from '@/components/common/Icon'
import { ICON_NAMES } from '@/constants/constant'
import colors from '@/assets/themes/colors'

export default function SettingsHeader({ title, onPressLeftIcon }) {
    return (
        <View className="w-full pb-6 pt-10 items-center">
            {/* Inner container */}
            <View className="w-[92%] flex-row items-center">
                {/* Back button */}
                <TouchableOpacity onPress={onPressLeftIcon} className="mr-1">
                    <Icon
                        name={ICON_NAMES.SYSTEM_ICONS.BACK} // replace ICON_NAMES.SYSTEM_ICONS.BACK
                        color={colors.primary.colorOne} // replace colors.primary.colorTwo
                        size={24}
                    />
                </TouchableOpacity>

                {/* Title */}
                <Text className="ml-2.5 text-[20px] font-bold text-black">
                    {title}
                </Text>
            </View>
        </View>
    )
}
