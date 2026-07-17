import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import WhatsAppButton from '../ui/WhatsAppButton';
import AppDownloadButtons from '../ui/AppDownloadButtons';

const FacebookIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const YouTubeIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" clipRule="evenodd" />
  </svg>
);

export default function Footer() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const banglaYear = new Date().getFullYear()
    .toString()
    .replace(/0/g, '০')
    .replace(/1/g, '১')
    .replace(/2/g, '২')
    .replace(/3/g, '৩')
    .replace(/4/g, '৪')
    .replace(/5/g, '৫')
    .replace(/6/g, '৬')
    .replace(/7/g, '৭')
    .replace(/8/g, '৮')
    .replace(/9/g, '৯');

  return (
    <footer className="bg-navy text-white pt-12 pb-28 px-4 md:pt-16 md:pb-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8"
        >
          {/* COLUMN 1: BRAND */}
          <motion.div variants={itemVariants} className="flex flex-col items-start space-y-5">
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
              <img src="/logo.png" alt="Bepari-BD Logo" className="w-10 h-10 object-contain rounded-md bg-white/10 p-1" />
              <span className="flex items-baseline">
                <span className="font-sans font-bold text-3xl text-white tracking-tight">Bepari</span>
                <span className="font-sans font-bold text-2xl text-gold ml-1">-BD</span>
              </span>
            </Link>
            <p className="font-bangla text-gray-300 text-lg">
              ঢাকা না গিয়েই পাইকারি কিনুন
            </p>
            <WhatsAppButton text="মেসেজ দিন" size="sm" className="mt-2" />
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 -ml-2 rounded-full hover:bg-white/5">
                <FacebookIcon className="w-6 h-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
                <YouTubeIcon className="w-7 h-7" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </motion.div>

          {/* COLUMN 2: QUICK LINKS */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <h3 className="font-bangla text-white font-semibold text-xl mb-6">দ্রুত লিংক</h3>
            <ul className="space-y-3">
              {[
                { path: '/', label: 'হোম' },
                { path: '/retailers', label: 'রিটেইলার' },
                { path: '/wholesalers', label: 'পাইকার' },
                { path: '/products', label: 'পণ্যসমূহ' },
                { path: '/about', label: 'আমাদের সম্পর্কে' },
                { path: '/contact', label: 'যোগাযোগ' }
              ].map(link => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="font-bangla text-gray-400 hover:text-gold transition-colors inline-block text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>



          {/* COLUMN 4: APP DOWNLOAD */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <h3 className="font-bangla text-white font-semibold text-xl mb-6">অ্যাপ ডাউনলোড করুন</h3>
            <div className="mb-6">
              <AppDownloadButtons layout="column" size="md" />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 p-2 flex-shrink-0">
                {/* QR Code Placeholder */}
                <div className="w-full h-full border-2 border-dashed border-gray-500 rounded-lg flex items-center justify-center bg-navy/50">
                  <span className="font-bangla text-xs text-gray-400 text-center leading-tight">QR<br/>কোড</span>
                </div>
              </div>
              <p className="font-bangla text-sm text-gray-400 flex-1">
                সহজে অর্ডার করতে অ্যাপটি স্ক্যান করে ডাউনলোড করুন।
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* BOTTOM BAR */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
        >
          <p className="font-bangla text-gray-500 text-sm text-center md:text-left">
            &copy; {banglaYear} বেপারি-বিডি। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p className="text-gray-500 text-sm text-center md:text-right">
            <span className="font-sans">NextGen Software</span>
            <span className="font-bangla"> পরিবার</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
