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
    
    const CategoryRenderItem = ({ item }) => (
        <DashboardCategoryItem
            iconName={item.iconName}
            categoryName={item.categoryName}
            total={item.categoryAmount}
            key={item.id}
            iconColor={item.iconColor}
            // onPress={() => handleNavigate(item.category_name)}
        />
    );

    return (
        <Panel>
            <TitleContainer>
                <Title>{title}</Title>
            </TitleContainer>
            <FigureContainer>
                <Chart>
                    <PieChart
                        data={chartData}
                        width={1000}
                        height={100}
                        chartConfig={chartConfig}
                        accessor={"categoryAmount"}
                        backgroundColor={"transparent"}
                        center={[500, 0]}
                        hasLegend={false}
                        absolute
                        style={{ width: "100%" }}
                    />
                </Chart>
                <CategoryListContainer>
                    <CategoryList
                        data={chartData}
                        renderItem={CategoryRenderItem}
                    />
                </CategoryListContainer>
            </FigureContainer>
        </Panel>
    )
}

export default DashboardChart