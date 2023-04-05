import React, { useState } from "react";
import { Alert } from "react-native";
import { useFormik } from "formik";

import { WishlistAddContainer, WishlistFormHolder, ButtonContainer } from './styles'

import Header from '../../shared/Header/Header'
import Button from '../../shared/Button';
import TextInput from '../../shared/TextInput';

import useWishlistStore from '../../../hooks/useWishlistStore';

const WishlistAddScreen = ({ navigation }) => {
    const addWishlistItem = useWishlistStore((state) => state.addWishlistItem);
    
    const initialValues = {
        wishlistName: "",
        wishlistAmount: "",
        // userID: "",
        createdAt: "",
        updatedAt: ""
    };

    const handleFormikSubmit = async (values, { resetForm }) => {
        addWishlistItem({
            wishlist_name: values.wishlistName,
            wishlist_amount: values.wishlistAmount,
            created_at: new Date(),
            update_at: "",
            // user_id: user.user_id
        });
        resetForm();
        Alert.alert("Success", "Added a New Wishlist Item");
        navigation.navigate("Wishlist", { screen: "WishlistMain" });
    };

    const handleClear = () => {
        formik.resetForm();
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleFormikSubmit,
    });

    return (
        <WishlistAddContainer>
            <Header 
                title={"Add Wishlist Item"}
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
                    }}
                    customLabel="Wishlist Item Name:"
                />
                <TextInput 
                    inputProps={{
                        placeholder: "Enter Wishlist Item Amount",
                        onChangeText: formik.handleChange("wishlistAmount"),
                        value: formik.values.wishlistAmount,
                    }}
                    customLabel="Wishlist Item Amount:"
                />
            </WishlistFormHolder>
            <ButtonContainer>
                <Button
                    type="filled"
                    width="45%"
                    title="Save"
                    rounded="8px"
                    textSize={14}
                    noBorder={false}
                    onPress={formik.handleSubmit}
                />
                <Button
                    type="outlined"
                    width="45%"
                    title="Clear"
                    rounded="8px"
                    textSize={14}
                    noBorder={false}
                    onPress={handleClear}
                />
            </ButtonContainer>
        </WishlistAddContainer>
    )
}

export default WishlistAddScreen