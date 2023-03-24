import { View, Text } from 'react-native'
import React from 'react'

import { MainMenuContainer, HolderContainer } from './styles'

import { ICON_NAMES } from '../../../constants/constant'
import colors from '../../../assets/themes/colors'
import ScreenHeader from '../../shared/ScreenHeader/ScreenHeader'
import Button from '../../shared/Button/Button'
import ButtonIcon from '../../shared/ButtonIcon/ButtonIcon'

const MainMenuScreen = () => {
    return (
        <MainMenuContainer>
            <ScreenHeader
                    title={'Main Menu'}
                    iconName={ICON_NAMES.SYSTEM_ICONS.BACK}
                    iconSize={32}
                    />
            <HolderContainer>
                <Button title={'Hello There'} rounded/>
                <Button iconName={ICON_NAMES.CATEGORIES_ICONS.ROBOT} iconColor={colors.primary.colorOne} rounded/>
                <ButtonIcon iconName={ICON_NAMES.CATEGORIES_ICONS.ROBOT} iconColor={colors.primary.colorOne}/>
            </HolderContainer>
        </MainMenuContainer>
        
    )
    }

export default MainMenuScreen