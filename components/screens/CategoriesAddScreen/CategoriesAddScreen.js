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

import useCategoryStore from "../../../hooks/useCategoryStore";

const CategoriesAddScreen = ({navigation}) => {
    const addCategory = useCategoryStore((state) => state.addCategory);
    const [selectedIcon, setSelectedIcon] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [showColorWheel, setShowColorWheel] = useState(false);

    const initialValues = {
        categoryName: "",
        categoryIcon: "",
        categoryColor: "",
        // userID: "",
        createdAt: "",
        updatedAt: ""
    };

    const handleIconPress = (icon) => {
        setSelectedIcon(icon);
        formik.setFieldValue("categoryIcon", icon);
    };

    const handleColorPress = (color) => {
        setSelectedColor(color);
        formik.setFieldValue("categoryColor", color);
        setShowColorWheel(false);
    };

    const handleFormikSubmit = async (values, { resetForm }) => {
        addCategory({
            category_name: values.categoryName,
            category_color: values.categoryColor,
            category_icon: values.categoryIcon,
            created_at: new Date(),
            update_at: "",
            // user_id: user.user_id
        });
        resetForm();
        Alert.alert("Success", "Added a New Category");
        navigation.navigate("Categories", { screen: "CategoriesMain" });
    };

    const handleClear = () => {
        setSelectedColor("");
        setSelectedIcon("");
        formik.resetForm();
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleFormikSubmit,
    });

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
        </CategoriesAddContainer>
    )
}

export default CategoriesAddScreen