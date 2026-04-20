import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback, useState } from 'react'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'

import { RootStackParamList } from '@/types/navigation'
import useCollectionStore from '@/stores/CollectionStore'
import ScreenHeader from '@/components/shared/ScreenHeader'
import WishlistButton from '@/components/shared/WishlistButton'

const CollectionScreen = ({ route }) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const [collectionData, setCollectionData] = useState([])
    const setCollectionItems = useCollectionStore(
        (state) => state.setCollectionItems
    )
    const [loading, setLoading] = useState(false)
    const fetchCollection = async () => {
        // setLoading(true)
        // const collectionColRef = collection(db, 'collection')
        // const collectionQuery = query(
        //     collectionColRef,
        //     orderBy('created_at', 'desc')
        // )
        // const unsubscribe = onSnapshot(collectionQuery, (snapshotData) => {
        //     const userList = []
        //     snapshotData.forEach((doc) => {
        //         userList.push({
        //             ...doc.data(),
        //             id: doc.id,
        //         })
        //         // console.log("CATEGORY PUSHED", doc.id);
        //     })
        //     if (userList.length > 0) {
        //         setCollectionData(userList)
        //         setCollectionItems(userList)
        //         setLoading(false)
        //     }
        // })
        // return unsubscribe
    }

    useFocusEffect(
        useCallback(() => {
            console.log('Mount Collection')
            fetchCollection()

            return () => {
                console.log('Unmount Collection')
            }
        }, [])
    )

    const handleNavigation = (id) =>
        navigation.navigate('CollectionEdit', {
            collectionItemID: id,
        })

    return (
        <View className="flex-1 relative items-center pb-5">
            {/* Header */}
            <ScreenHeader title="Collections" />

            {/* Scroll */}
            <ScrollView className="flex-1 w-[90%] mt-5">
                {loading ? (
                    <View className="flex-1 justify-center items-center my-5">
                        <ActivityIndicator
                            size="large"
                            color="#1e40af" // replace with colors.primary.colorOne
                        />
                    </View>
                ) : (
                    <>
                        {collectionData.length ? (
                            collectionData.map((item, index) => (
                                <WishlistButton
                                    key={item.id ?? index}
                                    onPress={() => handleNavigation(item.id)}
                                    name={item.collectionItem_name}
                                    amount={item.collectionItem_amount}
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
