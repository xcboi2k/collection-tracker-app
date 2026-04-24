import { useEffect, useState } from 'react'
import * as Sentry from '@sentry/react-native'

import { supabase } from '@/utils/supabase'
import { showToast } from '@/utils/showToast'
import { cleanAuthError } from '@/utils/errors/cleanError'
import CollectionStore from '@/stores/CollectionStore'
import UserStore from '@/stores/UserStore'
import useGetCategories from '../categories/useGetCategories'

export default function useGetCollectionItems() {
    const setCollectionItems = CollectionStore(
        (state) => state.setCollectionItems
    )
    const user = UserStore((state) => state.user)

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [chartData, setChartData] = useState(null)

    const getCollectionItems = async () => {
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
                    `Failed to fetch collection items in ${user.email}. ${cleanAuthError(error)}`
                )
                console.log(error)
                setData([])
            } else {
                setData(data)
                setCollectionItems(data)

                const categoryData = []
                data.forEach((item) => {
                    const category = item.category_name
                    const amount = item.collectionitem_amount
                    const icon = item.collectionitem_icon
                    const color = item.collectionitem_color

                    // Check if the category already exists in the categoryData array
                    const existingCategory = categoryData.find(
                        (c) => c.category === category
                    )

                    if (existingCategory) {
                        existingCategory.amount += amount
                    } else {
                        // If the category doesn't exist, add it to the categoryData array
                        categoryData.push({ category, amount, icon, color })
                    }
                })

                setChartData(categoryData)
                setLoading(false)
            }
        } catch (error) {
            //setting state of user feedback stores to initialize user feedback components
            setLoading(false)
            await new Promise((resolve) => setTimeout(resolve, 100))
            showToast('error', 'Error', `Service not available right now.`)
            Sentry.captureException(
                `Failed to fetch collection items in ${user.email}. Service not available right now. ${error}`
            )
        }
    }

    return { data, chartData, loading, getCollectionItems }
}
