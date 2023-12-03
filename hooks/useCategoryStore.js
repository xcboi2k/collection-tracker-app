import { create } from 'zustand';
import firestore, { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc, query, where, getDocs, writeBatch, getDoc } from 'firebase/firestore';

import { db } from '../firebase';

import LoaderStore from '../stores/LoaderStore';
import AlertStore from '../stores/AlertStore';

const categoryStore = (set, get) => ({
    categories: [],
    reset: () => set({ categories: [] }),
    setCategories: (data) => set({ categories: data }),

    isCategoryCreated: false,
    setCategoryCreated: (value) => set({ isCategoryCreated: value }),
    isCategoryUpdated: false,
    setCategoryUpdated: (value) => set({ isCategoryUpdated: value }),
    isCategoryDeleted: false,
    setCategoryDeleted: (value) => set({ isCategoryDeleted: value }),

    addCategory: async (newCategory) => {
        try {
            await addDoc(collection(db, "categories"), { ...newCategory, created_at: serverTimestamp() });
            console.log("NEW DOCUMENT CREATED");

            set({ isCategoryCreated: true })
            LoaderStore.getState().stopLoading();
            AlertStore.getState().showAlert('Success', `Category added.`)
        }catch (error) {
            LoaderStore.getState().stopLoading();
            AlertStore.getState().showAlert('Error', `Failed to add category. ${error}`);
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

            set({ isCategoryDeleted: true })
            LoaderStore.getState().stopLoading();
            AlertStore.getState().showAlert('Success', `Category deleted.`)
        } catch (error) {
            LoaderStore.getState().stopLoading();
            AlertStore.getState().showAlert('Error', `Failed to delete category. ${error}`)
        }
    },
    updateCategory: async (documentId, updatedCategory) => {
        const docRef = doc(db, "categories", documentId);
        try {
            await updateDoc(docRef, updatedCategory);

            set({ isCategoryUpdated: true })
            LoaderStore.getState().stopLoading();
            AlertStore.getState().showAlert('Success', `Category updated.`)
        } catch (error) {
            LoaderStore.getState().stopLoading();
            AlertStore.getState().showAlert('Error', `Failed to update category. ${error}`)
        }
    },
});


const useCategoryStore = create(categoryStore);


export default useCategoryStore;