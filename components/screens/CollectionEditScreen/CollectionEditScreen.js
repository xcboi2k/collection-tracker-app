import { Alert } from 'react-native'
import React, { useState, useEffect} from 'react'
import { useFormik } from "formik";
import uuid from 'react-native-uuid';

import { deleteObject, ref } from "firebase/storage";
import { storage } from '../../../firebase';

import { 
    CollectionEditContainer, 
    CollectionFormHolder, 
    ScrollContainer, 
    CollectionCategoryHolder, 
    ButtonContainer } from './styles';

import CommentInput from '../../shared/CommentInput';
import IconSelector from '../../shared/IconSelector';
import Button from '../../shared/Button';
import TextInput from '../../shared/TextInput';
import Header from '../../shared/Header/Header';
import CustomAlert from '../../shared/CustomAlert/CustomAlert.js';
import CustomLoader from '../../shared/CustomLoader/CustomLoader.js';

import useCollectionStore from '../../../hooks/useCollectionStore';
import useUploadImage from '../../../hooks/useUploadImage';
import useGetCategories from '../../../hooks/useGetCategories';

import LoaderStore from '../../../stores/LoaderStore';
import AlertStore from '../../../stores/AlertStore';

const CollectionEditScreen = ({route, navigation}) => {
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

    const isCollectionItemUpdated = useCollectionStore(state => state.isCollectionItemUpdated);
    const isCollectionItemDeleted = useCollectionStore(state => state.isCollectionItemDeleted);
    
    // Get the collectionItemID from the route params
    const { collectionItemID } = route.params;

    // State variables
    const collectionItems = useCollectionStore((state) => state.collectionItems);
    const updateCollectionItem = useCollectionStore((state) => state.updateCollectionItem);
    const deleteCollectionItem = useCollectionStore((state) => state.deleteCollectionItem);
    const [categories] = useGetCategories();

    // Generate a unique photo ID using uuid.v4()
    const photoId = uuid.v4();

    // State variables related to image handling
    const [image, chooseImage, uploadImage, filename] = useUploadImage(photoId, "collection/");

    // Set the currentCollectionItem state based on collectionItemID
    const [currentCollectionItem, setCurrentCollectionItem] = useState(() => {
        return collectionItems.find(item => item.id === collectionItemID);
    });

    // State variables for mode, date, and selected icon
    const [mode, setMode] = useState("details");
    const [date, setDate] = useState(currentCollectionItem.created_at);
    const [selectedIcon, setSelectedIcon] = useState({
        label: "",
        icon: "",
        currentIcon: "",
        id: ""
    });

    // Initial form values
    const initialValues = {
        amount: String(currentCollectionItem.collectionItem_amount),
        collectionItemName: currentCollectionItem.collectionItem_name,
        collectionItemIcon: currentCollectionItem.collectionItem_icon,
        collectionItemColor: currentCollectionItem.collectionItem_color,
        categoryName: currentCollectionItem.category_name,
        comments: currentCollectionItem.comments,
    };

    // Fetch target collection item when collectionItemID changes
    useEffect(() => {
        const targetCollectionItem = collectionItems.find(item => item.id === collectionItemID);
        setCurrentCollectionItem(targetCollectionItem);
        setSelectedIcon({
        label: targetCollectionItem.category_name,
        icon: targetCollectionItem.transaction_icon,
        color: targetCollectionItem.transaction_color,
        currentIcon: targetCollectionItem.transaction_icon,
        id: targetCollectionItem.category_id
        });
    }, [collectionItemID]);

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
            
            let imgFile,
            oldImgRef = currentCollectionItem.comment_img_ref;

            if (image && oldImgRef) {
                const oldFileRef = ref(storage, oldImgRef);
                await deleteObject(oldFileRef);
                imgFile = await uploadImage();
            } else if (image && !oldImgRef) {
                
            }

            let updatedImgRef = imgFile ? imgFile.imgRef : currentCollectionItem.comment_img_ref;
            let updatedImg = imgFile ? imgFile.imgUri : currentCollectionItem.comment_img;
            const collectionItemIcon = values.collectionItemIcon === currentCollectionItem.collectionItem_icon ? currentCollectionItem.collectionItem_icon : selectedIcon.currentIcon;
            const categoryName = values.categoryName === currentCollectionItem.category_name ? currentCollectionItem.category_name : selectedIcon.label;

            const updateCollectionItem = {
                collectionItem_amount: Number(values.amount),
                category_name: categoryName,
                comment_img_ref: updatedImgRef,
                comment_img: updatedImg,
                collectionItem_name: values.collectionItemName,
                collectionItem_icon: collectionItemIcon,
                collectionItem_color: values.collectionItemColor,
                created_at: date,
            };
            updateCollectionItem(collectionItemID, updateCollectionItem);

            resetForm();
            navigation.navigate("Home", { screen: "HomeMain" });
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
        deleteCollectionItem(collectionItemID, currentCollectionItem.comment_img_ref);
    };

    // For navigating to next screen
    useEffect(() => {
        if (isCollectionItemUpdated) {
            const newKey = Math.random().toString();
            navigation.navigate("Collections", {
                screen: "CollectionMain",
                key: newKey
            })
        } else if (isCollectionItemDeleted) {
            const newKey = Math.random().toString();
            navigation.navigate("Collections", {
                screen: "CollectionMain",
                key: newKey
            })
        }
    }, [isCollectionItemUpdated, isCollectionItemDeleted]);

    const screenTitle = `${mode === "edit" ? "Edit" : "Item"} Details`;
    const EditButtonGroup = () => (
        <>
            <Button
                type="filled"
                width="48%"
                title="Save"
                rounded="8px"
                textSize={16}
                noBorder={false}
                onPress={formik.handleSubmit}
            />
            <Button
                type="outlined"
                width="48%"
                title="Delete"
                rounded="8px"
                textSize={16}
                noBorder={false}
                onPress={showDeletePrompt}
            />
        </>
    );

    return (
        <CollectionEditContainer>
            <Header 
                title={screenTitle}
                onPressLeftIcon={() => 
                    navigation.navigate("Collections", {
                        screen: "CollectionMain"
                    })
                }
            />
            <CollectionFormHolder>
                <TextInput
                    inputProps={{
                        placeholder: "Enter Collection Item Name",
                        onChangeText: formik.handleChange("collectionItemName"),
                        value: formik.values.collectionItemName,
                        editable: mode === "edit"
                    }}
                    customLabel="Collection Item Name:"
                />
                <TextInput
                    inputProps={{
                        placeholder: "Enter Amount",
                        keyboardType: 'number-pad',
                        onChangeText: formik.handleChange("amount"),
                        value: formik.values.amount,
                        editable: mode === "edit"
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
                        value: formik.values.comments,
                        onChangeText: formik.handleChange("comments"),
                        editable: mode === "edit"
                    }}
                    imageUri={{ uri: image ? image.uri : currentCollectionItem.comment_img }}
                    onPress={chooseImage}
                    filename={filename}
                />
                <ButtonContainer mode={mode}>
                    {mode === "edit" ? (
                        <EditButtonGroup />
                    ) : (
                        <Button
                            type="outlined"
                            width="45%"
                            title="EDIT"
                            rounded="8px"
                            textSize={16}
                            noBorder={false}
                            onPress={() => setMode("edit")}
                        />
                    )}
                </ButtonContainer>
            </ScrollContainer>
            <CustomAlert 
                visible={isAlertVisible}
                title={alertTitle}
                message={alertMessage}
                onClose={handleAlertClose}
            />
            <CustomLoader visible={isLoading}/>
        </CollectionEditContainer>
    )
}

export default CollectionEditScreen