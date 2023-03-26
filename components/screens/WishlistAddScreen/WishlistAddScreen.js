import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";

import { WishlistAddContainer } from './styles'

import Header from '../../shared/Header/Header'

const WishlistAddScreen = () => {
    const navigation = useNavigation();

    return (
        <WishlistAddContainer>
            <Header 
                title={"Add Wish"}
                onPressLeftIcon={() => 
                    navigation.navigate("Wishlist", {
                        screen: "WishlistMain"
                    })
                }
            />
        </WishlistAddContainer>
    )
}

export default WishlistAddScreen