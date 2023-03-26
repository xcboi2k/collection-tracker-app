import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";

import { ICON_NAMES } from '../../../constants/constant'

import { WishlistContainer } from './styles'

import ScreenHeader from '../../shared/ScreenHeader/ScreenHeader'

const WishlistScreen = () => {
    const navigation = useNavigation();

    return (
        <WishlistContainer>
            <ScreenHeader 
            title={'Wishlist'}
            rightIconName={ICON_NAMES.SYSTEM_ICONS.ADD}
            rightIconSize={32}
            onPressRightIcon={() => 
                navigation.navigate("Wishlist", {
                    screen: "WishlistAdd"
                })
            }
            />
        </WishlistContainer>
    )
}

export default WishlistScreen