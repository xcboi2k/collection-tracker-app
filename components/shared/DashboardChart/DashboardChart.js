import { View, Text } from 'react-native'
import React, { memo } from 'react'
import { PieChart } from "react-native-chart-kit";

import colors from '../../../assets/themes/colors';
import { Panel } from '../../common/Styles';

import DashboardCategoryItem from '../DashboardCategoryItem'

import {
    Title,
    FigureContainer,
    Chart,
    CategoryList,
    CategoryListContainer,
    TitleContainer,
    DefaultText
} from "./styles";

const chartConfig = {
    backgroundGradientFrom: '#8c54a4',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#6c447c',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
};

const DashboardChart = ({ title, chartData }) => {
    const mapData = chartData.map((item) => ({
        name: item.category,
        amount: item.amount,
        color: item.color,
        icon: item.icon,
        legendFontColor:  item.color,
        legendFontSize: 15
    }));
    console.log('chart:',  chartData)
    console.log(mapData)
    return (
        <Panel>
            <TitleContainer>
                <Title>{title}</Title>
            </TitleContainer>
            <FigureContainer>
                <Chart>
                    <PieChart
                        data={mapData}
                        width={300}
                        height={200}
                        chartConfig={chartConfig}
                        accessor={"amount"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        center={[0, 5]}
                        absolute
                        hasLegend={false}
                    />
                </Chart>
                <CategoryListContainer>
                    {mapData.map((item) => (
                        <DashboardCategoryItem
                            iconName={item.icon}
                            categoryName={item.name}
                            total={item.amount}
                            key={item.name}
                            iconColor={item.color}
                        />
                    ))}
                </CategoryListContainer>
            </FigureContainer>
        </Panel>
    )
}

export default DashboardChart