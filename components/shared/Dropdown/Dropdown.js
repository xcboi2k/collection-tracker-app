import { View, Text } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from "react-native-dropdown-picker";
import PropTypes from 'prop-types';

import { CustomText, DropdownContainer } from "./styles";
import Icon from '../../common/Icon'
import colors from '../../../assets/themes/colors'
import { ICON_NAMES, FONTS } from '../../../constants/constant';

const Dropdown = ({
    dropdownItems,
    setDropdownItems,
    dropdownProps,
    customLabel,
    width = "100%",
    style,
    setValue,
    value
}) => {
    const [open, setOpen] = useState(false);

    return (
        <DropdownContainer width={width}>
            {customLabel && <CustomText>{customLabel}</CustomText>}
            <DropDownPicker
                open={open}
                value={value}
                setOpen={setOpen}
                setValue={setValue}
                items={dropdownItems}
                setItems={setDropdownItems}
                style={{
                    borderColor: colors.primary.colorTwo,
                    elevation: 5,
                    marginBottom: 10,
                    ...style,
                }}
                disableBorderRadius={true}
                ArrowDownIconComponent={() => (
                    <Icon
                        name={ICON_NAMES.SYSTEM_ICONS.DROPDOWN}
                        color={colors.primary.colorOne}
                        size={25}
                    />
                )}
                ArrowUpIconComponent={() => (
                    <Icon
                        name={ICON_NAMES.SYSTEM_ICONS.DROPDOWN}
                        color={colors.primary.colorOne}
                        size={25}
                    />
                )}
                textStyle={{
                    fontFamily: FONTS.REGULAR,
                    fontSize: 18,
                    color: colors.primary.black
                }}
                selectedItemContainerStyle={{
                    backgroundColor: colors.primary.colorOne,
                }}
                selectedItemLabelStyle={{
                    fontFamily: FONTS.BLACK,
                    color: colors.primary.colorTwo,
                }}
                showTickIcon={false}
                {...dropdownProps}
            />
        </DropdownContainer>
    )
}

Dropdown.propTypes = {
    dropdownItems: PropTypes.array.isRequired,
    setDropdownItems: PropTypes.func.isRequired,
    dropdownProps: PropTypes.object,
    customLabel: PropTypes.string,
    width: PropTypes.string,
    style: PropTypes.object,
    setValue: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};

export default Dropdown