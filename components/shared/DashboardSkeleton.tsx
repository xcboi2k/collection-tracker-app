import React from 'react'
import { View } from 'react-native'
import Skeleton from './Skeleton'

export default function DashboardSkeleton() {
    return (
        <View className="w-full flex-1">
            {/* Chart */}
            <Skeleton style="w-full h-[200px] rounded-2xl mt-2.5" />

            {/* Hero card */}
            <View className="w-full bg-gray-400 rounded-2xl p-5 mt-3 items-center">
                <Skeleton style="w-32 h-3 mb-3" />
                <Skeleton style="w-48 h-10 mb-2" />
                <Skeleton style="w-40 h-3" />
            </View>

            {/* Stats row */}
            <View className="flex-row justify-between mt-4">
                <Skeleton style="flex-1 h-[90px] mr-2" />
                <Skeleton style="flex-1 h-[90px] ml-2" />
            </View>

            {/* Insight card */}
            <Skeleton style="w-full h-[110px] mt-4" />

            {/* Category card */}
            <Skeleton style="w-full h-[110px] mt-4" />
        </View>
    )
}
