import { FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from "@react-navigation/native";

import { ICON_NAMES } from '../../../constants/constant'

import { CollectionContainer, DefaultText, ScrollContainer } from './styles'

import ScreenHeader from '../../shared/ScreenHeader/ScreenHeader'
import WishlistButton from '../../shared/WishlistButton/WishlistButton';

import useGetCollectionItems from '../../../hooks/useGetCollectionItems';
import useCollectionStore from '../../../hooks/useCollectionStore';

const CollectionScreen = ({route}) => {
    const navigation = useNavigation();

    const [collectionItems] = useGetCollectionItems();

    // State variables for state changes
    const isCollectionItemUpdated = useCollectionStore(state => state.isCollectionItemUpdated);
    const isCollectionItemDeleted = useCollectionStore(state => state.isCollectionItemDeleted);
    const setCollectionItemUpdated = useCollectionStore((state) => state.setCollectionItemUpdated)
    const setCollectionItemDeleted = useCollectionStore((state) => state.setCollectionItemDeleted)

    // For reloading after making changes
    const key = route.params?.key || 'defaultKey';
    useEffect(() => {
        if(isCollectionItemUpdated){
            setCollectionItemUpdated(false)
        }else if(isCollectionItemDeleted){
            setCollectionItemDeleted(false)
        }
    }, [key]);


    const handleNavigation = (id) =>
        navigation.navigate("Collection", {
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
                    collectionItems.length ? (
                        collectionItems.map((item, index) => (
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
            </ScrollContainer>
        </CollectionContainer>
    )
}

export default CollectionScreen