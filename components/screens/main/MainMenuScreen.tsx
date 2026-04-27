import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback, useEffect, useState } from 'react'
import {
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

import LoadingView from '@/components/shared/LoadingView'
import { RootStackParamList } from '@/types/navigation'
import { formatPeso } from '@/utils/formatCurrency'
import { ICON_NAMES } from '@/constants/constant'
import useGetCollectionChartData from '@/hooks/useGetCollectionChartData'
import AlertStore from '@/stores/AlertStore'
import LoaderStore from '@/stores/LoaderStore'
import Icon from '@/components/common/Icon'
import CustomAlert from '@/components/shared/CustomAlert'
import CustomLoader from '@/components/shared/CustomLoader'
import DashboardChart from '@/components/shared/DashboardChart'
import DashboardHeader from '@/components/shared/DashboardHeader'
import DashboardRecentPanel from '@/components/shared/DashboardRecentPanel'
import useGetCollectionItems from '@/hooks/main/collections/useGetCollectionItems'
import DashboardSkeleton from '@/components/shared/DashboardSkeleton'
import { useRefresh } from '@/hooks/useRefresh'
import colors from '@/assets/themes/colors'
import DashboardAddCollectionItemCard from '@/components/shared/DashboardAddCollectionItemCard'

const MainMenuScreen = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    // State management for loading indicators
    const isLoading = LoaderStore((state) => state.isLoading)
    const startLoading = LoaderStore((state) => state.startLoading)
    const stopLoading = LoaderStore((state) => state.stopLoading)

    // For reloading after making changes
    const [totalValue, setTotalValue] = useState(0)
    const [averageValue, setAverageValue] = useState(0)
    const [mostExpensive, setMostExpensive] = useState(null)
    const [leastExpensive, setLeastExpensive] = useState(null)
    const [frequentCategory, setFrequentCategory] = useState('')

    const { data, chartData, loading, getCollectionItems } =
        useGetCollectionItems()

    useFocusEffect(
        useCallback(() => {
            console.log('Mount Main Menu')
            getCollectionItems()

            return () => {
                console.log('Unmount Main Menu')
            }
        }, [])
    )

    useEffect(() => {
        if (!data || data.length === 0) return

        // Total Value
        const totalAmount = data.reduce(
            (total, item) => total + item.collectionitem_amount,
            0
        )

        // Average Value
        const averageAmount = totalAmount / data.length

        // Most Expensive Item
        const mostExpensiveItem = data.reduce((max, item) =>
            max.collectionitem_amount > item.collectionitem_amount ? max : item
        )

        // Least Expensive Item
        const leastExpensiveItem = data.reduce((min, item) =>
            min.collectionitem_amount < item.collectionitem_amount ? min : item
        )

        // Category frequency map
        const categoryCount = data.reduce((acc, item) => {
            const key = item.category_name
            acc[key] = (acc[key] || 0) + 1
            return acc
        }, {})

        // Most frequent category (safe fallback)
        const mostFrequentCategory =
            Object.keys(categoryCount).reduce((a, b) =>
                categoryCount[a] > categoryCount[b] ? a : b
            ) || ''

        setTotalValue(totalAmount)
        setAverageValue(averageAmount)
        setMostExpensive(mostExpensiveItem)
        setLeastExpensive(leastExpensiveItem)
        setFrequentCategory(mostFrequentCategory)
    }, [data])

    const { refreshing, onRefresh } = useRefresh({
        postRefresh: () => getCollectionItems(),
    })

    return (
        <View className="flex-1 relative items-center pb-5 bg-white">
            {/* Header */}
            <DashboardHeader navigation={navigation} />

            {/* Scroll */}
            <ScrollView
                className="flex-1 w-[90%] mt-3"
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <DashboardAddCollectionItemCard
                    hasData={data?.length}
                    navigation={navigation}
                />
                {loading ? (
                    <DashboardSkeleton />
                ) : (
                    <>
                        {/* Charts + Stats */}
                        {chartData?.length ? (
                            <>
                                <DashboardChart
                                    title="Collection Status"
                                    chartData={chartData}
                                />
                                <View className="w-full bg-primary-100 rounded-2xl p-5 items-center">
                                    <Text className="text-white/80 text-sm">
                                        Total Collection Value
                                    </Text>

                                    <Text className="text-white text-4xl font-bold mt-1">
                                        {formatPeso(totalValue)}
                                    </Text>

                                    <Text className="text-white/70 text-sm mt-2">
                                        Across {data?.length} items
                                    </Text>
                                </View>
                                <View className="flex-row justify-between mt-4">
                                    <View className="flex-1 bg-white rounded-xl p-4 mr-2 shadow-sm border border-gray-100">
                                        <Text className="text-xs text-gray-500">
                                            Items
                                        </Text>
                                        <Text className="text-xl font-bold text-gray-900">
                                            {data?.length}
                                        </Text>
                                    </View>

                                    <View className="flex-1 bg-white rounded-xl p-4 ml-2 shadow-sm border border-primary-100/30">
                                        <Text className="text-xs text-gray-500">
                                            Avg Value
                                        </Text>
                                        <Text className="text-xl font-bold text-primary-100">
                                            {formatPeso(averageValue)}
                                        </Text>
                                    </View>
                                </View>
                                <View className="mt-4 bg-primary-50 rounded-2xl p-4 border border-primary-100/20">
                                    <Text className="text-xs text-gray-500">
                                        Most Valuable Item
                                    </Text>

                                    <Text className="text-lg font-bold text-gray-900 mt-1">
                                        {mostExpensive?.collectionitem_name}
                                    </Text>

                                    <Text className="text-xs text-gray-500 mt-2">
                                        Least:{' '}
                                        {leastExpensive?.collectionitem_name}
                                    </Text>
                                </View>
                                <View className="mt-4 bg-primary-100/10 rounded-2xl p-5 items-center border border-primary-100/20">
                                    <Text className="text-xs text-gray-500">
                                        Most Frequent Category
                                    </Text>

                                    <Text className="text-2xl font-bold text-primary-100 mt-1">
                                        {frequentCategory}
                                    </Text>
                                </View>
                            </>
                        ) : (
                            <View className="mt-2.5 items-center w-full">
                                <Text className="text-center text-[20px] w-full">
                                    Start adding items to see graph
                                </Text>
                            </View>
                        )}

                        {/* Recent Header */}
                        <View className="w-full flex-row items-center mt-4">
                            <Text className="text-[20px] font-bold text-black w-[80%]">
                                Recent Additions
                            </Text>
                        </View>
                        {data?.length ? (
                            <View className="w-full flex flex-col">
                                {data.slice(0, 5).map((item, index) => (
                                    <DashboardRecentPanel
                                        data={item}
                                        key={item.id ?? index}
                                    />
                                ))}
                            </View>
                        ) : (
                            <Text className="text-center text-[20px] w-full">
                                You have no recent additions
                            </Text>
                        )}
                    </>
                )}
            </ScrollView>
            {/* Loader */}
            <CustomLoader visible={isLoading} />
        </View>
    )
}

export default MainMenuScreen
