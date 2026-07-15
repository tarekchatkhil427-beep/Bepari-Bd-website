import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  size = 'md' // 'sm' | 'md' | 'full' | 'bottomSheet'
}) {

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleDragEnd = (event, info) => {
    // Dismiss if dragged down more than 100px
    if (info.offset.y > 100) {
      onClose();
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-full max-w-sm rounded-[2rem] mx-4 my-auto relative';
      case 'md': return 'w-full max-w-lg rounded-[2.5rem] mx-4 my-auto relative';
      case 'full': return 'w-full h-full md:max-w-3xl md:max-h-[90vh] md:rounded-[2.5rem] md:my-auto relative';
      case 'bottomSheet': return 'w-full max-h-[85vh] rounded-t-[2.5rem] mt-auto absolute bottom-0 left-0 right-0';
      default: return 'w-full max-w-lg rounded-[2.5rem] mx-4 my-auto relative';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-center items-center">
          
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            drag={size === 'bottomSheet' ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={size === 'bottomSheet' ? handleDragEnd : undefined}
            initial={size === 'bottomSheet' ? { y: '100%' } : { opacity: 0, scale: 0.9, y: 20 }}
            animate={size === 'bottomSheet' ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
            exit={size === 'bottomSheet' ? { y: '100%' } : { opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className={`bg-white shadow-2xl flex flex-col z-10 overflow-hidden ${getSizeClasses()}`}
          >
            {/* Handle Bar for Bottom Sheet */}
            {size === 'bottomSheet' && (
              <div className="w-full flex justify-center pt-4 pb-2 cursor-grab active:cursor-grabbing" onClick={onClose}>
                <div className="w-16 h-1.5 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"></div>
              </div>
            )}

            {/* Header */}
            {(title || size !== 'bottomSheet') && (
              <div className={`flex items-center justify-between px-6 py-4 ${size !== 'bottomSheet' ? 'border-b border-gray-100' : ''}`}>
                {title && <h3 className="font-bangla font-bold text-navy text-xl">{title}</h3>}
                <button 
                  onClick={onClose} 
                  className={`p-2 rounded-full text-gray-500 hover:text-navy hover:bg-gray-100 transition-colors ${size === 'bottomSheet' && !title ? 'absolute top-5 right-5 bg-gray-50 border border-gray-100 z-20' : 'ml-auto'}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
            
            {/* For bottomSheet without title, we still want a close button */}
            {size === 'bottomSheet' && !title && (
              <button 
                onClick={onClose} 
                className="absolute top-5 right-5 p-2 rounded-full text-gray-400 bg-gray-50 hover:text-navy hover:bg-gray-100 border border-gray-100 transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Body Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 hide-scrollbar">
              {children}
            </div>
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
