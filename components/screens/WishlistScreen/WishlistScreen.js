import { ActivityIndicator, FlatList, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { onSnapshot, collection, query, orderBy, where } from 'firebase/firestore';

import { WishlistContainer, DefaultText, ScrollContainer } from './styles'

import { ICON_NAMES } from '../../../constants/constant'
import colors from '../../../assets/themes/colors';
import { db } from '../../../firebase.js';

import ScreenHeader from '../../shared/ScreenHeader/ScreenHeader'
import WishlistButton from '../../shared/WishlistButton/WishlistButton';

import useWishlistStore from '../../../hooks/useWishlistStore';

const WishlistScreen = ({route}) => {
    const navigation = useNavigation();

    const [wishlistData, setWishlistData] = useState([]);
    const setWishlistItems = useWishlistStore((state) => state.setWishlistItems);
    const [loading, setLoading] = useState(false)

    const fetchWishlistItems = () => {
        setLoading(true)
        const wishlistColRef = collection(db, "wishlist");
        const wishlistQuery = query(wishlistColRef, orderBy("wishlist_name"));

        const unsubscribe = onSnapshot(wishlistQuery, (snapshotData) => {
            const userList = [];

            snapshotData.forEach((doc) => {
                userList.push({
                    ...doc.data(),
                    id: doc.id
                });
                // console.log("CATEGORY PUSHED", doc.id);
            });
            if(userList.length > 0){
                setWishlistItems(userList);
                setWishlistData(userList);
                setLoading(false)
            }
        });

        return unsubscribe;
    }

    useFocusEffect(
        useCallback(() => {
            console.log('Mount Wishlist');
            fetchWishlistItems()
            
            return () => {
                console.log('Unmount Wishlist');
            };
        }, [])
    );

    const handleNavigation = (id) =>
        navigation.navigate("Wishlists", {
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
                navigation.navigate("Wishlists", {
                    screen: "WishlistAdd"
                })
            }
            />
                <ScrollContainer>
                    {
                        loading ? (
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20}}>
                                <ActivityIndicator size="large" color={colors.primary.colorOne}/>
                            </View>
                        ) : (
                            <>
                                {
                                    wishlistData.length ? (
                                        wishlistData.map((item, index) => (
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
                            </>
                        )
                    }
                </ScrollContainer>
        </WishlistContainer>
    )
}

export default WishlistScreen