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

import useCollectionStore from '../../../hooks/useCollectionStore';
import useUploadImage from '../../../hooks/useUploadImage';
import useGetCategories from '../../../hooks/useGetCategories';

const CollectionEditScreen = ({route, navigation}) => {
    const { collectionItemID } = route.params;

    const collectionItems = useCollectionStore((state) => state.collectionItems)
    const updateCollectionItem = useCollectionStore((state) => state.updateCollectionItem)
    const deleteCollectionItem = useCollectionStore((state) => state.deleteCollectionItem)
    const [categories] = useGetCategories();

    const photoId = uuid.v4();
    const [image, chooseImage, uploadImage, filename] = useUploadImage(photoId, "collection/");

    const [currentCollectionItem, setCurrentCollectionItem] = useState(() => {
        return collectionItems.find(item => item.id === collectionItemID);
    });
    const [mode, setMode] = useState("details");
    const [date, setDate] = useState(currentCollectionItem.created_at);
    const [selectedIcon, setSelectedIcon] = useState({
        label: "",
        icon: "",
        currentIcon: "",
        id: ""
    });

    useEffect(() => {
        const targetCollectionItem = collectionItems.find(item => item.id === collectionItemID);
        // console.log(targetTransaction);
        setCurrentCollectionItem(targetCollectionItem);
        setSelectedIcon({
            label: currentCollectionItem.category_name,
            icon: currentCollectionItem.transaction_icon,
            color: currentCollectionItem.transaction_color,
            currentIcon: currentCollectionItem.transaction_icon,
            id: currentCollectionItem.category_id
        });
    }, [collectionItemID]);

    const handleIconPress = (icon) => {
        setSelectedIcon(icon);
        formik.setFieldValue("categoryName", icon.label);
        formik.setFieldValue("collectionItemIcon", icon.currentIcon);
        formik.setFieldValue("collectionItemColor", icon.color);
    };

    const handleFormikSubmit = async (values) => {
        let imgFile,
            oldImgRef = currentCollectionItem.comment_img_ref;

        if (image && oldImgRef) {
            const oldFileRef = ref(storage, oldImgRef);
            await deleteObject(oldFileRef);
            imgFile = await uploadImage();
        } else if (image && !oldImgRef) {
            imgFile = await uploadImage();
        }

        let updatedImgRef = imgFile ? imgFile.imgRef : currentCollectionItem.comment_img_ref;
        let updatedImg = imgFile ? imgFile.imgUri : currentCollectionItem.comment_img;
        const collectionItemIcon = values.icon === currentCollectionItem.collectionItem_icon ? currentCollectionItem.collectionItem_icon : selectedIcon.currentIcon;
        const categoryName = values.categoryName === currentCollectionItem.category_name ? currentCollectionItem.category_name : selectedIcon.label;

        const newCollectionItem = {
            collectionItem_amount: Number(values.amount),
            category_name: categoryName,
            comment_img_ref: updatedImgRef,
            comment_img: updatedImg,
            collectionItem_name: values.collectionItemName,
            collectionItem_icon: collectionItemIcon,
            collectionItem_color: values.collectionItemColor,
            // user_id: user.user_id,
            created_at: date,
        };
        updateCollectionItem(collectionItemID, newCollectionItem);
        Alert.alert("SUCCESS", "Document Updated");
        formik.resetForm();
        navigation.navigate("Home", { screen: "HomeMain" });
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
        deleteCollectionItem(collectionItemID, currentCollectionItem.comment_img_ref);
        Alert.alert("Success", "Item Deleted.");
        navigation.navigate("Home", { screen: "HomeMain" });
    };

    const initialValues = {
        amount: String(currentCollectionItem.collectionItem_amount),
        collectionItemName: currentCollectionItem.collectionItem_name,
        collectionItemIcon: currentCollectionItem.collectionItem_icon,
        collectionItemColor: currentCollectionItem.collectionItem_color,
        categoryName: currentCollectionItem.category_name,
        comments: currentCollectionItem.comments,
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleFormikSubmit,
    });

    const screenTitle = `${mode === "edit" ? "Edit" : "Item"} Details`;

    const EditButtonGroup = () => (
        <>
            <Button
                type="filled"
                width="45%"
                title="Save"
                rounded="8px"
                textSize={16}
                noBorder={false}
                onPress={formik.handleSubmit}
            />
            <Button
                type="outlined"
                width="45%"
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
                    navigation.navigate("Collection", {
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
        </CollectionEditContainer>
    )
}

export default CollectionEditScreen