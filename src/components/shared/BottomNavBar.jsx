import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Grid, Store, Briefcase, Phone } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';

const tabs = [
  { id: 'home', label: 'হোম', icon: Home, path: '/' },
  { id: 'products', label: 'পণ্য', icon: Grid, path: '/products' },
  { id: 'retailers', label: 'রিটেইলার', icon: Store, path: '/retailers' },
  { id: 'wholesalers', label: 'পাইকার', icon: Briefcase, path: '/wholesalers' },
  { id: 'contact', label: 'যোগাযোগ', icon: Phone, path: '/contact' },
];

export default function BottomNavBar() {
  const location = useLocation();
  const { activePage, setActivePage } = useUIStore();

  // Sync active page with route location
  useEffect(() => {
    const currentTab = tabs.find(tab => tab.path === location.pathname);
    if (currentTab) {
      setActivePage(currentTab.id);
    }
  }, [location.pathname, setActivePage]);

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/90 backdrop-blur-md border-t border-gray-100 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const isActive = activePage === tab.id || location.pathname === tab.path;
          const Icon = tab.icon;
          const isMiddleTab = tab.id === 'products';

          return (
            <Link
              key={tab.id}
              to={tab.path}
              className="relative flex flex-col items-center justify-center flex-1 h-full touch-manipulation group"
              onClick={() => setActivePage(tab.id)}
            >
              <motion.div 
                whileTap={{ scale: 0.85 }}
                className="flex flex-col items-center justify-center w-full relative pt-2 pb-1"
              >
                {/* Active Indicator Pill */}
                <div className="absolute top-0 h-1 flex items-center justify-center w-full">
                  {isActive && (
                    <motion.div
                      layoutId="activeBottomTab"
                      className="w-4 h-1 bg-green rounded-full"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </div>

                <div className="relative mt-1">
                  <Icon 
                    className={`transition-colors duration-200 ${
                      isMiddleTab ? 'w-6 h-6' : 'w-[22px] h-[22px]'
                    } ${
                      isActive ? 'text-green fill-green/10' : 'text-gray-400'
                    }`} 
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>
                
                <span 
                  className={`font-bangla text-[10px] mt-1 transition-colors duration-200 ${
                    isActive ? 'text-green font-semibold' : 'text-gray-400'
                  }`}
                >
                  {tab.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
