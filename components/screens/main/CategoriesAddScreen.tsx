import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'

import CustomTextInput from '@/components/shared/CustomTextInput'
import { ICON_NAMES } from '../../../constants/constant'
import colorCollection from '../../../data/colorCollection'
import AlertStore from '../../../stores/AlertStore'
import useCategoryStore from '../../../stores/CategoryStore'
import LoaderStore from '../../../stores/LoaderStore'
import ColorPicker from '../../common/ColorPicker'
import Button from '../../shared/ButtonText'
import ColorPickerPanel from '../../shared/ColorPickerPanel'
import CustomAlert from '../../shared/CustomAlert'
import CustomLoader from '../../shared/CustomLoader'
import Header from '../../shared/Header'
import IconOnlySelector from '../../shared/IconOnlySelector'

const CategoriesAddScreen = ({ navigation }) => {
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

    const isCategoryCreated = useCategoryStore(
        (state) => state.isCategoryCreated
    )

    // State variables
    const addCategory = useCategoryStore((state) => state.addCategory)
    const [selectedIcon, setSelectedIcon] = useState('')
    const [selectedColor, setSelectedColor] = useState('')
    const [showColorWheel, setShowColorWheel] = useState(false)

    // Initial form values
    const initialValues = {
        categoryName: '',
        categoryIcon: '',
        categoryColor: '',
        createdAt: '',
        updatedAt: '',
    }

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
            addCategory({
                category_name: values.categoryName,
                category_color: values.categoryColor,
                category_icon: values.categoryIcon,
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
        setSelectedColor('')
        setSelectedIcon('')
        formik.resetForm()
    }

    // For navigating to next screen
    useEffect(() => {
        if (isCategoryCreated) {
            const newKey = Math.random().toString()
            navigation.navigate('Categories', {
                screen: 'CategoriesMain',
                key: newKey,
            })
        }
    }, [isCategoryCreated])

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

export default CategoriesAddScreen
