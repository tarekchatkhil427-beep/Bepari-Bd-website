import { useUIStore } from '../../store/useUIStore';
import Modal from './Modal';
import AppDownloadButtons from './AppDownloadButtons';
import WhatsAppButton from './WhatsAppButton';

export default function AppDownloadModal() {
  const { activeModal, closeModal } = useUIStore();
  const isOpen = activeModal === 'appDownload';

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={closeModal} 
      size="bottomSheet"
    >
      <div className="flex flex-col items-center text-center pb-8 pt-2">
        
        {/* Logo/Header area */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-1 mb-4 bg-gray-50 py-2 px-6 rounded-full border border-gray-100 inline-flex">
            <span className="font-bangla text-2xl font-bold text-green">বেপারি</span>
            <span className="font-sans text-2xl font-bold text-gold">-BD</span>
          </div>
          <h2 className="font-bangla text-2xl md:text-3xl font-bold text-navy mb-3">
            অ্যাপটি ডাউনলোড করুন
          </h2>
          <p className="font-bangla text-gray-500 text-[15px] max-w-xs mx-auto leading-relaxed">
            সেরা পাইকারি অভিজ্ঞতা, লাইভ ট্র্যাকিং এবং বিশেষ ছাড় পেতে আমাদের অ্যাপ ব্যবহার করুন।
          </p>
        </div>

        {/* Feature Pills */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="bg-green/10 border border-green/20 text-green font-bangla font-semibold text-xs px-4 py-1.5 rounded-full">বিনামূল্যে</span>
          <span className="bg-blue-50 border border-blue-100 text-blue-600 font-bangla font-semibold text-xs px-4 py-1.5 rounded-full">দ্রুত অর্ডার</span>
          <span className="bg-gold/10 border border-gold/20 text-gold font-bangla font-semibold text-xs px-4 py-1.5 rounded-full">১০০% নিরাপদ</span>
        </div>

        {/* Buttons */}
        <div className="w-full max-w-sm mx-auto flex flex-col gap-4">
          <AppDownloadButtons layout="column" size="lg" className="w-full" />
          
          <div className="flex items-center gap-4 text-gray-400 my-2">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="font-bangla text-sm font-medium">অথবা</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>
          
          <WhatsAppButton 
            text="হোয়াটসঅ্যাপে অর্ডার করুন" 
            size="lg" 
            className="w-full justify-center text-[16px] shadow-sm" 
          />
          <p className="font-bangla text-gray-400 text-xs mt-3">
            অ্যাপ ছাড়াও হোয়াটসঅ্যাপে যোগাযোগ করা যাবে
          </p>
        </div>

      </div>
    </Modal>
  );
}
