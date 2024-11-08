import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ToggleState = {
  isCartOpen: boolean;
};
type ToggleActions = {
  openCart: () => void;
  closeCart: () => void;
};

type ToggleStore = ToggleState & ToggleActions;

const useToggleStore = create(
  devtools<ToggleStore>(
    (set) => ({
      isCartOpen: false,
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
    }),
    {
      name: 'toggle-store',
      store: 'toggle-store',
    }
  )
);

export default useToggleStore;
