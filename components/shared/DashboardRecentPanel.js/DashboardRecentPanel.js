import { View, Text } from 'react-native'
import React, { memo } from "react";

import { RecentPanel, DetailsContainer, ItemContainer, ItemName, ItemPrice, CommentImg } from './styles'

import imgPlaceholder from '../../../assets/test.jpg'

const DashboardRecentPanel = ({ data }) => {
    return (
        <CommentImg source={data.comment_img ? { uri: data.comment_img } : imgPlaceholder} />
    )
}

export default memo(DashboardRecentPanel);