import { useEffect, useState } from 'react';
import { onSnapshot, collection, orderBy, query, where } from 'firebase/firestore';

import { db } from '../firebase';

import useCollectionStore from './useCollectionStore'

export default function useGetCollectionChartData() {
    const [chartData, setCharData] = useState([]);
    const setCollectionItems = useCollectionStore((state) => state.setCollectionItems);
    const collectionColRef = collection(db, 'collection');
    const collectionQuery = query(collectionColRef);

    useEffect(() => {

        const unsubscribe = onSnapshot(collectionQuery, (snapshotData) => {
            const collectionList = [];
            snapshotData.forEach(doc => collectionList.push({ ...doc.data(), id: doc.id }));

            // Create a unique category array for collection
            const collectionCategoryList = collectionList.reduce((acc, currentItem) => {
                if (!acc.includes(currentItem.category_name)) {
                    acc.push(currentItem.category_name);
                }
                return acc;
            }, []);

            // create an initial data holder
            const collectionDataList = collectionCategoryList.map(category => {
                const targetCategory = collectionList.find(item => item.category_name === category);
                return {
                    amount: 0,
                    category_name: category,
                    collectionItem_icon: targetCategory.collectionItem_icon,
                    color: targetCategory.collectionItem_color,
                    collectionItem_color: targetCategory.collectionItem_color
                };
            });
            // add the amount to the initial data
            collectionList.forEach(item => {
                // find the data 
                const targetCategory = collectionDataList.find(currentData => item.category_name === currentData.category_name);

                if (item.category_name === targetCategory.category_name) {
                    targetCategory.amount += item.amount;
                }
            });

            const graphChartData = [
            {
                name: "Collection",
                data: collectionDataList
            }];

            setCharData(graphChartData);
            setCollectionItems(collectionList);
            // console.log("data", data);
            console.log("FIREBASE WORKING");
        });

        return unsubscribe;

        // GET ALL THE RECENT TRANSACTIONS
    }, []);


    return [chartData];
}