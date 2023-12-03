import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useFormik } from "formik";

import { CategoriesEditContainer, CategoriesFormHolder, ButtonContainer } from "./styles";

import { ICON_NAMES } from "../../../constants/constant";
import colorCollection from '../../../data/colorCollection';

import Button from '../../shared/Button';
import TextInput from '../../shared/TextInput';
import IconOnlySelector from '../../shared/IconOnlySelector';
import ColorPickerPanel from '../../shared/ColorPickerPanel';
import Header from '../../shared/Header/Header';
import ColorPicker from '../../common/ColorPicker';
import CustomAlert from '../../shared/CustomAlert/CustomAlert.js';
import CustomLoader from '../../shared/CustomLoader/CustomLoader.js';

import useCategoryStore from "../../../hooks/useCategoryStore";

import LoaderStore from '../../../stores/LoaderStore';
import AlertStore from '../../../stores/AlertStore';

const CategoriesEditScreen = ({route, navigation}) => {
    // State management for loading indicators
    const isLoading = LoaderStore(state => state.isLoading);
    const startLoading = LoaderStore((state) => state.startLoading);
    const stopLoading = LoaderStore((state) => state.stopLoading);

    // State management for alert components
    const isAlertVisible = AlertStore(state => state.isAlertVisible);
    const alertTitle = AlertStore(state => state.alertTitle);
    const alertMessage = AlertStore(state => state.alertMessage);
    const showAlert = AlertStore((state) => state.showAlert);
    const hideAlert = AlertStore((state) => state.hideAlert);

    // Handle close alert function
    const handleAlertClose = () => {
        stopLoading()
        hideAlert()
    }

    const isCategoryUpdated = useCategoryStore(state => state.isCategoryUpdated);
    const isCategoryDeleted = useCategoryStore(state => state.isCategoryDeleted)

    // Get the categoryID from the route params
    const { categoryID } = route.params;

    // State variables
    const allCategories = useCategoryStore((state) => state.categories);
    const updateCategory = useCategoryStore((state) => state.updateCategory);
    const deleteCategory = useCategoryStore((state) => state.deleteCategory);
    const [currentCategory, setCurrentCategory] = useState(() => allCategories.find(category => category.id === categoryID));
    const [selectedIcon, setSelectedIcon] = useState(currentCategory.category_icon);
    const [selectedColor, setSelectedColor] = useState(currentCategory.category_color);
    const [showColorWheel, setShowColorWheel] = useState(false);

    // Initial form values
    const initialValues = {
        categoryIcon: currentCategory.category_icon,
        categoryName: currentCategory.category_name,
        categoryColor: currentCategory.category_color
    };

    // Fetch target category when categoryID changes
    useEffect(() => {
        const targetCategory = allCategories.find(category => category.id === categoryID);
        // console.log(targetTransaction);
        setCurrentCategory(targetCategory);
        setSelectedIcon(targetCategory.category_icon);
    }, [categoryID]);

    // Handle icon press
    const handleIconPress = (icon) => {
        setSelectedIcon(icon);
        formik.setFieldValue("categoryIcon", icon);
    };

    // Handle color press
    const handleColorPress = (color) => {
        setSelectedColor(color);
        formik.setFieldValue("categoryColor", color);
        setShowColorWheel(false);
    };

    // Handle formik form submission
    const handleFormikSubmit = async (values, { resetForm }) => {
        try{
            startLoading()
            const newCategory = {
                // user_id: user.user_id,
                category_name: values.categoryName,
                category_icon: values.categoryIcon,
                category_color: values.categoryColor,
                id: categoryID
            };
            updateCategory(categoryID, newCategory);
            resetForm();
        }catch(error){
            stopLoading()
            showAlert("Error", `Failed to submit information. ${error}`)
        }
        
    };

    // Formik configuration
    const formik = useFormik({
        initialValues,
        onSubmit: handleFormikSubmit,
    });

    // Show delete prompt
    const showDeletePrompt = () => {
        Alert.alert("Deleting file", "Are you sure ?", [{
            text: "Yes",
            onPress: handleDelete,
            style: "destructive"
        }, {
            text: "No",
            onPress: () => { },
            style: "cancel"
        }]);

    };

    // Handle delete action
    const handleDelete = () => {
        startLoading()
        deleteCategory(categoryID);
    };

    // For navigating to next screen
    useEffect(() => {
        if (isCategoryUpdated) {
            const newKey = Math.random().toString();
            navigation.navigate("Categories", {
                screen: "CategoriesMain",
                key: newKey
            })
        } else if (isCategoryDeleted) {
            const newKey = Math.random().toString();
            navigation.navigate("Categories", {
                screen: "CategoriesMain",
                key: newKey
            })
        }
    }, [isCategoryUpdated, isCategoryDeleted]);

    return (
        <CategoriesEditContainer>
            <Header
                title={"Edit Category"}
                onPressLeftIcon={() => 
                    navigation.navigate("Categories", {
                        screen: "CategoriesMain"
                    })
                }
            />
            {showColorWheel && <ColorPicker handleColorPress={handleColorPress} setShowColorWheel={setShowColorWheel} />}
            <CategoriesFormHolder>
                <TextInput 
                    inputProps={{
                        placeholder: "Enter Category Name",
                        onChangeText: formik.handleChange("categoryName"),
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
            </CategoriesFormHolder>
            <ButtonContainer>
                <Button
                    type="filled"
                    width="45%"
                    title="Save"
                    rounded="8px"
                    textSize={14}
                    noBorder={false}
                    onPress={formik.handleSubmit}
                />
                <Button
                    type="outlined"
                    width="45%"
                    title="Delete"
                    rounded="8px"
                    textSize={14}
                    noBorder={false}
                    onPress={showDeletePrompt}
                />
            </ButtonContainer>
            <CustomAlert 
                visible={isAlertVisible}
                title={alertTitle}
                message={alertMessage}
                onClose={handleAlertClose}
            />
            <CustomLoader visible={isLoading}/>
        </CategoriesEditContainer>
    )
}

export default CategoriesEditScreen