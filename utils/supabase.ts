import { createClient } from '@supabase/supabase-js'
import * as SecureStore from 'expo-secure-store'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY

const supabaseStorage = {
    getItem: (key: string) => {
        return SecureStore.getItemAsync(key)
    },
    setItem: (key: string, value: string) => {
        return SecureStore.setItemAsync(key, value)
    },
    removeItem: (key: string) => {
        return SecureStore.deleteItemAsync(key)
    },
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
        storage: supabaseStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})
