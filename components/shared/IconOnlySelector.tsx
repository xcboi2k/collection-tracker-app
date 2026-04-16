import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

import colors from '../../assets/themes/colors'

import ButtonIcon from './ButtonIcon'

const IconOnlySelector = ({ iconData, selectedIcon, onPress }) => {
    const renderItem = ({ item: iconName, index }) => (
        <ButtonIcon
            name={iconName}
            iconColor={colors.primary.colorOne}
            key={index + iconName}
            type={iconName === selectedIcon ? 'filled' : 'outlined'}
            onPress={() => onPress(iconName)}
            styles={{ marginHorizontal: 10 }}
        />
    )

    return (
        <View className="w-full mb-2.5">
            {/* Title */}
            <Text className="text-[20px] font-bold mb-2.5">Icons:</Text>

            {/* Horizontal scroll wrapper */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row h-[100px]">
                    {iconData?.map((item, index) => {
                        const isSelected = selectedIcon === item.icon

                        return (
                            <TouchableOpacity
                                key={item.id ?? index}
                                onPress={() => item.onPress?.(item)}
                                className="w-[60px] h-[60px] mx-2 justify-center items-center"
                            >
                                {/* renderItem fallback or custom render */}
                                {renderItem ? (
                                    renderItem({ item })
                                ) : (
                                    <View
                                        className={`w-full h-full justify-center items-center ${
                                            isSelected
                                                ? 'bg-blue-500 rounded-lg'
                                                : ''
                                        }`}
                                    >
                                        {/* Replace this with your icon renderer */}
                                        {item.icon}
                                    </View>
                                )}
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}

export default IconOnlySelector
