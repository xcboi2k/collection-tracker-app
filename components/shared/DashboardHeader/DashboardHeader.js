import { View, Text } from 'react-native'
import React from 'react'

import { DashboardHeaderContainer, DashboardHeaderItemsHolderContainer, DashboardHeaderTitle, DashboardUserImg } from './styles'

import imagePlaceHolder from '../../../assets/icon.png'

const DashboardHeader = ({title}) => {
    return (
        <DashboardHeaderContainer>
            <DashboardHeaderItemsHolderContainer>
                <DashboardHeaderTitle>{title}</DashboardHeaderTitle>
                <DashboardUserImg source={imagePlaceHolder}/>
            </DashboardHeaderItemsHolderContainer>
        </DashboardHeaderContainer>
    )
}

export default DashboardHeader