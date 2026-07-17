import { useEffect, useRef, useState } from 'react';
import { PageLayout } from '../components/shared';
import { motion, useInView } from 'framer-motion';
import Button from '../components/ui/Button';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import BenefitsGrid from '../components/sections/BenefitsGrid';
import WholesalerRegistrationForm from '../components/sections/WholesalerRegistrationForm';
import FAQAccordion from '../components/ui/FAQAccordion';
import AppDownloadButtons from '../components/ui/AppDownloadButtons';
import CountUpNumber from '../components/ui/CountUpNumber';
import { wholesalerBenefits } from '../data/benefits';
import { faqsData } from '../data/faqs';
import { Smartphone, PackageCheck, ShieldCheck, TrendingUp, BellRing, Check, BarChart3, Users, Store, Star, ArrowUpRight } from 'lucide-react';

// ─── WHOLESALER HERO COMPONENT ──────────────────────────────────────────────

const WholesalerAurora = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-[#fffdf5] via-[#f5f7ff] to-[#f2fbf7]" />
    <motion.div
      animate={{ scale: [1, 1.1, 1], x: [0, 15, 0] }}
      transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -top-40 -right-20 w-[600px] h-[600px] rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(212,168,67,0.09) 0%, transparent 70%)' }}
    />
    <motion.div
      animate={{ scale: [1, 1.15, 1], y: [0, -15, 0] }}
      transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(0,106,78,0.06) 0%, transparent 70%)' }}
    />
    <div
      className="absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.4) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
      }}
    />
  </div>
);

const SellerDashboardMockup = () => (
  <motion.div
    initial={{ opacity: 0, x: -40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
    className="relative"
  >
    <div
      className="absolute inset-0 -m-8 rounded-[4rem] blur-3xl opacity-25"
      style={{ background: 'linear-gradient(135deg, rgba(212,168,67,0.6), rgba(0,106,78,0.3))' }}
    />
    <div className="relative w-[210px] md:w-[240px] mx-auto" style={{ transform: 'rotate(-2deg)' }}>
      <div className="rounded-[2.5rem] bg-gray-900 shadow-2xl border-4 border-gray-800 overflow-hidden" style={{ aspectRatio: '9/19' }}>
        <div className="h-7 bg-gray-900 flex items-center justify-center">
          <div className="w-16 h-3 bg-gray-800 rounded-full" />
        </div>
        <div className="h-full bg-[#0f172a]">
          {/* Dark header */}
          <div className="px-3 py-2.5 border-b border-white/10">
            <p className="font-sans text-white/50 text-[7px]">পাইকার ড্যাশবোর্ড</p>
            <p className="font-sans text-white font-bold text-[10px]">খাতুনগঞ্জ মোকাম</p>
          </div>
          {/* Revenue card */}
          <div className="mx-2 mt-2 bg-gradient-to-br from-[#d4a843] to-[#c49b3c] rounded-xl p-2.5">
            <p className="font-sans text-white/70 text-[7px]">আজকের আয়</p>
            <p className="font-sans text-white font-bold text-[15px]">৳ ৪৮,৫০০</p>
            <div className="flex items-center gap-1 mt-0.5">
              <ArrowUpRight className="w-3 h-3 text-white/80" />
              <span className="font-sans text-white/80 text-[7px]">গতকালের চেয়ে ১২% বেশি</span>
            </div>
          </div>
          {/* Mini stats */}
          <div className="mx-2 mt-1.5 grid grid-cols-2 gap-1.5">
            {[
              { icon: <Users className="w-3 h-3 text-blue-400" />, label: 'ক্রেতা', val: '২৩ জন', bg: 'bg-blue-500/10' },
              { icon: <PackageCheck className="w-3 h-3 text-green-400" />, label: 'অর্ডার', val: '৪৭টি', bg: 'bg-green-500/10' },
            ].map((s, i) => (
              <div key={i} className={`${s.bg} rounded-lg p-1.5`}>
                <div className="flex items-center gap-1 mb-0.5">{s.icon}<span className="font-sans text-[7px] text-white/50">{s.label}</span></div>
                <p className="font-sans text-white font-bold text-[10px]">{s.val}</p>
              </div>
            ))}
          </div>
          {/* Recent orders */}
          <div className="mx-2 mt-1.5">
            <p className="font-sans text-white/40 text-[7px] mb-1">সাম্প্রতিক অর্ডার</p>
            {[
              { id: '#4821', amount: '৳৮,২০০', status: 'নতুন', color: 'text-yellow-400' },
              { id: '#4820', amount: '৳১২,৫০০', status: 'ডেলিভারি', color: 'text-green-400' },
            ].map((o, i) => (
              <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg px-2 py-1 mb-1">
                <span className="font-sans text-white/60 text-[8px]">{o.id}</span>
                <span className="font-sans text-white font-bold text-[8px]">{o.amount}</span>
                <span className={`font-sans text-[7px] font-semibold ${o.color}`}>{o.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Floating: new order */}
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -left-8 md:-left-14 top-16 bg-white rounded-2xl shadow-xl px-3 py-2 border border-gray-100"
    >
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-yellow-50 rounded-full flex items-center justify-center flex-shrink-0">
          <BellRing className="w-4 h-4 text-yellow-500" />
        </div>
        <div>
          <p className="font-sans text-[9px] font-bold text-gray-800">নতুন অর্ডার!</p>
          <p className="font-sans text-[8px] text-gray-500">৳১২,৫০০ · ২৩টি পণ্য</p>
        </div>
      </div>
    </motion.div>

    {/* Floating: network */}
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      className="absolute -right-8 md:-right-14 bottom-24 bg-white rounded-2xl shadow-xl px-3 py-2 border border-gray-100"
    >
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
          <Store className="w-4 h-4 text-[#006a4e]" />
        </div>
        <div>
          <p className="font-sans text-[9px] font-bold text-gray-800">নেটওয়ার্ক</p>
          <p className="font-sans text-[8px] text-[#006a4e]">৫০+ সক্রিয় ক্রেতা</p>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

function WholesalerHero({ onScrollToRegister }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-28 md:pb-24 px-4 overflow-hidden">
      <WholesalerAurora />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LEFT: Mockup (reversed on desktop) ── */}
          <div className="hidden lg:flex items-center justify-center relative order-2 lg:order-1">
            <div className="absolute w-[320px] h-[320px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(212,168,67,0.1) 0%, transparent 70%)' }} />
            <SellerDashboardMockup />
          </div>

          {/* ── RIGHT: Text & CTAs ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 border border-[#d4a843]/30 bg-[#d4a843]/8 rounded-full px-4 py-1.5 mb-5">
              <BarChart3 className="w-4 h-4 text-[#d4a843]" />
              <span className="font-bangla text-[#b8922e] text-sm font-semibold">পাইকারদের জন্য বিশেষ সুযোগ</span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants} className="mb-5">
              <h1 className="font-bangla text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.25]">
                দোকানের পাশাপাশি —{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #d4a843 0%, #006a4e 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  সারা বাংলাদেশে পাইকারি ব্যবসা
                </span>
              </h1>
            </motion.div>

            {/* Animated subtitle */}
            <motion.p
              variants={itemVariants}
              className="font-bangla text-lg md:text-xl font-semibold mb-2 max-w-xl"
              style={{
                background: 'linear-gradient(90deg, #555 0%, #006a4e 50%, #555 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmer 3s linear infinite',
              }}
            >
              একটি অ্যাপ। এক বা একাধিক মোকাম। সারা বাংলাদেশে ব্যবসার সুযোগ।
            </motion.p>

            <motion.p variants={itemVariants} className="font-bangla text-base text-gray-600 max-w-lg leading-relaxed mb-7">
              আপনার পাইকারি মোকামকে ডিজিটাল করুন। দেশের হাজারো রিটেইলারের কাছে আপনার পণ্য পৌঁছে দিন —
              <strong className="text-gray-800"> কোনো যাতায়াত ছাড়াই।</strong>
            </motion.p>

            {/* Growth stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-2.5 mb-7 w-full max-w-sm">
              {[
                { icon: <Users className="w-4 h-4 text-[#006a4e]" />, val: '50', sfx: '+', label: 'সক্রিয় পাইকার' },
                { icon: <Store className="w-4 h-4 text-[#d4a843]" />, val: '64', sfx: 'টি', label: 'জেলা' },
                { icon: <Star className="w-4 h-4 text-yellow-500 fill-yellow-500' fill-yellow-500" />, val: '4', sfx: '.9', label: 'রেটিং' },
              ].map((s, i) => (
                <div key={i} className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl px-3 py-3 shadow-sm text-center">
                  <div className="flex justify-center mb-1">{s.icon}</div>
                  <div className="font-sans font-bold text-lg text-gray-900">
                    <CountUpNumber to={s.val} suffix={s.sfx} />
                  </div>
                  <p className="font-bangla text-[10px] text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>

            {/* PRIMARY CTA: App download */}
            <motion.div variants={itemVariants} className="w-full mb-4">
              <p className="font-bangla text-sm text-gray-500 mb-2.5 lg:text-left text-center">অ্যাপ ডাউনলোড করে রেজিস্ট্রেশন শুরু করুন</p>
              <div className="flex justify-center lg:justify-start">
                <AppDownloadButtons layout="row" size="lg" />
              </div>
            </motion.div>

            {/* SECONDARY CTA: Register form scroll */}
            <motion.div variants={itemVariants} className="w-full flex justify-center lg:justify-start">
              <button
                onClick={onScrollToRegister}
                className="cursor-pointer group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#d4a843]/40 bg-[#d4a843]/8 hover:bg-[#d4a843]/15 transition-all duration-200 text-[#b8922e] font-bangla font-semibold text-sm"
              >
                <TrendingUp className="w-4 h-4" />
                ওয়েব ফর্মে নিবন্ধন করুন
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── MAIN WHOLESALERS PAGE ───────────────────────────────────────────────────

export default function WholesalersPage() {
  useEffect(() => {
    document.title = "পাইকারদের জন্য | বেপারি-বিডি";
  }, []);

  const scrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      id: 'upload',
      title: 'প্রোডাক্ট আপলোড',
      subtitle: 'আপনার কাজ সামান্য',
      icon: <Smartphone className="w-8 h-8 text-white" />,
      color: 'bg-blue-500',
      description: 'শুধু মোবাইল দিয়ে পণ্যের ছবি তুলুন। বাকি সব করবে আমাদের smart AI powered app। AI নিজেই ছবিকে সুন্দর করবে, কনটেন্ট লিখবে এবং প্রোফেশনাল ডিজাইনারদের মত আকর্ষণীয়ভাবে পণ্য সাজিয়ে দেবে।',
      visual: (
        <div className="w-full h-64 rounded-2xl overflow-hidden shadow-soft border border-gray-100">
          <img src="/Reference/AI_Product_upload.gif" alt="AI Product Upload" className="w-full h-full object-cover" loading="lazy" />
        </div>
      )
    },
    {
      id: 'management',
      title: 'অর্ডার ম্যানেজমেন্ট',
      subtitle: 'মুহূর্তেই আপডেট',
      icon: <BellRing className="w-8 h-8 text-white" />,
      color: 'bg-green',
      description: 'অর্ডার এলেই সঙ্গে সঙ্গে মোবাইলে নোটিফিকেশন পাবেন। ড্যাশবোর্ড থেকে খুব সহজেই ইনভেন্টরি ও অর্ডার স্ট্যাটাস ট্র্যাক করতে পারবেন।',
      visual: (
        <div className="w-full h-64 rounded-2xl overflow-hidden shadow-soft border border-gray-100">
          <img src="/Reference/Order_Management.gif" alt="Order Management" className="w-full h-full object-cover" loading="lazy" />
        </div>
      )
    },
    {
      id: 'delivery',
      title: 'ডেলিভারি',
      subtitle: 'বসে থেকেই পাঠানো',
      icon: <PackageCheck className="w-8 h-8 text-white" />,
      color: 'bg-orange-500',
      description: 'পণ্য প্যাক করুন, অর্ডার নাম্বার লিখুন এবং শুধু "Product is Ready" তে চাপুন। আমাদের কুরিয়ার পার্টনার আপনার দোকান থেকেই পণ্য সংগ্রহ করে রিটেইলারের কাছে পৌঁছে দেবে।',
      visual: (
        <div className="w-full h-64 rounded-2xl overflow-hidden shadow-soft border border-gray-100">
          <img src="/Reference/Product_Pickup.gif" alt="Product Pickup" className="w-full h-full object-cover" loading="lazy" />
        </div>
      )
    },
    {
      id: 'payment',
      title: 'নিরাপদ পেমেন্ট',
      subtitle: '১০০% গ্যারান্টি',
      icon: <ShieldCheck className="w-8 h-8 text-white" />,
      color: 'bg-purple-500',
      description: 'নির্ধারিত অগ্রিম এবং ক্যাশ অন ডেলিভারির মাধ্যমে নিরাপদ লেনদেন। ই-কমার্স পরিচালনার ঝামেলা আমাদের। আপনার মনোযোগ থাকুক ব্যবসা বৃদ্ধিতে।',
      visual: (
        <div className="w-full h-64 rounded-2xl overflow-hidden shadow-soft border border-gray-100">
          <img src="/Reference/Payments.gif" alt="Payments" className="w-full h-full object-cover" loading="lazy" />
        </div>
      )
    },
    {
      id: 'growth',
      title: 'সমাপ্তি',
      subtitle: 'অসীম সম্ভাবনা',
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      color: 'bg-gold',
      description: 'বড় নেটওয়ার্ক। বেশি ক্রেতা। বেশি বিক্রয়। বেশি লাভ। ব্যাপারী-বিডির সাথে যুক্ত হয়ে আপনার পাইকারি ব্যবসাকে নিয়ে যান এক নতুন উচ্চতায়।',
      visual: (
        <div className="w-full h-64 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl border border-yellow-200 flex items-end justify-center px-8 pt-10 pb-4 relative overflow-hidden">
          <div className="w-full flex items-end justify-between gap-3 h-full">
            {[40, 55, 45, 75, 100].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                className="w-full bg-gold rounded-t-md opacity-90 shadow-sm"
              ></motion.div>
            ))}
          </div>
          <TrendingUp className="absolute top-6 right-6 w-12 h-12 text-gold opacity-80" />
        </div>
      )
    }
  ];

  return (
    <PageLayout title="পাইকার">
      <div className="bg-white">
        
        {/* SECTION 1: HERO — Premium Wholesaler */}
        <WholesalerHero onScrollToRegister={scrollToRegister} />

        {/* SECTION 2: BENEFITS GRID */}
        <div id="benefits">
          <BenefitsGrid benefits={wholesalerBenefits} accentColor="gold" />
        </div>

        {/* SECTION 3: PLATFORM FEATURES */}
        <section className="py-16 md:py-24 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-bangla text-3xl md:text-4xl font-bold text-center text-navy mb-16">
              আমাদের প্ল্যাটফর্মের বিশেষত্ব
            </h2>
            
            <div className="space-y-12 md:space-y-24">
              {features.map((feature, idx) => (
                <div key={feature.id} className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16`}>
                  
                  {/* Visual Side */}
                  <div className="flex-1 w-full">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, rotate: idx % 2 === 0 ? -2 : 2 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      className="p-2 bg-white rounded-3xl shadow-soft border border-gray-100"
                    >
                      {feature.visual}
                    </motion.div>
                  </div>

                  {/* Content Side */}
                  <div className="flex-1 text-center md:text-left">
                    <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 mx-auto md:mx-0 shadow-sm`}>
                      {feature.icon}
                    </div>
                    <span className="font-bangla font-semibold text-green text-sm uppercase tracking-wider mb-2 block">
                      {feature.subtitle}
                    </span>
                    <h3 className="font-bangla font-bold text-navy text-2xl md:text-3xl mb-4">
                      {feature.title}
                    </h3>
                    <p className="font-bangla text-gray-600 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: REGISTRATION FORM */}
        <section className="py-20 md:py-32 px-4 bg-offwhite relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green rounded-full filter blur-[150px] opacity-[0.04] pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="max-w-4xl mx-auto relative z-10 text-center mb-12">
            <h2 className="font-bangla text-3xl md:text-4xl font-bold text-navy mb-4">
              আপনার ব্যবসাকে পরবর্তী ধাপে নিয়ে যান
            </h2>
            <p className="font-bangla text-gray-500 text-lg">নিচের ফর্মটি পূরণ করুন, আমাদের টিম আপনার সাথে যোগাযোগ করবে।</p>
          </div>
          
          <div className="relative z-10">
            <WholesalerRegistrationForm />
          </div>
        </section>

        {/* SECTION 6: FAQ */}
        <FAQAccordion faqs={faqsData.wholesalers} title="পাইকারদের সাধারণ জিজ্ঞাসা" />

        {/* SECTION 7: WHATSAPP DIRECT CTA */}
        <section className="py-16 md:py-20 px-4 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto text-center bg-gray-50 rounded-[2.5rem] p-8 md:p-12 border border-gray-200 shadow-sm">
            <h2 className="font-bangla text-2xl md:text-3xl font-bold text-navy mb-4">
              দ্রুত যোগাযোগের জন্য
            </h2>
            <p className="font-bangla text-gray-600 mb-8 max-w-lg mx-auto">
              যেকোনো প্রশ্ন বা জিজ্ঞাসা থাকলে সরাসরি আমাদের সাপোর্ট টিমের সাথে হোয়াটসঅ্যাপে কথা বলুন।
            </p>
            
            <div className="flex flex-col items-center justify-center gap-6">
              <WhatsAppButton 
                text="হোয়াটসঅ্যাপে যোগাযোগ করুন" 
                size="xl" 
                className="shadow-md"
              />
              <div className="font-sans font-semibold text-gray-500 flex items-center">
                অথবা কল করুন: <a href="tel:+8801234567890" className="text-navy ml-2 hover:text-green transition-colors">+880 1234 567 890</a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}
