import { ActivityIndicator, FlatList, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { onSnapshot, collection, query, orderBy, where } from 'firebase/firestore';

import { CollectionContainer, DefaultText, ScrollContainer } from './styles'

import { ICON_NAMES } from '../../../constants/constant'
import colors from '../../../assets/themes/colors.js';
import { db } from '../../../firebase.js';

import ScreenHeader from '../../shared/ScreenHeader/ScreenHeader'
import WishlistButton from '../../shared/WishlistButton/WishlistButton';

import useCollectionStore from '../../../hooks/useCollectionStore';

const CollectionScreen = ({route}) => {
    const navigation = useNavigation();

    const [collectionData, setCollectionData] = useState([]);
    const setCollectionItems = useCollectionStore((state) => state.setCollectionItems);
    const [loading, setLoading] = useState(false)
    const fetchCollection = async () => {
        setLoading(true)
        const collectionColRef = collection(db, "collection");
        const collectionQuery = query(collectionColRef, orderBy("created_at", "desc"));

        const unsubscribe = onSnapshot(collectionQuery, (snapshotData) => {
            const userList = [];

            snapshotData.forEach((doc) => {
                userList.push({
                    ...doc.data(),
                    id: doc.id
                });
                // console.log("CATEGORY PUSHED", doc.id);
            });
            if(userList.length > 0){
                setCollectionData(userList);
                setCollectionItems(userList);
                setLoading(false)
            }
        });

        return unsubscribe;
    }

    useFocusEffect(
        useCallback(() => {
            console.log('Mount Collection');
            fetchCollection()
            
            return () => {
                console.log('Unmount Collection');
            };
        }, [])
    );

    const handleNavigation = (id) =>
        navigation.navigate("Collections", {
            screen: "CollectionEdit",
            params: {
                collectionItemID: id
            }
    });

    return (
        <CollectionContainer>
            <ScreenHeader 
                title={'Collections'}
            />
            <ScrollContainer>
                {
                    loading ? (
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20}}>
                            <ActivityIndicator size="large" color={colors.primary.colorOne}/>
                        </View>
                    ) : (
                        <>
                            {
                                collectionData.length ? (
                                    collectionData.map((item, index) => (
                                        <WishlistButton
                                            key={index}
                                            onPress={() => { handleNavigation(item.id); }}
                                            name={item.collectionItem_name}
                                            amount={item.collectionItem_amount}
                                        />
                                    ))
                                ) : (
                                    <DefaultText>Add an item to your Collection.</DefaultText>
                                )
                            }
                        </>
                    )
                }
            </ScrollContainer>
        </CollectionContainer>
    )
}

export default CollectionScreen