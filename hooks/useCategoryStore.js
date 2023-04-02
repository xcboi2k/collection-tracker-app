import { create } from 'zustand';
import firestore, { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc, query, where, getDocs, writeBatch, getDoc } from 'firebase/firestore';

import { db } from '../firebase';

const categoryStore = (set, get) => ({
    categories: [],
    reset: () => set({ categories: [] }),
    setCategories: (data) => set({ categories: data }),
    addCategory: async (newCategory) => {
        try {
            await addDoc(collection(db, "categories"), { ...newCategory, created_at: serverTimestamp() });
            console.log("NEW DOCUMENT CREATED");
        }
        catch (err) {
            console.log("addCategoryError:", err);
        }
    },
    deleteCategory: async (documentId) => {
        const docRef = doc(db, "categories", documentId);
        try {
            const relatedCollectionItemsRef = collection(db, "collections");
            const relatedQuery = query(relatedCollectionItemsRef, where("category_id", "==", documentId));
            const relatedCollectionItems = await getDocs(relatedQuery);

            const batch = writeBatch(db);

            relatedCollectionItems.forEach((doc) => {
                batch.delete(doc.ref);
            });

            await deleteDoc(docRef);
        } catch (err) {
            console.log("deleteCategoryError:", err);
        }
    },
    updateCategory: async (documentId, updatedCategory) => {
        try {
            let docRef;
            // CREATE A REFERENCE TO THE DOCUMENT AND THE FILE
            docRef = doc(db, "categories", documentId);
            await updateDoc(docRef, updatedCategory);
        } catch (err) {
            console.log("updateCategoryError:", err);
        }

    },
});


const useCategoryStore = create(categoryStore);


export default useCategoryStore;