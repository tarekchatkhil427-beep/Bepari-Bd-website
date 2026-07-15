import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import SkeletonLoader from './components/ui/SkeletonLoader';
import OfflineIndicator from './components/ui/OfflineIndicator';
import AppDownloadModal from './components/ui/AppDownloadModal';
import { useUIStore } from './store/useUIStore';
import { useContentStore } from './store/useContentStore';

// Lazy loaded routes for code-splitting
const HomePage = React.lazy(() => import('./pages/HomePage'));
const RetailersPage = React.lazy(() => import('./pages/RetailersPage'));
const WholesalersPage = React.lazy(() => import('./pages/WholesalersPage'));
const ProductsPage = React.lazy(() => import('./pages/ProductsPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));

// Fallback loader while route chunks are being fetched
const PageLoader = () => (
  <div className="min-h-screen bg-offwhite flex flex-col w-full">
    <SkeletonLoader type="hero" className="rounded-none h-[40vh]" />
    <div className="max-w-7xl mx-auto w-full p-4 mt-8 flex-1">
      <SkeletonLoader type="grid" count={4} columns={2} />
    </div>
  </div>
);

// Global Toast Component connected to UI Store
const GlobalToast = () => {
  const { toastMessage, clearToast } = useUIStore();
  
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => clearToast(), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, clearToast]);

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className={`fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 z-[200] px-6 py-3.5 rounded-full shadow-float flex items-center gap-3 border ${
            toastMessage.type === 'success' ? 'bg-white border-green/20 text-navy' : 
            toastMessage.type === 'error' ? 'bg-white border-red-500/20 text-navy' : 
            'bg-navy text-white border-navy'
          }`}
        >
          {toastMessage.type === 'success' && <span className="text-green text-xl">✅</span>}
          {toastMessage.type === 'error' && <span className="text-red-500 text-xl">⚠️</span>}
          <span className="font-bangla font-semibold text-sm whitespace-nowrap">{toastMessage.text}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Animated Routes Wrapper
function AnimatedRoutes() {
  const location = useLocation();
  const { loadContent } = useContentStore();

  useEffect(() => {
    // Initialize global content load on app mount
    loadContent();
    
    // Set visited flag for homepage greeting logic
    localStorage.setItem('bepari_visited', 'true');
  }, [loadContent]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/retailers" element={<RetailersPage />} />
        <Route path="/wholesalers" element={<WholesalersPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-offwhite flex flex-col relative w-full overflow-x-hidden font-sans antialiased text-navy">
        
        {/* Global UX Overlays */}
        <OfflineIndicator />
        <GlobalToast />
        <AppDownloadModal />
        
        {/* Main Routing Area */}
        <main className="flex-grow w-full flex flex-col">
          <Suspense fallback={<PageLoader />}>
            <AnimatedRoutes />
          </Suspense>
        </main>
        
      </div>
    </Router>
  );
}

export default App;
