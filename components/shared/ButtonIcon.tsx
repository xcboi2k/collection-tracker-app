import React, { memo } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

import Icon from '@/components/common/Icon'

type ButtonIconProps = {
    onPress: () => void
    label?: string
    name?: string
    type?: string
    iconColor?: string
    iconSize?: number
    styles?: any
    imageUri?: { uri: string } | null
    filename?: string
}

const ButtonIcon = ({
    onPress,
    label,
    name,
    type,
    iconColor,
    iconSize = 30,
    styles,
    imageUri,
    filename,
}: ButtonIconProps) => {
    const isFilled = type === 'filled'

    return (
        <View className="justify-center items-center" style={styles}>
            <TouchableOpacity
                onPress={onPress}
                className={`
          w-[60px] h-[60px]
          p-1.5
          rounded-[15px]
          border-2
          justify-center items-center
          ${isFilled ? '' : 'bg-white'}
        `}
                style={{
                    backgroundColor: isFilled ? iconColor : '#FFFFFF',
                    borderColor: isFilled ? 'transparent' : iconColor,
                }}
            >
                {!imageUri?.uri ? (
                    <Icon
                        name={name}
                        size={iconSize}
                        color={isFilled ? '#FFFFFF' : iconColor}
                    />
                ) : (
                    <Image
                        source={{ uri: imageUri.uri }}
                        className="w-full h-full rounded-[10px]"
                        resizeMode="cover"
                    />
                )}
            </TouchableOpacity>

            {label && (
                <Text
                    className={`
            mt-1
            text-xs
            text-center
            font-bold
            ${isFilled ? 'text-black' : ''}
          `}
                    style={{ color: isFilled ? '#000' : iconColor }}
                >
                    {label.substring(0, 8)}
                </Text>
            )}
        </View>
    )
}

export default memo(ButtonIcon)
