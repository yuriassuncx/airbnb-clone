import { create } from 'zustand';

interface LoginModalStore {
  isOpened: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useLoginModal = create<LoginModalStore>((set) => ({
  isOpened: false,
  onOpen: () => set({ isOpened: true }),
  onClose: () => set({ isOpened: false }),
}));
