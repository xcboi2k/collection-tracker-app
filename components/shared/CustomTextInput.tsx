import React, { useState } from 'react'
import {
    View,
    TextInput,
    Text,
    TextInputProps,
    TouchableOpacity,
} from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'

import colors from '@/assets/themes/colors'

interface CustomTextInputProps {
    width?: string
    padding?: string
    marginBottom?: string
    customLabel?: string
    customLabelColor?: string
    inputProps?: TextInputProps // Assuming you want to use TextInputProps from react-native
    inputFontSize?: number
    isPassword?: boolean
    isMobileNumber?: boolean
    measurementText?: string
    hasStatus?: boolean
    statusText?: any
}

export default function CustomTextInput({
    width,
    padding = '25px',
    marginBottom = '15px',
    customLabel,
    customLabelColor,
    // variant,
    // isFilled = false,
    inputProps,
    inputFontSize,
    isPassword = false,
    // isLoginDisabled,
    hasStatus = false,
    statusText,
    // statusOnPress,
    // statusOnPressText,
    isMobileNumber = false,
    measurementText,
}: CustomTextInputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    return (
        <View
            className={`${width ? `w-[${width}]` : 'w-full'} mb-[${marginBottom}] flex-col`}
        >
            <Text
                style={{ color: customLabelColor || '#232323' }}
                className="text-[14px] font-bold mb-[5px]"
            >
                {customLabel}
            </Text>
            <View className="w-full flex-row items-center bg-white rounded-[10px] bg-white px-[15px] border-[1px] border border-gray-300">
                {isMobileNumber && <Text className="mr-2">+</Text>}
                <TextInput
                    {...inputProps}
                    className={`text-${inputFontSize}`}
                    secureTextEntry={isPassword && !isPasswordVisible}
                />
                {isPassword && (
                    <View className="items-center ml-auto">
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                            {isPasswordVisible ? (
                                <Entypo
                                    name="eye"
                                    size={24}
                                    color={colors.primary.colorOne}
                                />
                            ) : (
                                <Entypo
                                    name="eye-with-line"
                                    size={24}
                                    color={colors.primary.colorOne}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                )}
                {measurementText && (
                    <Text className="ml-auto">{measurementText}</Text>
                )}
            </View>
            {hasStatus === true && (
                <View className="w-full flex-row items-center">
                    {statusText && (
                        <Text className="text-[10px] font-medium text-red-500">
                            {statusText}
                        </Text>
                    )}
                </View>
            )}
        </View>
    )
}
