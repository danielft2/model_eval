import { create } from 'zustand'

type LoadingStore = {
  isLoading: boolean
  changeLoadingState: (value: boolean) => void
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  changeLoadingState: (value: boolean) => set({ isLoading: value })
}))