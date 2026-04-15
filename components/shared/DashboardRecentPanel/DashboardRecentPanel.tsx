import { View, Text } from 'react-native'
import React, { memo } from "react";

import { DetailsContainer, CommentImg } from './styles'

import imgPlaceholder from '../../../assets/test.jpg'

const DashboardRecentPanel = ({ data, styles }) => {
    return (
        <DetailsContainer style={styles}>
            <CommentImg source={data.comment_img ? { uri: data.comment_img } : imgPlaceholder} />
        </DetailsContainer>
    )
}

export default memo(DashboardRecentPanel);