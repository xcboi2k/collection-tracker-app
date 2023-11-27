import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { deleteObject, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { db, storage } from '../firebase'

import LoaderStore from '../stores/LoaderStore';
import AlertStore from '../stores/AlertStore';

const CollectionStore = (set, get) => ({
    collectionItems: [],
    resetCollectionItems: () => set({collectionItems: []}),
    setCollectionItems: (data) => set({collectionItems: data}),

    isCollectionItemCreated: false,
    setCollectionItemCreated: (value) => set({ isCollectionItemCreated: value }),
    isCollectionItemUpdated: false,
    setCollectionItemUpdated: (value) => set({ isCollectionItemUpdated: value }),
    isCollectionItemDeleted: false,
    setCollectionItemDeleted: (value) => set({ isCollectionItemDeleted: value }),

    addCollectionItem: async(newItem) => {
        try{
            console.log(newItem);

            await addDoc(collection(db, 'collection'), {
                ...newItem, timestamp: serverTimestamp()
            });

            set({ isCollectionItemCreated: true })
            LoaderStore.getState().stopLoading();
            AlertStore.getState().showAlert('Success', `Collection item added.`)
        }
        catch(error){
            LoaderStore.getState().stopLoading();
            AlertStore.getState().showAlert('Error', `Failed to add collection item. ${error}`)
        }
    },
    updateCollectionItem: async(documentId, updatedItem) => {
        try{
            console.log(updatedItem);

            const docRef = doc(db, 'collection', documentId);
            await updateDoc(docRef, {
                ...updatedItem,
                // photoRef: fileRefName || '',
                // photoUrl: fileUrl || '',
                timestamp: serverTimestamp()
            });

            set({ isCollectionItemUpdated: true })
            LoaderStore.getState().stopLoading();
            AlertStore.getState().showAlert('Success', `Collection item updated.`)
        }
        catch(error){
            LoaderStore.getState().stopLoading();
            AlertStore.getState().showAlert('Error', `Failed to update collection item. ${error}`)
        }
    },
    deleteCollectionItem: async(documentId, fileReference) => {
        try{
            console.log('Delete', documentId);

            const docRef = doc(db, 'collection', documentId);
            const fileRef = ref(storage, fileReference);
            await deleteDoc(docRef);

            if (fileReference) {
                await deleteObject(fileRef);
            }

            set({ isCollectionItemDeleted: true })
            LoaderStore.getState().stopLoading();
            AlertStore.getState().showAlert('Success', `Collection item deleted.`)
        }
        catch(error){
            LoaderStore.getState().stopLoading();
            AlertStore.getState().showAlert('Error', `Failed to delete collection item. ${error}`)
        }
    },

});

const useCollectionStore = create(CollectionStore);

export default useCollectionStore;