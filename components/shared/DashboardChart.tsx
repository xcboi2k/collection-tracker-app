import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { PieChart } from 'react-native-chart-kit'

import DashboardCategoryItem from './DashboardCategoryItem'

const chartConfig = {
    backgroundGradientFrom: '#8c54a4',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#6c447c',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
}

const DashboardChart = ({ title, chartData }) => {
    const mapData = chartData.map((item) => ({
        name: item.category,
        amount: item.amount,
        color: item.color,
        icon: item.icon,
        legendFontColor: item.color,
        legendFontSize: 15,
    }))

    return (
        <View className="w-full flex-1 mb-6">
            {/* Title */}
            <View className="flex-row justify-between items-center px-1 mb-1 pr-5">
                <Text className="text-[20px] font-bold">{title}</Text>
            </View>

            {/* Figure container */}
            <View className="w-full flex-1 flex-row items-center">
                {/* Chart */}
                <View className="flex-1 w-[70%]">
                    <PieChart
                        data={mapData}
                        width={300}
                        height={200}
                        chartConfig={chartConfig}
                        accessor="amount"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        center={[0, 5]}
                        absolute
                        hasLegend={false}
                    />
                </View>

                {/* Category list */}
                <ScrollView
                    className="flex-1 ml-5 w-[30%]"
                    showsVerticalScrollIndicator={false}
                >
                    {mapData?.map((item) => (
                        <DashboardCategoryItem
                            key={item.name}
                            iconName={item.icon}
                            categoryName={item.name}
                            total={item.amount}
                            iconColor={item.color}
                        />
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}

export default DashboardChart
