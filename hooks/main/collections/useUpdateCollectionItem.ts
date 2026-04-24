import { useEffect, useState } from 'react'
import * as Sentry from '@sentry/react-native'

import { supabase } from '@/utils/supabase'
import { showToast } from '@/utils/showToast'
import { cleanAuthError } from '@/utils/errors/cleanError'
import UserStore from '@/stores/UserStore'
import LoaderStore from '@/stores/LoaderStore'

export default function useUpdateCollectionItem() {
    const user = UserStore((state) => state.user)
    const stopLoading = LoaderStore((state) => state.stopLoading)

    const updateCollectionItem = async (
        id,
        values,
        resetForm,
        goToNextScreen
    ) => {
        try {
            const { data, error } = await supabase
                .from('collection_items')
                .update({
                    collectionitem_name: values.collectionItemName,
                    collectionitem_amount: values.collectionItemAmount,
                    collectionitem_icon: values.collectionItemIcon,
                    collectionitem_color: values.collectionItemColor,
                    category_id: values.category_id,
                    category_name: values.category_name,
                    comments: values.comments,
                })
                .eq('id', id)

            console.log('update collection items response:', data)
            console.log('update collection items error:', error)
            if (error) {
                stopLoading()
                showToast('error', 'Error', 'Failed to update collection item')
                Sentry.captureException(
                    `Failed to update collection item in ${user.email}. ${cleanAuthError(error)}`
                )
            } else {
                stopLoading()
                showToast(
                    'success',
                    'Success',
                    'Successfully updated an item in the collection'
                )
                goToNextScreen()
            }
        } catch (error) {
            //setting state of user feedback stores to initialize user feedback components
            stopLoading()
            await new Promise((resolve) => setTimeout(resolve, 100))
            showToast('error', 'Error', `Service not available right now.`)
            Sentry.captureException(
                `Failed to update collection item in ${user.email}. Service not available right now. ${error}`
            )
        }
    }

    return { updateCollectionItem }
}
