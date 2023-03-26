import { View, Text } from 'react-native'
import React from 'react'

import { CollectionContainer } from './styles'

import { ICON_NAMES } from '../../../constants/constant'

import ScreenHeader from '../../shared/ScreenHeader/ScreenHeader'

const CollectionScreen = () => {
    return (
        <CollectionContainer>
            <ScreenHeader 
            title={'Collections'}
            rightIconName={ICON_NAMES.CATEGORIES_ICONS.GAMING}
            rightIconSize={32}
            />
        </CollectionContainer>
    )
}

export default CollectionScreen