import { useEffect, useState } from 'react'
import * as Sentry from '@sentry/react-native'

import { supabase } from '@/utils/supabase'
import { showToast } from '@/utils/showToast'
import { cleanAuthError } from '@/utils/errors/cleanError'
import UserStore from '@/stores/UserStore'
import LoaderStore from '@/stores/LoaderStore'

export default function useUpdateCategory() {
    const user = UserStore((state) => state.user)
    const stopLoading = LoaderStore((state) => state.stopLoading)

    const updateCategory = async (id, values, resetForm, goToNextScreen) => {
        try {
            const { data, error } = await supabase
                .from('categories')
                .update({
                    category_name: values.name,
                    category_icon: values.icon,
                    category_color: values.color,
                })
                .eq('id', id)

            console.log('update category response:', data)
            console.log('update category error:', error)
            if (error) {
                stopLoading()
                showToast('error', 'Error', 'Failed to update category')
                Sentry.captureException(
                    `Failed to update category in ${user.email}. ${cleanAuthError(error)}`
                )
            } else {
                resetForm()
                stopLoading()
                showToast('success', 'Success', 'Successfully updated category')
                goToNextScreen()
            }
        } catch (error) {
            //setting state of user feedback stores to initialize user feedback components
            stopLoading()
            await new Promise((resolve) => setTimeout(resolve, 100))
            showToast('error', 'Error', `Service not available right now.`)
            Sentry.captureException(
                `Failed to update category in ${user.email}. Service not available right now. ${error}`
            )
        }
    }

    return { updateCategory }
}
