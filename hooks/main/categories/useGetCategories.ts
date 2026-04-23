import { useEffect, useState } from 'react'
import * as Sentry from '@sentry/react-native'

import UserStore from '@/stores/UserStore'
import { supabase } from '@/utils/supabase'
import { showToast } from '@/utils/showToast'
import { cleanAuthError } from '@/utils/errors/cleanError'
import CategoryStore from '@/stores/CategoryStore'

const useGetCategories = () => {
    const setCategories = CategoryStore((state) => state.setCategories)
    const user = UserStore((state) => state.user)

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    const getCategories = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .order('created_at', { ascending: true })

            console.log('get categories response:', data)
            console.log('get catergories error:', error)
            if (error) {
                setLoading(false)
                showToast('error', 'Error', 'Failed to fetch categories')
                Sentry.captureException(
                    `Failed to fetch categories in ${user.email}. ${cleanAuthError(error)}`
                )
                console.log(error)
                setData([])
            } else {
                setLoading(false)
                setData(data)
                setCategories(data)
            }
        } catch (error) {
            //setting state of user feedback stores to initialize user feedback components
            setLoading(false)
            await new Promise((resolve) => setTimeout(resolve, 100))
            showToast('error', 'Error', `Service not available right now.`)
            Sentry.captureException(
                `Failed to fetch categories in ${user.email}. Service not available right now. ${error}`
            )
        }
    }

    return { data, loading, getCategories }
}

export default useGetCategories
