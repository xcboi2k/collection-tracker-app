import { FlatList } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";

import { ICON_NAMES } from '../../../constants/constant'

import { CollectionContainer, HolderContainer, DefaultText } from './styles'

import ScreenHeader from '../../shared/ScreenHeader/ScreenHeader'
import WishlistButton from '../../shared/WishlistButton/WishlistButton';

import useGetCollectionItems from '../../../hooks/useGetCollectionItems';

const CollectionScreen = () => {
    const [collectionItems] = useGetCollectionItems();
    const navigation = useNavigation();

    const handleNavigation = (id) =>
        navigation.navigate("Collection", {
            screen: "CollectionEdit",
            params: {
                collectionID: id
            }
    });

    const renderCollectionItem = ({ item }) => {
        return(
            <WishlistButton 
                onPress={() => { handleNavigation(item.id); }}
                name={item.collectionItem_name}
                amount={item.collectionItem_amount}
            />
        );
    };

    return (
        <CollectionContainer>
            <ScreenHeader 
            title={'Collections'}
            rightIconName={ICON_NAMES.CATEGORIES_ICONS.GAMING}
            rightIconSize={32}
            />
            {
                collectionItems.length ? 
                <HolderContainer>
                    <FlatList 
                        data={collectionItems}
                        renderItem={renderCollectionItem}
                        keyExtractor={(item) => item.id}
                    />
                </HolderContainer>
                : <DefaultText>Add an item to your Collection.</DefaultText>
            }
        </CollectionContainer>
    )
}

export default CollectionScreen