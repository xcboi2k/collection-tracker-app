import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback } from 'react'
import { RefreshControl, ScrollView, Text, View } from 'react-native'

import LoadingView from '@/components/shared/LoadingView'
import ScreenHeader from '@/components/shared/ScreenHeader'
import WishlistButton from '@/components/shared/WishlistButton'
import { ICON_NAMES } from '@/constants/constant'
import useGetWishlistItems from '@/hooks/main/wishlist-items/useGetWishlistItems'
import useUpdateWishlistItem from '@/hooks/main/wishlist-items/useUpdateWishlistItem'
import { useRefresh } from '@/hooks/useRefresh'
import { RootStackParamList } from '@/types/navigation'

const WishlistScreen = ({ route }) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const { data, loading, getWishlistItems } = useGetWishlistItems()
    const { markWishlistItemAcquired } = useUpdateWishlistItem()

    useFocusEffect(
        useCallback(() => {
            console.log('Mount Wishlist')
            getWishlistItems()

            return () => {
                console.log('Unmount Wishlist')
            }
        }, [])
    )

    const handleNavigation = (id) =>
        navigation.navigate('WishlistEdit', {
            wishlistItemID: id,
        })

    const goToNextScreen = () => {
        navigation.navigate('WishlistMain')
    }

    const { refreshing, onRefresh } = useRefresh({
        postRefresh: () => getWishlistItems(),
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
            <ScrollView
                className="flex-1 w-[90%] mt-5"
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {loading ? (
                    <LoadingView />
                ) : (
                    <>
                        {data?.length ? (
                            data?.map((item, index) => (
                                <WishlistButton
                                    key={item.id ?? index}
                                    onPress={() => handleNavigation(item.id)}
                                    name={item.wishlist_name}
                                    amount={item.wishlist_amount}
                                    variant="wishlist"
                                    isChecked={item.status === 'acquired'}
                                    onToggle={() =>
                                        markWishlistItemAcquired(
                                            item.id,
                                            goToNextScreen
                                        )
                                    }
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
