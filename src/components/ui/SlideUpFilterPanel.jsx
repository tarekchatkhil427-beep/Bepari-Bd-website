import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { categoriesData } from '../../data/categories';
import Button from './Button';

export default function SlideUpFilterPanel() {
  const { filterPanelOpen, toggleFilterPanel, selectedCategory, setSelectedCategory } = useUIStore();

  const handleApply = () => {
    toggleFilterPanel();
  };

  const handleReset = () => {
    setSelectedCategory('all');
  };

  return (
    <AnimatePresence>
      {filterPanelOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={toggleFilterPanel}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-white rounded-t-[2rem] z-50 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
          >
            {/* Handle */}
            <div className="w-full flex justify-center pt-3 pb-1" onClick={toggleFilterPanel}>
              <div className="w-12 h-1.5 bg-gray-200 rounded-full cursor-pointer"></div>
            </div>

            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h2 className="font-bangla font-bold text-navy text-xl">ফিল্টার করুন</h2>
              <button onClick={toggleFilterPanel} className="p-2 bg-gray-50 rounded-full text-gray-500 hover:text-navy hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto px-6 py-6 pb-32 hide-scrollbar">
              
              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="font-bangla font-semibold text-gray-800 mb-4">ক্যাটাগরি</h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="category" 
                      checked={selectedCategory === 'all'}
                      onChange={() => setSelectedCategory('all')}
                      className="w-5 h-5 text-green focus:ring-green accent-green" 
                    />
                    <span className="font-bangla text-gray-700 group-hover:text-green transition-colors">সব ক্যাটাগরি</span>
                  </label>
                  {categoriesData.map(cat => (
                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="category" 
                        checked={selectedCategory === cat.id}
                        onChange={() => setSelectedCategory(cat.id)}
                        className="w-5 h-5 text-green focus:ring-green accent-green" 
                      />
                      <span className="font-bangla text-gray-700 group-hover:text-green transition-colors">{cat.nameBn}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Product Type Filter */}
              <div className="mb-8">
                <h3 className="font-bangla font-semibold text-gray-800 mb-4">পণ্যের ধরন</h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-green focus:ring-green accent-green" />
                    <span className="font-bangla text-gray-700">সব</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded text-green focus:ring-green accent-green" />
                    <span className="font-bangla text-gray-700">রপ্তানি রিজেক্ট গার্মেন্টস</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded text-green focus:ring-green accent-green" />
                    <span className="font-bangla text-gray-700">ব্র্যান্ড পণ্য</span>
                  </label>
                </div>
              </div>

              {/* Location Filter */}
              <div className="mb-4">
                <h3 className="font-bangla font-semibold text-gray-800 mb-4">এলাকা</h3>
                <div className="flex flex-wrap gap-3">
                  {['সব', 'নোয়াখালী', 'ফেনী', 'চাঁদপুর', 'লক্ষ্মীপুর'].map((loc, idx) => (
                    <label key={idx} className="cursor-pointer">
                      <input type="radio" name="location" defaultChecked={idx === 0} className="peer sr-only" />
                      <div className="px-5 py-2.5 rounded-full border border-gray-200 font-bangla text-sm text-gray-600 peer-checked:bg-green/10 peer-checked:text-green peer-checked:border-green/30 transition-all font-medium">
                        {loc}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] flex gap-3 shadow-[0_-5px_15px_rgba(0,0,0,0.03)] z-10">
              <Button variant="ghost" className="flex-1 font-bangla font-medium border border-gray-200 hover:bg-gray-50" onClick={handleReset}>
                রিসেট করুন
              </Button>
              <Button variant="primary" className="flex-[2] font-bangla font-semibold shadow-sm" onClick={handleApply}>
                ফিল্টার প্রয়োগ করুন
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
