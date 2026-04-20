import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

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

const MainMenuScreen = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    // State management for loading indicators
    const isLoading = LoaderStore((state) => state.isLoading)
    const startLoading = LoaderStore((state) => state.startLoading)
    const stopLoading = LoaderStore((state) => state.stopLoading)

    // State management for alert components
    const isAlertVisible = AlertStore((state) => state.isAlertVisible)
    const alertTitle = AlertStore((state) => state.alertTitle)
    const alertMessage = AlertStore((state) => state.alertMessage)
    const showAlert = AlertStore((state) => state.showAlert)
    const hideAlert = AlertStore((state) => state.hideAlert)

    // Handle close alert function
    const handleAlertClose = () => {
        stopLoading()
        hideAlert()
    }

    const chartData = useGetCollectionChartData()

    // For reloading after making changes
    const [collectionData, setCollectionData] = useState([])
    const [totalValue, setTotalValue] = useState(0)
    const [averageValue, setAverageValue] = useState(0)
    const [mostExpensive, setMostExpensive] = useState(null)
    const [leastExpensive, setLeastExpensive] = useState(null)
    const [frequentCategory, setFrequentCategory] = useState('')
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
        //         setLoading(false)
        //     }
        // })
        // return unsubscribe
    }

    useFocusEffect(
        useCallback(() => {
            console.log('Mount Main Menu')
            fetchCollection()

            return () => {
                console.log('Unmount Main Menu')
            }
        }, [])
    )

    console.log(collectionData)

    useEffect(() => {
        if (collectionData.length > 0) {
            // Total Value and Average Value
            const totalAmount = collectionData.reduce(
                (total, item) => total + item.collectionItem_amount,
                0
            )
            const averageAmount = totalAmount / collectionData.length
            // Most Expensive Item
            const mostExpensiveItem = collectionData.reduce(
                (max, item) =>
                    max.collectionItem_amount > item.collectionItem_amount
                        ? max
                        : item,
                collectionData[0]
            )

            // Least Expensive Item
            const leastExpensiveItem = collectionData.reduce(
                (min, item) =>
                    min.collectionItem_amount < item.collectionItem_amount
                        ? min
                        : item,
                collectionData[0]
            )

            // Most Frequent Category
            const categoryCount = collectionData.reduce((acc, item) => {
                acc[item.category_name] = (acc[item.category_name] || 0) + 1
                return acc
            }, {})
            const mostFrequentCategory = Object.keys(categoryCount).reduce(
                (a, b) => (categoryCount[a] > categoryCount[b] ? a : b)
            )

            setTotalValue(totalAmount)
            setAverageValue(averageAmount)
            setMostExpensive(mostExpensiveItem)
            setLeastExpensive(leastExpensiveItem)
            setFrequentCategory(mostFrequentCategory)
        }
    }, [collectionData])

    return (
        <View className="flex-1 relative items-center pb-5">
            {/* Header */}
            <DashboardHeader title="Home" />

            {/* Scroll */}
            <ScrollView className="flex-1 w-[90%]">
                {loading ? (
                    <LoadingView />
                ) : (
                    <>
                        {/* Charts + Stats */}
                        {chartData.length ? (
                            <View className="mt-2.5 items-center w-full">
                                <DashboardChart
                                    title="Collection Status"
                                    chartData={chartData}
                                />

                                {/* Total Value */}
                                <View className="mt-2.5 items-center w-full">
                                    <View className="w-full h-[120px] bg-white p-3 rounded-xl items-center justify-center">
                                        <Text className="text-[10px] text-center text-black">
                                            Total Value of Collection
                                        </Text>
                                        <Text className="text-[30px] text-center text-blue-700 font-bold">
                                            {formatPeso(totalValue)}
                                        </Text>
                                    </View>
                                </View>

                                {/* Row 1 */}
                                <View className="w-full flex-row justify-between mt-2.5">
                                    <View className="w-[48%] h-[120px] bg-white p-3 rounded-xl items-center justify-center">
                                        <Text className="text-[10px] text-center">
                                            Total Items
                                        </Text>
                                        <Text className="text-[20px] text-blue-700 font-bold">
                                            {collectionData.length}
                                        </Text>
                                    </View>

                                    <View className="w-[48%] h-[120px] bg-white p-3 rounded-xl items-center justify-center">
                                        <Text className="text-[10px] text-center">
                                            Average Value of Collection
                                        </Text>
                                        <Text className="text-[20px] text-blue-700 font-bold text-center">
                                            {formatPeso(averageValue)}
                                        </Text>
                                    </View>
                                </View>

                                {/* Row 2 */}
                                <View className="w-full flex-row justify-between mt-2.5">
                                    <View className="w-[48%] h-[120px] bg-white p-3 rounded-xl items-center justify-center">
                                        <Text className="text-[10px] text-center">
                                            Most Expensive Item
                                        </Text>
                                        <Text className="text-[15px] text-blue-700 font-bold text-center">
                                            {mostExpensive?.collectionItem_name}
                                        </Text>
                                    </View>

                                    <View className="w-[48%] h-[120px] bg-white p-3 rounded-xl items-center justify-center">
                                        <Text className="text-[10px] text-center">
                                            Least Expensive Item
                                        </Text>
                                        <Text className="text-[15px] text-blue-700 font-bold text-center">
                                            {
                                                leastExpensive?.collectionItem_name
                                            }
                                        </Text>
                                    </View>
                                </View>

                                {/* Frequent Category */}
                                <View className="mt-2.5 items-center w-full">
                                    <View className="w-full h-[120px] bg-white p-3 rounded-xl items-center justify-center">
                                        <Text className="text-[10px] text-center">
                                            Most Frequent Category
                                        </Text>
                                        <Text className="text-[30px] text-blue-700 font-bold text-center">
                                            {frequentCategory}
                                        </Text>
                                    </View>
                                </View>
                            </View>
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

                            <TouchableOpacity
                                className="ml-auto"
                                onPress={() =>
                                    navigation.navigate('CollectionAdd')
                                }
                            >
                                <Icon
                                    name={ICON_NAMES.SYSTEM_ICONS.ADD}
                                    color="#1e40af"
                                    size={32}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Recent List */}
                        {collectionData.length ? (
                            <View className="w-full h-[500px] flex-row flex-wrap justify-between p-4">
                                {collectionData
                                    .slice(0, 12)
                                    .map((item, index) => (
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

            {/* Alert */}
            <CustomAlert
                visible={isAlertVisible}
                title={alertTitle}
                message={alertMessage}
                onClose={handleAlertClose}
            />

            {/* Loader */}
            <CustomLoader visible={isLoading} />
        </View>
    )
}

export default MainMenuScreen
