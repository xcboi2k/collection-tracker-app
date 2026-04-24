import React from 'react'
import { View } from 'react-native'
import Skeleton from './Skeleton'

export default function DashboardSkeleton() {
    return (
        <>
            {/* Chart */}
            <Skeleton className="w-full h-[200px] rounded-2xl mt-2.5" />

            {/* Hero card */}
            <View className="w-full bg-gray-200 rounded-2xl p-5 mt-3 items-center">
                <Skeleton className="w-32 h-3 mb-3" />
                <Skeleton className="w-48 h-10 mb-2" />
                <Skeleton className="w-40 h-3" />
            </View>

            {/* Stats row */}
            <View className="flex-row justify-between mt-4">
                <Skeleton className="flex-1 h-[90px] mr-2" />
                <Skeleton className="flex-1 h-[90px] ml-2" />
            </View>

            {/* Insight card */}
            <Skeleton className="w-full h-[110px] mt-4" />

            {/* Category card */}
            <Skeleton className="w-full h-[110px] mt-4" />
        </>
    )
}
