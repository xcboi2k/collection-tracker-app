import React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'

const CustomAlert = ({ visible, title, message, onClose }) => {
    return (
        <Modal transparent visible={visible} animationType="fade">
            {/* Overlay */}
            <View className="flex-1 bg-black/50 justify-center items-center">
                {/* Alert Box */}
                <View
                    className="bg-white w-[80%] rounded-xl p-5 items-center"
                    style={{ elevation: 5 }}
                >
                    {/* Title */}
                    <Text className="text-[20px] font-bold text-primary-100 mb-2.5 text-center">
                        {title}
                    </Text>

                    {/* Message */}
                    <Text className="text-[16px] text-black mb-5 text-center">
                        {message}
                    </Text>

                    {/* Button */}
                    <TouchableOpacity
                        onPress={onClose}
                        className="px-5 py-2.5 rounded-lg"
                    >
                        <Text className="text-[16px] font-bold text-primary-100 text-center">
                            OK
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default CustomAlert
