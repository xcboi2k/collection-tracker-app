import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useFormik } from "formik";

import { WishlistEditContainer, WishlistFormHolder, ButtonContainer } from "./styles";

import Header from '../../shared/Header/Header'
import Button from '../../shared/Button';
import TextInput from '../../shared/TextInput';
import CustomAlert from '../../shared/CustomAlert/CustomAlert.js';
import CustomLoader from '../../shared/CustomLoader/CustomLoader.js';

import useWishlistStore from '../../../hooks/useWishlistStore';

import LoaderStore from '../../../stores/LoaderStore';
import AlertStore from '../../../stores/AlertStore';

const WishlistEditScreen = ({route, navigation}) => {
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

    // Get the wishlistItemID from the route params
    const { wishlistItemID } = route.params

    // State variables
    const wishlistItems = useWishlistStore((state) => state.wishlistItems);
    const updateWishlistItem = useWishlistStore((state) => state.updateWishlistItem);
    const deleteWishlistItem = useWishlistStore((state) => state.deleteWishlistItem);
    const [currentWishlistItem, setCurrentWishlistItem] = useState(() => {
        return wishlistItems.find(item => item.id === wishlistItemID);
    });
    const [mode, setMode] = useState("details");
    const [date, setDate] = useState(currentWishlistItem.created_at);

    // Initial form values
    const initialValues = {
        wishlistName: currentWishlistItem.wishlist_name,
        wishlistAmount: currentWishlistItem.wishlist_amount,
        // userID: "",
    };

    // Fetch target wishlist item when wishlistItemID changes
    useEffect(() => {
        const targetWishlistItem = wishlistItems.find(item => item.id === wishlistItemID);
        
        setCurrentWishlistItem(targetWishlistItem);
    }, [wishlistItemID]);

    // Handle formik form submission
    const handleFormikSubmit = async (values, { resetForm }) => {
        try{
            const newWishlistItem = {
                // user_id: user.user_id,
                wishlist_name: values.wishlistName,
                wishlist_amount: values.wishlistAmount,
                created_at: date,
            };
            updateWishlistItem(wishlistItemID, newWishlistItem);
            resetForm();
            navigation.navigate("Wishlist", { screen: "WishlistMain" });
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

    // Show delete prompt
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

    // Handle delete action
    const handleDelete = () => {
        startLoading()
        deleteWishlistItem(wishlistItemID);
        navigation.navigate("Home", { screen: "HomeMain" });
    };

    

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