import { create } from 'zustand';

interface RentModalStore {
  isOpened: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useRentModal = create<RentModalStore>((set) => ({
  isOpened: false,
  onOpen: () => set({ isOpened: true }),
  onClose: () => set({ isOpened: false }),
}));
