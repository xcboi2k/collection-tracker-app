import { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy, where } from 'firebase/firestore';

import { db } from '../firebase';
import useCategoryStore from "./useCategoryStore";
import preMadeCategories from '../data/preMadeCategories';

const useGetCategories = () => {
    const [categoryData, setCategoryData] = useState([]);
    const categoryColRef = collection(db, "categories");
    const resetCategories = useCategoryStore((state) => (state.reset));
    const setCategories = useCategoryStore((state) => (state.setCategories));
    const categoryQuery = query(categoryColRef);

    useEffect(() => {
        //render all categories including those in the database
        const unsubscribe = onSnapshot(categoryQuery, (snapshotData) => {
            // console.log("FETCH CATEGORIES");
            const prepCategories = preMadeCategoriess.map(category => ({
                ...category,
                // user_id: userID
            }));
            const userList = [];
            snapshotData.forEach(doc => {
                // check if doc is already in the array;
                if (prepCategories.some(item => item.id === doc.id)) {
                    const objIndex = prepCategories.findIndex((item) => item.id === doc.id);
                    prepCategories.splice(objIndex, 1);
                }
                userList.push({
                    ...doc.data(),
                    type: doc.data().category_type,
                    id: doc.id
                });
                // console.log("CATEGORY PUSHED", doc.id);
            });
            setCategories([...prepCategories, ...userList]);
            // setCategoryData([...prepCategories, ...userList]);
            // EXPENSE TYPE
        });

        return unsubscribe;
    }, []);


    // useEffect(() => {
    //     resetCategories();
    // }, [userID]);

    return [categoryData];
};

export default useGetCategories;