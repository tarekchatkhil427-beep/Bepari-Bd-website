import { create } from 'zustand';

const initialFormData = {
  name: '',
  phone: '',
  email: '',
  district: '',
  businessType: '',
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
  isSubmitting: false,

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
  setSubmitting: (val) => set({ isSubmitting: val }),
  
  resetForm: () => set({ 
    formData: initialFormData, 
    errors: {}, 
    submitStatus: 'idle',
    isSubmitting: false,
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
      newErrors.name = 'নাম কমপক্ষে ২ অক্ষরের হতে হবে';
      isValid = false;
    }
    if (formData.name && formData.name.length > 100) {
      newErrors.name = 'নাম সর্বোচ্চ ১০০ অক্ষর হতে পারে';
      isValid = false;
    }

    // Validate Phone (required, Bangladeshi phone regex)
    const phoneRegex = /^(?:\+88|88)?01[3-9]\d{8}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'সঠিক বাংলাদেশী ফোন নম্বর দিন (01XXXXXXXXX)';
      isValid = false;
    }

    // Validate Email (optional, but must be valid if provided)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'সঠিক ইমেইল ঠিকানা দিন';
      isValid = false;
    }

    // Validate District (required)
    if (!formData.district || formData.district.trim() === '') {
      newErrors.district = 'জেলা / এলাকা নির্বাচন করুন';
      isValid = false;
    }

    // Validate Business Type (required)
    if (!formData.businessType || formData.businessType.trim() === '') {
      newErrors.businessType = 'ব্যবসার ধরন নির্বাচন করুন';
      isValid = false;
    }

    // Validate Message max length
    if (formData.message && formData.message.length > 500) {
      newErrors.message = 'বার্তা সর্বোচ্চ ৫০০ অক্ষর হতে পারে';
      isValid = false;
    }

    // Update errors state
    set({ errors: newErrors });
    return isValid;
  },
}));
