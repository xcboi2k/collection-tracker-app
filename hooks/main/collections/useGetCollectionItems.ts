import { useEffect, useState } from 'react'
import * as Sentry from '@sentry/react-native'

import { supabase } from '@/utils/supabase'
import { showToast } from '@/utils/showToast'
import { cleanAuthError } from '@/utils/errors/cleanError'

export default function useGetCollectionItems() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    const getCollectionItems = async (values, { resetForm }) => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('collection_items')
                .select('*')
                .order('created_at', { ascending: false })

            console.log('get collection items response:', data)
            console.log('get collection items error:', error)
            if (error) {
                setLoading(false)
                showToast('error', 'Error', 'Failed to fetch collection items')
                Sentry.captureException(
                    `Failed to fetch collection items in ${values.email}. ${cleanAuthError(error)}`
                )
                console.log(error)
                setData([])
            } else {
                setLoading(false)
                setData(data)
            }
        } catch (error) {
            //setting state of user feedback stores to initialize user feedback components
            setLoading(false)
            await new Promise((resolve) => setTimeout(resolve, 100))
            showToast('error', 'Error', `Service not available right now.`)
            Sentry.captureException(
                `Failed to fetch collection items in ${values.email}. Service not available right now. ${error}`
            )
        }
    }

    return { data, loading, getCollectionItems }
}
