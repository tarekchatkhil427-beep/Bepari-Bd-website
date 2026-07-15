import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import AppDownloadButtons from './AppDownloadButtons';
import WhatsAppButton from './WhatsAppButton';
import Badge from './Badge';

export default function ProductBottomSheet() {
  const { activeModal, modalData, closeModal } = useUIStore();
  const isOpen = activeModal === 'productDetails';
  const { product, category } = modalData || {};

  return (
    <AnimatePresence>
      {isOpen && product && category && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={closeModal}
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 max-h-[90vh] bg-white rounded-t-[2.5rem] z-[70] flex flex-col shadow-2xl"
          >
            {/* Handle */}
            <div className="w-full flex justify-center pt-4 pb-2" onClick={closeModal}>
              <div className="w-16 h-1.5 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 transition-colors"></div>
            </div>

            <button onClick={closeModal} className="absolute top-5 right-5 p-2.5 bg-white/50 backdrop-blur-md rounded-full text-gray-600 hover:bg-gray-100 transition-colors z-20 shadow-sm border border-gray-100">
              <X className="w-5 h-5" />
            </button>

            <div className="flex-1 overflow-y-auto px-5 py-4 pb-12 hide-scrollbar">
              
              {/* Product Visual */}
              <div className={`w-full h-56 md:h-72 ${category.bgGradient || 'bg-gray-100'} rounded-[2rem] flex items-center justify-center mb-6 relative overflow-hidden shadow-inner`}>
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: 'spring' }}
                  className="text-8xl md:text-9xl filter drop-shadow-2xl"
                >
                  {category.icon}
                </motion.div>
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="gold" size="md" className="shadow-sm font-semibold tracking-wide">পাইকারি পণ্য</Badge>
                </div>
              </div>

              {/* Title & Info */}
              <div className="mb-8 px-1">
                <span className="inline-block px-3 py-1 bg-green/10 text-green font-bangla font-semibold text-xs rounded-lg mb-3">
                  {category.nameBn}
                </span>
                <h2 className="font-bangla font-bold text-navy text-2xl md:text-3xl leading-snug mb-4">
                  {product}
                </h2>
                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
                  <ExternalLink className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                  <p className="font-bangla text-gray-700 text-[15px] leading-relaxed">
                    এই পণ্যের বর্তমান পাইকারি মূল্য, বিস্তারিত বিবরণ এবং সর্বনিম্ন অর্ডারের পরিমাণ (MOQ) জানতে আমাদের মোবাইল অ্যাপটি ব্যবহার করুন।
                  </p>
                </div>
              </div>

              {/* Related/Sample from same category */}
              <div className="mb-10 px-1">
                <h3 className="font-bangla font-bold text-navy text-lg mb-4">এই ক্যাটাগরির আরো কিছু পণ্য</h3>
                <div className="flex overflow-x-auto gap-3 pb-2 snap-x hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {category.sampleProducts.filter(p => p !== product).map((p, idx) => (
                    <div key={idx} className="flex-shrink-0 snap-start w-32 bg-gray-50 rounded-2xl p-4 border border-gray-100 text-center flex flex-col items-center justify-center h-28">
                      <div className="text-3xl mb-2">{category.icon}</div>
                      <div className="font-bangla text-xs font-semibold text-gray-600 line-clamp-2 leading-tight">{p}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="bg-navy rounded-[2rem] p-6 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl"></div>
                
                <h3 className="font-bangla font-bold text-xl mb-6 relative z-10">মূল্য দেখতে ও অর্ডার করতে</h3>
                <div className="flex flex-col items-center gap-5 relative z-10">
                  <AppDownloadButtons layout="row" size="lg" />
                  <div className="w-full flex items-center gap-4 text-gray-400 my-1">
                    <div className="h-px bg-white/10 flex-1"></div>
                    <span className="font-sans text-xs tracking-widest text-white/40">OR</span>
                    <div className="h-px bg-white/10 flex-1"></div>
                  </div>
                  <WhatsAppButton text="হোয়াটসঅ্যাপে যোগাযোগ করুন" size="sm" variant="secondary" className="w-full justify-center bg-white/5 border-white/10 hover:bg-white/10 text-white" />
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
