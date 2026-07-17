import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../components/shared';
import CategoryChips from '../components/ui/CategoryChips';
import SlideUpFilterPanel from '../components/ui/SlideUpFilterPanel';
import ProductCard from '../components/ui/ProductCard';
import ProductBottomSheet from '../components/ui/ProductBottomSheet';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import AppDownloadButtons from '../components/ui/AppDownloadButtons';
import { useUIStore } from '../store/useUIStore';
import { categoriesData } from '../data/categories';

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get('category');
  
  const { 
    searchQuery, setSearchQuery, openSearch,
    selectedCategory, setSelectedCategory,
    toggleFilterPanel 
  } = useUIStore();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "পণ্যসমূহ | বেপারি-বিডি";
    
    if (catParam) {
      setSelectedCategory(catParam);
    }
  }, [catParam, setSelectedCategory]);

  const allProducts = useMemo(() => {
    let products = [];
    categoriesData.forEach(cat => {
      cat.sampleProducts.forEach(prodName => {
        products.push({
          id: `${cat.id}-${prodName}`,
          name: prodName,
          category: cat
        });
      });
      // Pad out the grid
      products.push({ id: `${cat.id}-var1`, name: `প্রিমিয়াম ${cat.nameBn}`, category: cat });
      products.push({ id: `${cat.id}-var2`, name: `পাইকারি ${cat.nameBn} বান্ডেল`, category: cat });
    });
    return products;
  }, []);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const matchesSearch = searchQuery.trim() === '' || 
        p.name.includes(searchQuery) || 
        p.category.nameBn.includes(searchQuery);
        
      const matchesCategory = selectedCategory === 'all' || p.category.id === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [allProducts, searchQuery, selectedCategory]);

  return (
    <PageLayout title="পণ্যসমূহ">
      <div className="bg-offwhite min-h-screen pb-20">
        
        {/* STICKY TOP BAR */}
        <div className="sticky top-[64px] md:top-[72px] z-30 bg-white border-b border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
          
          {/* Search & Filter Bar */}
          <div className="px-4 py-3 md:py-4 flex gap-3 items-center max-w-7xl mx-auto">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="পণ্য বা ক্যাটাগরি খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={() => {
                  if (window.innerWidth < 768 && !searchQuery) openSearch();
                }}
                className="w-full bg-gray-100 border-0 rounded-full py-3.5 pl-12 pr-4 font-bangla text-[15px] focus:ring-2 focus:ring-green/20 outline-none transition-shadow placeholder:text-gray-400"
              />
            </div>
            <button 
              onClick={toggleFilterPanel}
              className="w-[52px] h-[52px] bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-green hover:border-green/30 hover:bg-green/5 transition-all shadow-sm"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Category Chips */}
          <div className="max-w-7xl mx-auto">
             <CategoryChips />
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5"
              >
                {[...Array(8)].map((_, i) => (
                   <SkeletonLoader key={i} type="card" className="h-56 md:h-64 rounded-3xl" />
                ))}
              </motion.div>
            ) : filteredProducts.length > 0 ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-6"
              >
                {filteredProducts.map((prod) => (
                  <ProductCard 
                    key={prod.id} 
                    product={prod.name} 
                    category={prod.category} 
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="text-8xl mb-6 relative">
                  🔍<span className="absolute bottom-0 right-0 text-4xl">😔</span>
                </div>
                <h3 className="font-bangla font-bold text-navy text-2xl mb-2">কোনো পণ্য পাওয়া যায়নি</h3>
                <p className="font-bangla text-gray-500 mb-8 max-w-sm mx-auto">আমরা এই মুহূর্তে আপনার কাঙ্ক্ষিত পণ্যটি খুঁজে পাইনি। অন্য কিছু খুঁজুন বা ফিল্টার পরিবর্তন করুন।</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="px-8 py-3 rounded-full border border-gray-300 font-bangla text-navy font-semibold hover:bg-gray-100 transition-colors shadow-sm"
                >
                  ফিল্টার রিসেট করুন
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BOTTOM APP CTA */}
          {!isLoading && filteredProducts.length > 0 && (
            <div className="mt-16 bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 text-center shadow-card flex flex-col items-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-green/5 rounded-full blur-2xl"></div>
               <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl"></div>
               
               <h3 className="font-bangla font-bold text-navy text-2xl md:text-3xl mb-4 relative z-10">সকল পণ্যের মূল্য দেখতে চান?</h3>
               <p className="font-bangla text-gray-500 text-lg mb-8 max-w-lg mx-auto relative z-10">
                 আমাদের অ্যাপ ডাউনলোড করে ১০০% ভেরিফাইড পাইকারদের রেট চেক করুন এবং অর্ডার দিন আপনার দোকানে বসেই।
               </p>
               <div className="relative z-10">
                 <AppDownloadButtons layout="row" size="lg" />
               </div>
            </div>
          )}

        </div>

        {/* MODALS & PANELS */}
        <SlideUpFilterPanel />
        <ProductBottomSheet />
        
      </div>
    </PageLayout>
  );
}
