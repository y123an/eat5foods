import { create } from "zustand";

interface SearchState {
  isSearchOpen: boolean;
  toggleSearch: () => void;
}

const useSearch = create<SearchState>((set) => ({
  isSearchOpen: false,
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
}));

export default useSearch;
