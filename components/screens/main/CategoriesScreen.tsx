import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback } from 'react'
import {
    RefreshControl,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native'

import LoadingView from '@/components/shared/LoadingView'
import { ICON_NAMES } from '../../../constants/constant'
import ButtonIcon from '../../shared/ButtonIcon'
import ScreenHeader from '../../shared/ScreenHeader'

import useGetCategories from '@/hooks/main/categories/useGetCategories'
import { useRefresh } from '@/hooks/useRefresh'
import { RootStackParamList } from '@/types/navigation'

const CategoriesScreen = ({ route }) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const { data, loading, getCategories } = useGetCategories()

    useFocusEffect(
        useCallback(() => {
            console.log('Mount Categories')
            getCategories()

            return () => {
                console.log('Unmount Categories')
            }
        }, [])
    )

    const handleNavigation = (id) =>
        navigation.navigate('CategoriesEdit', {
            categoryID: id,
        })

    const { refreshing, onRefresh } = useRefresh({
        postRefresh: () => getCategories(),
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
            <ScrollView
                className="w-[90%] flex-1"
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
                    <View className="w-full flex-row flex-wrap justify-between p-4 mt-2.5">
                        {data?.map((item, index) => (
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
