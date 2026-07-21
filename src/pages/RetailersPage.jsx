import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Check, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/shared';
import RetailerHero from '../components/sections/RetailerHero';
import BenefitsGrid from '../components/sections/BenefitsGrid';
import FAQAccordion from '../components/ui/FAQAccordion';
import AppDownloadButtons from '../components/ui/AppDownloadButtons';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { retailerBenefits } from '../data/benefits';
import { categoriesData } from '../data/categories';
import { faqsData } from '../data/faqs';

export default function RetailersPage() {
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();
  const [activeCatId, setActiveCatId] = useState(categoriesData[0]?.id || 'cat1');
  const [showSticky, setShowSticky] = useState(false);

  const activeCategory = categoriesData.find(c => c.id === activeCatId) || categoriesData[0];

  useEffect(() => {
    document.title = "রিটেইলারদের জন্য | বেপারি-বিডি";

    const handleScroll = () => {
      setShowSticky(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const painPoints = [
    { icon: '🚌', text: 'ঢাকায় যাওয়ার খরচ ও ঝামেলা' },
    { icon: '😓', text: 'সঠিক পাইকার খুঁজে পাওয়া কঠিন' },
    { icon: '⏱️', text: 'সময় নষ্ট হয় বাজারে গিয়ে' },
  ];

  const comparisonData = [
    { feature: 'খরচ', market: 'যাতায়াত ও থাকা-খাওয়ার খরচ', bepari: '০ টাকা যাতায়াত খরচ' },
    { feature: 'সময়', market: '২-৩ দিন নষ্ট', bepari: 'মাত্র ৫ মিনিটে অর্ডার' },
    { feature: 'মান নিশ্চয়তা', market: 'নিজে গিয়ে যাচাই করতে হয়', bepari: '১০০% কোয়ালিটি চেক' },
    { feature: 'ডেলিভারি', market: 'কুরিয়ার অফিস থেকে আনতে হয়', bepari: 'দোকানে সরাসরি ডেলিভারি' },
    { feature: 'রিটার্ন পলিসি', market: 'সমস্যা হলে ফেরত দেওয়া কঠিন', bepari: 'সহজ রিটার্ন পলিসি' },
  ];

  const userJourney = [
    { step: 'Step 1', title: 'অ্যাপ ডাউনলোড করুন', badge: 'শুধুমাত্র রেজিস্টার্ড দোকানদারদের জন্য', emoji: '📱' },
    { step: 'Step 2', title: 'ট্রেড লাইসেন্স দিয়ে রেজিস্ট্রেশন', emoji: '📄' },
    { step: 'Step 3', title: 'কার্টে পণ্য যোগ করুন', emoji: '🛒' },
    { step: 'Step 4', title: '১০% অগ্রিম দিয়ে অর্ডার কনফার্ম', emoji: '💳' },
    { step: 'Step 5', title: 'পণ্য হাতে পেয়ে বাকি টাকা পরিশোধ', emoji: '🤝' },
  ];

  return (
    <PageLayout title="রিটেইলার">
      <div className="bg-white">
        
        {/* HERO SECTION */}
        <RetailerHero />
        
        {/* PAIN POINTS SECTION */}
        <section className="py-16 md:py-24 px-4 max-w-6xl mx-auto">
          <h2 className="font-bangla text-2xl md:text-3xl font-bold text-center text-navy mb-12">
            আপনি কি এই সমস্যায় পড়েছেন?
          </h2>
          
          <div 
            className="flex overflow-x-auto md:grid md:grid-cols-3 gap-5 pb-6 md:pb-0 snap-x justify-start md:justify-center [&::-webkit-scrollbar]:hidden" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {painPoints.map((pt, idx) => (
              <div key={idx} className="flex-shrink-0 w-[85%] md:w-auto snap-start bg-red-50/40 rounded-[2rem] p-8 border border-red-100 flex flex-col items-center text-center shadow-sm">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-5xl mb-6 shadow-sm border border-red-50">
                  {pt.icon}
                </div>
                <p className="font-bangla text-navy font-semibold text-xl">{pt.text}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <div className="inline-block bg-green/10 px-8 py-3.5 rounded-full border border-green/20 shadow-sm">
              <p className="font-bangla font-bold text-green text-lg md:text-xl flex items-center">
                বেপারি-বিডি এই সমস্যার সমাধান করেছে <span className="ml-2 text-2xl">✅</span>
              </p>
            </div>
          </div>
        </section>

        {/* BENEFITS GRID */}
        <BenefitsGrid benefits={retailerBenefits} />

        {/* USER JOURNEY TIMELINE */}
        <section className="py-20 px-4 bg-offwhite overflow-hidden">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
            {/* Timeline Left */}
            <div className="flex-1 w-full md:pr-10">
              <h2 className="font-bangla text-3xl md:text-4xl font-bold text-navy mb-12">
                সহজ অর্ডার প্রক্রিয়া
              </h2>
              <div className="relative border-l-2 border-dashed border-green/30 ml-6">
                {userJourney.map((journey, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx} 
                    className="mb-10 ml-10 relative"
                  >
                    <div className="absolute -left-[3.25rem] w-12 h-12 bg-white border-2 border-green rounded-full flex items-center justify-center text-2xl shadow-sm z-10">
                      {journey.emoji}
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-soft border border-gray-50">
                      <span className="font-sans text-xs font-bold text-green uppercase mb-1 block">
                        {journey.step}
                      </span>
                      <h3 className="font-bangla font-semibold text-navy text-lg">
                        {journey.title}
                      </h3>
                      {journey.badge && (
                        <div className="mt-2">
                          <Badge variant="gold" size="sm">{journey.badge}</Badge>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mockup Right */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex-1 w-full justify-center hidden md:flex"
            >
              <div className="w-[300px] h-[600px] bg-gray-50 rounded-[3rem] border-[12px] border-gray-900 shadow-2xl relative overflow-hidden flex flex-col">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-20"></div>
                
                {/* App Mockup UI */}
                <div className="bg-green pt-12 pb-4 px-4 shadow-sm z-10 text-white flex justify-between items-center">
                  <div className="font-bangla font-bold text-xl">বেপারি-BD</div>
                  <div className="w-8 h-8 rounded-full bg-white/20"></div>
                </div>
                <div className="bg-green px-4 pb-4">
                  <div className="w-full h-10 bg-white/20 rounded-full flex items-center px-4">
                     <span className="text-white/60 font-bangla text-sm">পণ্য খুঁজুন...</span>
                  </div>
                </div>
                
                <div className="flex-1 bg-gray-100 p-4 overflow-hidden relative">
                  <div className="grid grid-cols-2 gap-3">
                    {[1,2,3,4,5,6].map(i => (
                      <div key={i} className="bg-white p-2 rounded-xl shadow-sm">
                        <div className="w-full h-24 bg-gray-50 rounded-lg mb-2 flex items-center justify-center text-3xl">
                          {['👔','👗','💄','👟','🎒','🏏'][i-1]}
                        </div>
                        <div className="h-3 w-3/4 bg-gray-200 rounded mb-1"></div>
                        <div className="h-3 w-1/2 bg-green/30 rounded"></div>
                      </div>
                    ))}
                  </div>
                  {/* Fade out bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PRODUCT CATEGORIES PREVIEW */}
        <section className="py-16 md:py-24 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-bangla text-3xl md:text-4xl font-bold text-center text-navy mb-10">
              আমাদের পণ্যের ধরন
            </h2>
            
            {/* Chips */}
            <div className="flex overflow-x-auto gap-3 pb-4 snap-x hide-scrollbar justify-start md:justify-center mb-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {categoriesData.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCatId(cat.id)}
                  className={`flex-shrink-0 snap-start px-6 py-2.5 rounded-full font-bangla font-medium transition-colors border ${
                    activeCatId === cat.id 
                      ? 'bg-green text-white border-green' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-green/50 hover:bg-green/5'
                  }`}
                >
                  <span className="mr-2">{cat.icon}</span> {cat.nameBn}
                </button>
              ))}
            </div>

            {/* Sample Products */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {activeCategory.sampleProducts.map((prod, idx) => (
                <motion.div 
                  key={`${activeCatId}-${idx}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-4 shadow-soft border border-gray-100 flex items-center hover:shadow-card transition-shadow cursor-pointer"
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl mr-4 ${activeCategory.color}`}>
                    {activeCategory.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bangla font-semibold text-navy text-[15px] leading-tight">{prod}</h4>
                    <Badge variant="green" size="sm" className="mt-2 text-[10px]">পাইকারি মূল্য</Badge>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center">
              <button 
                onClick={() => navigate(`/products?category=${activeCatId}`)}
                className="inline-flex items-center text-green font-bangla font-semibold hover:text-navy transition-colors text-lg"
              >
                সব পণ্য দেখুন <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE SECTION */}
        <section className="py-16 px-4 max-w-5xl mx-auto">
          <h2 className="font-bangla text-2xl md:text-4xl font-bold text-center text-navy mb-12">
            বেপারি-বিডি <span className="text-gray-400">বনাম</span> সাধারণ বাজার
          </h2>
          
          <div className="overflow-x-auto rounded-[2rem] shadow-card border border-gray-100 bg-white hide-scrollbar">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-navy text-white font-bangla text-lg md:text-xl">
                  <th className="p-6 font-semibold w-1/3">বিষয়</th>
                  <th className="p-6 font-semibold w-1/3 text-gray-300 border-l border-white/10 bg-navy/90">সাধারণ বাজার</th>
                  <th className="p-6 font-semibold w-1/3 text-green-100 border-l border-white/10 bg-green/20">বেপারি-বিডি</th>
                </tr>
              </thead>
              <tbody className="font-bangla">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="p-6 font-semibold text-navy text-lg bg-gray-50/30">{row.feature}</td>
                    <td className="p-6 text-gray-500 border-l border-gray-100 bg-red-50/10">
                      <div className="flex items-center text-base md:text-lg">
                        <X className="w-6 h-6 text-red mr-3 flex-shrink-0" />
                        <span>{row.market}</span>
                      </div>
                    </td>
                    <td className="p-6 text-green border-l border-gray-100 bg-green/5 font-medium">
                      <div className="flex items-center text-base md:text-lg">
                        <Check className="w-6 h-6 text-green mr-3 flex-shrink-0" />
                        <span>{row.bepari}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* REWARD & CTA SECTION */}
        <section className="py-16 md:py-24 px-4 bg-offwhite">
          <div className="max-w-5xl mx-auto">
            
            {/* REWARD FLOATING CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white rounded-[2rem] p-8 shadow-soft border border-green/20 relative overflow-hidden"
              >
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-gold/10 rounded-full blur-2xl"></div>
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mb-6">
                  <motion.div
                    animate={prefersReduced ? {} : { rotate: [0, -10, 10, -10, 10, 0] }}
                    transition={prefersReduced ? { duration: 0 } : { repeat: Infinity, duration: 2, delay: 1 }}
                    className="text-4xl"
                  >🎁</motion.div>
                </div>
                <h3 className="font-bangla font-bold text-navy text-xl md:text-2xl mb-3">অর্ডার করুন, পয়েন্ট জিতুন</h3>
                <p className="font-bangla text-gray-600">পয়েন্ট জমিয়ে পরিবার নিয়ে ঘুরে আসুন কক্সবাজারসহ বিভিন্ন আকর্ষণীয় স্থানে।</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white rounded-[2rem] p-8 shadow-soft border border-blue-100 relative overflow-hidden"
              >
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-100 rounded-full blur-2xl"></div>
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-4xl">
                  🤝
                </div>
                <h3 className="font-bangla font-bold text-navy text-xl md:text-2xl mb-3">দোকানদার রেফার করুন</h3>
                <p className="font-bangla text-gray-600">আপনার পরিচিত দোকানদারকে বেপারি-বিডিতে রেফার করে Extra Income অর্জন করুন।</p>
              </motion.div>
            </div>

            {/* CTA PANEL */}
            <div className="bg-gradient-to-r from-green to-emerald-700 rounded-[2.5rem] p-8 md:p-16 text-center text-white shadow-float relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full filter blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold opacity-10 rounded-full filter blur-3xl transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
               
               <h2 className="font-bangla text-3xl md:text-5xl font-bold mb-6 leading-tight relative z-10">
                 রেজিস্ট্রেশন করলেই পাচ্ছেন <br className="hidden md:block"/> <span className="text-gold">৳৫০০ ডিসকাউন্ট</span> কুপন
               </h2>
               <p className="font-bangla text-green-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto relative z-10">
                 প্রথম ৫০০ অর্ডারকারীর জন্য দোকান পরিচালনার প্রিমিয়াম সফটওয়্যার সম্পূর্ণ ফ্রি।
               </p>
               <div className="relative z-10 flex flex-col items-center justify-center gap-6">
                 <AppDownloadButtons layout="row" size="lg" />
                 <WhatsAppButton text="হোয়াটসঅ্যাপে যোগাযোগ করুন" size="md" />
               </div>
            </div>
            
          </div>
        </section>

        {/* FAQ SECTION */}
        <FAQAccordion faqs={faqsData.retailers} title="রিটেইলারদের সাধারণ জিজ্ঞাসা" />
        
        {/* STICKY BOTTOM CTA (MOBILE ONLY) */}
        <AnimatePresence>
          {showSticky && (
            <motion.div 
              initial={{ y: 150 }}
              animate={{ y: 0 }}
              exit={{ y: 150 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 py-3 flex items-center gap-3 md:hidden shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)]"
              style={{ bottom: 'calc(4rem + env(safe-area-inset-bottom, 0px))' }}
            >
              <Button variant="gold" size="md" className="flex-1 font-bangla font-semibold shadow-sm">
                অ্যাপ ডাউনলোড করুন
              </Button>
              <WhatsAppButton size="md" className="shadow-sm border border-green/20" />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageLayout>
  );
}
