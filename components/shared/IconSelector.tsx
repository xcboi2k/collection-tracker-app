import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

import ButtonIcon from './ButtonIcon'

const IconSelector = ({ iconData, selectedIcon, handlePress }) => {
    const renderItem = ({ item, index }) => {
        const type = selectedIcon.id === item.id ? 'filled' : ''

        return (
            <ButtonIcon
                name={item.category_icon}
                iconColor={item.category_color}
                iconSize={25}
                label={item.category_name}
                key={index}
                type={type}
                onPress={() =>
                    handlePress({
                        label: item.category_name,
                        icon: item.transaction_icon,
                        color: item.category_color,
                        currentIcon: item.category_icon,
                        id: item.id,
                    })
                }
                styles={{ marginHorizontal: 10 }}
            />
        )
    }

    return (
        <View className="w-[90%] mb-2.5">
            {/* Title */}
            <Text className="text-[20px] font-bold mb-2.5">Icons:</Text>

            {/* Horizontal scroll */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row h-[100px] items-center">
                    {iconData?.map((item, index) => {
                        const isSelected = selectedIcon === item.icon

                        return (
                            <TouchableOpacity
                                key={item.id ?? index}
                                onPress={() => onSelect?.(item)}
                                className={`w-[60px] h-[60px] mx-2 justify-center items-center rounded-lg ${
                                    isSelected
                                        ? 'bg-blue-500'
                                        : 'bg-transparent'
                                }`}
                            >
                                {/* Icon */}
                                {item.icon}
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}

export default IconSelector
