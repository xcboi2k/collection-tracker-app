import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { ButtonContainer, ButtonLabel } from './styles'

TouchableOpacity.defaultProps = {
    activeOpacity: 0.6,
};

const Button = ({
    onPress,
    title,
    type,
    width = "100%",
    rounded = "1px",
    textSize = 20,
    iconColor,
    iconSize,
    iconName,
    noBorder = true,
    styles,
    buttonProps,
    buttonLabelStyle,
}) => {
    return (
        <ButtonContainer
            onPress={onPress}
            type={type}
            width={width}
            rounded={rounded}
            noBorder={noBorder}
            style={styles}
            {...buttonProps}
        >
            <ButtonLabel
                type={type}
                textSize={textSize}
                style={buttonLabelStyle}
            >
                {title}
            </ButtonLabel>
        </ButtonContainer>
    )
}

export default Button