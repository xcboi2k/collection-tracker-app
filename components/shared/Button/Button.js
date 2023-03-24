import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { ButtonContainer, ButtonLabel } from './styles'

import colors from '../../../assets/themes/colors'
import Icon from '../../common/Icon'

TouchableOpacity.defaultProps = {
    activeOpacity: 0.6,
};

const Button = ({
    onPress,
    title,
    type,
    width = "100%",
    rounded = "5px",
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
            {iconName && (
                <Icon
                    name={iconName}
                    color={type === "filled" ? colors.primary.colorTwo : iconColor}
                    size={iconSize}
                />
            )}
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