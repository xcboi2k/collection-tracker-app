import * as Sentry from '@sentry/react-native'

import LoaderStore from '@/stores/LoaderStore'
import { showToast } from '@/utils/showToast'
import { supabase } from '@/utils/supabase'
import { cleanAuthError } from '@/utils/errors/cleanError'
import UserStore from '@/stores/UserStore'

export default function useLoginUser() {
    const startLoading = LoaderStore((state) => state.startLoading)
    const stopLoading = LoaderStore((state) => state.stopLoading)

    const setLoggedIn = UserStore((state) => state.setLoggedIn)
    const setUser = UserStore((state) => state.setUser)

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
                setUser(data.user.user_metadata)
                setLoggedIn()
            }
        } catch (error) {
            //setting state of user feedback stores to initialize user feedback components
            stopLoading()
            await new Promise((resolve) => setTimeout(resolve, 100))
            showToast('error', 'Error', `Service not available right now.`)
            Sentry.captureException(
                `Failed to login user in ${values.email}. Service not available right now. ${error}`
            )
        }
    }

    return { loginUser }
}
