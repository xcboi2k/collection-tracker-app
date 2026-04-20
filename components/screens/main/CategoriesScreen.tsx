import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import LoadingView from '@/components/shared/LoadingView'
import { ICON_NAMES } from '../../../constants/constant'
import preMadeCategories from '../../../data/preMadeCategories'
import useCategoryStore from '../../../stores/CategoryStore'
import ButtonIcon from '../../shared/ButtonIcon'
import ScreenHeader from '../../shared/ScreenHeader'

import { RootStackParamList } from '@/types/navigation'

const CategoriesScreen = ({ route }) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const [categoryData, setCategoryData] = useState([])
    const setCategories = useCategoryStore((state) => state.setCategories)
    const [loading, setLoading] = useState(false)

    const fetchCategories = () => {
        setLoading(true)
        // const categoryColRef = collection(db, 'categories')
        // const categoryQuery = query(categoryColRef)

        // const unsubscribe = onSnapshot(categoryQuery, (snapshotData) => {
        //     // console.log("FETCH CATEGORIES");
        //     const prepCategories = preMadeCategories.map((category) => ({
        //         ...category,
        //         // user_id: userID
        //     }))
        //     const userList = []

        //     snapshotData.forEach((doc) => {
        //         // check if doc is already in the array;
        //         if (prepCategories.some((item) => item.id === doc.id)) {
        //             const objIndex = prepCategories.findIndex(
        //                 (item) => item.id === doc.id
        //             )
        //             prepCategories.splice(objIndex, 1)
        //         }
        //         userList.push({
        //             ...doc.data(),
        //             id: doc.id,
        //         })
        //         // console.log("CATEGORY PUSHED", doc.id);
        //     })
        //     if (userList.length > 0) {
        //         setCategories([...prepCategories, ...userList])
        //         setCategoryData([...prepCategories, ...userList])
        //         setLoading(false)
        //     }
        // })

        // return unsubscribe

        try {
            const prepCategories = preMadeCategories.map((category) => ({
                ...category,
                // user_id: userID
            }))
            setCategories([...prepCategories])
            setCategoryData([...prepCategories])
            setLoading(false)
        } catch (error) {
            console.log('Error fetching categories:', error)
            setLoading(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            console.log('Mount Categories')
            fetchCategories()

            return () => {
                console.log('Unmount Categories')
            }
        }, [])
    )

    const handleNavigation = (id) =>
        navigation.navigate('CategoriesEdit', {
            categoryID: id,
        })

    return (
        <View className="flex-1 relative items-center pb-5">
            {/* Header */}
            <ScreenHeader
                title="Categories"
                rightIconName={ICON_NAMES.SYSTEM_ICONS.ADD}
                rightIconSize={32}
                onPressRightIcon={() => navigation.navigate('CategoriesAdd')}
            />

            {/* Scroll */}
            <ScrollView className="w-[90%] flex-1">
                {loading ? (
                    <LoadingView />
                ) : (
                    <View className="w-full flex-row flex-wrap justify-between p-4 mt-2.5">
                        {categoryData.map((item, index) => (
                            <TouchableOpacity
                                key={item.id ?? index}
                                onPress={() => handleNavigation(item.id)}
                                className="mb-3"
                            >
                                <ButtonIcon
                                    name={item.category_icon}
                                    iconColor={item.category_color}
                                    iconSize={25}
                                    label={item.category_name}
                                    type=""
                                    styles={{ marginHorizontal: 10 }}
                                    onPress={() => {
                                        handleNavigation(item.id)
                                    }}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

export default CategoriesScreen
