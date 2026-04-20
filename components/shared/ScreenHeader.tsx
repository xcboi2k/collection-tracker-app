import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import Icon from '@/components/common/Icon'

type ScreenHeaderProps = {
    title: string
    rightIconName?: string
    rightIconSize?: number
    onPressRightIcon?: () => void
}

const ScreenHeader = ({
    title,
    onPressRightIcon,
    rightIconName,
    rightIconSize,
}: ScreenHeaderProps) => {
    return (
        <View className="w-full items-center p-1 h-[17%] bg-primary-100 rounded-b-[25px]">
            {/* Inner container */}
            <View className="w-[92%] flex-row items-center justify-between mt-8">
                {/* Title */}
                <Text className="text-[20px] font-bold text-white ml-2.5">
                    {title}
                </Text>

                {/* Right Icon */}
                {rightIconName && (
                    <TouchableOpacity
                        onPress={onPressRightIcon}
                        className="ml-auto"
                    >
                        <Icon
                            name={rightIconName}
                            color="#ffffff"
                            size={rightIconSize}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default ScreenHeader
