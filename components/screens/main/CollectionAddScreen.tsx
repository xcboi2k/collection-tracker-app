import { useFormik } from 'formik'
import React, { useCallback, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import * as Yup from 'yup'

import ButtonText from '@/components/shared/ButtonText'
import CommentInput from '@/components/shared/CommentInput'
import CustomLoader from '@/components/shared/CustomLoader'
import CustomTextInput from '@/components/shared/CustomTextInput'
import Header from '@/components/shared/Header'
import IconSelector from '@/components/shared/IconSelector'
import useGetCategories from '@/hooks/main/categories/useGetCategories'
import useAddCollectionItem from '@/hooks/main/collections/useAddCollectionItem'
import LoaderStore from '@/stores/LoaderStore'
import { useFocusEffect } from '@react-navigation/native'

const CollectionAddScreen = ({ navigation }) => {
    // State management for loading indicators
    const isLoading = LoaderStore((state) => state.isLoading)
    const startLoading = LoaderStore((state) => state.startLoading)
    const stopLoading = LoaderStore((state) => state.stopLoading)

    // State variables
    const { data, getCategories } = useGetCategories()
    const [selectedIcon, setSelectedIcon] = useState({
        label: '',
        icon: '',
        currentIcon: '',
        id: '',
    })
    const [iconError, setIconError] = useState('')

    // Initial form values
    const initialValues = {
        amount: '',
        collectionItemName: '',
        collectionItemIcon: '',
        collectionItemColor: '',
        categoryName: '',
        comments: '',
    }

    // Handle icon press
    const handleIconPress = (icon) => {
        setIconError('')
        setSelectedIcon(icon)
        formik.setFieldValue('categoryName', icon.label)
        formik.setFieldValue('collectionItemIcon', icon.currentIcon)
        formik.setFieldValue('collectionItemColor', icon.color)
    }

    const goToNextScreen = () => {
        const newKey = Math.random().toString()
        navigation.navigate('Home', {
            screen: 'HomeMain',
            key: newKey,
        })
    }
    const { addCollectionItem } = useAddCollectionItem()
    // Handle formik form submission
    const handleFormikSubmit = async (values, { resetForm }) => {
        startLoading()
        let hasError = false

        if (!selectedIcon) {
            stopLoading()
            setIconError('Please select a category icon')
            hasError = true
        } else {
            stopLoading()
            setIconError('')
        }

        if (hasError) return

        // Add collection item
        addCollectionItem(
            {
                collectionItemAmount: Number(values.amount),
                collectionItemName: values.collectionItemName,
                collectionItemIcon: values.collectionItemIcon,
                collectionItemColor: values.collectionItemColor,
                comments: values.comments,
                categoryID: selectedIcon.id,
                categoryName: values.categoryName,
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
            amount: Yup.number()
                .typeError('Amount must be a number')
                .positive('Amount must be greater than 0')
                .required('Amount is required'),

            collectionItemName: Yup.string()
                .min(2, 'Name must be at least 2 characters')
                .max(50, 'Name must not exceed 50 characters')
                .required('Collection item name is required'),

            collectionItemIcon: Yup.string().required('Please select an icon'),

            collectionItemColor: Yup.string().required('Please select a color'),

            categoryName: Yup.string()
                .min(2, 'Category name must be at least 2 characters')
                .max(50, 'Category name must not exceed 50 characters')
                .required('Category name is required'),
        }),
    })

    useFocusEffect(
        useCallback(() => {
            console.log('Mount Collection Add')
            getCategories()

            return () => {
                console.log('Unmount Collection Add')
            }
        }, [])
    )

    return (
        <View className="flex-1 relative items-center pb-5">
            {/* Header */}
            <Header
                title="Add Item"
                onPressLeftIcon={() =>
                    navigation.navigate('Home', {
                        screen: 'HomeMain',
                    })
                }
            />

            {/* Form */}
            <View className="pt-2.5 w-[90%] items-center">
                <CustomTextInput
                    inputProps={{
                        placeholder: 'Enter Collection Item Name',
                        onChangeText: formik.handleChange('collectionItemName'),
                        value: formik.values.collectionItemName,
                    }}
                    customLabel="Collection Item Name:"
                    hasStatus={true}
                    statusText={
                        formik.errors.collectionItemName &&
                        formik.touched.collectionItemName &&
                        formik.errors.collectionItemName
                    }
                />

                <CustomTextInput
                    inputProps={{
                        placeholder: 'Enter Amount',
                        keyboardType: 'number-pad',
                        onChangeText: formik.handleChange('amount'),
                        value: formik.values.amount,
                    }}
                    customLabel="Collection Item Amount:"
                    hasStatus={true}
                    statusText={
                        formik.errors.amount &&
                        formik.touched.amount &&
                        formik.errors.amount
                    }
                />
            </View>

            {/* Scrollable Content */}
            <ScrollView
                className="w-[90%] h-[65%]"
                showsVerticalScrollIndicator={false}
            >
                {/* Category Selector */}
                <View className="mb-7.5 w-full h-[120px] justify-start mb-6">
                    <IconSelector
                        iconData={data}
                        handlePress={handleIconPress}
                        selectedIcon={selectedIcon}
                    />
                    {iconError ? (
                        <Text className="text-red-500 text-sm mt-2">
                            {iconError}
                        </Text>
                    ) : null}
                </View>

                {/* Comment Input */}
                <CommentInput
                    customLabel="Comments"
                    inputProps={{
                        placeholder: 'Add a comment',
                        value: formik.values.comment,
                        onChangeText: formik.handleChange('comments'),
                    }}
                    // imageUri={image}
                    // onPress={chooseImage}
                    // filename={filename}
                />

                {/* Button */}
                <View className="items-center justify-center w-full">
                    <ButtonText
                        width="100%"
                        title="Add"
                        type="filled"
                        onPress={formik.handleSubmit}
                        // buttonProps={{
                        //     disabled: !isFormFilled(),
                        // }}
                    />
                </View>
            </ScrollView>
            {/* Loader */}
            <CustomLoader visible={isLoading} />
        </View>
    )
}

export default CollectionAddScreen
