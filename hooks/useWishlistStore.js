import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { deleteObject, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { db, storage } from '../firebase'

import LoaderStore from '../stores/LoaderStore';
import AlertStore from '../stores/AlertStore';

const WishlistStore = (set, get) => ({
    wishlistItems: [],
    resetWishlistItems: () => set({wishlistItems: []}),
    setWishlistItems: (data) => set({wishlistItems: data}),

    isWishlistItemCreated: false,
    setWishlistItemCreated: (value) => set({ isWishlistItemCreated: value }),
    isWishlistItemUpdated: false,
    setWishlistItemUpdated: (value) => set({ isWishlistItemUpdated: value }),
    isWishlistItemDeleted: false,
    setWishlistItemDeleted: (value) => set({ isWishlistItemDeleted: value }),

    addWishlistItem: async(newItem) => {
        try{
            console.log(newItem);

            await addDoc(collection(db, 'wishlist'), {
                ...newItem, timestamp: serverTimestamp()
            });

            set({ isWishlistItemCreated: true })
            LoaderStore.getState().stopLoading();
            AlertStore.getState().showAlert('Success', `Wishlist item added.`)
        }
        catch(error){
            LoaderStore.getState().stopLoading();
            AlertStore.getState().showAlert('Error', `Failed to add wishlist item. ${error}`);
        }
    },
    updateWishlistItem: async(documentId, updatedItem) => {
        try{
            console.log(updatedItem);

            const docRef = doc(db, 'wishlist', documentId);

            await updateDoc(docRef, {
                ...updatedItem, timestamp: serverTimestamp()
            });

            set({ isWishlistItemUpdated: true })
            LoaderStore.getState().stopLoading();
            AlertStore.getState().showAlert('Success', `Wishlist item updated.`)
        }
        catch(error){
            LoaderStore.getState().stopLoading();
            AlertStore.getState().showAlert('Error', `Failed to update wishlist item. ${error}`)
        }
    },
    deleteWishlistItem: async(documentId) => {
        try{
            console.log('Delete', documentId);

            const docRef = doc(db, 'wishlist', documentId);

            await deleteDoc(docRef);

            set({ isWishlistItemDeleted: true })
            LoaderStore.getState().stopLoading();
            AlertStore.getState().showAlert('Success', `Wishlist item deleted.`)
        }
        catch(error){
            LoaderStore.getState().stopLoading();
            AlertStore.getState().showAlert('Error', `Failed to delete wishlist item. ${error}`)
        }
    },
});

const useWishlistStore = create(WishlistStore);

export default useWishlistStore;