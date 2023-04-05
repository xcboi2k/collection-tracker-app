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

            await addDoc(collection(db, 'collection'), {
                ...newItem, timestamp: serverTimestamp()
            });
        }
        catch(err){
            console.log('addCollectionItem:', err);
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
        }
        catch(err){
            console.log('updateCollectionItem:', err);
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
        }
        catch(err){
            console.log('deleteCollectionItem:', err);
        }
    },
});

const useCollectionStore = create(CollectionStore);

export default useCollectionStore;