import { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy, where } from 'firebase/firestore';

import { db } from '../firebase';

import preMadeCategories from '../data/preMadeCategories';

import useCategoryStore from "./useCategoryStore";

export default function useGetCategories() {
    const resetCategories = useCategoryStore((state) => (state.reset));
    const setCategories = useCategoryStore((state) => (state.setCategories));

    useEffect(() => {
        const categoryColRef = collection(db, "categories");
        const categoryQuery = query(categoryColRef);

        const unsubscribe = onSnapshot(categoryQuery, (snapshotData) => {
            // console.log("FETCH CATEGORIES");
            const prepCategories = preMadeCategories.map((category) => ({
                ...category,
                // user_id: userID
            }));
            console.log(prepCategories);
            const userList = [];

            snapshotData.forEach((doc) => {
                // check if doc is already in the array;
                if (prepCategories.some(item => item.id === doc.id)) {
                    const objIndex = prepCategories.findIndex((item) => item.id === doc.id);
                    prepCategories.splice(objIndex, 1);
                }
                userList.push({
                    ...doc.data(),
                    id: doc.id
                });
                // console.log("CATEGORY PUSHED", doc.id);
            });
            setCategories([...prepCategories, ...userList]);
        });

        return unsubscribe;
    }, []);
};