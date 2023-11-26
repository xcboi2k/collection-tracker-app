import { create } from 'zustand';

const Loader = (set, get) => ({
    isLoading: false, //state to check if it is loading
    startLoading: () => set({ isLoading: true }), //state management process to start loading
    stopLoading: () => set({ isLoading: false }), //state management process to stop loading
});

const LoaderStore = create(Loader);

export default LoaderStore;