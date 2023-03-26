import { View, Text } from 'react-native'
import React from 'react'

import Icon from '../../common/Icon'
import colors from '../../../assets/themes/colors'

import { HeaderContainer, ScreenTitle, LeftIcon } from './styles'
import { ICON_NAMES } from '../../../constants/constant'

const Header = ({ title, onPressLeftIcon }) => {
    return (
        <HeaderContainer>
            <LeftIcon onPress={onPressLeftIcon}>
                <Icon
                name={ICON_NAMES.SYSTEM_ICONS.BACK}
                color={colors.primary.colorTwo}
                size={32}
                />
            </LeftIcon>
            <ScreenTitle>{title}</ScreenTitle>
        </HeaderContainer>
    )
}

export default Header