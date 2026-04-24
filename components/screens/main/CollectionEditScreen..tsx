import { useFocusEffect } from '@react-navigation/native'
import { useFormik } from 'formik'
import React, { useCallback, useEffect, useState } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import * as Yup from 'yup'

import Button from '@/components/shared/ButtonText'
import CommentInput from '@/components/shared/CommentInput'
import CustomLoader from '@/components/shared/CustomLoader'
import CustomTextInput from '@/components/shared/CustomTextInput'
import Header from '@/components/shared/Header'
import IconSelector from '@/components/shared/IconSelector'
import useGetCategories from '@/hooks/main/categories/useGetCategories'
import useDeleteCollectionItem from '@/hooks/main/collections/useDeleteCollectionItem'
import useUpdateCollectionItem from '@/hooks/main/collections/useUpdateCollectionItem'
import useCollectionStore from '@/stores/CollectionStore'
import LoaderStore from '@/stores/LoaderStore'

const CollectionEditScreen = ({ route, navigation }) => {
    // State management for loading indicators
    const isLoading = LoaderStore((state) => state.isLoading)
    const startLoading = LoaderStore((state) => state.startLoading)
    const stopLoading = LoaderStore((state) => state.stopLoading)

    // Get the collectionItemID from the route params
    const { collectionItemID } = route.params

    // State variables
    const collectionItems = useCollectionStore((state) => state.collectionItems)
    const { data, getCategories } = useGetCategories()

    useFocusEffect(
        useCallback(() => {
            console.log('Mount Collection Edit')
            getCategories()

            return () => {
                console.log('Unmount Collection Edit')
            }
        }, [])
    )

    // Set the currentCollectionItem state based on collectionItemID
    const [currentCollectionItem, setCurrentCollectionItem] = useState(() => {
        return collectionItems.find((item) => item.id === collectionItemID)
    })

    // State variables for mode, date, and selected icon
    const [mode, setMode] = useState('details')
    const [selectedIcon, setSelectedIcon] = useState({
        label: '',
        icon: '',
        currentIcon: '',
        id: '',
        color: '',
    })
    const [iconError, setIconError] = useState('')

    // Initial form values
    const initialValues = {
        amount: String(currentCollectionItem.collectionitem_amount),
        collectionItemName: currentCollectionItem.collectionitem_name,
        collectionItemIcon: currentCollectionItem.collectionitem_icon,
        collectionItemColor: currentCollectionItem.collectionitem_color,
        categoryName: currentCollectionItem.category_name,
        comments: currentCollectionItem.comments,
    }

    // Fetch target collection item when collectionItemID changes
    useEffect(() => {
        const targetCollectionItem = collectionItems.find(
            (item) => item.id === collectionItemID
        )
        setCurrentCollectionItem(targetCollectionItem)
        setSelectedIcon({
            label: targetCollectionItem.category_name,
            icon: targetCollectionItem.collectionitem_icon,
            color: targetCollectionItem.collectionitem_color,
            currentIcon: targetCollectionItem.collectionitem_icon,
            id: targetCollectionItem.category_id,
        })
    }, [collectionItemID])

    // Handle icon press
    const handleIconPress = (icon) => {
        setIconError('')
        setSelectedIcon(icon)
        formik.setFieldValue('categoryName', icon.label)
        formik.setFieldValue('collectionItemIcon', icon.currentIcon)
        formik.setFieldValue('collectionItemColor', icon.color)
    }

    // Handle formik form submission
    const goToNextScreen = () => {
        const newKey = Math.random().toString()
        navigation.navigate('Collections', {
            screen: 'CollectionMain',
            key: newKey,
        })
    }
    const { updateCollectionItem } = useUpdateCollectionItem()
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

        updateCollectionItem(
            collectionItemID,
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

    const { deleteCollectionItem } = useDeleteCollectionItem()
    // Handle delete action
    const handleDelete = () => {
        startLoading()
        deleteCollectionItem(collectionItemID, goToNextScreen)
    }

    const screenTitle = `${mode === 'edit' ? 'Edit' : 'Item'} Details`
    const EditButtonGroup = () => (
        <>
            <Button
                type="filled"
                width="48%"
                title="Save"
                textSize={16}
                noBorder={false}
                onPress={formik.handleSubmit}
            />
            <Button
                type="outlined"
                width="48%"
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
                    navigation.navigate('Collections', {
                        screen: 'CollectionMain',
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
                        editable: mode === 'edit',
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
                        editable: mode === 'edit',
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
                className="w-[90%] flex-1"
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
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
                        value: formik.values.comments,
                        onChangeText: formik.handleChange('comments'),
                        editable: mode === 'edit',
                    }}
                />

                {/* Buttons */}
                <View
                    className={`flex-row w-full mt-5 ${
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
            </ScrollView>
            {/* Loader */}
            <CustomLoader visible={isLoading} />
        </View>
    )
}

export default CollectionEditScreen
