import { useEffect } from 'react';
import { useContactStore } from '../../store/useContactStore';
import { useUIStore } from '../../store/useUIStore';
import Button from '../ui/Button';
import { sendContactEmail } from '../../utils/email';

export default function WholesalerRegistrationForm() {
  const { formData, errors, setField, validateForm, setSubmitStatus, submitStatus, resetForm } = useContactStore();
  const { showToast } = useUIStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (useContactStore.getState().isSubmitting) return;
    
    if (validateForm()) {
      useContactStore.getState().setSubmitting(true);
      setSubmitStatus('submitting');
      const result = await sendContactEmail(formData, 'wholesaler_registration');
      useContactStore.getState().setSubmitting(false);
      if (result.success) {
        setSubmitStatus('success');
        showToast('✅ আপনার তথ্য পাঠানো হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।', 'success');
        resetForm();
      } else {
        setSubmitStatus('error');
        showToast(result.error || 'ইমেইল পাঠানো সম্ভব হয়নি', 'error');
      }
    } else {
      showToast('অনুগ্রহ করে সঠিক তথ্য দিয়ে ফর্মটি পূরণ করুন', 'error');
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-2xl px-5 py-3.5 font-bangla text-base focus:border-green focus:ring-2 focus:ring-green/20 outline-none transition-all bg-gray-50/50";
  const labelClass = "block font-bangla text-navy font-semibold mb-2 ml-1";
  const errorClass = "text-red text-sm font-bangla mt-1.5 ml-1 flex items-center";

  return (
    <div id="register" className="bg-white rounded-[2rem] p-6 md:p-10 shadow-card border border-gray-100 max-w-2xl mx-auto w-full relative overflow-hidden scroll-mt-24">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-gold to-green"></div>
      
      <h2 className="font-bangla text-2xl md:text-3xl font-bold text-center text-navy mb-8">
        পাইকার হিসেবে নিবন্ধন করুন
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className={labelClass}>নাম</label>
          <input 
            type="text" 
            placeholder="আপনার পূর্ণ নাম" 
            className={inputClass}
            value={formData.name}
            onChange={(e) => setField('name', e.target.value)}
            name="name"
            autoComplete="name"
          />
          {errors.name && <p className={errorClass}>⚠️ {errors.name}</p>}
        </div>

        <div>
          <label className={labelClass}>ফোন নম্বর</label>
          <input 
            type="tel" 
            placeholder="01XXXXXXXXX" 
            className={inputClass}
            value={formData.phone}
            onChange={(e) => setField('phone', e.target.value)}
            name="tel"
            autoComplete="tel"
          />
          {errors.phone && <p className={errorClass}>⚠️ {errors.phone}</p>}
        </div>

        <div>
          <label className={labelClass}>ইমেইল <span className="text-gray-400 text-xs font-normal">(ঐচ্ছিক)</span></label>
          <input 
            type="email" 
            placeholder="example@gmail.com" 
            className={inputClass}
            value={formData.email}
            onChange={(e) => setField('email', e.target.value)}
            name="email"
            autoComplete="email"
          />
          {errors.email && <p className={errorClass}>⚠️ {errors.email}</p>}
        </div>

        <div>
          <label className={labelClass}>ব্যবসার ধরন</label>
          <select 
            className={inputClass}
            value={formData.businessType}
            onChange={(e) => setField('businessType', e.target.value)}
          >
            <option value="">নির্বাচন করুন</option>
            <option value="পোশাক">পোশাক</option>
            <option value="কসমেটিক্স">কসমেটিক্স</option>
            <option value="জুতা">জুতা</option>
            <option value="ইলেকট্রনিক্স">ইলেকট্রনিক্স</option>
            <option value="অন্যান্য">অন্যান্য</option>
          </select>
          {errors.businessType && <p className={errorClass}>⚠️ {errors.businessType}</p>}
        </div>

        <div>
          <label className={labelClass}>আপনি কোথায় পাইকারি বিক্রি করেন?</label>
          <input 
            type="text" 
            placeholder="যেমন: ইসলামপুর, গুলিস্তান, খাতুনগঞ্জ" 
            className={inputClass}
            value={formData.district}
            onChange={(e) => setField('district', e.target.value)}
          />
          {errors.district && <p className={errorClass}>⚠️ {errors.district}</p>}
        </div>

        <div>
          <label className={labelClass}>বার্তা (ঐচ্ছিক)</label>
          <textarea 
            placeholder="আপনার পণ্য সম্পর্কে সংক্ষেপে লিখুন..." 
            className={`${inputClass} min-h-[100px] resize-y`}
            value={formData.message}
            onChange={(e) => setField('message', e.target.value)}
          ></textarea>
        </div>

        <div className="pt-4">
          <Button 
            variant="gold" 
            size="xl" 
            className="w-full shadow-float"
            type="submit"
            loading={submitStatus === 'submitting'}
          >
            নিবন্ধন করুন
          </Button>
        </div>
      </form>
    </div>
  );
}
