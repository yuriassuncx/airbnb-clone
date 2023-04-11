import { create } from 'zustand';

interface RegisterModalStore {
  isOpened: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useRegisterModal = create<RegisterModalStore>((set) => ({
  isOpened: false,
  onOpen: () => set({ isOpened: true }),
  onClose: () => set({ isOpened: false }),
}));
