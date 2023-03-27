import { View, Text } from 'react-native'
import React from 'react'

import { MainMenuContainer, HolderContainer } from './styles'

import { ICON_NAMES } from '../../../constants/constant'
import colors from '../../../assets/themes/colors'

import { chartData } from '../../../sampleData/sampleData'

import Button from '../../shared/Button/Button'
import ButtonIcon from '../../shared/ButtonIcon/ButtonIcon'

import DashboardHeader from '../../shared/DashboardHeader'
import DashboardChart from '../../shared/DashboardChart/DashboardChart'

const MainMenuScreen = () => {
    return (
        <MainMenuContainer>
            <DashboardHeader
                title={'Home'}
            />
            <HolderContainer>
                <DashboardChart title={"Collection Status"} chartData={chartData}/>
            </HolderContainer>
        </MainMenuContainer>
        
    )
    }

export default MainMenuScreen