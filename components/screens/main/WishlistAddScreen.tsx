import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import * as Yup from 'yup'

import CustomTextInput from '@/components/shared/CustomTextInput'
import AlertStore from '@/stores/AlertStore'
import LoaderStore from '@/stores/LoaderStore'
import useWishlistStore from '@/stores/WishlistStore'
import Button from '@/components/shared/ButtonText'
import CustomAlert from '@/components/shared/CustomAlert'
import CustomLoader from '@/components/shared/CustomLoader'
import Header from '@/components/shared/Header'
import useAddWishlistItem from '@/hooks/main/wishlist-items/useAddWishlistItem'
import ButtonText from '@/components/shared/ButtonText'

const WishlistAddScreen = ({ navigation }) => {
    // State management for loading indicators
    const isLoading = LoaderStore((state) => state.isLoading)
    const startLoading = LoaderStore((state) => state.startLoading)
    const stopLoading = LoaderStore((state) => state.stopLoading)

    // Initial form values
    const initialValues = {
        wishlistName: '',
        wishlistAmount: '',
    }

    const goToNextScreen = () => {
        const newKey = Math.random().toString()
        navigation.navigate('Wishlists', {
            screen: 'WishlistMain',
            key: newKey,
        })
    }
    const { addWishlistItem } = useAddWishlistItem()
    // Handle formik form submission
    const handleFormikSubmit = async (values, { resetForm }) => {
        startLoading()
        addWishlistItem(
            {
                wishlistName: values.wishlistName,
                wishlistAmount: values.wishlistAmount,
            },
            resetForm,
            goToNextScreen
        )
    }

    // Formik configuration
    const formik = useFormik({
        initialValues,
        onSubmit: handleFormikSubmit,
        validationSchema: Yup.object().shape({
            wishlistAmount: Yup.number()
                .typeError('Amount must be a number')
                .positive('Amount must be greater than 0')
                .required('Amount is required'),

            wishlistName: Yup.string()
                .min(2, 'Name must be at least 2 characters')
                .max(50, 'Name must not exceed 50 characters')
                .required('Collection item name is required'),
        }),
    })

    // Handle clear button press
    const handleClear = () => {
        formik.resetForm()
    }

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
                    hasStatus={true}
                    statusText={
                        formik.errors.wishlistName &&
                        formik.touched.wishlistName &&
                        formik.errors.wishlistName
                    }
                />

                <CustomTextInput
                    inputProps={{
                        placeholder: 'Enter Wishlist Item Amount',
                        keyboardType: 'number-pad',
                        onChangeText: formik.handleChange('wishlistAmount'),
                        value: formik.values.wishlistAmount,
                    }}
                    customLabel="Wishlist Item Amount:"
                    hasStatus={true}
                    statusText={
                        formik.errors.wishlistAmount &&
                        formik.touched.wishlistAmount &&
                        formik.errors.wishlistAmount
                    }
                />
            </View>

            {/* Buttons */}
            <View className="items-center justify-center w-full">
                <ButtonText
                    width="100%"
                    type="filled"
                    title="Submit"
                    textSize={14}
                    noBorder={false}
                    onPress={formik.handleSubmit}
                />
            </View>

            {/* Loader */}
            <CustomLoader visible={isLoading} />
        </View>
    )
}

export default WishlistAddScreen
