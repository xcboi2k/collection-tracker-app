import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

import Icon from '@/components/common/Icon'

const ColorPickerPanel = ({
    colorList = [],
    selectedColor,
    onColorPress,
    onAddPress,
}) => {
    return (
        <View className="w-full mb-5">
            {/* Label */}
            <Text className="font-bold text-[20px] mb-2.5">Colors:</Text>

            {/* Row */}
            <View className="flex-row items-center">
                {/* Add Button */}
                <TouchableOpacity onPress={onAddPress} className="mr-1">
                    <Icon
                        name={'add'}
                        color={selectedColor || '#000'} // replace with your theme
                        size={50}
                    />
                </TouchableOpacity>

                {/* Scrollable Color List */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ alignItems: 'center' }}
                >
                    {colorList?.map((item) => {
                        const isSelected = selectedColor === item.color

                        return (
                            <TouchableOpacity
                                key={item.colorID}
                                onPress={() => onColorPress(item.color)}
                                className="w-[50px] h-[50px] mx-[5px] rounded-full justify-center items-center"
                                style={{ backgroundColor: item.color }}
                            >
                                {isSelected && (
                                    <View className="items-center justify-center">
                                        <Icon
                                            name={'check'}
                                            color="#FFFFFF"
                                            size={20}
                                        />
                                    </View>
                                )}
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>
        </View>
    )
}

export default ColorPickerPanel
