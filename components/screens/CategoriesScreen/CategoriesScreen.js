import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from "@react-navigation/native";

import { ICON_NAMES } from '../../../constants/constant'

import { CategoriesContainer, CategoryList } from './styles'

import ScreenHeader from '../../shared/ScreenHeader/ScreenHeader'
import ButtonIcon from '../../shared/ButtonIcon/ButtonIcon'

import useCategoryStore from '../../../hooks/useCategoryStore';
import useGetCategories from '../../../hooks/useGetCategories';

const CategoriesScreen = ({route}) => {
    const navigation = useNavigation();

    const [categories] = useGetCategories();
    console.log(categories)

    const isCategoryCreated = useCategoryStore(state => state.isCategoryCreated);
    const isCategoryUpdated = useCategoryStore(state => state.isCategoryUpdated);
    const isCategoryDeleted = useCategoryStore(state => state.isCategoryDeleted);
    const setCategoryCreated = useCategoryStore((state) => state.setCategoryCreated);
    const setCategoryUpdated = useCategoryStore((state) => state.setCategoryUpdated);
    const setCategoryDeleted = useCategoryStore((state) => state.setCategoryDeleted);

    // For reloading after making changes
    const key = route.params?.key || 'defaultKey';
    useEffect(() => {
        if(isCategoryCreated){
            setCategoryCreated(false)
        }else if(isCategoryUpdated){
            setCategoryUpdated(false)
        }else if(isCategoryDeleted){
            setCategoryDeleted(false)
        }
    }, [key]);

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