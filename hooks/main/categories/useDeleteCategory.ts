import { useEffect, useState } from 'react'
import * as Sentry from '@sentry/react-native'

import { supabase } from '@/utils/supabase'
import { showToast } from '@/utils/showToast'
import { cleanAuthError } from '@/utils/errors/cleanError'
import UserStore from '@/stores/UserStore'
import LoaderStore from '@/stores/LoaderStore'

export default function useDeleteCategory() {
    const user = UserStore((state) => state.user)
    const stopLoading = LoaderStore((state) => state.stopLoading)

    const deleteCategory = async (id, goToNextScreen) => {
        try {
            const { error } = await supabase
                .from('categories')
                .delete()
                .eq('id', id)

            console.log('delete category error:', error)
            if (error) {
                stopLoading()
                showToast('error', 'Error', 'Failed to delete category')
                Sentry.captureException(
                    `Failed to delete category in ${user.email}. ${cleanAuthError(error)}`
                )
            } else {
                stopLoading()
                showToast(
                    'success',
                    'Success',
                    'Successfully deleted a category'
                )
                goToNextScreen()
            }
        } catch (error) {
            //setting state of user feedback stores to initialize user feedback components
            stopLoading()
            await new Promise((resolve) => setTimeout(resolve, 100))
            showToast('error', 'Error', `Service not available right now.`)
            Sentry.captureException(
                `Failed to delete category in ${user.email}. Service not available right now. ${error}`
            )
        }
    }

    return { deleteCategory }
}
