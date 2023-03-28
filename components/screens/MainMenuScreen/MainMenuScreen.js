import { View, Text, FlatList } from 'react-native'
import React from 'react'

import { MainMenuContainer, HolderContainer, RecentPanelContainer } from './styles'

import { ICON_NAMES } from '../../../constants/constant'
import colors from '../../../assets/themes/colors'

import { chartData, itemData } from '../../../sampleData/sampleData'

import Button from '../../shared/Button/Button'
import ButtonIcon from '../../shared/ButtonIcon/ButtonIcon'

import DashboardHeader from '../../shared/DashboardHeader'
import DashboardChart from '../../shared/DashboardChart/DashboardChart'
import DashboardRecentPanel from '../../shared/DashboardRecentPanel.js'

const MainMenuScreen = () => {
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