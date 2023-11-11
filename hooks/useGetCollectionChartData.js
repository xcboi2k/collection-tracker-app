import { useEffect, useState } from 'react';
import { onSnapshot, collection, orderBy, query, where } from 'firebase/firestore';

import { db } from '../firebase';

import useCollectionStore from './useCollectionStore'

export default function useGetCollectionChartData() {
    const [chartData, setChartData] = useState('');
    const setCollectionItems = useCollectionStore((state) => state.setCollectionItems);
    const collectionColRef = collection(db, 'collection');
    const collectionQuery = query(collectionColRef);

    useEffect(() => {

        const unsubscribe = onSnapshot(collectionQuery, (snapshotData) => {
            const collectionList = [];
            snapshotData.forEach(doc => collectionList.push({ ...doc.data(), id: doc.id }));

            const categoryData = [];

            // Loop through the collection list and group by category
            collectionList.forEach((item) => {
            const category = item.category_name;
            const amount = item.collectionItem_amount;
            const icon = item.collectionItem_icon;
            const color = item.collectionItem_color;

            // Check if the category already exists in the categoryData array
            const existingCategory = categoryData.find((c) => c.category === category);

            if (existingCategory) {
                existingCategory.amount += amount;
            } else {
                // If the category doesn't exist, add it to the categoryData array
                categoryData.push({ category, amount, icon, color });
            }
            });

            console.log('data:',categoryData);
            setChartData(categoryData);
            setCollectionItems(collectionList);
        });

        return unsubscribe;
    }, []);


    return chartData;
}