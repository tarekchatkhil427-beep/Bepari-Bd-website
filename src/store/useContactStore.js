import { create } from 'zustand';

const initialFormData = {
  name: '',
  phone: '',
  district: '',
  businessType: '', // 'retailer' | 'wholesaler' | 'other'
  message: '',
  category: '',
};

/**
 * Zustand store for managing contact form state and validation.
 */
export const useContactStore = create((set, get) => ({
  // State
  formData: initialFormData,
  errors: {},
  submitStatus: 'idle', // 'idle' | 'submitting' | 'success' | 'error'
  interestType: 'retailer', // 'retailer' | 'wholesaler'

  // Actions
  setField: (field, value) => set((state) => ({
    formData: { ...state.formData, [field]: value },
    // Clear the error for the field being updated
    errors: { ...state.errors, [field]: undefined },
  })),
  
  setErrors: (errors) => set({ errors }),
  clearErrors: () => set({ errors: {} }),
  
  setSubmitStatus: (status) => set({ submitStatus: status }),
  setInterestType: (type) => set({ interestType: type }),
  
  resetForm: () => set({ 
    formData: initialFormData, 
    errors: {}, 
    submitStatus: 'idle' 
  }),

  /**
   * Validates the form data according to predefined rules.
   * @returns {boolean} True if form is valid, otherwise false.
   */
  validateForm: () => {
    const { formData } = get();
    const newErrors = {};
    let isValid = true;

    // Validate Name (required, min 2 chars)
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Name is required and must be at least 2 characters.';
      isValid = false;
    }

    // Validate Phone (required, Bangladeshi phone regex)
    const phoneRegex = /^(?:\+88|88)?01[3-9]\d{8}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid Bangladeshi phone number.';
      isValid = false;
    }

    // Validate District (required)
    if (!formData.district || formData.district.trim() === '') {
      newErrors.district = 'District is required.';
      isValid = false;
    }

    // Validate Business Type (required)
    if (!formData.businessType || formData.businessType.trim() === '') {
      newErrors.businessType = 'Business type is required.';
      isValid = false;
    }

    // Update errors state
    set({ errors: newErrors });
    return isValid;
  },
}));
