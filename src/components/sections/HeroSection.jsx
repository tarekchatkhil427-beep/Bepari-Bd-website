import { useState, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Store, CheckCircle, Star } from 'lucide-react';
import AppDownloadButtons from '../ui/AppDownloadButtons';
import CountUpNumber from '../ui/CountUpNumber';

// --- AURORA BACKGROUND ---
const AuroraBackground = () => {
  const prefersReduced = useReducedMotion();
  const stillAnim = prefersReduced ? {} : { scale: [1, 1.1, 1], x: [0, 10, 0] };
  const stillTrans = prefersReduced ? { duration: 0 } : { duration: 14, repeat: Infinity, ease: 'easeInOut' };
  return (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-[#f5f7ff] via-[#f0f9f4] to-[#fdfaf0]" />
    <motion.div
      animate={stillAnim}
      transition={stillTrans}
      className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(0,106,78,0.08) 0%, transparent 70%)' }}
    />
    <div
      className="absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }}
    />
  </div>
  );
};

// --- PHONE MOCKUP ---
const PhoneMockup = () => {
  const prefersReduced = useReducedMotion();
  const badgeAnim = prefersReduced ? {} : { y: [0, -8, 0] };
  const badgeTrans = prefersReduced ? { duration: 0 } : { duration: 3, repeat: Infinity, ease: 'easeInOut' };
  const ratingAnim = prefersReduced ? {} : { y: [0, 8, 0] };
  const ratingTrans = prefersReduced ? { duration: 0 } : { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 };
  return (
  <motion.div
    initial={{ opacity: 0, y: 40, rotate: -3 }}
    animate={{ opacity: 1, y: 0, rotate: -3 }}
    transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
    className="relative w-[220px] md:w-[260px]"
  >
    {/* Glow behind phone */}
    <div className="absolute inset-0 -m-6 rounded-[3rem] blur-3xl opacity-40"
      style={{ background: 'linear-gradient(135deg, rgba(0,106,78,0.4), rgba(212,168,67,0.3))' }}
    />
    {/* Phone frame */}
    <div className="relative rounded-[2.5rem] bg-gray-900 shadow-2xl overflow-hidden border-4 border-gray-800"
      style={{ aspectRatio: '9/19' }}>
      {/* Status bar */}
      <div className="h-8 bg-gray-900 flex items-center justify-center">
        <div className="w-20 h-4 bg-gray-800 rounded-full" />
      </div>
      {/* App screen */}
      <div className="flex-1 h-full bg-white overflow-hidden">
        {/* App header */}
        <div className="bg-[#006a4e] px-3 py-3 flex items-center justify-between">
          <div>
            <p className="font-sans text-white/70 text-[8px]">বেপারি-বিডি</p>
            <p className="font-sans text-white font-bold text-[11px]">পাইকারি মার্কেট</p>
          </div>
          <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-4 h-4 text-white" />
          </div>
        </div>
        {/* Search bar */}
        <div className="px-3 py-2">
          <div className="bg-gray-100 rounded-full px-3 py-1.5 text-[9px] text-gray-400 font-sans">পণ্য খুঁজুন...</div>
        </div>
        {/* Category pills */}
        <div className="flex gap-1.5 px-3 pb-2 overflow-hidden">
          {['কাপড়', 'ইলেকট্রনিক্স', 'মশলা'].map((c, i) => (
            <div key={i} className={`px-2 py-0.5 rounded-full text-[8px] font-sans whitespace-nowrap ${i === 0 ? 'bg-[#006a4e] text-white' : 'bg-gray-100 text-gray-600'}`}>{c}</div>
          ))}
        </div>
        {/* Product cards */}
        <div className="px-3 grid grid-cols-2 gap-2">
          {[
            { emoji: '👔', name: 'এক্সক্লুসিভ শার্ট', price: '৳৪৫০', badge: 'bg-green-100 text-green-700' },
            { emoji: '👗', name: 'থ্রি-পিস সেট', price: '৳৮৫০', badge: 'bg-yellow-100 text-yellow-700' },
            { emoji: '💄', name: 'কসমেটিক্স', price: '৳২২০', badge: 'bg-pink-100 text-pink-700' },
            { emoji: '📱', name: 'গ্যাজেটস', price: '৳১২০০', badge: 'bg-blue-100 text-blue-700' },
          ].map((p, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-1.5 border border-gray-100">
              <div className="h-10 bg-white rounded-lg flex items-center justify-center text-lg mb-1">{p.emoji}</div>
              <p className="font-sans text-[8px] text-gray-700 font-semibold leading-tight">{p.name}</p>
              <p className="font-sans text-[9px] text-[#006a4e] font-bold mt-0.5">{p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    {/* Floating notification badge */}
    <motion.div
      animate={badgeAnim}
      transition={badgeTrans}
      className="absolute -right-10 top-16 bg-white rounded-2xl shadow-xl px-3 py-2 border border-gray-100 min-w-[130px]"
    >
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
          <CheckCircle className="w-4 h-4 text-[#006a4e]" />
        </div>
        <div>
          <p className="font-sans text-[9px] font-bold text-gray-800">অর্ডার কনফার্ম!</p>
          <p className="font-sans text-[8px] text-gray-500">৳১২,৫০০ · ২৩টি পণ্য</p>
        </div>
      </div>
    </motion.div>
    {/* Floating rating badge */}
    <motion.div
      animate={ratingAnim}
      transition={ratingTrans}
      className="absolute -left-10 bottom-24 bg-white rounded-2xl shadow-xl px-3 py-2 border border-gray-100"
    >
      <div className="flex items-center gap-1.5">
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        <div>
          <p className="font-sans text-[10px] font-bold text-gray-800">4.9 রেটিং</p>
          <p className="font-sans text-[8px] text-gray-500">৩,০০০+ পণ্য</p>
        </div>
      </div>
    </motion.div>
  </motion.div>
  );
};

// --- STATS ROW ---
const StatsRow = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.8 }}
    className="flex items-stretch bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100/80 divide-x divide-gray-100 overflow-hidden"
  >
    {[
      { label: 'পণ্য', value: '3000', suffix: '+' },
      { label: 'পাইকার', value: '50', suffix: '+' },
      { label: 'জেলা', value: '64', suffix: 'টি' },
    ].map((s, i) => (
      <div key={i} className="flex-1 text-center px-4 py-3">
        <div className="font-sans font-bold text-xl text-[#006a4e]">
          <CountUpNumber to={s.value} suffix={s.suffix} />
        </div>
        <p className="font-bangla text-gray-500 text-xs mt-0.5">{s.label}</p>
      </div>
    ))}
  </motion.div>
);

// --- MAIN HERO ---
export default function HeroSection({ onLearnMoreClick }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  };

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center py-20 md:py-16 px-4 overflow-hidden">
      <AuroraBackground />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT COLUMN: Copy & CTAs ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Live badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-[#006a4e]/8 border border-[#006a4e]/20 rounded-full px-4 py-1.5 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006a4e] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#006a4e]" />
              </span>
              <span className="font-bangla text-[#006a4e] text-sm font-semibold">
                বাংলাদেশের প্রথম স্মার্ট পাইকারি মার্কেটপ্লেস
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants} className="mb-6">
              <h1 className="font-bangla text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-[1.2]">
                Bepari-Bd —{' '}
                <span
                  className="inline-block"
                  style={{
                    background: 'linear-gradient(135deg, #006a4e 0%, #d4a843 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  অনলাইন পাইকারি বাজার
                </span>
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.p variants={itemVariants} className="font-bangla text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed mb-8">
              পুরান ঢাকার পাইকারি মোকাম এখন আপনার হাতের মুঠোয়।
              ৬৪ জেলায় নিরাপদ পাইকারি ব্যবসা — <strong className="text-gray-800">একটিমাত্র অ্যাপে।</strong>
            </motion.p>

            {/* App Download Buttons — DOMINANT CTA */}
            <motion.div variants={itemVariants} className="mb-6 w-full">
              <p className="font-bangla text-sm text-gray-500 mb-3 lg:text-left text-center">অ্যাপটি এখনই ডাউনলোড করুন</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <AppDownloadButtons layout="row" size="lg" />
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="w-full max-w-sm">
              <StatsRow />
            </motion.div>

            {/* Audience links */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 mt-6 w-full max-w-sm">
              <Link
                to="/retailers"
                className="cursor-pointer group flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-white/80 hover:border-[#006a4e]/40 hover:bg-[#006a4e]/5 transition-all duration-200 shadow-sm"
              >
                <Store className="w-4 h-4 text-[#006a4e]" />
                <span className="font-bangla text-sm font-semibold text-gray-700 group-hover:text-[#006a4e]">আমি রিটেইলার</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/wholesalers"
                className="cursor-pointer group flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-white/80 hover:border-[#d4a843]/40 hover:bg-[#d4a843]/5 transition-all duration-200 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4 text-[#d4a843]" />
                <span className="font-bangla text-sm font-semibold text-gray-700 group-hover:text-[#d4a843]">আমি পাইকার</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN: Phone Mockup ── */}
          <div className="hidden lg:flex items-center justify-center relative">
            {/* Large decorative ring */}
            <div className="absolute w-[380px] h-[380px] rounded-full border border-dashed border-[#006a4e]/15 animate-spin" style={{ animationDuration: '25s' }} />
            <div className="absolute w-[480px] h-[480px] rounded-full border border-[#d4a843]/10" />
            <PhoneMockup />
          </div>

        </div>

        {/* ── TRUST BADGES STRIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-12 lg:mt-16 flex flex-wrap justify-center gap-3"
        >
          {[
            { icon: <CheckCircle className="w-4 h-4 text-[#006a4e]" />, text: 'যাচাইকৃত পাইকার' },
            { icon: <CheckCircle className="w-4 h-4 text-[#006a4e]" />, text: 'দোরগোড়ায় ডেলিভারি' },
            { icon: <CheckCircle className="w-4 h-4 text-[#006a4e]" />, text: 'ক্যাশ অন ডেলিভারি' },
            { icon: <CheckCircle className="w-4 h-4 text-[#006a4e]" />, text: 'নিরাপদ পেমেন্ট' },
          ].map((b, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-gray-100 rounded-full px-4 py-2 shadow-sm"
            >
              {b.icon}
              <span className="font-bangla text-sm text-gray-700 font-medium">{b.text}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
