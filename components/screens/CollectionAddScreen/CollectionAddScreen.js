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

const CollectionAddScreen = ({navigation}) => {
    let photoId = uuid.v4();
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

    const handleIconPress = (icon) => {
        setSelectedIcon(icon);
        formik.setFieldValue("categoryName", icon.label);
        formik.setFieldValue("collectionItemIcon", icon.currentIcon);
        formik.setFieldValue("collectionItemColor", icon.color);
    };

    const handleFormikSubmit = async (values, { resetForm }) => {
        // console.log(values);
        let imgFile;

        if (image) {
            imgFile = await uploadImage();
        }
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
            // user_id: user.user_id,
            created_at: date
        });
        resetForm();
        Alert.alert("Success", "Collection Item Created.");
        navigation.navigate("Home", { screen: "HomeMain" });
    };

    const initialValues = {
        amount: "",
        collectionItemName: "",
        collectionItemIcon: "",
        collectionItemColor: "",
        categoryName: "",
        comments: "",
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleFormikSubmit,
    });

    let isSubmitDisabled = Number(formik.values.amount) <= 0 || !formik.values.categoryName;

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
                    }}
                    customLabel="Collection Item Name:"
                />
                <TextInput
                    inputProps={{
                        placeholder: "Enter Amount",
                        onChangeText: formik.handleChange("amount"),
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
                        disabled: isSubmitDisabled,
                    }}
                />
                </ButtonContainer>
            </ScrollContainer>
        </CollectionAddContainer>
    )
}

export default CollectionAddScreen