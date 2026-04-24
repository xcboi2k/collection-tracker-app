import { useEffect, useState } from 'react'
import * as Sentry from '@sentry/react-native'

import { supabase } from '@/utils/supabase'
import { showToast } from '@/utils/showToast'
import { cleanAuthError } from '@/utils/errors/cleanError'
import UserStore from '@/stores/UserStore'
import LoaderStore from '@/stores/LoaderStore'

export default function useAddWishlistItem() {
    const user = UserStore((state) => state.user)
    const stopLoading = LoaderStore((state) => state.stopLoading)

    const addWishlistItem = async (values, resetForm, goToNextScreen) => {
        try {
            const { data, error } = await supabase
                .from('wishlist_items')
                .insert([
                    {
                        wishlist_name: values.wishlistName,
                        wishlist_amount: values.wishlistAmount,
                    },
                ])

            console.log('add wishlist item response:', data)
            console.log('add wishlist item error:', error)
            if (error) {
                stopLoading()
                showToast('error', 'Error', 'Failed to add wishlist item')
                Sentry.captureException(
                    `Failed to add wishlist item in ${user.email}. ${cleanAuthError(error)}`
                )
            } else {
                resetForm()
                stopLoading()
                showToast(
                    'success',
                    'Success',
                    'Successfully added an item in the wishlist'
                )
                goToNextScreen()
            }
        } catch (error) {
            //setting state of user feedback stores to initialize user feedback components
            stopLoading()
            await new Promise((resolve) => setTimeout(resolve, 100))
            showToast('error', 'Error', `Service not available right now.`)
            Sentry.captureException(
                `Failed to add wishlist item in ${user.email}. Service not available right now. ${error}`
            )
        }
    }

    return { addWishlistItem }
}
