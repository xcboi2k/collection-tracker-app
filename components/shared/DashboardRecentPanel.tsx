import React, { memo } from 'react'
import { Image, Text, View } from 'react-native'

import imgPlaceholder from '@/assets/test.jpg'
import { formatPeso } from '@/utils/formatCurrency'

const DashboardRecentPanel = ({ data }) => {
    return (
        <View className="flex-row justify-between items-center m-2 p-4 bg-white rounded-xl shadow-sm">
            {/* Left: Name */}
            <Text className="text-lg font-semibold text-gray-900 flex-1">
                {data?.collectionitem_name}
            </Text>

            {/* Right: Amount */}
            <Text className="text-lg font-bold text-primary-100">
                {formatPeso(data?.collectionitem_amount)}
            </Text>
        </View>
    )
}

export default memo(DashboardRecentPanel)
