import { useEffect, useState } from 'react'

import useWishlistStore from '../stores/WishlistStore'

const useGetWishlistItems = () => {
    const [wishlistData, setWishlistData] = useState([])
    const setWishlistItems = useWishlistStore((state) => state.setWishlistItems)

    return [wishlistData]
}

export default useGetWishlistItems
