import React from 'react'
import {
    StyleProp,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from 'react-native'

import Icon from '@/components/common/Icon'

type ButtonProps = {
    onPress: () => void
    title: string

    type?: 'filled' | 'outlined' | 'ghost'

    width?: string | number // e.g. "100%" or 200
    textSize?: number

    iconName?: string
    iconColor?: string
    iconSize?: number

    noBorder?: boolean

    styles?: StyleProp<ViewStyle>
    buttonProps?: Record<string, any>
    buttonLabelStyle?: StyleProp<TextStyle>
}

const ButtonText = ({
    onPress,
    title,
    type,
    width = '100%',
    textSize = 16,
    iconColor,
    iconSize,
    iconName,
    noBorder = true,
    styles,
    buttonProps,
    buttonLabelStyle,
}: ButtonProps) => {
    const isFilled = type === 'filled'

    return (
        <TouchableOpacity
            onPress={onPress}
            className={`
        ${width ? `w-[${width}]` : 'w-full'}
        px-3 py-2
        rounded-md
        flex-row items-center justify-around
        ${isFilled ? 'bg-primary-100' : 'bg-transparent'}
        ${noBorder ? '' : 'border border-primary-100'}
      `}
            style={styles}
            {...buttonProps}
        >
            {iconName && (
                <Icon
                    name={iconName}
                    size={iconSize}
                    color={isFilled ? '#FFFFFF' : iconColor}
                />
            )}

            <Text
                className={`
          ${textSize}
          text-center
          font-bold
          ${isFilled ? 'text-white' : 'text-primary-100'}
        `}
                style={buttonLabelStyle}
            >
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default ButtonText
