import { View, Text } from 'react-native'
import React, { memo } from 'react'

import PropTypes from "prop-types";

import { ButtonContainer, ButtonLabel, ButtonIconContainer, CustomImage } from "./styles";

import Icon from '../../common/Icon';
import colors from '../../../assets/themes/colors';

const ButtonIcon = ({ onPress, label, name, type, iconColor, iconSize = 30, styles, imageUri, filename }) => {
    return (
        <ButtonContainer style={styles}>
            <ButtonIconContainer onPress={onPress} type={type} color={iconColor}>
                {!imageUri?.uri ? 
                    <Icon
                        name={name}
                        color={type === "filled" ? colors.primary.colorTwo : iconColor}
                        size={iconSize}
                    /> 
                    : <CustomImage source={{ uri: imageUri.uri }} />}
            </ButtonIconContainer>
            {label && (
                <ButtonLabel type={type} color={iconColor}>
                    {label.substring(0, 8)}
                </ButtonLabel>
            )}
        </ButtonContainer>
    )
}

ButtonIcon.propTypes = {
    onPress: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    iconColor: PropTypes.string,
    iconSize: PropTypes.number,
    styles: PropTypes.object,
    imageUri: PropTypes.object,
    filename: PropTypes.string
};

export default memo(ButtonIcon)