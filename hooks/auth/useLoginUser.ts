import * as Sentry from '@sentry/react-native'

import LoaderStore from '@/stores/LoaderStore'
import { showToast } from '@/utils/showToast'
import { supabase } from '@/utils/supabase'
import { cleanAuthError } from '@/utils/errors/cleanError'

export default function useLoginUser() {
    const startLoading = LoaderStore((state) => state.startLoading)
    const stopLoading = LoaderStore((state) => state.stopLoading)

    const loginUser = async (values, { resetForm }) => {
        startLoading()
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
            })

            console.log('response:', data)
            console.log('error:', error)
            if (error) {
                stopLoading()
                showToast('error', 'Error', cleanAuthError(error))
                Sentry.captureException(
                    `Failed to login user in ${values.email}. ${cleanAuthError(error)}`
                )
            } else {
                showToast('success', 'Success', 'Successfully logged in')
                stopLoading()
            }
        } catch (error) {
            //setting state of user feedback stores to initialize user feedback components
            stopLoading()
            await new Promise((resolve) => setTimeout(resolve, 100))
            showToast('error', 'Error', `Failed to call API. ${error}`)
            Sentry.captureException(
                `Failed to login user in ${values.email}. ${error}`
            )
        }
    }

    return { loginUser }
}
