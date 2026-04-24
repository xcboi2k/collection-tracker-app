import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'

import Icon from '@/components/common/Icon'
import { formatPeso } from '@/utils/formatCurrency'

type WishlistButtonProps =
    | {
          variant?: 'default'
          onPress: () => void
          name: string
          amount: number
          isChecked?: never
          onToggle?: never
      }
    | {
          variant: 'wishlist'
          onPress: () => void
          name: string
          amount: number
          isChecked: boolean
          onToggle: () => void
      }

const WishlistButton = ({
    onPress,
    name,
    amount,
    variant = 'default',
    isChecked,
    onToggle,
}: WishlistButtonProps) => {
    return (
        <View className="w-full flex-row items-center p-4 mb-3 rounded-2xl bg-white border border-primary-100/20">
            {/* CHECKBOX (independent touch area) */}
            {variant === 'wishlist' && (
                <TouchableOpacity
                    onPress={onToggle}
                    className="mr-3"
                    hitSlop={10}
                >
                    {isChecked ? (
                        <View className="w-5 h-5 rounded-md bg-primary-100 items-center justify-center">
                            <Entypo name="check" size={14} color="white" />
                        </View>
                    ) : (
                        <View className="w-5 h-5 rounded-md border border-gray-300" />
                    )}
                </TouchableOpacity>
            )}

            {/* MAIN CONTENT (row press only) */}
            <TouchableOpacity
                onPress={onPress}
                className="flex-1 flex-row items-center"
                activeOpacity={0.7}
            >
                {/* LEFT TEXT */}
                <View className="flex-1 pr-3">
                    <Text
                        className="text-base font-semibold text-gray-900"
                        numberOfLines={1}
                    >
                        {name}
                    </Text>

                    <Text className="text-xs text-gray-400 mt-1">
                        {variant === 'default'
                            ? 'Collection item'
                            : isChecked
                              ? 'Acquired'
                              : 'Wishlist item'}
                    </Text>
                </View>

                {/* RIGHT */}
                <View className="items-end">
                    <Text className="text-base font-bold text-primary-100">
                        {formatPeso(amount)}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default WishlistButton
