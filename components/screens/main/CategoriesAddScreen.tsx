import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import * as Yup from 'yup'

import CustomTextInput from '@/components/shared/CustomTextInput'
import useAddCategory from '@/hooks/main/categories/useAddCategory'
import { ICON_NAMES } from '../../../constants/constant'
import colorCollection from '../../../data/colorCollection'
import LoaderStore from '../../../stores/LoaderStore'
import ColorPicker from '../../common/ColorPicker'
import ButtonText from '../../shared/ButtonText'
import ColorPickerPanel from '../../shared/ColorPickerPanel'
import CustomLoader from '../../shared/CustomLoader'
import Header from '../../shared/Header'
import IconOnlySelector from '../../shared/IconOnlySelector'

const CategoriesAddScreen = ({ navigation }) => {
    // State management for loading indicators
    const isLoading = LoaderStore((state) => state.isLoading)
    const startLoading = LoaderStore((state) => state.startLoading)
    const stopLoading = LoaderStore((state) => state.stopLoading)

    // State variables
    const [selectedIcon, setSelectedIcon] = useState('')
    const [selectedColor, setSelectedColor] = useState('')
    const [iconError, setIconError] = useState('')
    const [colorError, setColorError] = useState('')
    const [showColorWheel, setShowColorWheel] = useState(false)

    // Initial form values
    const initialValues = {
        categoryName: '',
        categoryIcon: '',
        categoryColor: '',
    }

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

    const { addCategory } = useAddCategory()
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
        addCategory(
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

    // Handle clear button press
    const handleClear = () => {
        setSelectedColor('')
        setSelectedIcon('')
        formik.resetForm()
    }

    return (
        <View className="flex-1 relative items-center pb-5">
            {/* Header */}
            <Header
                title="Add Category"
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
                    }}
                    customLabel="Category Name:"
                    hasStatus={true}
                    statusText={
                        formik.errors.categoryName &&
                        formik.touched.categoryName &&
                        formik.errors.categoryName
                    }
                />

                <View className="w-full justify-start">
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

                <View className="w-full justify-start">
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
            <View className="flex-row justify-between w-[90%] mt-5">
                <ButtonText
                    type="filled"
                    width="45%"
                    title="Submit"
                    textSize={14}
                    noBorder={false}
                    onPress={formik.handleSubmit}
                />
                <ButtonText
                    type="outlined"
                    width="45%"
                    title="Clear"
                    textSize={14}
                    noBorder={false}
                    onPress={handleClear}
                />
            </View>

            {/* Loader */}
            <CustomLoader visible={isLoading} />
        </View>
    )
}

export default CategoriesAddScreen
