import React from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'

import Icon from '../common/Icon'

const CommentInput = ({
    customLabel,
    inputProps,
    width = '100%',
    imageUri,
    onPress,
    filename,
}) => {
    return (
        <View className={width}>
            {/* Label */}
            {customLabel && (
                <Text className="font-bold text-[20px] mb-[5px]">
                    {customLabel}
                </Text>
            )}

            {/* Input Container */}
            <View
                className="w-full bg-white rounded-md flex-row items-center h-[100px] mb-5"
                style={{
                    elevation: 5, // RN shadow (Tailwind doesn't support elevation)
                }}
            >
                {/* Text Input */}
                <TextInput
                    {...inputProps}
                    multiline
                    textAlignVertical="top"
                    className="flex-1 h-full p-2.5 text-[18px]"
                />

                {/* Image Button */}
                <TouchableOpacity
                    onPress={onPress}
                    className="h-full w-[30%] items-center justify-center bg-primary-100"
                >
                    {!imageUri?.uri ? (
                        <Icon
                            name={'add-photo-alternate'} // replace ICON_NAMES.SYSTEM_ICONS.ADD_PHOTO
                            color="#FFFFFF"
                            size={45}
                        />
                    ) : (
                        <Image
                            source={{ uri: imageUri.uri }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    )}
                </TouchableOpacity>
            </View>

            {/* Filename */}
            <Text>{!filename ? 'No File Chosen' : filename}</Text>
        </View>
    )
}

CommentInput.propTypes = {
    customLabel: PropTypes.string,
    width: PropTypes.string,
    inputProps: PropTypes.object,
    imageUri: PropTypes.object,
    onPress: PropTypes.func,
    filename: PropTypes.string,
}

export default CommentInput
