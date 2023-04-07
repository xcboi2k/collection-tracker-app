import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useFormik } from "formik";

import { WishlistEditContainer, WishlistFormHolder, ButtonContainer } from "./styles";

import Header from '../../shared/Header/Header'
import Button from '../../shared/Button';
import TextInput from '../../shared/TextInput';

import useWishlistStore from '../../../hooks/useWishlistStore';

const WishlistEditScreen = ({route, navigation}) => {
    const { wishlistItemID } = route.params

    const wishlistItems = useWishlistStore((state) => state.wishlistItems);
    const updateWishlistItem = useWishlistStore((state) => state.updateWishlistItem);
    const deleteWishlistItem = useWishlistStore((state) => state.deleteWishlistItem);

    const [currentWishlistItem, setCurrentWishlistItem] = useState(() => {
        return wishlistItems.find(item => item.id === wishlistItemID);
    });
    const [mode, setMode] = useState("details");
    const [date, setDate] = useState(currentWishlistItem.created_at);

    useEffect(() => {
        const targetWishlistItem = wishlistItems.find(item => item.id === wishlistItemID);
        
        setCurrentWishlistItem(targetWishlistItem);
    }, [wishlistItemID]);

    const handleFormikSubmit = async (values) => {
        const newWishlistItem = {
            // user_id: user.user_id,
            wishlist_name: values.wishlistName,
            wishlist_amount: values.wishlistAmount,
            created_at: date,
        };
        updateWishlistItem(wishlistItemID, newWishlistItem);
        Alert.alert("SUCCESS", "Document Updated");
        formik.resetForm();
        navigation.navigate("Wishlist", { screen: "WishlistMain" });
    };

    const showDeletePrompt = () => {
        Alert.alert("Deleting file", "Are you sure ?", [{
            text: "Yes",
            onPress: handleDelete,
            style: "destructive"
        }, {
            text: "No",
            onPress: () => { },
            style: "cancel"
        }]);

    };

    const handleDelete = () => {
        deleteWishlistItem(wishlistItemID);
        Alert.alert("Success", "Item Deleted.");
        navigation.navigate("Home", { screen: "HomeMain" });
    };

    const initialValues = {
        wishlistName: currentWishlistItem.wishlist_name,
        wishlistAmount: currentWishlistItem.wishlist_amount,
        // userID: "",
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleFormikSubmit,
    });

    const screenTitle = `${mode === "edit" ? "Edit" : "Item"} Details`;

    const EditButtonGroup = () => (
        <>
            <Button
                type="filled"
                width="45%"
                title="Save"
                rounded="8px"
                textSize={16}
                noBorder={false}
                onPress={formik.handleSubmit}
            />
            <Button
                type="outlined"
                width="45%"
                title="Delete"
                rounded="8px"
                textSize={16}
                noBorder={false}
                onPress={showDeletePrompt}
            />
        </>
    );

    return (
        <WishlistEditContainer>
            <Header 
                title={screenTitle}
                onPressLeftIcon={() => 
                    navigation.navigate("Wishlist", {
                        screen: "WishlistMain"
                    })
                }
            />
            <WishlistFormHolder>
                <TextInput 
                    inputProps={{
                        placeholder: "Enter Wishlist Item Name",
                        onChangeText: formik.handleChange("wishlistName"),
                        value: formik.values.wishlistName,
                        editable: mode === "edit"
                    }}
                    customLabel="Wishlist Item Name:"
                />
                <TextInput 
                    inputProps={{
                        placeholder: "Enter Wishlist Item Amount",
                        onChangeText: formik.handleChange("wishlistAmount"),
                        value: formik.values.wishlistAmount,
                        editable: mode === "edit"
                    }}
                    customLabel="Wishlist Item Amount:"
                />
            </WishlistFormHolder>
            <ButtonContainer mode={mode}>
                {mode === "edit" ? (
                    <EditButtonGroup />
                ) : (
                <Button
                    type="outlined"
                    width="45%"
                    title="EDIT"
                    rounded="8px"
                    textSize={16}
                    noBorder={false}
                    onPress={() => setMode("edit")}
                />
                )}
            </ButtonContainer>
        </WishlistEditContainer>
    )
}

export default WishlistEditScreen