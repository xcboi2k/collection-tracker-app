import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

import LoadingView from '@/components/shared/LoadingView'
import { RootStackParamList } from '@/types/navigation'
import { ICON_NAMES } from '../../constants/constant'
import useWishlistStore from '../../stores/WishlistStore'
import ScreenHeader from '../shared/ScreenHeader'
import WishlistButton from '../shared/WishlistButton'

const WishlistScreen = ({ route }) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const [wishlistData, setWishlistData] = useState([])
    const setWishlistItems = useWishlistStore((state) => state.setWishlistItems)
    const [loading, setLoading] = useState(false)

    const fetchWishlistItems = () => {
        // setLoading(true)
        // const wishlistColRef = collection(db, 'wishlist')
        // const wishlistQuery = query(wishlistColRef, orderBy('wishlist_name'))
        // const unsubscribe = onSnapshot(wishlistQuery, (snapshotData) => {
        //     const userList = []
        //     snapshotData.forEach((doc) => {
        //         userList.push({
        //             ...doc.data(),
        //             id: doc.id,
        //         })
        //         // console.log("CATEGORY PUSHED", doc.id);
        //     })
        //     if (userList.length > 0) {
        //         setWishlistItems(userList)
        //         setWishlistData(userList)
        //         setLoading(false)
        //     }
        // })
        // return unsubscribe
    }

    useFocusEffect(
        useCallback(() => {
            console.log('Mount Wishlist')
            fetchWishlistItems()

            return () => {
                console.log('Unmount Wishlist')
            }
        }, [])
    )

    const handleNavigation = (id) =>
        navigation.navigate('WishlistEdit', {
            wishlistItemID: id,
        })

    return (
        <View className="flex-1 relative items-center pb-5">
            {/* Header */}
            <ScreenHeader
                title="Wishlist"
                rightIconName={ICON_NAMES.SYSTEM_ICONS.ADD}
                rightIconSize={32}
                onPressRightIcon={() => navigation.navigate('WishlistAdd')}
            />

            {/* Scroll */}
            <ScrollView className="flex-1 w-[90%] mt-5">
                {loading ? (
                    <LoadingView />
                ) : (
                    <>
                        {wishlistData.length ? (
                            wishlistData.map((item, index) => (
                                <WishlistButton
                                    key={item.id ?? index}
                                    onPress={() => handleNavigation(item.id)}
                                    name={item.wishlist_name}
                                    amount={item.wishlist_amount}
                                />
                            ))
                        ) : (
                            <Text className="text-center text-[20px] w-full">
                                Add an item to your Wishlist.
                            </Text>
                        )}
                    </>
                )}
            </ScrollView>
        </View>
    )
}

export default WishlistScreen
