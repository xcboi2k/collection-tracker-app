import { useEffect, useState } from 'react'
import * as Sentry from '@sentry/react-native'

import { supabase } from '@/utils/supabase'
import { showToast } from '@/utils/showToast'
import { cleanAuthError } from '@/utils/errors/cleanError'

import WishlistStore from '@/stores/WishlistStore'
import UserStore from '@/stores/UserStore'

const useGetWishlistItems = () => {
    const setWishlistItems = WishlistStore((state) => state.setWishlistItems)

    const user = UserStore((state) => state.user)

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    const getWishlistItems = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('wishlist_items')
                .select('*')
                .order('created_at', { ascending: false })

            console.log('get wishlist items response:', data)
            console.log('get wishlist items error:', error)
            if (error) {
                setLoading(false)
                showToast('error', 'Error', 'Failed to fetch wishlist items')
                Sentry.captureException(
                    `Failed to fetch wishlist items in ${user.email}. ${cleanAuthError(error)}`
                )
                console.log(error)
                setData([])
            } else {
                setLoading(false)
                setData(data)
                setWishlistItems(data)
            }
        } catch (error) {
            //setting state of user feedback stores to initialize user feedback components
            setLoading(false)
            await new Promise((resolve) => setTimeout(resolve, 100))
            showToast('error', 'Error', `Service not available right now.`)
            Sentry.captureException(
                `Failed to fetch wishlist items in ${user.email}. Service not available right now. ${error}`
            )
        }
    }

    return { data, loading, getWishlistItems }
}

export default useGetWishlistItems
