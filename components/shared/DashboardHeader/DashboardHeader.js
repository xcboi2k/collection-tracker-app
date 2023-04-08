import { View, Text } from 'react-native'
import React from 'react'

import { DashboardHeaderContainer, DashboardHeaderTitle, DashboardUserImg } from './styles'

import imagePlaceHolder from '../../../assets/icon.png'

const DashboardHeader = ({title}) => {
    return (
        <DashboardHeaderContainer>
            <DashboardHeaderTitle>{title}</DashboardHeaderTitle>
            <DashboardUserImg source={imagePlaceHolder}/>
        </DashboardHeaderContainer>
    )
}

export default DashboardHeader