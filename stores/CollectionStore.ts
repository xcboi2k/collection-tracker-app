import { create } from 'zustand'

import LoaderStore from './LoaderStore'
import AlertStore from './AlertStore'

const collectionStore = (set, get) => ({
    collectionItems: [],
    resetCollectionItems: () => set({ collectionItems: [] }),
    setCollectionItems: (data) => set({ collectionItems: data }),

    isCollectionItemCreated: false,
    setCollectionItemCreated: (value) =>
        set({ isCollectionItemCreated: value }),
    isCollectionItemUpdated: false,
    setCollectionItemUpdated: (value) =>
        set({ isCollectionItemUpdated: value }),
    isCollectionItemDeleted: false,
    setCollectionItemDeleted: (value) =>
        set({ isCollectionItemDeleted: value }),

    // addCollectionItem: async (newItem) => {
    //     try {
    //         console.log(newItem)

    //         await addDoc(collection(db, 'collection'), {
    //             ...newItem,
    //             timestamp: serverTimestamp(),
    //         })

    //         set({ isCollectionItemCreated: true })
    //         LoaderStore.getState().stopLoading()
    //         AlertStore.getState().showAlert('Success', `Collection item added.`)
    //     } catch (error) {
    //         LoaderStore.getState().stopLoading()
    //         AlertStore.getState().showAlert(
    //             'Error',
    //             `Failed to add collection item. ${error}`
    //         )
    //     }
    // },
    // updateCollectionItem: async (documentId, updatedItem) => {
    //     try {
    //         console.log(updatedItem)

    //         const docRef = doc(db, 'collection', documentId)
    //         await updateDoc(docRef, {
    //             ...updatedItem,
    //             // photoRef: fileRefName || '',
    //             // photoUrl: fileUrl || '',
    //             timestamp: serverTimestamp(),
    //         })

    //         set({ isCollectionItemUpdated: true })
    //         LoaderStore.getState().stopLoading()
    //         AlertStore.getState().showAlert(
    //             'Success',
    //             `Collection item updated.`
    //         )
    //     } catch (error) {
    //         LoaderStore.getState().stopLoading()
    //         AlertStore.getState().showAlert(
    //             'Error',
    //             `Failed to update collection item. ${error}`
    //         )
    //     }
    // },
    // deleteCollectionItem: async (documentId, fileReference) => {
    //     try {
    //         console.log('Delete', documentId)

    //         const docRef = doc(db, 'collection', documentId)
    //         const fileRef = ref(storage, fileReference)
    //         await deleteDoc(docRef)

    //         if (fileReference) {
    //             await deleteObject(fileRef)
    //         }

    //         set({ isCollectionItemDeleted: true })
    //         LoaderStore.getState().stopLoading()
    //         AlertStore.getState().showAlert(
    //             'Success',
    //             `Collection item deleted.`
    //         )
    //     } catch (error) {
    //         LoaderStore.getState().stopLoading()
    //         AlertStore.getState().showAlert(
    //             'Error',
    //             `Failed to delete collection item. ${error}`
    //         )
    //     }
    // },
})

const CollectionStore = create(collectionStore)

export default CollectionStore
