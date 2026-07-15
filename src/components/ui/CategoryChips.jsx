import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useUIStore } from '../../store/useUIStore';
import { categoriesData } from '../../data/categories';

export default function CategoryChips() {
  const { selectedCategory, setSelectedCategory } = useUIStore();
  const containerRef = useRef(null);
  
  const allCategories = [{ id: 'all', nameBn: 'সব' }, ...categoriesData];

  useEffect(() => {
    const container = containerRef.current;
    const activeChip = container?.querySelector('[data-active="true"]');
    
    if (activeChip && container) {
      const containerRect = container.getBoundingClientRect();
      const chipRect = activeChip.getBoundingClientRect();
      
      const scrollLeft = activeChip.offsetLeft - (containerRect.width / 2) + (chipRect.width / 2);
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [selectedCategory]);

  return (
    <div 
      ref={containerRef}
      className="flex overflow-x-auto gap-3 py-3 px-4 bg-white hide-scrollbar border-t border-gray-50"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {allCategories.map(cat => {
        const isActive = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            data-active={isActive}
            onClick={() => setSelectedCategory(cat.id)}
            className={`relative flex-shrink-0 px-5 py-2 rounded-full font-bangla text-sm font-medium transition-colors border ${
              isActive ? 'text-white border-green' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeCategoryChip"
                className="absolute inset-0 bg-green rounded-full shadow-sm -z-10"
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat.nameBn}</span>
          </button>
        );
      })}
    </div>
  );
}
