import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import BottomNavBar from './BottomNavBar';
import WhatsAppButton from '../ui/WhatsAppButton';
import Toast from '../ui/Toast';

export default function PageLayout({ 
  children, 
  title = 'হোম', 
  description = 'ব্যাপারী-বিডি - ভেরিফাইড B2B হোলসেল মার্কেটপ্লেস' 
}) {
  const location = useLocation();
  const [startY, setStartY] = useState(0);
  const [pulling, setPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  // Update document title and description
  useEffect(() => {
    document.title = title ? `${title} | Bepari-BD` : 'Bepari-BD | Wholesale Marketplace';
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }
  }, [title, description]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Pull to refresh simulation for mobile
  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (window.scrollY === 0 && startY > 0) {
      const currentY = e.touches[0].clientY;
      const distance = currentY - startY;
      
      if (distance > 0) {
        setPulling(true);
        // Add resistance factor (0.4) and cap max pull distance at 100px
        setPullDistance(Math.min(distance * 0.4, 100));
      }
    }
  };

  const handleTouchEnd = () => {
    if (pullDistance > 80) {
      triggerRefresh();
    } else {
      setPulling(false);
      setPullDistance(0);
    }
  };

  const triggerRefresh = useCallback(() => {
    setRefreshing(true);
    setPulling(false);
    setPullDistance(0);
    
    // Simulate network reload delay then actually reload
    setTimeout(() => {
      setRefreshing(false);
      window.location.reload();
    }, 1000);
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <div 
      className="min-h-screen bg-offwhite flex flex-col relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Navbar />

      {/* Pull to refresh visual indicator */}
      <div 
        className="fixed top-16 md:top-[72px] left-0 right-0 flex justify-center z-40 pointer-events-none transition-transform duration-200"
        style={{ 
          transform: `translateY(${pulling ? pullDistance : refreshing ? 40 : -60}px)`,
          opacity: pulling ? Math.min(pullDistance / 80, 1) : refreshing ? 1 : 0
        }}
      >
        <div className="bg-white rounded-full p-2.5 shadow-float border border-gray-100">
          <Loader2 
            className={`w-6 h-6 text-green ${refreshing ? 'animate-spin' : ''}`} 
            style={{ transform: `rotate(${pullDistance * 3}deg)` }} 
          />
        </div>
      </div>

      <main className="flex-grow pt-16 md:pt-[72px] pb-20 md:pb-0 relative z-10 w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <BottomNavBar />
      
      <WhatsAppButton 
        size="lg" 
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40" 
      />
      
      <Toast />
    </div>
  );
}
