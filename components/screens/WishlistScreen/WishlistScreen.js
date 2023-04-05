import { FlatList } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";

import { ICON_NAMES } from '../../../constants/constant'

import { WishlistContainer, HolderContainer, DefaultText } from './styles'

import ScreenHeader from '../../shared/ScreenHeader/ScreenHeader'
import WishlistButton from '../../shared/WishlistButton/WishlistButton';

import useWishlistStore from '../../../hooks/useWishlistStore';
import useGetWishlistItems from '../../../hooks/useGetWishlistItems';

const WishlistScreen = () => {
    const [wishlistItems] = useGetWishlistItems();
    const navigation = useNavigation();

    const data = [
        {
            id: 1,
            wishlist_name: 'Jetfire',
            wishlist_amount: 2500
        },
        {
            id: 2,
            wishlist_name: 'Commander Doom',
            wishlist_amount: 500
        },
        {
            id: 3,
            wishlist_name: 'Bootleg Lego 212th army',
            wishlist_amount: 1000
        },
    ]

    const handleNavigation = (id) =>
        navigation.navigate("Wishlist", {
            screen: "WishlistEdit",
            params: {
                wishlistID: id
            }
    });

    const renderWishlistItem = ({ item }) => {
        return(
            <WishlistButton 
                onPress={() => { handleNavigation(item.id); }}
                name={item.wishlist_name}
                amount={item.wishlist_amount}
            />
        );
    };

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
            {
                wishlistItems.length ? 
                <HolderContainer>
                    <FlatList 
                        data={wishlistItems}
                        renderItem={renderWishlistItem}
                        keyExtractor={(item) => item.id}
                    />
                </HolderContainer>
                : <DefaultText>Add an item to your Wishlist.</DefaultText>
            }
            
        </WishlistContainer>
    )
}

export default WishlistScreen