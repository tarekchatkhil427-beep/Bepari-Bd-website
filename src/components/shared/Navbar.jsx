import { useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Search, X, ArrowLeft, Mic } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { categoriesData } from '../../data/categories';
import Button from '../ui/Button';
import WhatsAppButton from '../ui/WhatsAppButton';
import AppDownloadButtons from '../ui/AppDownloadButtons';

// --- NAV LINKS DATA ---
const navLinks = [
  { path: '/', label: 'হোম' },
  { path: '/retailers', label: 'রিটেইলার' },
  { path: '/wholesalers', label: 'পাইকার' },
  { path: '/products', label: 'পণ্যসমূহ' },
  { path: '/about', label: 'আমাদের সম্পর্কে' },
  { path: '/contact', label: 'যোগাযোগ' },
];

// --- LOGO COMPONENT ---
const Logo = ({ onClick }) => (
  <Link to="/" onClick={onClick} className="flex items-center gap-2 flex-shrink-0">
    <img src="/logo.png" alt="Bepari-BD Logo" className="w-8 h-8 object-contain rounded-md" />
    <span className="flex items-baseline">
      <span className="font-sans font-bold text-2xl text-green tracking-tight">Bepari</span>
      <span className="font-sans font-bold text-xl text-gold ml-0.5">-Bd</span>
    </span>
  </Link>
);

// --- SEARCH OVERLAY COMPONENT ---
const SearchOverlay = () => {
  const { isSearchOpen, closeSearch, searchQuery, setSearchQuery } = useUIStore();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
    }
  }, [isSearchOpen, setSearchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  // Find all unique sample products across all categories for suggestions
  const allProducts = categoriesData.flatMap(cat => cat.sampleProducts);
  
  // Filter based on query
  const filteredProducts = searchQuery.trim() === '' 
    ? [] 
    : allProducts.filter(p => p.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSelectSuggestion = (product) => {
    setSearchQuery(product);
    closeSearch();
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-white flex flex-col"
        >
          {/* Top Bar */}
          <div className="flex items-center px-4 py-3 border-b border-gray-100 bg-white shadow-soft">
            <button onClick={closeSearch} className="p-2 text-gray-500 hover:text-navy hover:bg-gray-100 rounded-full transition-colors mr-2">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1 relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="পণ্য খুঁজুন..."
                className="w-full h-12 pl-4 pr-12 rounded-2xl border-2 border-green/30 focus:border-green focus:outline-none font-bangla text-lg text-navy bg-gray-50"
              />
              {searchQuery && (
                <button onClick={clearSearch} className="absolute right-12 p-2 text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              )}
              <button className="absolute right-2 p-2 text-green hover:bg-green/10 rounded-full transition-colors">
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pt-6">
            {searchQuery.trim() === '' ? (
              // Popular Searches
              <div>
                <h3 className="font-bangla font-semibold text-gray-500 mb-4 px-4">জনপ্রিয় অনুসন্ধান</h3>
                <div 
                  className="flex overflow-x-auto gap-2 px-4 pb-2 snap-x [&::-webkit-scrollbar]:hidden" 
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {categoriesData.filter(c => c.isPopular).map(cat => (
                    <button 
                      key={cat.id} 
                      onClick={() => handleSelectSuggestion(cat.nameBn)}
                      className="flex-shrink-0 snap-start px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-navy font-bangla rounded-full text-sm transition-colors whitespace-nowrap"
                    >
                      {cat.icon} {cat.nameBn}
                    </button>
                  ))}
                  <button className="flex-shrink-0 snap-start px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-navy font-bangla rounded-full text-sm transition-colors whitespace-nowrap">
                    পাঞ্জাবি
                  </button>
                  <button className="flex-shrink-0 snap-start px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-navy font-bangla rounded-full text-sm transition-colors whitespace-nowrap">
                    থ্রি-পিস
                  </button>
                </div>
              </div>
            ) : (
              // Search Results
              <div className="px-2">
                {filteredProducts.length > 0 ? (
                  <ul className="space-y-1">
                    {filteredProducts.map((product, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => handleSelectSuggestion(product)}
                          className="w-full text-left px-4 py-3 hover:bg-green/5 rounded-xl font-bangla text-lg text-navy flex items-center transition-colors"
                        >
                          <Search className="w-5 h-5 text-gray-400 mr-3" />
                          {product}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                      <Search className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="font-bangla text-gray-500 text-lg">কোনো ফলাফল পাওয়া যায়নি</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- MOBILE DRAWER COMPONENT ---
const MobileDrawer = () => {
  const { mobileNavOpen, closeMobileNav } = useUIStore();
  const location = useLocation();

  return (
    <AnimatePresence>
      {mobileNavOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMobileNav}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          />
          <motion.div
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-white rounded-l-3xl shadow-float flex flex-col md:hidden overflow-hidden"
          >
            <div className="p-6 flex items-center justify-between border-b border-gray-100">
              <Logo onClick={closeMobileNav} />
              <button
                onClick={closeMobileNav}
                className="p-2 text-gray-400 hover:text-navy hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-6">
              <ul className="space-y-1 px-4">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        onClick={closeMobileNav}
                        className={`flex items-center h-14 px-4 rounded-xl font-bangla text-lg transition-colors ${
                          isActive 
                            ? 'bg-green/5 text-green border-l-4 border-green font-semibold' 
                            : 'text-navy hover:bg-gray-50 border-l-4 border-transparent'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50/50">
              <div className="mb-6">
                <p className="font-bangla text-sm text-gray-500 mb-3 font-medium">যেকোনো দরকারে</p>
                <WhatsAppButton text="হোয়াটসঅ্যাপ করুন" size="md" className="w-full" />
              </div>
              <div>
                <p className="font-bangla text-sm text-gray-500 mb-3 font-medium">অ্যাপ ডাউনলোড করুন</p>
                <AppDownloadButtons layout="row" size="sm" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- MAIN NAVBAR COMPONENT ---
export default function Navbar() {
  const { isScrolled, setIsScrolled, openSearch, toggleMobileNav } = useUIStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setIsScrolled]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          isScrolled 
            ? 'h-16 md:h-[72px] backdrop-blur-md bg-white/95 border-b border-white/60 shadow-float' 
            : 'h-16 md:h-[72px] backdrop-blur-md bg-white/80 border-b border-white/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          
          {/* LEFT: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Logo />
          </div>

          {/* CENTER: Desktop Nav Links */}
          <nav className="hidden md:flex flex-1 justify-center px-8">
            <ul className="flex space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`relative px-3 py-2 rounded-lg font-bangla text-base transition-colors ${
                        isActive 
                          ? 'text-green font-semibold' 
                          : 'text-gray-600 hover:text-green hover:bg-green/5'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-3 right-3 h-[3px] bg-green rounded-t-full"
                          initial={false}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* RIGHT: Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              onClick={openSearch}
              className="p-2 md:p-2.5 text-gray-600 hover:text-green hover:bg-green/10 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-6 h-6 md:w-5 md:h-5" />
            </button>
            
            <div className="hidden md:block">
              <Button variant="gold" size="sm" className="font-bangla px-6">
                অ্যাপ ডাউনলোড করুন
              </Button>
            </div>

            <button
              onClick={toggleMobileNav}
              className="p-2 text-gray-600 hover:text-navy hover:bg-gray-100 rounded-full transition-colors md:hidden"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* OVERLAYS */}
      <SearchOverlay />
      <MobileDrawer />
    </>
  );
}
