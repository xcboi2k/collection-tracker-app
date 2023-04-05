import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";

import { ICON_NAMES } from '../../../constants/constant'

import { CategoriesContainer, CategoryList } from './styles'

import ScreenHeader from '../../shared/ScreenHeader/ScreenHeader'
import ButtonIcon from '../../shared/ButtonIcon/ButtonIcon'

import useCategoryStore from '../../../hooks/useCategoryStore';
import { useGetCategories } from '../../../hooks/useGetCategories';

const CategoriesScreen = () => {
    const [categories] = useCategoryStore((state) => state.categories);
    const navigation = useNavigation();

    console.log(categories)

    const data = [
        {
            id: 1,
            category_icon: ICON_NAMES.CATEGORIES_ICONS.CAR,
            category_color: '#E6B8B8',
            category_name: 'Cars'
        },
        {
            id: 2,
            category_icon: ICON_NAMES.CATEGORIES_ICONS.ROBOT,
            category_color: '#5ABFC6',
            category_name: 'Transformers'
        },
        {
            id: 3,
            category_icon: ICON_NAMES.CATEGORIES_ICONS.LIGHTSABER,
            category_color: '#B295C7',
            category_name: 'Star Wars'
        },
    ]

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
            <CategoryList
                data={categories}
                renderItem={({ item }) => (
                    <ButtonIcon
                        name={item.category_icon}
                        iconColor={item.category_color}
                        iconSize={25}
                        label={item.category_name}
                        key={item.id}
                        type=""
                        onPress={() => { handleNavigation(item.id); }}
                        styles={{ marginHorizontal: 10 }}
                    />
                )}
                horizontal={false}
                numColumns={4}
                ItemSeparatorComponent={() => (
                    <View style={{ width: "100%", marginVertical: 10 }} />
                )}
                columnWrapperStyle={{
                    justifyContent: "flex-start",
                }}
                extraData={{
                    categories: categories.length
                }}
            />
        </CategoriesContainer>
    )
}

export default CategoriesScreen