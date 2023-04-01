import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { deleteObject, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { db, storage } from '../firebase'

const CollectionStore = (set, get) => ({
    collectionItems: [],
    resetCollectionItems: () => set({collectionItems: []}),
    setCollectionItems: (data) => set({collectionItems: data}),
    addCollectionItem: async(newItem) => {
        try{
            console.log(newItem);

            await addDoc(collection(db, 'Collection'), {
                ...newItem,
                // photoRef: fileRefName || '',
                // photoUrl: fileUrl || '',
                timestamp: serverTimestamp()
            });
        }
        catch(err){
            console.log('addCollectionItem:', err);
        }
    },
    updateCollectionItem: async(documentId, updatedItem) => {
        try{
            console.log(updatedItem);

            const docRef = doc(db, 'Collection', documentId);

            await updateDoc(docRef, {
                ...updatedItem,
                // photoRef: fileRefName || '',
                // photoUrl: fileUrl || '',
                timestamp: serverTimestamp()
            });
        }
        catch(err){
            console.log('updateCollectionItem:', err);
        }
    },
    deleteCollectionItem: async(documentId, updatedItem) => {
        try{
            console.log('Delete', documentId);

            const docRef = doc(db, 'Collection', documentId);

            await deleteDoc(docRef);
        }
        catch(err){
            console.log('deleteCollectionItem:', err);
        }
    },
});

export const useCollectionStore = create(CollectionStore);