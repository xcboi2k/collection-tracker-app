import { View, Text } from 'react-native'
import React from 'react'

import { MainMenuContainer, HolderContainer } from './styles'

const MainMenuScreen = () => {
    return (
        <MainMenuContainer>
            <HolderContainer>
                <View>
                    <Text>MainMenuScreen</Text>
                </View>
            </HolderContainer>
        </MainMenuContainer>
        
    )
    }

export default MainMenuScreen