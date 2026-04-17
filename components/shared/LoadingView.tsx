import React from 'react'
import { ActivityIndicator, View } from 'react-native'

import colors from '@/assets/themes/colors'

export default function LoadingView() {
    return (
        <View className="flex-1 justify-center items-center my-5">
            <ActivityIndicator
                size="large"
                color={colors.primary.colorOne} // replace with colors.primary.colorOne
            />
        </View>
    )
}
