import { create } from 'zustand';

/**
 * @typedef {Object} ToastMessage
 * @property {string} text
 * @property {'success'|'error'|'info'} type
 */

/**
 * Zustand store for managing global UI state.
 */
export const useUIStore = create((set) => ({
  // State
  mobileNavOpen: false,
  activeModal: null, // 'appDownload' | 'contactForm' | 'imageViewer' | null
  modalData: {},
  isSearchOpen: false,
  searchQuery: '',
  activePage: 'home',
  filterPanelOpen: false,
  selectedCategory: 'all',
  isScrolled: false,
  toastMessage: null,

  // Actions
  toggleMobileNav: () => set((state) => ({ mobileNavOpen: !state.mobileNavOpen })),
  closeMobileNav: () => set({ mobileNavOpen: false }),
  
  openModal: (modalName, data = {}) => set({ activeModal: modalName, modalData: data }),
  closeModal: () => set({ activeModal: null, modalData: {} }),
  
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setActivePage: (page) => set({ activePage: page }),
  
  toggleFilterPanel: () => set((state) => ({ filterPanelOpen: !state.filterPanelOpen })),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  setIsScrolled: (isScrolled) => set({ isScrolled }),
  
  showToast: (text, type = 'info') => set({ toastMessage: { text, type } }),
  clearToast: () => set({ toastMessage: null }),
}));
