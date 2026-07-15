import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi } from 'lucide-react';

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [showRestored, setShowRestored] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowRestored(true);
      // Hide the restored message after 3 seconds
      setTimeout(() => setShowRestored(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowRestored(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-0 left-0 right-0 bg-red text-white px-4 py-2.5 flex items-center justify-center gap-2 z-[200] shadow-md border-b border-red-600"
        >
          <WifiOff className="w-5 h-5" />
          <span className="font-bangla font-semibold text-[15px]">📵 ইন্টারনেট সংযোগ নেই</span>
        </motion.div>
      )}

      {isOnline && showRestored && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-0 left-0 right-0 bg-green text-white px-4 py-2.5 flex items-center justify-center gap-2 z-[200] shadow-md border-b border-green-700"
        >
          <Wifi className="w-5 h-5" />
          <span className="font-bangla font-semibold text-[15px]">✅ সংযোগ পুনরুদ্ধার হয়েছে</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
