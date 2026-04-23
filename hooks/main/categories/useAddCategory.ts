import { useEffect, useState } from 'react'
import * as Sentry from '@sentry/react-native'

import { supabase } from '@/utils/supabase'
import { showToast } from '@/utils/showToast'
import { cleanAuthError } from '@/utils/errors/cleanError'
import UserStore from '@/stores/UserStore'
import LoaderStore from '@/stores/LoaderStore'

export default function useAddCategory() {
    const user = UserStore((state) => state.user)
    const stopLoading = LoaderStore((state) => state.stopLoading)

    const addCategory = async (values, { resetForm }, goToNextScreen) => {
        try {
            const { data, error } = await supabase.from('categories').insert([
                {
                    category_name: values.categoryName,
                    category_icon: values.categoryIcon,
                    category_color: values.categoryColor,
                },
            ])

            console.log('add category response:', data)
            console.log('add category error:', error)
            if (error) {
                stopLoading()
                showToast('error', 'Error', 'Failed to add category')
                Sentry.captureException(
                    `Failed to add category in ${user.email}. ${cleanAuthError(error)}`
                )
            } else {
                resetForm()
                stopLoading()
                showToast(
                    'success',
                    'Success',
                    'Successfully added an item in the collection'
                )
                goToNextScreen()
            }
        } catch (error) {
            //setting state of user feedback stores to initialize user feedback components
            stopLoading()
            await new Promise((resolve) => setTimeout(resolve, 100))
            showToast('error', 'Error', `Service not available right now.`)
            Sentry.captureException(
                `Failed to add category in ${user.email}. Service not available right now. ${error}`
            )
        }
    }

    return { addCategory }
}
