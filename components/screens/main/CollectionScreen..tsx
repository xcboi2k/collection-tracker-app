import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback } from 'react'
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    Text,
    View,
} from 'react-native'

import colors from '@/assets/themes/colors'
import ScreenHeader from '@/components/shared/ScreenHeader'
import WishlistButton from '@/components/shared/WishlistButton'
import useGetCollectionItems from '@/hooks/main/collections/useGetCollectionItems'
import { useRefresh } from '@/hooks/useRefresh'
import { RootStackParamList } from '@/types/navigation'

const CollectionScreen = ({ route }) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const { data, loading, getCollectionItems } = useGetCollectionItems()

    useFocusEffect(
        useCallback(() => {
            console.log('Mount Collection')
            getCollectionItems()

            return () => {
                console.log('Unmount Collection')
            }
        }, [])
    )

    const handleNavigation = (id) =>
        navigation.navigate('CollectionEdit', {
            collectionItemID: id,
        })

    const { refreshing, onRefresh } = useRefresh({
        postRefresh: () => getCollectionItems(),
    })

    return (
        <View className="flex-1 relative items-center pb-5">
            {/* Header */}
            <ScreenHeader title="Collections" />

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
                    <View className="flex-1 justify-center items-center my-5">
                        <ActivityIndicator
                            size="large"
                            color={colors.primary.colorOne} // replace with colors.primary.colorOne
                        />
                    </View>
                ) : (
                    <>
                        {data?.length ? (
                            data?.map((item, index) => (
                                <WishlistButton
                                    key={item.id ?? index}
                                    onPress={() => handleNavigation(item.id)}
                                    name={item.collectionitem_name}
                                    amount={item.collectionitem_amount}
                                />
                            ))
                        ) : (
                            <Text className="text-center text-[20px] w-full">
                                Add an item to your Collection.
                            </Text>
                        )}
                    </>
                )}
            </ScrollView>
        </View>
    )
}

export default CollectionScreen
