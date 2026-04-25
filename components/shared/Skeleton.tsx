import React, { useEffect, useRef } from 'react'
import { Animated, ViewStyle } from 'react-native'

type Props = {
    style?: any
}

const Skeleton = ({ style }: Props) => {
    const opacity = useRef(new Animated.Value(0.5)).current

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.5,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start()
    }, [])

    return (
        <Animated.View
            className={`bg-gray-300 ${style}`}
            style={[
                {
                    backgroundColor: '#bebec0',
                    borderRadius: 12,
                    opacity,
                },
            ]}
        />
    )
}

export default Skeleton
