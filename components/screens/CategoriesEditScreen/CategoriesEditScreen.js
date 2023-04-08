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

import useCategoryStore from "../../../hooks/useCategoryStore";

const CategoriesEditScreen = ({route, navigation}) => {
    const { categoryID } = route.params;

    const allCategories = useCategoryStore((state) => state.categories);
    const updateCategory = useCategoryStore((state) => state.updateCategory);
    const deleteCategory = useCategoryStore((state) => state.deleteCategory);

    const [currentCategory, setCurrentCategory] = useState(() => allCategories.find(category => category.id === categoryID));
    const [selectedIcon, setSelectedIcon] = useState(currentCategory.category_icon);
    const [selectedColor, setSelectedColor] = useState(currentCategory.category_color);
    const [showColorWheel, setShowColorWheel] = useState(false);

    const initialValues = {
        categoryIcon: currentCategory.category_icon,
        categoryName: currentCategory.category_name,
        categoryColor: currentCategory.category_color
    };

    useEffect(() => {
        const targetCategory = allCategories.find(category => category.id === categoryID);
        // console.log(targetTransaction);
        setCurrentCategory(targetCategory);
        setSelectedIcon(targetCategory.category_icon);
    }, [categoryID]);

    const handleIconPress = (icon) => {
        setSelectedIcon(icon);
        formik.setFieldValue("categoryIcon", icon);
    };

    const handleColorPress = (color) => {
        setSelectedColor(color);
        formik.setFieldValue("categoryColor", color);
        setShowColorWheel(false);
    };

    const handleFormikSubmit = async (values) => {
        const newCategory = {
            // user_id: user.user_id,
            category_name: values.categoryName,
            category_icon: values.categoryIcon,
            category_color: values.categoryColor,
            id: categoryID
        };
        updateCategory(categoryID, newCategory);
        Alert.alert("SUCCESS", "Document Updated");
        formik.resetForm();
        navigation.navigate("Categories", { screen: "CategoriesMain" });
    };

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

    const handleDelete = () => {
        deleteCategory(categoryID);
        Alert.alert("Successfully Deleted Category");
        navigation.navigate("Categories", { screen: "CategoriesMain" });
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleFormikSubmit,
    });

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
        </CategoriesEditContainer>
    )
}

export default CategoriesEditScreen