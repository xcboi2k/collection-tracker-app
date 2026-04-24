import { useCallback, useState } from 'react'

export function useRefresh({ postRefresh }) {
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        postRefresh?.()
        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }, [])

    return { refreshing, setRefreshing, onRefresh }
}
