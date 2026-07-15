import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Badge from './Badge';
import { useUIStore } from '../../store/useUIStore';

export default function ProductCard({ product, category }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const cardRef = useRef(null);
  const { openModal } = useUIStore();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleTap = () => {
    openModal('productDetails', { product, category });
  };

  return (
    <motion.div
      ref={cardRef}
      whileTap={{ scale: 0.96 }}
      onClick={handleTap}
      className="bg-white rounded-2xl md:rounded-3xl shadow-soft hover:shadow-card transition-shadow overflow-hidden cursor-pointer border border-gray-50 flex flex-col h-full relative"
    >
      {/* Image Area */}
      <div className={`h-32 md:h-40 ${category.bgGradient || 'bg-gray-100'} flex items-center justify-center relative overflow-hidden`}>
        {/* Blur-up loading placeholder */}
        <div className={`absolute inset-0 transition-all duration-700 ease-out ${isLoaded ? 'opacity-0 scale-110 blur-2xl' : 'opacity-100 scale-100 blur-md bg-gray-200'}`}></div>
        
        {isLoaded && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-5xl md:text-7xl filter drop-shadow-lg relative z-10"
          >
            {category.icon}
          </motion.div>
        )}
        
        <div className="absolute top-2 right-2 md:top-3 md:right-3 z-20">
          <Badge variant="gold" size="sm" className="shadow-sm font-semibold text-[10px] px-2 py-0.5">পাইকারি</Badge>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-3 md:p-4 flex flex-col flex-1">
        <h4 className="font-bangla font-semibold text-navy text-[13px] md:text-[15px] leading-tight line-clamp-2 mb-1 group-hover:text-green transition-colors">
          {product}
        </h4>
        <p className="font-bangla text-[11px] md:text-xs text-gray-400 mb-3">{category.nameBn}</p>
        
        <div className="mt-auto pt-3 border-t border-gray-50/50">
           <div className="bg-gold/5 text-gold text-[10px] md:text-[11px] font-bangla font-semibold px-2 py-1.5 rounded-lg text-center border border-gold/10">
             মূল্য দেখতে অ্যাপ ডাউনলোড করুন
           </div>
        </div>
      </div>
    </motion.div>
  );
}
