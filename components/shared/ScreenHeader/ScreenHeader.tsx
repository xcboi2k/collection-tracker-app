import { View, Text } from 'react-native'
import React from 'react'

import Icon from '../../common/Icon'
import colors from '../../../assets/themes/colors'

import { ScreenHeaderContainer, ScreenTitle, RightIcon, ScreenHeaderItemsHolderContainer } from './styles'

const ScreenHeader = ({ title, onPressRightIcon, rightIconName, rightIconSize }) => {
    return (
        <ScreenHeaderContainer>
            <ScreenHeaderItemsHolderContainer>
                <ScreenTitle>{title}</ScreenTitle>
                {rightIconName && (
                    <RightIcon onPress={onPressRightIcon}>
                        <Icon
                        name={rightIconName}
                        color={colors.primary.colorTwo}
                        size={rightIconSize}
                        />
                    </RightIcon>
                )}
            </ScreenHeaderItemsHolderContainer>
        </ScreenHeaderContainer>
    )
}

export default ScreenHeader