import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";

import { CategoriesAddContainer } from './styles';

import Header from '../../shared/Header/Header';

const CategoriesAddScreen = () => {
    const navigation = useNavigation();

    return (
        <CategoriesAddContainer>
            <Header
                title={"Add Category"}
                onPressLeftIcon={() => 
                    navigation.navigate("Categories", {
                        screen: "CategoriesMain"
                    })
                }
            />
        </CategoriesAddContainer>
    )
}

export default CategoriesAddScreen