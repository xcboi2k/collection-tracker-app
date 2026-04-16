import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import Icon from '../common/Icon'

const Button = ({
    onPress,
    title,
    type,
    width = '100%',
    textSize = 20,
    iconColor,
    iconSize,
    iconName,
    noBorder = true,
    styles,
    buttonProps,
    buttonLabelStyle,
}) => {
    const isFilled = type === 'filled'

    return (
        <TouchableOpacity
            onPress={onPress}
            className={`
        ${width}
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
          uppercase
          ${isFilled ? 'text-white' : 'text-primary-100'}
        `}
                style={buttonLabelStyle}
            >
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default Button
