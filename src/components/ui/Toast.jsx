import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';

export default function Toast() {
  const { toastMessage, clearToast } = useUIStore();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        clearToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, clearToast]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green" />,
    error: <XCircle className="w-5 h-5 text-red" />,
    info: <Info className="w-5 h-5 text-gold" />,
  };

  const borderColors = {
    success: 'border-green/20 bg-green/5',
    error: 'border-red/20 bg-red/5',
    info: 'border-gold/20 bg-gold/5',
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-center shadow-float rounded-2xl p-4 w-full max-w-sm border backdrop-blur-md bg-white/90 ${borderColors[toastMessage.type || 'info']}`}
          >
            <div className="flex-shrink-0 mr-3">
              {icons[toastMessage.type || 'info']}
            </div>
            <div className="flex-1 font-bangla text-navy font-medium text-sm">
              {toastMessage.text}
            </div>
            <button
              onClick={clearToast}
              className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-full hover:bg-black/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
