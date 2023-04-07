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

    const handleNavigation = (id) =>
        navigation.navigate("Wishlist", {
            screen: "WishlistEdit",
            params: {
                wishlistItemID: id
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
                <HolderContainer>
                    {
                        wishlistItems.length ?
                        <FlatList 
                            data={wishlistItems}
                            renderItem={renderWishlistItem}
                            keyExtractor={(item) => item.id}
                        />
                        : <DefaultText>Add an item to your Wishlist.</DefaultText>
                    }
                    
                </HolderContainer>
        </WishlistContainer>
    )
}

export default WishlistScreen