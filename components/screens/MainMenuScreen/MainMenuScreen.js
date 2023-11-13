import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from "@react-navigation/native";

import { 
    MainMenuContainer, 
    HolderContainer, 
    RecentList,
    RecentPanelContainer, 
    TitleButtonContainer, 
    Title, 
    RightIcon, 
    DefaultText,
    HomeImg, 
    ScrollContainer
} from './styles'

import Icon from '../../common/Icon'
import { ICON_NAMES } from '../../../constants/constant'
import colors from '../../../assets/themes/colors'

// import { chartData, itemData } from '../../../sampleData/sampleData'
import imagePlaceHolder from '../../../assets/icon.png'

import DashboardHeader from '../../shared/DashboardHeader'
import DashboardChart from '../../shared/DashboardChart/DashboardChart'
import DashboardRecentPanel from '../../shared/DashboardRecentPanel.js'

import useGetCollectionChartData from '../../../hooks/useGetCollectionChartData';
import useGetCollectionItems from '../../../hooks/useGetCollectionItems';
import useCollectionStore from '../../../hooks/useCollectionStore';

const MainMenuScreen = () => {
    const navigation = useNavigation();

    const collectionItems = useCollectionStore((state) => state.collectionItems);
    const [collectionData] = useGetCollectionItems();
    const chartData = useGetCollectionChartData();

    const renderRecentPanelItem =({item}) => {
        return(
            <DashboardRecentPanel data={item} styles={{ marginHorizontal: 10 }}/>
        );
    }
    
    return (
        <MainMenuContainer>
            <DashboardHeader
                title={'Home'}
            />
            <ScrollContainer>
            {
                    chartData.length ? (
                    <HolderContainer>
                        <DashboardChart title={"Collection Status"} chartData={chartData}/>
                    </HolderContainer>
                    ) : (
                        <HolderContainer>
                            <DefaultText>Start adding items to see graph</DefaultText>
                        </HolderContainer>
                    )
                }
                <TitleButtonContainer>
                    <Title>Recent Additions</Title>
                    <RightIcon onPress={() => 
                        navigation.navigate("Home", {
                            screen: "CollectionAdd"
                        })}>
                        <Icon 
                            name={ICON_NAMES.SYSTEM_ICONS.ADD}
                            color={colors.primary.colorOne}
                            size={32}
                        />
                    </RightIcon>
                </TitleButtonContainer>
                {collectionItems.length ? (
                    <RecentPanelContainer>
                        {collectionData.slice(0,12).map((item) => (
                             <DashboardRecentPanel data={item} />
                        ))}
                    </RecentPanelContainer>
                ) : (
                    <DefaultText>You have no recent additions</DefaultText>
                )
                }
            </ScrollContainer>
            
            <HolderContainer>
                
            </HolderContainer>
        </MainMenuContainer>
    )
    }

export default MainMenuScreen