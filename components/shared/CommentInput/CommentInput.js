import { View, Text } from 'react-native'
import React from 'react'

import PropTypes from "prop-types";

import { CustomImage, CustomInputContainer, CustomText, ImgButton, Input, InputContainer } from "./styles";

import Icon from '../../common/Icon'
import colors from '../../../assets/themes/colors'
import { ICON_NAMES } from '../../../constants/constant';

const CommentInput = ({ customLabel, inputProps, width = "100%", imageUri, onPress, filename }) => {
    return (
        <CustomInputContainer width={width}>
            {customLabel && <CustomText>{customLabel}</CustomText>}
            <InputContainer>
                <Input {...inputProps} multiline={true} textAlignVertical="top" />
                <ImgButton onPress={onPress}>
                    {!imageUri?.uri ? <Icon name={ICON_NAMES.SYSTEM_ICONS.ADD_PHOTO} color={colors.primary.colorTwo} size={45} /> : <CustomImage source={{ uri: imageUri.uri }} />}
                </ImgButton>
            </InputContainer>
            {!filename ? <Text>No File Chosen</Text> : <Text>{filename}</Text>}
        </CustomInputContainer>
    )
}

CommentInput.propTypes = {
    customLabel: PropTypes.string,
    width: PropTypes.string,
    inputProps: PropTypes.object,
    imageUri: PropTypes.object,
    onPress: PropTypes.func,
    filename: PropTypes.string
};

export default CommentInput