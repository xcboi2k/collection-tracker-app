import { ActivityIndicator, FlatList, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { onSnapshot, collection, query, orderBy, where } from 'firebase/firestore';

import { CategoriesContainer, CategoryList, CategoryListContainer, ScrollContainer } from './styles'

import preMadeCategories from '../../../data/preMadeCategories';
import { ICON_NAMES } from '../../../constants/constant'
import colors from '../../../assets/themes/colors';
import { db } from '../../../firebase.js';

import ScreenHeader from '../../shared/ScreenHeader/ScreenHeader'
import ButtonIcon from '../../shared/ButtonIcon/ButtonIcon'

import useCategoryStore from '../../../hooks/useCategoryStore';

const CategoriesScreen = ({route}) => {
    const navigation = useNavigation();

    const [categoryData, setCategoryData] = useState([]);
    const setCategories = useCategoryStore((state) => (state.setCategories));
    const [loading, setLoading] = useState(false)

    const fetchCategories = () => {
        setLoading(true)
        const categoryColRef = collection(db, "categories");
        const categoryQuery = query(categoryColRef);

        const unsubscribe = onSnapshot(categoryQuery, (snapshotData) => {
            // console.log("FETCH CATEGORIES");
            const prepCategories = preMadeCategories.map((category) => ({
                ...category,
                // user_id: userID
            }));
            const userList = [];

            snapshotData.forEach((doc) => {
                // check if doc is already in the array;
                if (prepCategories.some(item => item.id === doc.id)) {
                    const objIndex = prepCategories.findIndex((item) => item.id === doc.id);
                    prepCategories.splice(objIndex, 1);
                }
                userList.push({
                    ...doc.data(),
                    id: doc.id
                });
                // console.log("CATEGORY PUSHED", doc.id);
            });
            if(userList.length > 0){
                setCategories([...prepCategories, ...userList]);
                setCategoryData([...prepCategories, ...userList]);
                setLoading(false)
            }
        });

        return unsubscribe;
    }

    useFocusEffect(
        useCallback(() => {
            console.log('Mount Categories');
            fetchCategories()
            
            return () => {
                console.log('Unmount Categories');
            };
        }, [])
    );

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
            <ScrollContainer>
            {
                    loading ? (
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20}}>
                            <ActivityIndicator size="large" color={colors.primary.colorOne}/>
                        </View>
                    ) : (
                        <CategoryListContainer>
                            {
                                categoryData.map((item, index) => (
                                    <ButtonIcon
                                        name={item.category_icon}
                                        iconColor={item.category_color}
                                        iconSize={25}
                                        label={item.category_name}
                                        key={index}
                                        type=""
                                        onPress={() => { handleNavigation(item.id); }}
                                        styles={{ marginHorizontal: 10 }}
                                    />
                                ))
                            }      
                        </CategoryListContainer>
                    )
                }
            </ScrollContainer>
        </CategoriesContainer>
    )
}

export default CategoriesScreen