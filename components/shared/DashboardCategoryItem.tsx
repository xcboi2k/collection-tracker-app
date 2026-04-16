import PropTypes from 'prop-types'
import React from 'react'
import { Text, View } from 'react-native'

import Icon from '../common/Icon'
import { formatPeso } from '@/utils/formatCurrency'

const DashboardCategoryItem = ({
    iconName,
    categoryName,
    total,
    iconColor,
}) => {
    return (
        <View className="flex-row items-center justify-between w-full">
            {/* Icon */}
            <Icon name={iconName} color={iconColor} size={38} />

            {/* Text block */}
            <View className="ml-2.5 w-[75%]">
                {/* Category Name */}
                <Text className="text-[15px] font-bold text-black text-left">
                    {categoryName}
                </Text>

                {/* Total */}
                <Text className="text-[13px] font-normal text-black text-left">
                    {formatPeso(total)}
                </Text>
            </View>
        </View>
    )
}

DashboardCategoryItem.propTypes = {
    categoryName: PropTypes.string,
    total: PropTypes.number,
    inputProps: PropTypes.object,
    iconColor: PropTypes.string,
    iconName: PropTypes.string,
}

export default DashboardCategoryItem
