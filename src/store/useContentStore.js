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
    // In a real scenario, you would import data from src/data here
    // or fetch from an API. For now, it's just setting loading state.
    set({ isLoading: true, error: null });
    try {
      // Mock loading logic with delay
      setTimeout(() => {
        set({ isLoading: false });
      }, 1500);
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  setLoading: (isLoading) => set({ isLoading }),
}));
