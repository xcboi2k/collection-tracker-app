import { View, Text } from 'react-native'
import React, { memo } from "react";

import { RecentPanel, DetailsHolder, ItemContainer, ItemName, ItemPrice, Comment, CommentImg } from './styles'

import imgPlaceholder from '../../../assets/test.jpg'

const DashboardRecentPanel = ({ data }) => {
    return (
        <RecentPanel>
            <DetailsHolder>
                <ItemName>{data.itemName}</ItemName>
            </DetailsHolder>
            <DetailsHolder>
                <CommentImg source={data.itemPhoto ? { uri: data.itemPhoto } : imgPlaceholder} />
            </DetailsHolder>
        </RecentPanel>
    )
}

export default memo(DashboardRecentPanel);