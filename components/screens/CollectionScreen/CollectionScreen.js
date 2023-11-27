import { FlatList } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";

import { ICON_NAMES } from '../../../constants/constant'

import { CollectionContainer, HolderContainer, DefaultText } from './styles'

import ScreenHeader from '../../shared/ScreenHeader/ScreenHeader'
import WishlistButton from '../../shared/WishlistButton/WishlistButton';

import useGetCollectionItems from '../../../hooks/useGetCollectionItems';
import useCollectionStore from '../../../hooks/useCollectionStore';

const CollectionScreen = ({route}) => {
    const navigation = useNavigation();

    const [collectionItems] = useGetCollectionItems();
    const setCollectionItemUpdated = useCollectionStore((state) => state.setCollectionItemUpdated)
    const setCollectionItemDeleted = useCollectionStore((state) => state.setCollectionItemDeleted)

    //for reloading after making changes
    const key = route.params?.key || 'defaultKey';
    useEffect(() => {
        if(setCollectionItemUpdated){
            setCollectionItemUpdated(false)
        }else{
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
            />
                <HolderContainer>
                    {
                        collectionItems.length ? 
                        <FlatList 
                            data={collectionItems}
                            renderItem={renderCollectionItem}
                            keyExtractor={(item) => item.id}
                        />
                        : <DefaultText>Add an item to your Collection.</DefaultText>
                    }
                </HolderContainer>
        </CollectionContainer>
    )
}

export default CollectionScreen