import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'

import CustomTextInput from '@/components/shared/CustomTextInput'
import { ICON_NAMES } from '../../constants/constant'
import colorCollection from '../../data/colorCollection'
import AlertStore from '../../stores/AlertStore'
import useCategoryStore from '../../stores/CategoryStore'
import LoaderStore from '../../stores/LoaderStore'
import ColorPicker from '../common/ColorPicker'
import Button from '../shared/Button'
import ColorPickerPanel from '../shared/ColorPickerPanel'
import CustomAlert from '../shared/CustomAlert'
import CustomLoader from '../shared/CustomLoader'
import Header from '../shared/Header'
import IconOnlySelector from '../shared/IconOnlySelector'

const CategoriesEditScreen = ({ route, navigation }) => {
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

    const isCategoryUpdated = useCategoryStore(
        (state) => state.isCategoryUpdated
    )
    const isCategoryDeleted = useCategoryStore(
        (state) => state.isCategoryDeleted
    )

    // Get the categoryID from the route params
    const { categoryID } = route.params

    // State variables
    const [mode, setMode] = useState('details')
    const allCategories = useCategoryStore((state) => state.categories)
    const updateCategory = useCategoryStore((state) => state.updateCategory)
    const deleteCategory = useCategoryStore((state) => state.deleteCategory)
    const [currentCategory, setCurrentCategory] = useState(() =>
        allCategories.find((category) => category.id === categoryID)
    )
    const [selectedIcon, setSelectedIcon] = useState(
        currentCategory.category_icon
    )
    const [selectedColor, setSelectedColor] = useState(
        currentCategory.category_color
    )
    const [showColorWheel, setShowColorWheel] = useState(false)

    // Initial form values
    const initialValues = {
        categoryIcon: currentCategory.category_icon,
        categoryName: currentCategory.category_name,
        categoryColor: currentCategory.category_color,
    }

    // Fetch target category when categoryID changes
    useEffect(() => {
        const targetCategory = allCategories.find(
            (category) => category.id === categoryID
        )
        // console.log(targetTransaction);
        setCurrentCategory(targetCategory)
        setSelectedIcon(targetCategory.category_icon)
    }, [categoryID])

    // Handle icon press
    const handleIconPress = (icon) => {
        setSelectedIcon(icon)
        formik.setFieldValue('categoryIcon', icon)
    }

    // Handle color press
    const handleColorPress = (color) => {
        setSelectedColor(color)
        formik.setFieldValue('categoryColor', color)
        setShowColorWheel(false)
    }

    // Handle formik form submission
    const handleFormikSubmit = async (values, { resetForm }) => {
        try {
            startLoading()
            const newCategory = {
                // user_id: user.user_id,
                category_name: values.categoryName,
                category_icon: values.categoryIcon,
                category_color: values.categoryColor,
                id: categoryID,
            }
            updateCategory(categoryID, newCategory)
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

    // Handle delete action
    const handleDelete = () => {
        startLoading()
        deleteCategory(categoryID)
    }

    // For navigating to next screen
    useEffect(() => {
        if (isCategoryUpdated) {
            const newKey = Math.random().toString()
            navigation.navigate('Categories', {
                screen: 'CategoriesMain',
                key: newKey,
            })
        } else if (isCategoryDeleted) {
            const newKey = Math.random().toString()
            navigation.navigate('Categories', {
                screen: 'CategoriesMain',
                key: newKey,
            })
        }
    }, [isCategoryUpdated, isCategoryDeleted])

    const screenTitle = `${mode === 'edit' ? 'Edit' : 'Category'} Details`
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
                    navigation.navigate('Categories', {
                        screen: 'CategoriesMain',
                    })
                }
            />

            {/* Color Wheel */}
            {showColorWheel && (
                <ColorPicker
                    handleColorPress={handleColorPress}
                    setShowColorWheel={setShowColorWheel}
                />
            )}

            {/* Form */}
            <View className="pt-2.5 w-[90%] items-center">
                <CustomTextInput
                    inputProps={{
                        placeholder: 'Enter Category Name',
                        onChangeText: formik.handleChange('categoryName'),
                        value: formik.values.categoryName,
                        editable: mode === 'edit',
                    }}
                    customLabel="Category Name:"
                />

                <IconOnlySelector
                    iconData={Object.values(ICON_NAMES.CATEGORIES_ICONS)}
                    onPress={handleIconPress}
                    selectedIcon={selectedIcon}
                    setSelectedIcon={setSelectedIcon}
                />

                <ColorPickerPanel
                    colorList={colorCollection}
                    onColorPress={handleColorPress}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    onAddPress={() => setShowColorWheel(true)}
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

export default CategoriesEditScreen
