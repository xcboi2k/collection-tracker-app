import React from 'react'
import { ActivityIndicator, Modal, View } from 'react-native'

import colors from '@/assets/themes/colors'

const CustomLoader = ({ visible }) => {
    return (
        <Modal transparent visible={visible} animationType="fade">
            {/* Full screen overlay */}
            <View className="flex-1 bg-black/50 justify-center items-center">
                <View className="p-5 rounded-lg">
                    <ActivityIndicator
                        size="large"
                        color={colors.primary.colorOne}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default CustomLoader
