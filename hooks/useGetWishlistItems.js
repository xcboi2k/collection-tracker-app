import { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy, where } from 'firebase/firestore';

import { db } from '../firebase';

import useWishlistStore from './useWishlistStore'

const useGetWishlistItems = () => {
    const [wishlistData, setWishlistData] = useState([]);
    const setWishlistItems = useWishlistStore((state) => state.setWishlistItems);

    useEffect(() => {
        const wishlistColRef = collection(db, "wishlist");
        const wishlistQuery = query(wishlistColRef, orderBy("wishlist_amount"));

        const unsubscribe = onSnapshot(wishlistQuery, (snapshotData) => {
            const userList = [];

            snapshotData.forEach((doc) => {
                userList.push({
                    ...doc.data(),
                    id: doc.id
                });
                // console.log("CATEGORY PUSHED", doc.id);
            });
            setWishlistItems(userList);
            setWishlistData(userList);
        });

        return unsubscribe;
    }, []);

    return [wishlistData];
}

export default useGetWishlistItems;