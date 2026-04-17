import { useEffect, useState } from 'react'

import useCollectionStore from '../stores/CollectionStore'

const useGetCollectionItems = () => {
    const [collectionData, setCollectionData] = useState([])
    const setCollectionItems = useCollectionStore(
        (state) => state.setCollectionItems
    )

    // useEffect(() => {
    //     const collectionColRef = collection(db, 'collection')
    //     const collectionQuery = query(
    //         collectionColRef,
    //         orderBy('created_at', 'desc')
    //     )

    //     const unsubscribe = onSnapshot(collectionQuery, (snapshotData) => {
    //         const userList = []

    //         snapshotData.forEach((doc) => {
    //             userList.push({
    //                 ...doc.data(),
    //                 id: doc.id,
    //             })
    //             // console.log("CATEGORY PUSHED", doc.id);
    //         })
    //         setCollectionItems(userList)
    //         setCollectionData(userList)
    //     })

    //     return unsubscribe
    // }, [])

    return [collectionData]
}

export default useGetCollectionItems
