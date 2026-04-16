import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import colors from '@/assets/themes/colors'
import { formatPeso } from '@/utils/formatCurrency'

const WishlistButton = ({ onPress, name, amount }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="w-full flex-row items-center rounded-[15px] p-2.5 mb-2.5"
            style={{ backgroundColor: colors.primary.colorOne }} // replace with colors.primary.colorOne
        >
            {/* Title */}
            <Text className="text-[15px] font-medium text-white w-[65%] p-0.5">
                {name}
            </Text>

            {/* Amount */}
            <Text className="text-[15px] font-medium text-white w-[35%] text-right ml-auto p-0.5">
                {formatPeso(amount)}
            </Text>
        </TouchableOpacity>
    )
}

export default WishlistButton
