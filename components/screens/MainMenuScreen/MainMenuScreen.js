import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";

import { 
    MainMenuContainer, 
    HolderContainer, 
    RecentPanelContainer, 
    TitleButtonContainer, 
    Title, 
    RightIcon, 
    DefaultText,
    HomeImg 
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
    const [chartData] = useGetCollectionChartData();

    const renderRecentPanelItem =({item}) => {
        return(
            <DashboardRecentPanel data={item}/>
        );
    }
    return (
        <MainMenuContainer>
            <DashboardHeader
                title={'Home'}
            />
            <HolderContainer>
                <DefaultText>Graphs under maintenance.</DefaultText>
                {/* <HomeImg source={imagePlaceHolder}/> */}
            </HolderContainer>
            {
                collectionItems.length ?
                <HolderContainer>
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
                    <HolderContainer>
                        <FlatList
                            data={collectionData}
                            renderItem={renderRecentPanelItem}
                            keyExtractor={(item) => item.id}
                        />
                    </HolderContainer>
                </HolderContainer>
                : null
            }
            {/* {
                collectionItems.length ?
                <HolderContainer>
                    <DashboardChart title={"Collection Status"} chartData={chartData}/>
                </HolderContainer> 
                : <DefaultText>Start adding items to see graph</DefaultText>
            } */}
        </MainMenuContainer>
        
    )
    }

export default MainMenuScreen