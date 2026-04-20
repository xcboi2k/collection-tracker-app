import React from 'react'
import { ActivityIndicator, Modal, View } from 'react-native'

import colors from '@/assets/themes/colors'

const CustomLoader = ({ visible }) => {
    return (
        <Modal transparent visible={visible} animationType="fade">
            {/* Fullscreen container */}
            <View className="flex-1 justify-center items-center">
                {/* Overlay */}
                <View className="absolute inset-0 bg-black/50 justify-center items-center">
                    {/* Loader box */}
                    <View className="p-5 rounded-lg bg-transparent">
                        <ActivityIndicator
                            size="large"
                            color={colors.primary.colorOne} // replace with colors.primary.colorOne
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default CustomLoader
