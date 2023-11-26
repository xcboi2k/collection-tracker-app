import { Alert } from 'react-native'
import React, { useState } from "react";
import { useFormik } from "formik";
import uuid from 'react-native-uuid';

import { CollectionAddContainer, CollectionFormHolder, CollectionCategoryHolder, ButtonContainer, ScrollContainer } from './styles';

import colors from '../../../assets/themes/colors';
import { ICON_NAMES } from '../../../constants/constant';

import CommentInput from '../../shared/CommentInput';
import IconSelector from '../../shared/IconSelector';
import Button from '../../shared/Button';
import TextInput from '../../shared/TextInput';
import Header from '../../shared/Header/Header';

import useCollectionStore from '../../../hooks/useCollectionStore';
import useUploadImage from '../../../hooks/useUploadImage';
import useGetCategories from '../../../hooks/useGetCategories';

import LoaderStore from '../../../stores/LoaderStore';
import AlertStore from '../../../stores/AlertStore';

const CollectionAddScreen = ({navigation}) => {
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

    // Generate a unique photo ID using uuid.v4()
    let photoId = uuid.v4();

    // State variables
    const [date, setDate] = useState(new Date());
    const [categories] = useGetCategories();
    const addCollectionItem = useCollectionStore((state) => state.addCollectionItem);
    const [image, chooseImage, uploadImage, filename] = useUploadImage(photoId, "collection/");
    const [selectedIcon, setSelectedIcon] = useState({
        label: "",
        icon: "",
        currentIcon: "",
        id: ""
    });

    // Initial form values
    const initialValues = {
        amount: "",
        collectionItemName: "",
        collectionItemIcon: "",
        collectionItemColor: "",
        categoryName: "",
        comments: "",
    };

    // Handle icon press
    const handleIconPress = (icon) => {
        setSelectedIcon(icon);
        formik.setFieldValue("categoryName", icon.label);
        formik.setFieldValue("collectionItemIcon", icon.currentIcon);
        formik.setFieldValue("collectionItemColor", icon.color);
    };

    // Handle formik form submission
    const handleFormikSubmit = async (values, { resetForm }) => {
        try{
            startLoading()

            let imgFile;
            // Upload image if selected
            if (image) {
            imgFile = await uploadImage();
            }

            // Add collection item
            addCollectionItem({
                collectionItem_amount: Number(values.amount),
                category_name: values.categoryName,
                comment_img_ref: imgFile ? imgFile.imgRef : "",
                comment_img: imgFile ? imgFile.imgUri : "",
                comments: values.comments,
                collectionItem_name: values.collectionItemName,
                collectionItem_icon: values.collectionItemIcon,
                collectionItem_color: values.collectionItemColor,
                category_id: selectedIcon.id,
                created_at: date
            });

            // Reset the form and navigate
            resetForm();
            navigation.navigate("Home", { screen: "HomeMain" });
        }catch(error){
            stopLoading()
            showAlert("Error", error)
        }
        
    };

    // Formik configuration
    const formik = useFormik({
        initialValues,
        onSubmit: handleFormikSubmit,
    });

    // Check if the form fields are valid
    const isFormFilled = () => {
        // Check if all fields have non-empty values
        return Object.values(formik.values).every((value) => value !== '');
    };

    return (
        <CollectionAddContainer>
            <Header 
                title={"Add Item"}
                onPressLeftIcon={() => 
                    navigation.navigate("Home", {
                        screen: "HomeMain"
                    })
                }
            />
            <CollectionFormHolder>
                <TextInput
                    inputProps={{
                        placeholder: "Enter Collection Item Name",
                        onChangeText: formik.handleChange("collectionItemName"),
                        value: formik.values.collectionItemName,
                    }}
                    customLabel="Collection Item Name:"
                />
                <TextInput
                    inputProps={{
                        placeholder: "Enter Amount",
                        keyboardType: 'number-pad',
                        onChangeText: formik.handleChange("amount"),
                        value: formik.values.amount,
                    }}
                    customLabel="Collection Item Amount:"
                />
            </CollectionFormHolder>
            <ScrollContainer>
                <CollectionCategoryHolder>
                    <IconSelector
                        iconData={categories}
                        handlePress={handleIconPress}
                        selectedIcon={selectedIcon}
                    />
                </CollectionCategoryHolder>
                <CommentInput
                    customLabel={"Comments"}
                    inputProps={{
                        placeholder: "Add a comment",
                        value: formik.values.comment,
                        onChangeText: formik.handleChange("comments"),
                    }}
                    imageUri={image}
                    onPress={chooseImage}
                    filename={filename}
                />
                <ButtonContainer>
                <Button
                    width="100%"
                    title={"ADD"}
                    type={"filled"}
                    rounded={"10px"}
                    onPress={formik.handleSubmit}
                    buttonProps={{
                        disabled: isFormFilled,
                    }}
                />
                </ButtonContainer>
            </ScrollContainer>
            <CustomAlert 
                visible={isAlertVisible}
                title={alertTitle}
                message={alertMessage}
                onClose={handleAlertClose}
            />
            <CustomLoader visible={isLoading}/>
        </CollectionAddContainer>
    )
}

export default CollectionAddScreen