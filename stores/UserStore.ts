import { create } from 'zustand'

interface UserState {
    isLoggedIn: boolean
    userToken?: string
    user: any
    setLoggedIn: () => void
    setLoggedOut: () => void
    setUserToken: (token: string) => void
    clearUserToken: () => void
    setUser: (user: any) => void
    clearUser: () => void
}

const UserStore = create<UserState>()((set) => ({
    isLoggedIn: false,
    userToken: '',
    setUserToken: (token: string) => set({ userToken: token }),
    clearUserToken: () => set({ userToken: '' }),
    user: null,
    setUser: (user: any) => set({ user: user }),
    clearUser: () => set({ user: null }),
    setLoggedIn: () => set({ isLoggedIn: true }),
    setLoggedOut: () => set({ isLoggedIn: false, userToken: '', user: null }),
}))

export default UserStore
