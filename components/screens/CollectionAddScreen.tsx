import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import uuid from 'react-native-uuid'

import CustomTextInput from '@/components/shared/CustomTextInput'
import useGetCategories from '../../hooks/useGetCategories'
import useUploadImage from '../../hooks/useUploadImage'
import AlertStore from '../../stores/AlertStore'
import useCollectionStore from '../../stores/CollectionStore'
import LoaderStore from '../../stores/LoaderStore'
import Button from '../shared/Button'
import CommentInput from '../shared/CommentInput'
import CustomAlert from '../shared/CustomAlert.js'
import CustomLoader from '../shared/CustomLoader.js'
import Header from '../shared/Header'
import IconSelector from '../shared/IconSelector'

const CollectionAddScreen = ({ navigation }) => {
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

    const isCollectionItemCreated = useCollectionStore(
        (state) => state.isCollectionItemCreated
    )

    // Generate a unique photo ID using uuid.v4()
    let photoId = uuid.v4()

    // State variables
    const [date, setDate] = useState(new Date())
    const [categories] = useGetCategories()
    const addCollectionItem = useCollectionStore(
        (state) => state.addCollectionItem
    )
    const [image, chooseImage, uploadImage, filename] = useUploadImage(
        photoId,
        'collection/'
    )
    const [selectedIcon, setSelectedIcon] = useState({
        label: '',
        icon: '',
        currentIcon: '',
        id: '',
    })

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
        setSelectedIcon(icon)
        formik.setFieldValue('categoryName', icon.label)
        formik.setFieldValue('collectionItemIcon', icon.currentIcon)
        formik.setFieldValue('collectionItemColor', icon.color)
    }

    // Handle formik form submission
    const handleFormikSubmit = async (values, { resetForm }) => {
        try {
            startLoading()

            let imgFile
            // Upload image if selected
            if (image) {
                imgFile = await uploadImage()
            }

            // Add collection item
            addCollectionItem({
                collectionItem_amount: Number(values.amount),
                category_name: values.categoryName,
                comment_img_ref: imgFile ? imgFile.imgRef : '',
                comment_img: imgFile ? imgFile.imgUri : '',
                comments: values.comments,
                collectionItem_name: values.collectionItemName,
                collectionItem_icon: values.collectionItemIcon,
                collectionItem_color: values.collectionItemColor,
                category_id: selectedIcon.id,
                created_at: date,
            })

            // Reset the form and navigate
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

    // Check if the form fields are valid
    const isFormFilled = () => {
        // Check if all fields have non-empty values
        return Object.values(formik.values).every((value) => value !== '')
    }

    // For navigating to next screen
    useEffect(() => {
        if (isCollectionItemCreated) {
            const newKey = Math.random().toString()
            navigation.navigate('Home', {
                screen: 'HomeMain',
                key: newKey,
            })
        }
    }, [isCollectionItemCreated])

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
                />

                <CustomTextInput
                    inputProps={{
                        placeholder: 'Enter Amount',
                        keyboardType: 'number-pad',
                        onChangeText: formik.handleChange('amount'),
                        value: formik.values.amount,
                    }}
                    customLabel="Collection Item Amount:"
                />
            </View>

            {/* Scrollable Content */}
            <ScrollView
                className="w-[90%] h-[65%]"
                showsVerticalScrollIndicator={false}
            >
                {/* Category Selector */}
                <View className="mb-7.5 w-full h-[120px] justify-start">
                    <IconSelector
                        iconData={categories}
                        handlePress={handleIconPress}
                        selectedIcon={selectedIcon}
                    />
                </View>

                {/* Comment Input */}
                <CommentInput
                    customLabel="Comments"
                    inputProps={{
                        placeholder: 'Add a comment',
                        value: formik.values.comment,
                        onChangeText: formik.handleChange('comments'),
                    }}
                    imageUri={image}
                    onPress={chooseImage}
                    filename={filename}
                />

                {/* Button */}
                <View className="items-center justify-center w-full mt-5">
                    <Button
                        width="90%"
                        title="Add"
                        type="filled"
                        onPress={formik.handleSubmit}
                        buttonProps={{
                            disabled: !isFormFilled(),
                        }}
                    />
                </View>
            </ScrollView>

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

export default CollectionAddScreen
