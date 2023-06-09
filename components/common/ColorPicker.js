import { View, Text } from 'react-native'
import React from 'react'
import { TriangleColorPicker } from 'react-native-color-picker';
import PropTypes from "prop-types";

import { ColorPickerContainer, CloseButton } from './Styles';

import Icon from './Icon'
import colors from '../../assets/themes/colors'
import { ICON_NAMES } from "../../constants/constant";

const ColorPicker = ({ handleColorPress, setShowColorWheel }) => {
    return (
        <ColorPickerContainer>
            <CloseButton onPress={() => setShowColorWheel(false)}>
                <Icon
                    name={ICON_NAMES.SYSTEM_ICONS.CROSS}
                    color={colors.primary.colorTwo}
                    size={50}
                />
            </CloseButton>
            <TriangleColorPicker
                onColorSelected={handleColorPress}
                style={{
                    flex: 1,
                    backgroundColor: "white",
                    height: "100%",
                    width: "100%",
                    padding: 20,
                }}
            />
        </ColorPickerContainer>
    )
}

ColorPicker.propTypes = {
    handleColorPress: PropTypes.func.isRequired,
    setShowColorWheel: PropTypes.func.isRequired
};

export default ColorPicker