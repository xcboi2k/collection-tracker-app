import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'
import * as Yup from 'yup'

import Button from '@/components/shared/ButtonText'
import CustomLoader from '@/components/shared/CustomLoader'
import CustomTextInput from '@/components/shared/CustomTextInput'
import Header from '@/components/shared/Header'
import useDeleteWishlistItem from '@/hooks/main/wishlist-items/useDeleteWishlistItem'
import useUpdateWishlistItem from '@/hooks/main/wishlist-items/useUpdateWishlistItem'
import LoaderStore from '@/stores/LoaderStore'
import useWishlistStore from '@/stores/WishlistStore'

const WishlistEditScreen = ({ route, navigation }) => {
    // State management for loading indicators
    const isLoading = LoaderStore((state) => state.isLoading)
    const startLoading = LoaderStore((state) => state.startLoading)
    const stopLoading = LoaderStore((state) => state.stopLoading)
    // Get the wishlistItemID from the route params
    const { wishlistItemID } = route.params

    // State variables
    const wishlistItems = useWishlistStore((state) => state.wishlistItems)
    const [currentWishlistItem, setCurrentWishlistItem] = useState(() => {
        return wishlistItems.find((item) => item.id === wishlistItemID)
    })
    const [mode, setMode] = useState('details')

    // Initial form values
    const initialValues = {
        wishlistName: currentWishlistItem.wishlist_name,
        wishlistAmount: String(currentWishlistItem.wishlist_amount),
    }

    // Fetch target wishlist item when wishlistItemID changes
    useEffect(() => {
        const targetWishlistItem = wishlistItems.find(
            (item) => item.id === wishlistItemID
        )

        setCurrentWishlistItem(targetWishlistItem)
    }, [wishlistItemID])

    const goToNextScreen = () => {
        const newKey = Math.random().toString()
        navigation.navigate('Wishlists', {
            screen: 'WishlistMain',
            key: newKey,
        })
    }
    const { updateWishlistItem } = useUpdateWishlistItem()
    // Handle formik form submission
    const handleFormikSubmit = async (values, { resetForm }) => {
        startLoading()
        updateWishlistItem(
            wishlistItemID,
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

    // Show delete prompt
    const showDeletePrompt = () => {
        Alert.alert('Deleting file', 'Are you sure ?', [
            {
                text: 'Yes',
                onPress: handleDelete,
                style: 'destructive',
            },
            {
                text: 'No',
                onPress: () => {},
                style: 'cancel',
            },
        ])
    }

    const { deleteWishlistItem } = useDeleteWishlistItem()
    // Handle delete action
    const handleDelete = () => {
        startLoading()
        deleteWishlistItem(wishlistItemID, goToNextScreen)
    }

    const screenTitle = `${mode === 'edit' ? 'Edit' : 'Item'} Details`
    const EditButtonGroup = () => (
        <>
            <Button
                type="filled"
                width="45%"
                title="Save"
                textSize={16}
                noBorder={false}
                onPress={formik.handleSubmit}
            />
            <Button
                type="outlined"
                width="45%"
                title="Delete"
                textSize={16}
                noBorder={false}
                onPress={showDeletePrompt}
            />
        </>
    )

    return (
        <View className="flex-1 relative items-center pb-5">
            {/* Header */}
            <Header
                title={screenTitle}
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
                        editable: mode === 'edit',
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
                        onChangeText: formik.handleChange('wishlistAmount'),
                        value: formik.values.wishlistAmount,
                        editable: mode === 'edit',
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
            <View
                className={`flex-row w-[90%] mt-5 ${
                    mode === 'edit' ? 'justify-between' : 'justify-end'
                }`}
            >
                {mode === 'edit' ? (
                    <EditButtonGroup />
                ) : (
                    <Button
                        type="outlined"
                        width="45%"
                        title="Edit"
                        textSize={16}
                        noBorder={false}
                        onPress={() => setMode('edit')}
                    />
                )}
            </View>
            {/* Loader */}
            <CustomLoader visible={isLoading} />
        </View>
    )
}

export default WishlistEditScreen
