import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";

import { ICON_NAMES } from '../../../constants/constant'

import { CategoriesContainer } from './styles'

import ScreenHeader from '../../shared/ScreenHeader/ScreenHeader'

import useCategoryStore from '../../../hooks/useCategoryStore';
import useGetCategories from '../../../hooks/useGetCategories';

const CategoriesScreen = () => {
    const [categories] = useCategoryStore((state) => state.categories);
    const navigation = useNavigation();

    const handleNavigation = (id) =>
        navigation.navigate("Categories", {
            screen: "CategoriesEdit",
            params: {
                categoryID: id
            }
        });

    return (
        <CategoriesContainer>
            <ScreenHeader 
            title={'Categories'}
            rightIconName={ICON_NAMES.SYSTEM_ICONS.ADD}
            rightIconSize={32}
            onPressRightIcon={() => 
                navigation.navigate("Categories", {
                    screen: "CategoriesAdd"
                })
            }
            />
        </CategoriesContainer>
    )
}

export default CategoriesScreen