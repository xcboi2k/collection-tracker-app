import React from 'react'
import { View } from 'react-native'

const Skeleton = ({ className }) => {
    return (
        <View className={`bg-gray-200 rounded-xl animate-pulse ${className}`} />
    )
}

export default Skeleton
