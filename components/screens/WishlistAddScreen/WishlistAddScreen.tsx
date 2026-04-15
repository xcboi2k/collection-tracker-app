import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useFormik } from "formik";

import { WishlistAddContainer, WishlistFormHolder, ButtonContainer } from './styles'

import Header from '../../shared/Header/Header'
import Button from '../../shared/Button';
import TextInput from '../../shared/TextInput';
import CustomAlert from '../../shared/CustomAlert/CustomAlert.js';
import CustomLoader from '../../shared/CustomLoader/CustomLoader.js';

import useWishlistStore from '../../../hooks/useWishlistStore';

import LoaderStore from '../../../stores/LoaderStore';
import AlertStore from '../../../stores/AlertStore';

const WishlistAddScreen = ({ navigation }) => {
    // State management for loading indicators
    const isLoading = LoaderStore(state => state.isLoading);
    const startLoading = LoaderStore((state) => state.startLoading);
    const stopLoading = LoaderStore((state) => state.stopLoading);

    // State management for alert components
    const isAlertVisible = AlertStore(state => state.isAlertVisible);
    const alertTitle = AlertStore(state => state.alertTitle);
    const alertMessage = AlertStore(state => state.alertMessage);
    const showAlert = AlertStore((state) => state.showAlert);
    const hideAlert = AlertStore((state) => state.hideAlert);

    // Handle close alert function
    const handleAlertClose = () => {
        stopLoading()
        hideAlert()
    }

    const isWishlistItemCreated = useWishlistStore(state => state.isWishlistItemCreated)

    // State variables
    const addWishlistItem = useWishlistStore((state) => state.addWishlistItem);

    // Initial form values
    const initialValues = {
        wishlistName: "",
        wishlistAmount: "",
        // userID: "",
        createdAt: "",
        updatedAt: ""
    };

    // Handle formik form submission
    const handleFormikSubmit = async (values, { resetForm }) => {
        try{
            addWishlistItem({
                wishlist_name: values.wishlistName,
                wishlist_amount: values.wishlistAmount,
                created_at: new Date(),
                // user_id: user.user_id
            });
            resetForm();
        }catch(error){
            stopLoading()
            showAlert("Error", `Failed to submit information. ${error}`)
        }  
    };

    // Formik configuration
    const formik = useFormik({
        initialValues,
        onSubmit: handleFormikSubmit,
    });

    // Handle clear button press
    const handleClear = () => {
        formik.resetForm();
    };

    // For navigating to next screen
    useEffect(() => {
        if (isWishlistItemCreated) {
            const newKey = Math.random().toString();
            navigation.navigate("Wishlists", {
                screen: "WishlistMain",
                key: newKey
            })
        }
    }, [isWishlistItemCreated]);

    return (
        <WishlistAddContainer>
            <Header 
                title={"Add Wishlist Item"}
                onPressLeftIcon={() => 
                    navigation.navigate("Wishlists", {
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
                        keyboardType: 'number-pad',
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
            <CustomAlert 
                visible={isAlertVisible}
                title={alertTitle}
                message={alertMessage}
                onClose={handleAlertClose}
            />
            <CustomLoader visible={isLoading}/>
        </WishlistAddContainer>
    )
}

export default WishlistAddScreen