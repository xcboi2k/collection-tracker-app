import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { deleteObject, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { db, storage } from '../firebase'

const WishlistStore = (set, get) => ({
    wishlistItems: [],
    resetWishlistItems: () => set({wishlistItems: []}),
    setWishlistItems: (data) => set({wishlistItems: data}),
    addWishlistItem: async(newItem) => {
        try{
            console.log(newItem);

            await addDoc(collection(db, 'wishlist'), {
                ...newItem, timestamp: serverTimestamp()
            });
        }
        catch(err){
            console.log('addWishlistItem:', err);
        }
    },
    updateWishlistItem: async(documentId, updatedItem) => {
        try{
            console.log(updatedItem);

            const docRef = doc(db, 'wishlist', documentId);

            await updateDoc(docRef, {
                ...updatedItem, timestamp: serverTimestamp()
            });
        }
        catch(err){
            console.log('updateWishlistItem:', err);
        }
    },
    deleteWishlistItem: async(documentId) => {
        try{
            console.log('Delete', documentId);

            const docRef = doc(db, 'wishlist', documentId);

            await deleteDoc(docRef);
        }
        catch(err){
            console.log('deleteWishlistItem:', err);
        }
    },
});

const useWishlistStore = create(WishlistStore);

export default useWishlistStore;