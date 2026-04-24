import { useEffect, useState } from 'react'
import * as Sentry from '@sentry/react-native'

import { supabase } from '@/utils/supabase'
import { showToast } from '@/utils/showToast'
import { cleanAuthError } from '@/utils/errors/cleanError'
import UserStore from '@/stores/UserStore'
import LoaderStore from '@/stores/LoaderStore'

export default function useUpdateWishlistItem() {
    const user = UserStore((state) => state.user)
    const stopLoading = LoaderStore((state) => state.stopLoading)

    const updateWishlistItem = async (
        id,
        values,
        resetForm,
        goToNextScreen
    ) => {
        try {
            const { data, error } = await supabase
                .from('wishlist_items')
                .update([
                    {
                        wishlist_name: values.wishlistName,
                        wishlist_amount: values.wishlistAmount,
                    },
                ])
                .eq('id', id)

            console.log('update wishlist item response:', data)
            console.log('update wishlist item error:', error)
            if (error) {
                stopLoading()
                showToast('error', 'Error', 'Failed to update wishlist item')
                Sentry.captureException(
                    `Failed to update wishlist item in ${user.email}. ${cleanAuthError(error)}`
                )
            } else {
                resetForm()
                stopLoading()
                showToast(
                    'success',
                    'Success',
                    'Successfully updated wishlist item'
                )
                goToNextScreen()
            }
        } catch (error) {
            //setting state of user feedback stores to initialize user feedback components
            stopLoading()
            await new Promise((resolve) => setTimeout(resolve, 100))
            showToast('error', 'Error', `Service not available right now.`)
            Sentry.captureException(
                `Failed to update wishlist item in ${user.email}. Service not available right now. ${error}`
            )
        }
    }

    const markWishlistItemAcquired = async (id, goToNextScreen) => {
        try {
            const { data, error } = await supabase
                .from('wishlist_items')
                .update({
                    status: 'acquired',
                    acquired_at: new Date().toISOString(),
                })
                .eq('id', id)

            console.log('mark wishlist item response:', data)
            console.log('mark wishlist item error:', error)
            if (error) {
                stopLoading()
                showToast(
                    'error',
                    'Error',
                    'Failed to mark wishlist item to acquired'
                )
                Sentry.captureException(
                    `Failed to mark wishlist item to acquired in ${user.email}. ${cleanAuthError(error)}`
                )
            } else {
                stopLoading()
                showToast(
                    'success',
                    'Success',
                    'Successfully marked wishlist item to acquired'
                )
                goToNextScreen()
            }
        } catch (error) {
            //setting state of user feedback stores to initialize user feedback components
            stopLoading()
            await new Promise((resolve) => setTimeout(resolve, 100))
            showToast('error', 'Error', `Service not available right now.`)
            Sentry.captureException(
                `Failed to mark wishlist item to acquired in ${user.email}. Service not available right now. ${error}`
            )
        }
    }

    return { updateWishlistItem, markWishlistItemAcquired }
}
