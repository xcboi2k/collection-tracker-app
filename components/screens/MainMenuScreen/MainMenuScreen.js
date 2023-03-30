import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";

import { MainMenuContainer, HolderContainer, RecentPanelContainer, TitleButtonContainer, Title, RightIcon } from './styles'

import Icon from '../../common/Icon'
import { ICON_NAMES } from '../../../constants/constant'
import colors from '../../../assets/themes/colors'

import { chartData, itemData } from '../../../sampleData/sampleData'

import DashboardHeader from '../../shared/DashboardHeader'
import DashboardChart from '../../shared/DashboardChart/DashboardChart'
import DashboardRecentPanel from '../../shared/DashboardRecentPanel.js'

const MainMenuScreen = () => {
    const navigation = useNavigation();

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
                <DashboardChart title={"Collection Status"} chartData={chartData}/>
            </HolderContainer>
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
            <RecentPanelContainer>
                <FlatList
                    data={itemData}
                    renderItem={renderRecentPanelItem}
                    keyExtractor={(item) => item.id}
                />
            </RecentPanelContainer>
        </MainMenuContainer>
        
    )
    }

export default MainMenuScreen