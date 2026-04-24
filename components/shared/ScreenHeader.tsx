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
        <View className="w-full bg-primary-100 rounded-b-[30px] pb-6 pt-12 items-center">
            {/* Inner container */}
            <View className="w-[92%] flex-row items-center justify-between">
                {/* Greeting + Title */}
                <View>
                    <Text className="text-white text-2xl font-bold mt-1">
                        {title}
                    </Text>
                </View>

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
