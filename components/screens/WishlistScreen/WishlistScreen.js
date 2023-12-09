import { FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from "@react-navigation/native";

import { ICON_NAMES } from '../../../constants/constant'

import { WishlistContainer, DefaultText, ScrollContainer } from './styles'

import ScreenHeader from '../../shared/ScreenHeader/ScreenHeader'
import WishlistButton from '../../shared/WishlistButton/WishlistButton';

import useWishlistStore from '../../../hooks/useWishlistStore';
import useGetWishlistItems from '../../../hooks/useGetWishlistItems';

const WishlistScreen = ({route}) => {
    const navigation = useNavigation();
    const [wishlistItems] = useGetWishlistItems();

    const isWishlistItemCreated = useWishlistStore(state => state.isWishlistItemCreated);
    const isWishlistItemUpdated = useWishlistStore(state => state.isWishlistItemUpdated);
    const isWishlistItemDeleted = useWishlistStore(state => state.isWishlistItemDeleted);
    const setWishlistItemCreated = useWishlistStore((state) => state.setWishlistItemCreated);
    const setWishlistItemUpdated = useWishlistStore((state) => state.setWishlistItemUpdated);
    const setWishlistItemDeleted = useWishlistStore((state) => state.setWishlistItemDeleted);

    // For reloading after making changes
    const key = route.params?.key || 'defaultKey';
    useEffect(() => {
        if(isWishlistItemCreated){
            setWishlistItemCreated(false)
        }else if(isWishlistItemUpdated){
            setWishlistItemUpdated(false)
        }else if(isWishlistItemDeleted){
            setWishlistItemDeleted(false)
        }
    }, [key]);

    const handleNavigation = (id) =>
        navigation.navigate("Wishlist", {
            screen: "WishlistEdit",
            params: {
                wishlistItemID: id
            }
    });

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
                <ScrollContainer>
                    {
                        wishlistItems.length ? (
                            wishlistItems.map((item, index) => (
                                <WishlistButton
                                    key={index}
                                    onPress={() => { handleNavigation(item.id); }}
                                    name={item.wishlist_name}
                                    amount={item.wishlist_amount}
                                />
                            ))
                        ) : (
                            <DefaultText>Add an item to your Wishlist.</DefaultText>
                        )
                    }
                </ScrollContainer>
        </WishlistContainer>
    )
}

export default WishlistScreen