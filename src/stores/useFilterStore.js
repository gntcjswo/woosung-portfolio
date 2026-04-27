import { create } from 'zustand';

const initialState = {
  selectedTags: [],
  searchQuery: '',
};

export const useFilterStore = create((set, get) => ({
  ...initialState,

  toggleTag: (tag) => {
    const { selectedTags } = get();
    const next = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    set({ selectedTags: next });
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  clearFilters: () => set(initialState),
}));
