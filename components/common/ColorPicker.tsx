import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ColorPicker, {
    Panel1,
    Swatches,
    Preview,
    OpacitySlider,
    HueSlider,
} from 'reanimated-color-picker'

import Icon from './Icon'
import colors from '../../assets/themes/colors'
import { ICON_NAMES } from '../../constants/constant'

const CustomColorPicker = ({ handleColorPress, setShowColorWheel }) => {
    return (
        <View className="absolute w-full h-full items-center z-50">
            {/* Close Button */}
            <TouchableOpacity
                onPress={() => setShowColorWheel(false)}
                className="absolute top-[10%] right-[10%] w-[50px] h-[50px] rounded-full bg-blue-700 items-center justify-center z-[999]"
            >
                <Icon
                    name={ICON_NAMES.SYSTEM_ICONS.CROSS}
                    color={colors.primary.colorTwo}
                    size={50}
                />
            </TouchableOpacity>

            {/* Color Picker */}
            <ColorPicker
                style={{ width: '100%' }}
                value={'#ffffff'}
                onComplete={({ hex }) => handleColorPress(hex)}
            >
                <Preview />
                <Panel1 />
                <HueSlider />
                <OpacitySlider />
                <Swatches />
            </ColorPicker>
        </View>
    )
}

export default CustomColorPicker
