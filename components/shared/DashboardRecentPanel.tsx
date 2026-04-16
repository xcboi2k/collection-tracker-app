import React, { memo } from 'react'
import { Image, View } from 'react-native'

import imgPlaceholder from '../../../assets/test.jpg'

const DashboardRecentPanel = ({ data, styles }) => {
    return (
        <View className="justify-center items-center m-1">
            <Image
                source={
                    data?.comment_img
                        ? { uri: data.comment_img }
                        : imgPlaceholder
                }
                className="w-[100px] h-[100px] rounded-[15px]"
                resizeMode="cover"
            />
        </View>
    )
}

export default memo(DashboardRecentPanel)
