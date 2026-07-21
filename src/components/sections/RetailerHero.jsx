import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronRight, CheckCircle, Package, Clock, Truck, ShieldCheck, Star } from 'lucide-react';
import AppDownloadButtons from '../ui/AppDownloadButtons';

// --- AURORA BACKGROUND (Retailer variant — warmer, green-focused) ---
const AuroraBackground = () => {
  const prefersReduced = useReducedMotion();
  const stillAnim = prefersReduced ? {} : { scale: [1, 1.1, 1] };
  const stillTrans = prefersReduced ? { duration: 0 } : { duration: 14, repeat: Infinity, ease: 'easeInOut' };
  return (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-[#f2fbf7] via-[#f5f7ff] to-[#fdfaf0]" />
    <motion.div
      animate={stillAnim}
      transition={stillTrans}
      className="absolute -top-40 left-1/4 w-[700px] h-[700px] rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(0,106,78,0.07) 0%, transparent 70%)' }}
    />
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: 'radial-gradient(circle, #006a4e 1px, transparent 1px)',
        backgroundSize: '30px 30px',
      }}
    />
  </div>
  );
};

// --- APP MOCKUP (Retailer-focused screen) ---
const RetailerAppMockup = () => {
  const prefersReduced = useReducedMotion();
  return (
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
    className="relative"
  >
    {/* Glow */}
    <div
      className="absolute inset-0 -m-8 rounded-[4rem] blur-3xl opacity-30"
      style={{ background: 'linear-gradient(135deg, rgba(0,106,78,0.5), rgba(212,168,67,0.2))' }}
    />

    {/* Phone */}
    <div className="relative w-[200px] md:w-[230px] mx-auto" style={{ transform: 'rotate(2deg)' }}>
      <div className="rounded-[2.5rem] bg-gray-900 shadow-2xl border-4 border-gray-800 overflow-hidden" style={{ aspectRatio: '9/19' }}>
        <div className="h-7 bg-gray-900 flex items-center justify-center">
          <div className="w-16 h-3 bg-gray-800 rounded-full" />
        </div>
        <div className="h-full bg-white">
          {/* Header */}
          <div className="bg-[#006a4e] px-3 py-2.5">
            <p className="font-sans text-white/70 text-[8px]">Bepari-BD</p>
            <p className="font-sans text-white font-bold text-[10px]">পণ্য ব্রাউজ করুন</p>
          </div>
          {/* Product list */}
          <div className="px-2 py-2 space-y-1.5">
            {[
              { emoji: '👔', cat: 'গেন্টস টেক্সটাইল', price: '৳৪৫০/পিস', discount: '১২%' },
              { emoji: '👗', cat: 'লেডিস থ্রি-পিস', price: '৳৮৫০/পিস', discount: '৮%' },
              { emoji: '💄', cat: 'কসমেটিক্স', price: '৳২২০/পিস', discount: '১৫%' },
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg p-1.5">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-lg flex-shrink-0 shadow-sm">{p.emoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-[8px] text-gray-700 font-semibold truncate">{p.cat}</p>
                  <p className="font-sans text-[8px] text-[#006a4e] font-bold">{p.price}</p>
                </div>
                <span className="font-sans text-[7px] bg-red-100 text-red-600 px-1 py-0.5 rounded font-bold flex-shrink-0">-{p.discount}</span>
              </div>
            ))}
          </div>
          {/* Cart button */}
          <div className="px-2 pt-1">
            <div className="bg-[#006a4e] rounded-lg py-2 text-center">
              <p className="font-sans text-white text-[9px] font-bold">কার্টে যোগ করুন</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Floating: delivery badge */}
    <motion.div
      animate={prefersReduced ? {} : { y: [0, -10, 0] }}
      transition={prefersReduced ? { duration: 0 } : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -right-8 md:-right-12 top-12 bg-white rounded-2xl shadow-xl px-3 py-2 border border-gray-100"
    >
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
          <Truck className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <p className="font-sans text-[9px] font-bold text-gray-800">ডেলিভারি</p>
          <p className="font-sans text-[8px] text-gray-500">দোকানে পৌঁছে গেছে</p>
        </div>
      </div>
    </motion.div>

    {/* Floating: savings badge */}
    <motion.div
      animate={prefersReduced ? {} : { y: [0, 10, 0] }}
      transition={prefersReduced ? { duration: 0 } : { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      className="absolute -left-8 md:-left-12 bottom-20 bg-white rounded-2xl shadow-xl px-3 py-2 border border-gray-100"
    >
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-yellow-50 rounded-full flex items-center justify-center flex-shrink-0">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        </div>
        <div>
          <p className="font-sans text-[9px] font-bold text-gray-800">সাশ্রয়</p>
          <p className="font-sans text-[8px] text-[#006a4e]">৳৩,২০০ আজকে</p>
        </div>
      </div>
    </motion.div>
  </motion.div>
  );
};

// --- MAIN COMPONENT ---
export default function RetailerHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const benefits = [
    { icon: <Package className="w-4 h-4 text-[#006a4e]" />, text: '৩,০০০+ পাইকারি পণ্য' },
    { icon: <Clock className="w-4 h-4 text-[#006a4e]" />, text: 'মাত্র ৫ মিনিটে অর্ডার' },
    { icon: <Truck className="w-4 h-4 text-[#006a4e]" />, text: 'দোকানে সরাসরি ডেলিভারি' },
    { icon: <ShieldCheck className="w-4 h-4 text-[#006a4e]" />, text: '১০০% কোয়ালিটি গ্যারান্টি' },
  ];

  return (
    <section className="relative pt-24 pb-16 md:pt-28 md:pb-24 px-4 overflow-hidden">
      <AuroraBackground />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LEFT: Text & CTAs ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Breadcrumb */}
            <motion.nav variants={itemVariants} aria-label="breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-400 mb-6 bg-white/70 px-4 py-1.5 rounded-full border border-gray-100 backdrop-blur-sm">
              <Link to="/" className="hover:text-[#006a4e] transition-colors font-bangla">হোম</Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
              <span className="text-gray-700 font-bangla font-medium">রিটেইলার</span>
            </motion.nav>

            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-[#006a4e]/8 border border-[#006a4e]/20 rounded-full px-4 py-1.5 mb-5">
              <ShieldCheck className="w-4 h-4 text-[#006a4e]" />
              <span className="font-bangla text-[#006a4e] text-sm font-semibold">শুধু নিবন্ধিত দোকানদারদের জন্য</span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants} className="mb-5">
              <h1 className="font-bangla text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.25]">
                পুরান ঢাকার পাইকারি বাজার —{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #006a4e 0%, #00a86b 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  এখন আপনার দোকানে বসেই
                </span>
              </h1>
            </motion.div>

            {/* Body */}
            <motion.p variants={itemVariants} className="font-bangla text-base md:text-lg text-gray-600 max-w-lg leading-relaxed mb-7">
              ঢাকা না গিয়েই পাইকারি দামে পণ্য অর্ডার করুন। পুরান ঢাকা, ভুলতা, বাবুরহাট, গাজীপুরসহ দেশের
              প্রধান মোকামের পণ্য — <strong className="text-gray-800">একটি অ্যাপে।</strong>
            </motion.p>

            {/* Benefits grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-2.5 mb-7 w-full max-w-sm">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl px-3 py-2 shadow-sm">
                  <div className="w-6 h-6 bg-[#006a4e]/10 rounded-lg flex items-center justify-center flex-shrink-0">{b.icon}</div>
                  <span className="font-bangla text-xs text-gray-700 font-medium">{b.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA — App Download DOMINANT */}
            <motion.div variants={itemVariants} className="w-full">
              <p className="font-bangla text-sm text-gray-500 mb-3 lg:text-left text-center">
                অ্যাপ ডাউনলোড করুন এবং সাথে সাথে পণ্য ব্রাউজ শুরু করুন
              </p>
              <div className="flex justify-center lg:justify-start">
                <AppDownloadButtons layout="row" size="lg" />
              </div>
              <p className="font-bangla text-xs text-gray-400 mt-2.5 lg:text-left text-center">
                ১০% অগ্রিম · ক্যাশ অন ডেলিভারি সুবিধা
              </p>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: App Mockup ── */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="absolute w-[320px] h-[320px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(0,106,78,0.08) 0%, transparent 70%)' }} />
            <RetailerAppMockup />
          </div>

        </div>
      </div>
    </section>
  );
}
