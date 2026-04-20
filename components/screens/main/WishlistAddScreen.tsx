import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { View } from 'react-native'

import CustomTextInput from '@/components/shared/CustomTextInput'
import AlertStore from '@/stores/AlertStore'
import LoaderStore from '@/stores/LoaderStore'
import useWishlistStore from '@/stores/WishlistStore'
import Button from '@/components/shared/ButtonText'
import CustomAlert from '@/components/shared/CustomAlert'
import CustomLoader from '@/components/shared/CustomLoader'
import Header from '@/components/shared/Header'

const WishlistAddScreen = ({ navigation }) => {
    // State management for loading indicators
    const isLoading = LoaderStore((state) => state.isLoading)
    const startLoading = LoaderStore((state) => state.startLoading)
    const stopLoading = LoaderStore((state) => state.stopLoading)

    // State management for alert components
    const isAlertVisible = AlertStore((state) => state.isAlertVisible)
    const alertTitle = AlertStore((state) => state.alertTitle)
    const alertMessage = AlertStore((state) => state.alertMessage)
    const showAlert = AlertStore((state) => state.showAlert)
    const hideAlert = AlertStore((state) => state.hideAlert)

    // Handle close alert function
    const handleAlertClose = () => {
        stopLoading()
        hideAlert()
    }

    const isWishlistItemCreated = useWishlistStore(
        (state) => state.isWishlistItemCreated
    )

    // State variables
    const addWishlistItem = useWishlistStore((state) => state.addWishlistItem)

    // Initial form values
    const initialValues = {
        wishlistName: '',
        wishlistAmount: '',
        // userID: "",
        createdAt: '',
        updatedAt: '',
    }

    // Handle formik form submission
    const handleFormikSubmit = async (values, { resetForm }) => {
        try {
            addWishlistItem({
                wishlist_name: values.wishlistName,
                wishlist_amount: values.wishlistAmount,
                created_at: new Date(),
                // user_id: user.user_id
            })
            resetForm()
        } catch (error) {
            stopLoading()
            showAlert('Error', `Failed to submit information. ${error}`)
        }
    }

    // Formik configuration
    const formik = useFormik({
        initialValues,
        onSubmit: handleFormikSubmit,
    })

    // Handle clear button press
    const handleClear = () => {
        formik.resetForm()
    }

    // For navigating to next screen
    useEffect(() => {
        if (isWishlistItemCreated) {
            const newKey = Math.random().toString()
            navigation.navigate('Wishlists', {
                screen: 'WishlistMain',
                key: newKey,
            })
        }
    }, [isWishlistItemCreated])

    return (
        <View className="flex-1 relative items-center pb-5">
            {/* Header */}
            <Header
                title="Add Wishlist Item"
                onPressLeftIcon={() =>
                    navigation.navigate('Wishlists', {
                        screen: 'WishlistMain',
                    })
                }
            />

            {/* Form */}
            <View className="pt-2.5 w-[90%] items-center">
                <CustomTextInput
                    inputProps={{
                        placeholder: 'Enter Wishlist Item Name',
                        onChangeText: formik.handleChange('wishlistName'),
                        value: formik.values.wishlistName,
                    }}
                    customLabel="Wishlist Item Name:"
                />

                <CustomTextInput
                    inputProps={{
                        placeholder: 'Enter Wishlist Item Amount',
                        keyboardType: 'number-pad',
                        onChangeText: formik.handleChange('wishlistAmount'),
                        value: formik.values.wishlistAmount,
                    }}
                    customLabel="Wishlist Item Amount:"
                />
            </View>

            {/* Buttons */}
            <View className="flex-row justify-between w-[90%] mt-5">
                <Button
                    type="filled"
                    width="45%"
                    title="Save"
                    textSize={14}
                    noBorder={false}
                    onPress={formik.handleSubmit}
                />

                <Button
                    type="outlined"
                    width="45%"
                    title="Clear"
                    textSize={14}
                    noBorder={false}
                    onPress={handleClear}
                />
            </View>

            {/* Alert */}
            <CustomAlert
                visible={isAlertVisible}
                title={alertTitle}
                message={alertMessage}
                onClose={handleAlertClose}
            />

            {/* Loader */}
            <CustomLoader visible={isLoading} />
        </View>
    )
}

export default WishlistAddScreen
