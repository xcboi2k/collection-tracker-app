import React, { useState } from "react";
import { Alert } from "react-native";
import { useFormik } from "formik";

import { CategoriesAddContainer, CategoriesFormHolder, ButtonContainer } from './styles';

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

const CategoriesAddScreen = ({navigation}) => {
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

    // State variables
    const addCategory = useCategoryStore((state) => state.addCategory);
    const [selectedIcon, setSelectedIcon] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [showColorWheel, setShowColorWheel] = useState(false);

    // Initial form values
    const initialValues = {
        categoryName: "",
        categoryIcon: "",
        categoryColor: "",
        createdAt: "",
        updatedAt: ""
    };

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
            addCategory({
                category_name: values.categoryName,
                category_color: values.categoryColor,
                category_icon: values.categoryIcon,
                created_at: new Date(),
                // user_id: user.user_id
            });
            resetForm();
            navigation.navigate("Categories", { screen: "CategoriesMain" });
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

    // Handle clear button press
    const handleClear = () => {
        setSelectedColor("");
        setSelectedIcon("");
        formik.resetForm();
    };


    return (
        <CategoriesAddContainer>
            <Header
                title={"Add Category"}
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
                    title="Clear"
                    rounded="8px"
                    textSize={14}
                    noBorder={false}
                    onPress={handleClear}
                />
            </ButtonContainer>
            <CustomAlert 
                visible={isAlertVisible}
                title={alertTitle}
                message={alertMessage}
                onClose={handleAlertClose}
            />
            <CustomLoader visible={isLoading}/>
        </CategoriesAddContainer>
    )
}

export default CategoriesAddScreen