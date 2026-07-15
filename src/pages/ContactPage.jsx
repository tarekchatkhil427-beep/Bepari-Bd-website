import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../components/shared';
import { MessageCircle, Phone, Mail, MapPin, CheckCircle2, ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';
import { useContactStore } from '../store/useContactStore';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const DISTRICTS_COVERED = ["নোয়াখালী", "ফেনী", "চাঁদপুর", "লক্ষ্মীপুর", "কুমিল্লা", "ঢাকা"];

export default function ContactPage() {
  useEffect(() => {
    document.title = "যোগাযোগ করুন | বেপারি-বিডি";
    window.scrollTo(0, 0);
  }, []);

  const { 
    formData, errors, setField, validateForm, submitStatus, 
    setSubmitStatus, interestType, setInterestType, resetForm 
  } = useContactStore();

  const [blurredFields, setBlurredFields] = useState({});
  const [openFaq, setOpenFaq] = useState(null);

  const handleWhatsApp = (text) => {
    const phone = "8801234567890";
    const msg = encodeURIComponent(text);
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  const handleBlur = (field) => {
    setBlurredFields(prev => ({ ...prev, [field]: true }));
  };

  const isFieldValid = (field) => {
    if (!blurredFields[field]) return false;
    if (errors[field]) return false;
    
    switch (field) {
      case 'name': return formData.name.trim().length >= 2;
      case 'phone': return /^(?:\+88|88)?01[3-9]\d{8}$/.test(formData.phone);
      case 'district': return formData.district !== '';
      case 'businessType': return formData.businessType !== '';
      default: return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBlurredFields({ name: true, phone: true, district: true, businessType: true });
    
    if (validateForm()) {
      setSubmitStatus('submitting');
      setTimeout(() => {
        setSubmitStatus('success');
      }, 1500);
    }
  };

  const handleResetForm = () => {
    resetForm();
    setBlurredFields({});
  };

  const businessTypeOptions = interestType === 'retailer' 
    ? ["দোকানদার", "পাইকারি ক্রেতা", "অন্যান্য"]
    : ["কাপড় পাইকার", "কসমেটিক্স", "জুতা", "ইলেকট্রনিক্স", "অন্যান্য"];

  const faqs = [
    { q: "কিভাবে অর্ডার করব?", a: "আমাদের মোবাইল অ্যাপ ডাউনলোড করে রেজিস্ট্রেশন করুন। এরপর আপনার পছন্দের পণ্য কার্টে যোগ করে অর্ডার নিশ্চিত করুন।" },
    { q: "ডেলিভারি পেতে কতদিন সময় লাগে?", a: "আমাদের নিজস্ব নেটওয়ার্কের মাধ্যমে সাধারণত ২-৩ দিনের মধ্যে ডেলিভারি সম্পন্ন হয়।" },
    { q: "পেমেন্ট পদ্ধতি কি?", a: "আমরা ক্যাশ অন ডেলিভারি (COD) এবং মোবাইল ব্যাংকিং (বিকাশ/নগদ/রকেট) সাপোর্ট করি।" },
    { q: "রিটার্ন বা পরিবর্তন সম্ভব কি?", a: "হ্যাঁ, পণ্য ডেলিভারি পাওয়ার সময় চেক করে নিতে পারবেন। কোনো সমস্যা থাকলে তাৎক্ষণিক রিটার্ন করা সম্ভব।" },
    { q: "পাইকার হিসেবে কিভাবে যুক্ত হব?", a: "এই পেজের ফর্মটি 'পাইকার হিসেবে আগ্রহী' নির্বাচন করে পূরণ করুন। আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।" }
  ];

  const inputClass = "w-full border border-gray-200 rounded-2xl px-5 py-3.5 font-bangla text-[15px] focus:border-green focus:ring-2 focus:ring-green/20 outline-none transition-all bg-gray-50/50";
  const labelClass = "block font-bangla text-navy font-semibold mb-2 ml-1";
  const errorClass = "text-red text-sm font-bangla mt-1.5 ml-1";

  return (
    <PageLayout title="যোগাযোগ">
      <div className="bg-white min-h-screen">
        
        {/* SECTION 1: HERO */}
        <section className="pt-24 pb-12 md:pt-32 md:pb-16 px-4 bg-offwhite text-center rounded-b-[3rem]">
          <div className="max-w-2xl mx-auto">
            <h1 className="font-bangla text-3xl md:text-5xl font-bold text-navy mb-4">
              আমাদের সাথে কথা বলুন
            </h1>
            <p className="font-bangla text-gray-500 text-lg mb-6">
              যেকোনো প্রশ্ন বা সমস্যায় আমরা সাহায্য করতে প্রস্তুত
            </p>
            <div className="inline-block bg-green/10 text-green font-bangla font-semibold text-sm px-4 py-2 rounded-full border border-green/20">
              ⚡ সাধারণত ১ ঘণ্টার মধ্যে সাড়া দেওয়া হয়
            </div>
          </div>
        </section>

        {/* SECTION 2: QUICK CONTACT OPTIONS */}
        <section className="py-12 px-4 max-w-5xl mx-auto -mt-8 relative z-10">
          <div className="flex flex-col gap-4">
            
            {/* WhatsApp (Primary) */}
            <div className="bg-[#25D366] text-white rounded-3xl p-6 md:p-8 shadow-float w-full">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6" fill="currentColor" />
                </div>
                <div>
                  <h3 className="font-bangla font-bold text-xl md:text-2xl mb-1">হোয়াটসঅ্যাপে মেসেজ করুন</h3>
                  <p className="font-bangla text-green-50 text-sm md:text-[15px]">সরাসরি চ্যাট করুন — সবচেয়ে দ্রুত পদ্ধতি</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <button onClick={() => handleWhatsApp('আমি রিটেইলার — আপনাদের সম্পর্কে আরও তথ্য চাই')} className="bg-white/20 hover:bg-white/30 transition-colors rounded-xl px-5 py-3 font-bangla text-[15px] font-medium text-left flex-1 backdrop-blur-sm border border-white/10">
                  আমি রিটেইলার — তথ্য চাই
                </button>
                <button onClick={() => handleWhatsApp('আমি পাইকার — আপনাদের প্লাটফর্মে নিবন্ধন করতে চাই')} className="bg-white/20 hover:bg-white/30 transition-colors rounded-xl px-5 py-3 font-bangla text-[15px] font-medium text-left flex-1 backdrop-blur-sm border border-white/10">
                  আমি পাইকার — নিবন্ধন করতে চাই
                </button>
                <button onClick={() => handleWhatsApp('আমি অন্য বিষয়ে কথা বলতে চাই')} className="bg-white/20 hover:bg-white/30 transition-colors rounded-xl px-5 py-3 font-bangla text-[15px] font-medium text-left flex-1 backdrop-blur-sm border border-white/10">
                  অন্য বিষয়ে জিজ্ঞেস করতে চাই
                </button>
              </div>
            </div>

            {/* Secondary Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="tel:+8801234567890" className="bg-white rounded-3xl p-6 md:p-8 shadow-card border border-gray-100 flex items-start gap-5 hover:border-green transition-colors group cursor-pointer">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bangla font-semibold text-gray-500 text-sm mb-1">সরাসরি ফোন করুন</p>
                  <h3 className="font-sans font-bold text-navy text-xl mb-1 group-hover:text-green transition-colors">+880 1234 567 890</h3>
                  <p className="font-bangla text-gray-400 text-xs mt-2">সকাল ৯টা থেকে রাত ৯টা পর্যন্ত</p>
                </div>
              </a>

              <a href="mailto:support@bepari-bd.com" className="bg-white rounded-3xl p-6 md:p-8 shadow-card border border-gray-100 flex items-start gap-5 hover:border-gold transition-colors group cursor-pointer">
                <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bangla font-semibold text-gray-500 text-sm mb-1">ইমেইল পাঠান</p>
                  <h3 className="font-sans font-bold text-navy text-lg md:text-xl mb-1 group-hover:text-gold transition-colors break-all">support@bepari-bd.com</h3>
                  <p className="font-bangla text-gray-400 text-xs mt-2">সাধারণত ২৪ ঘণ্টার মধ্যে উত্তর দেওয়া হয়</p>
                </div>
              </a>
            </div>
            
          </div>
        </section>

        {/* SECTION 3: CONTACT FORM */}
        <section className="py-16 px-4 bg-white border-t border-gray-100">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-bangla text-3xl font-bold text-navy mb-2">আপনার তথ্য পাঠান</h2>
              <p className="font-bangla text-gray-500">ফর্ম পূরণ করুন, আমাদের সাপোর্ট টিম দ্রুত যোগাযোগ করবে</p>
            </div>

            <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-card border border-gray-100 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green" />
                    </div>
                    <h3 className="font-bangla font-bold text-navy text-2xl mb-4">✅ আপনার তথ্য পাঠানো হয়েছে!</h3>
                    <p className="font-bangla text-gray-600 mb-8">ধন্যবাদ। আমরা আপনার তথ্য পেয়েছি এবং শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
                    <Button variant="ghost" onClick={handleResetForm} className="font-bangla border border-gray-200">
                      নতুন বার্তা পাঠান
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                    noValidate
                  >
                    {/* Tabs */}
                    <div className="flex p-1 bg-gray-100 rounded-2xl mb-8 relative">
                      {['retailer', 'wholesaler'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => { setInterestType(type); setField('businessType', ''); }}
                          className={`flex-1 py-3 text-center rounded-xl font-bangla font-semibold text-[15px] relative z-10 transition-colors ${interestType === type ? 'text-navy' : 'text-gray-500 hover:text-navy'}`}
                        >
                          {type === 'retailer' ? 'রিটেইলার হিসেবে আগ্রহী' : 'পাইকার হিসেবে আগ্রহী'}
                        </button>
                      ))}
                      <motion.div 
                        className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-xl shadow-sm z-0"
                        animate={{ left: interestType === 'retailer' ? '4px' : 'calc(50% + 4px)' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    </div>

                    {/* Form Fields */}
                    <div>
                      <label className={labelClass}>নাম <span className="text-red">*</span></label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="আপনার পূর্ণ নাম" 
                          className={inputClass}
                          value={formData.name}
                          onChange={(e) => setField('name', e.target.value)}
                          onBlur={() => handleBlur('name')}
                        />
                        {isFieldValid('name') && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green" />}
                      </div>
                      {errors.name && <p className={errorClass}>⚠️ {errors.name}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>ফোন নম্বর <span className="text-red">*</span></label>
                      <div className="relative flex items-center">
                        <div className="absolute left-4 font-sans text-gray-500 font-medium select-none flex items-center gap-2">
                          <span>🇧🇩</span> +88
                        </div>
                        <input 
                          type="tel" 
                          placeholder="01XXXXXXXXX" 
                          className={`${inputClass} pl-[4.5rem]`}
                          value={formData.phone}
                          onChange={(e) => setField('phone', e.target.value)}
                          onBlur={() => handleBlur('phone')}
                        />
                        {isFieldValid('phone') && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green" />}
                      </div>
                      {errors.phone && <p className={errorClass}>⚠️ {errors.phone}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClass}>জেলা <span className="text-red">*</span></label>
                        <div className="relative">
                          <select 
                            className={`${inputClass} appearance-none pr-10`}
                            value={formData.district}
                            onChange={(e) => setField('district', e.target.value)}
                            onBlur={() => handleBlur('district')}
                          >
                            <option value="">জেলা নির্বাচন করুন</option>
                            {DISTRICTS_COVERED.map(d => <option key={d} value={d}>{d}</option>)}
                            <option value="অন্যান্য">অন্যান্য</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                          {isFieldValid('district') && <CheckCircle2 className="absolute right-10 top-1/2 -translate-y-1/2 w-5 h-5 text-green pointer-events-none" />}
                        </div>
                        {errors.district && <p className={errorClass}>⚠️ {errors.district}</p>}
                      </div>

                      <div>
                        <label className={labelClass}>ব্যবসার ধরন <span className="text-red">*</span></label>
                        <div className="relative">
                          <select 
                            className={`${inputClass} appearance-none pr-10`}
                            value={formData.businessType}
                            onChange={(e) => setField('businessType', e.target.value)}
                            onBlur={() => handleBlur('businessType')}
                          >
                            <option value="">ধরন নির্বাচন করুন</option>
                            {businessTypeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                          {isFieldValid('businessType') && <CheckCircle2 className="absolute right-10 top-1/2 -translate-y-1/2 w-5 h-5 text-green pointer-events-none" />}
                        </div>
                        {errors.businessType && <p className={errorClass}>⚠️ {errors.businessType}</p>}
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>বার্তা (ঐচ্ছিক)</label>
                      <textarea 
                        placeholder={interestType === 'retailer' ? "আপনার কি ধরনের পণ্য প্রয়োজন সংক্ষেপে লিখুন..." : "আপনার পাইকারি পণ্য সম্পর্কে সংক্ষেপে লিখুন..."}
                        className={`${inputClass} min-h-[120px] resize-y`}
                        value={formData.message}
                        onChange={(e) => setField('message', e.target.value)}
                        rows="4"
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <Button 
                        variant="gold" 
                        size="xl" 
                        className="w-full shadow-float"
                        type="submit"
                        loading={submitStatus === 'submitting'}
                        disabled={submitStatus === 'submitting'}
                      >
                        {submitStatus === 'submitting' ? 'পাঠানো হচ্ছে...' : 'তথ্য পাঠান'}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* SECTION 4: OFFICE INFO */}
        <section className="py-16 px-4 bg-offwhite border-t border-gray-100">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
            <div className="flex-1 w-full space-y-6">
              <h2 className="font-bangla text-2xl font-bold text-navy flex items-center gap-2">
                <MapPin className="w-6 h-6 text-gold" /> আমাদের অফিস
              </h2>
              
              <div>
                <p className="font-bangla font-semibold text-gray-800 text-lg mb-1">হেড অফিস</p>
                <p className="font-bangla text-gray-500 leading-relaxed">
                  হোল্ডিং নম্বর ১২৩, মাইজদী কোর্ট রোড<br/>
                  নোয়াখালী সদর, নোয়াখালী - ৩৮০০<br/>
                  বাংলাদেশ
                </p>
              </div>

              <div>
                <p className="font-bangla font-semibold text-gray-800 text-lg mb-1">অফিস সময়</p>
                <p className="font-bangla text-gray-500">শনি–বৃহঃ: সকাল ৯টা – রাত ৯টা</p>
                <p className="font-bangla text-gray-500">শুক্রবার: বিকাল ৩টা – রাত ৯টা</p>
              </div>
            </div>
            
            <div className="flex-1 w-full h-64 bg-gray-100 rounded-2xl flex flex-col items-center justify-center text-gray-400 border border-gray-200">
              <MapPin className="w-10 h-10 mb-2 opacity-50" />
              <span className="font-sans font-medium text-sm">Google Maps Embed Placeholder</span>
            </div>
          </div>
        </section>

        {/* SECTION 5: FAQ QUICK LINKS */}
        <section className="py-16 px-4 bg-white border-t border-gray-100 pb-32">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-bangla text-2xl md:text-3xl font-bold text-navy mb-8 text-center">
              সাধারণ প্রশ্ন আছে?
            </h2>
            
            <div className="space-y-3 mb-8">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden bg-white hover:border-green/30 transition-colors">
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left px-5 py-4 font-bangla font-semibold text-navy flex justify-between items-center"
                  >
                    {faq.q}
                    {openFaq === idx ? <ChevronUp className="w-5 h-5 text-green" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4 font-bangla text-gray-600 border-t border-gray-50 pt-3 text-[15px] leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/retailers" className="text-green font-bangla font-semibold text-center hover:underline bg-green/5 px-6 py-3 rounded-xl border border-green/10">
                রিটেইলারদের প্রশ্নসমূহ দেখুন →
              </Link>
              <Link to="/wholesalers" className="text-gold font-bangla font-semibold text-center hover:underline bg-gold/5 px-6 py-3 rounded-xl border border-gold/10">
                পাইকারদের প্রশ্নসমূহ দেখুন →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}
