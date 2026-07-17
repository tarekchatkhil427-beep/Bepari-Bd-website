import { create } from 'zustand';

/**
 * Zustand store for managing application content and static data.
 */
export const useContentStore = create((set) => ({
  // State
  categories: [],
  faqs: {
    retailers: [],
    wholesalers: [],
    general: [],
  },
  testimonials: [],
  stats: {
    products: 345,
    suppliers: 50,
    districts: 4,
    categories: 8,
  },
  isLoading: false,
  error: null,

  // Actions
  /**
   * Load static content from data files or API
   */
  loadContent: () => {
    // Static data is imported directly by components; no async fetch needed.
    // Simply mark content as loaded immediately.
    set({ isLoading: false, error: null });
  },
  
  setLoading: (isLoading) => set({ isLoading }),
}));
