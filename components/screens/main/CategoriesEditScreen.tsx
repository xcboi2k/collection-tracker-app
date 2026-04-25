import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Alert, Text, View } from 'react-native'
import * as Yup from 'yup'

import CustomTextInput from '@/components/shared/CustomTextInput'
import useDeleteCategory from '@/hooks/main/categories/useDeleteCategory'
import useUpdateCategory from '@/hooks/main/categories/useUpdateCategory'
import { ICON_NAMES } from '../../../constants/constant'
import colorCollection from '../../../data/colorCollection'
import useCategoryStore from '../../../stores/CategoryStore'
import LoaderStore from '../../../stores/LoaderStore'
import ColorPicker from '../../common/ColorPicker'
import Button from '../../shared/ButtonText'
import ColorPickerPanel from '../../shared/ColorPickerPanel'
import CustomLoader from '../../shared/CustomLoader'
import Header from '../../shared/Header'
import IconOnlySelector from '../../shared/IconOnlySelector'

const CategoriesEditScreen = ({ route, navigation }) => {
    // State management for loading indicators
    const isLoading = LoaderStore((state) => state.isLoading)
    const startLoading = LoaderStore((state) => state.startLoading)
    const stopLoading = LoaderStore((state) => state.stopLoading)

    // Get the categoryID from the route params
    const { categoryID } = route.params

    // State variables
    const [mode, setMode] = useState('details')
    const allCategories = useCategoryStore((state) => state.categories)
    const [currentCategory, setCurrentCategory] = useState(() =>
        allCategories.find((category) => category.id === categoryID)
    )
    const [selectedIcon, setSelectedIcon] = useState(
        currentCategory.category_icon
    )
    const [selectedColor, setSelectedColor] = useState(
        currentCategory.category_color
    )
    const [iconError, setIconError] = useState('')
    const [colorError, setColorError] = useState('')
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
        setIconError('')
        setSelectedIcon(icon)
        formik.setFieldValue('categoryIcon', icon)
    }

    // Handle color press
    const handleColorPress = (color) => {
        setColorError('')
        setSelectedColor(color)
        formik.setFieldValue('categoryColor', color)
        setShowColorWheel(false)
    }

    const { updateCategory } = useUpdateCategory()
    const goToNextScreen = () => {
        setSelectedColor('')
        setSelectedIcon('')
        const newKey = Math.random().toString()
        navigation.navigate('Categories', {
            screen: 'CategoriesMain',
            key: newKey,
        })
    }
    // Handle formik form submission
    const handleFormikSubmit = async (values, { resetForm }) => {
        startLoading()
        let hasError = false

        if (!selectedIcon) {
            stopLoading()
            setIconError('Please select an icon')
            hasError = true
        }
        if (!selectedColor) {
            stopLoading()
            setColorError('Please select a color')
            hasError = true
        }

        if (hasError) return

        updateCategory(
            categoryID,
            {
                categoryName: values.categoryName,
                categoryColor: values.categoryColor,
                categoryIcon: values.categoryIcon,
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
            categoryName: Yup.string()
                .min(2, 'Name must be at least 2 characters')
                .max(50, 'Name must not exceed 50 characters')
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

    const { deleteCategory } = useDeleteCategory()
    // Handle delete action
    const handleDelete = () => {
        startLoading()
        deleteCategory(categoryID, goToNextScreen)
    }

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
                    hasStatus={true}
                    statusText={
                        formik.errors.categoryName &&
                        formik.touched.categoryName &&
                        formik.errors.categoryName
                    }
                />

                <View className="mb-6 w-full justify-start">
                    <IconOnlySelector
                        iconData={Object.values(ICON_NAMES.CATEGORIES_ICONS)}
                        onPress={handleIconPress}
                        selectedIcon={selectedIcon}
                    />
                    {iconError ? (
                        <Text className="text-red-500 text-sm mt-2">
                            {iconError}
                        </Text>
                    ) : null}
                </View>

                <View className="mb-6 w-full justify-start">
                    <ColorPickerPanel
                        colorList={colorCollection}
                        onColorPress={handleColorPress}
                        selectedColor={selectedColor}
                        onAddPress={() => setShowColorWheel(true)}
                    />
                    {colorError ? (
                        <Text className="text-red-500 text-sm mt-2">
                            {colorError}
                        </Text>
                    ) : null}
                </View>
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

export default CategoriesEditScreen
