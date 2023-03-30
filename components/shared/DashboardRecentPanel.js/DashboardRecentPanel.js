import { View, Text } from 'react-native'
import React, { memo } from "react";

import { RecentPanel, DetailsContainer, ItemContainer, ItemName, ItemPrice, CommentImg } from './styles'

import imgPlaceholder from '../../../assets/test.jpg'

const DashboardRecentPanel = ({ data }) => {
    return (
        <RecentPanel>
            <DetailsContainer>
                <ItemContainer>
                    <DetailsContainer>
                        <ItemName>{data.itemName}</ItemName>
                    </DetailsContainer>
                    <DetailsContainer>
                        <ItemPrice>₱ {data.itemAmount}</ItemPrice>
                    </DetailsContainer>
                </ItemContainer>
                <CommentImg source={data.itemPhoto ? { uri: data.itemPhoto } : imgPlaceholder} />
            </DetailsContainer>
        </RecentPanel>
    )
}

export default memo(DashboardRecentPanel);