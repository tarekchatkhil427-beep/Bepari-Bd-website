import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowDown, MapPin, Mail, Phone, ExternalLink, ShieldCheck, HeartHandshake, Lightbulb, BadgeCheck } from 'lucide-react';
import { PageLayout } from '../components/shared';

export default function AboutPage() {
  useEffect(() => {
    document.title = "আমাদের সম্পর্কে | বেপারি-বিডি";
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const problems = [
    { 
      p: "দোকানদারদের ঢাকায় গিয়ে মাল কেনার যাতায়াত খরচ ও সময়ের অপচয়।", 
      s: "দোকানে বসেই অ্যাপের মাধ্যমে ঢাকার মোকামের পণ্য অর্ডারের সুবিধা।" 
    },
    { 
      p: "সঠিক ও বিশ্বস্ত হোলসেলার খুঁজে না পাওয়া এবং নকল পণ্যের ভয়।", 
      s: "১০০% ভেরিফাইড হোলসেলার এবং কোয়ালিটি চেকের পর পণ্য ডেলিভারি।" 
    },
    { 
      p: "হোলসেলারদের মফস্বলে নতুন ক্রেতা খুঁজে পাওয়ার চ্যালেঞ্জ।", 
      s: "সারা বাংলাদেশের প্রত্যন্ত অঞ্চলের রিটেইলারদের সাথে সরাসরি সংযোগ।" 
    }
  ];

  const diffs = [
    { title: "প্রথম যাচাইকৃত B2B মার্কেটপ্লেস", desc: "নন-এফএমসিজি (টেক্সটাইল, কসমেটিক্স, জুতা) বিভাগে বাংলাদেশের প্রথম পূর্ণাঙ্গ প্ল্যাটফর্ম।" },
    { title: "পুরান ঢাকার ডিজিটাল সংযোগ", desc: "চকবাজার, ইসলামপুর বা খাতুনগঞ্জের মতো বড় মোকামগুলোকে আমরা ডিজিটাল করেছি।" },
    { title: "উপজেলা পর্যায়ে ডেলিভারি নেটওয়ার্ক", desc: "শুধুমাত্র বড় শহর নয়, আমাদের নেটওয়ার্ক পৌঁছে গেছে প্রত্যন্ত উপজেলার দোকানে।" }
  ];

  const nextGenProducts = [
    { icon: '📦', name: 'NextGen Inventory', desc: 'স্মার্ট ইনভেন্টরি ও সেলস ম্যানেজমেন্ট' },
    { icon: '💊', name: 'NextGen Pharmacy', desc: 'ফার্মেসির সম্পূর্ণ ডিজিটাল সমাধান' },
    { icon: '🏥', name: 'NextGen Hospital', desc: 'হাসপাতাল ম্যানেজমেন্ট সফটওয়্যার' },
    { icon: '👨‍⚕️', name: 'Amar Doctor', desc: 'টেলিমেডিসিন ও ডক্টর অ্যাপয়েন্টমেন্ট' },
    { icon: '🛒', name: 'Bepari-BD', desc: 'প্রথম ভেরিফাইড B2B মার্কেটপ্লেস', highlight: true }
  ];

  const values = [
    { icon: <ShieldCheck className="w-10 h-10 text-green" />, name: 'বিশ্বাস (Trust)', desc: 'আমরা আমাদের পার্টনারদের সাথে দীর্ঘমেয়াদী ও বিশ্বস্ত সম্পর্ক গড়ায় বিশ্বাসী।' },
    { icon: <BadgeCheck className="w-10 h-10 text-green" />, name: 'গুণমান (Quality)', desc: 'পণ্যের মান ও সেবার ক্ষেত্রে আমরা কোনো আপস করি না।' },
    { icon: <HeartHandshake className="w-10 h-10 text-green" />, name: 'সততা (Integrity)', desc: 'আমাদের প্রতিটি লেনদেন সম্পূর্ণ স্বচ্ছ এবং সততার সাথে পরিচালিত হয়।' },
    { icon: <Lightbulb className="w-10 h-10 text-green" />, name: 'উদ্ভাবন (Innovation)', desc: 'প্রযুক্তির মাধ্যমে ব্যবসাকে সহজ করতে আমরা নিরলসভাবে নতুন সমাধান তৈরি করছি।' }
  ];

  return (
    <PageLayout title="আমাদের সম্পর্কে">
      <div className="bg-white">
        
        {/* SECTION 1: HERO */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 overflow-hidden bg-white">
          <div className="absolute top-10 left-10 w-64 h-64 border border-gray-100 rounded-full opacity-50 pointer-events-none"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 border border-gray-100 rounded-full opacity-50 pointer-events-none"></div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
            <motion.div initial="hidden" animate="visible" variants={itemVariants} className="flex items-center space-x-2 text-sm text-gray-400 font-bangla mb-6">
              <Link to="/" className="hover:text-green transition-colors">হোম</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-600 font-medium">আমাদের সম্পর্কে</span>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={itemVariants} className="bg-green/5 border border-green/10 text-green px-5 py-2 rounded-full font-bangla text-sm font-semibold mb-6">
              🏢 আমাদের গল্প
            </motion.div>

            <motion.h1 initial="hidden" animate="visible" variants={itemVariants} className="font-bangla text-3xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight md:leading-tight mb-6">
              বাংলাদেশের ক্ষুদ্র ব্যবসায়ীদের <br className="hidden md:block"/> <span className="text-green">ডিজিটাল সমাধান</span>
            </motion.h1>

            <motion.p initial="hidden" animate="visible" variants={itemVariants} className="font-bangla text-gray-500 text-lg md:text-xl max-w-2xl leading-relaxed">
              বেপারি-বিডি কীভাবে শুরু হলো এবং কেন আমরা এটি তৈরি করেছি — আমাদের পথচলার গল্প।
            </motion.p>
          </div>
        </section>

        {/* SECTION 2: MISSION & VISION */}
        <section className="py-12 md:py-20 px-4 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-green text-white rounded-[2rem] p-8 md:p-12 shadow-soft relative overflow-hidden"
            >
              <div className="absolute -right-10 -bottom-10 text-9xl opacity-10">🎯</div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-4xl mb-6 backdrop-blur-sm">
                🎯
              </div>
              <h2 className="font-bangla text-3xl font-bold mb-4">আমাদের লক্ষ্য</h2>
              <p className="font-bangla text-green-50 text-lg leading-relaxed">
                বাংলাদেশের মফস্বল শহরের ক্ষুদ্র ব্যবসায়ীদের সাথে রাজধানী ও প্রধান মোকামের পাইকারদের একটি ডিজিটাল, স্বচ্ছ ও সাশ্রয়ী সেতুবন্ধন তৈরি করা। আমরা চাই প্রতিটি রিটেইলার যেন ঢাকা না গিয়েই তার দোকানে বসে নিরাপদে ও সঠিক মূল্যে পণ্য কিনতে পারেন।
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-navy text-white rounded-[2rem] p-8 md:p-12 shadow-soft relative overflow-hidden"
            >
              <div className="absolute -right-10 -bottom-10 text-9xl opacity-10">🚀</div>
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-4xl mb-6 backdrop-blur-sm">
                🚀
              </div>
              <h2 className="font-bangla text-3xl font-bold mb-4">আমাদের দৃষ্টিভঙ্গি</h2>
              <p className="font-bangla text-gray-300 text-lg leading-relaxed">
                বাংলাদেশের সর্ববৃহৎ ও সবচেয়ে বিশ্বস্ত B2B ডিজিটাল ডিস্ট্রিবিউশন নেটওয়ার্ক গড়ে তোলা। যেখানে প্রযুক্তি ব্যবহার করে ট্র্যাডিশনাল পাইকারি ব্যবসার সকল জটিলতা দূর হবে এবং সারা দেশের সাপ্লাই চেইনে এক যুগান্তকারী পরিবর্তন আসবে।
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: THE PROBLEM WE SOLVE */}
        <section className="py-16 md:py-24 px-4 bg-offwhite">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-bangla text-3xl md:text-4xl font-bold text-center text-navy mb-16">
              আমরা কোন সমস্যার সমাধান করছি?
            </h2>
            
            <div className="space-y-10">
              {problems.map((item, idx) => (
                <div key={idx} className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                  {/* Problem */}
                  <div className="flex-1 bg-red-50/50 border border-red-100 rounded-3xl p-6 md:p-8 w-full shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 text-xl">❌</div>
                      <p className="font-bangla text-navy font-semibold text-lg leading-relaxed pt-1">{item.p}</p>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="hidden md:flex text-gray-300">
                    <ChevronRight className="w-10 h-10" />
                  </div>
                  <div className="flex md:hidden text-gray-300 -my-2 z-10 bg-offwhite rounded-full">
                    <ArrowDown className="w-8 h-8" />
                  </div>

                  {/* Solution */}
                  <div className="flex-1 bg-green/5 border border-green/20 rounded-3xl p-6 md:p-8 w-full shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green/20 rounded-full flex items-center justify-center flex-shrink-0 text-xl">✅</div>
                      <p className="font-bangla text-navy font-semibold text-lg leading-relaxed pt-1">{item.s}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: HOW BEPARI-BD IS DIFFERENT */}
        <section className="py-16 md:py-24 px-4 max-w-6xl mx-auto">
          <h2 className="font-bangla text-3xl md:text-4xl font-bold text-center text-navy mb-16">
            বেপারি-বিডি কেন আলাদা?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {diffs.map((diff, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-soft hover:shadow-card transition-shadow"
              >
                <div className="w-14 h-14 bg-gold/10 text-gold rounded-full flex items-center justify-center font-bold text-2xl mb-6">
                  {idx + 1}
                </div>
                <h3 className="font-bangla font-bold text-xl text-navy mb-3">{diff.title}</h3>
                <p className="font-bangla text-gray-600 leading-relaxed">{diff.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>


        {/* SECTION 6: NEXTGEN SOFTWARE ECOSYSTEM */}
        <section className="py-16 md:py-24 px-4 bg-offwhite">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="font-sans font-bold text-green tracking-widest text-sm uppercase mb-2 block">Our Ecosystem</span>
              <h2 className="font-bangla text-3xl md:text-4xl font-bold text-navy">
                আমরা NextGen Software পরিবারের অংশ
              </h2>
            </div>
            
            <div className="flex overflow-x-auto md:grid md:grid-cols-5 gap-4 pb-8 snap-x hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {nextGenProducts.map((prod, idx) => (
                <div 
                  key={idx} 
                  className={`flex-shrink-0 w-64 md:w-auto snap-start bg-white rounded-3xl p-6 border ${
                    prod.highlight ? 'border-gold border-2 shadow-[0_0_20px_rgba(212,168,67,0.15)] relative transform md:-translate-y-4' : 'border-gray-100 shadow-soft opacity-80'
                  } flex flex-col items-center text-center`}
                >
                  {prod.highlight && (
                    <div className="absolute -top-3 bg-gold text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      You Are Here
                    </div>
                  )}
                  <div className="text-5xl mb-4">{prod.icon}</div>
                  <h3 className={`font-sans font-bold text-lg mb-2 ${prod.highlight ? 'text-navy' : 'text-gray-700'}`}>
                    {prod.name}
                  </h3>
                  <p className="font-bangla text-gray-500 text-sm leading-relaxed">{prod.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: VALUES */}
        <section className="py-16 md:py-24 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-bangla text-3xl md:text-4xl font-bold text-center text-navy mb-16">
              আমাদের মূল্যবোধ
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val, idx) => (
                <div key={idx} className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 text-center hover:bg-green/5 transition-colors group">
                  <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                    {val.icon}
                  </div>
                  <h3 className="font-bangla font-bold text-navy text-xl mb-3">{val.name}</h3>
                  <p className="font-bangla text-gray-600 leading-relaxed text-[15px]">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8: CONTACT CTA */}
        <section className="py-16 md:py-24 px-4 bg-offwhite border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-bangla text-3xl md:text-4xl font-bold text-center text-navy mb-12">
              আমাদের সাথে যোগাযোগ করুন
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a href="https://wa.me/8801234567890" target="_blank" rel="noopener noreferrer" className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100 flex flex-col items-center text-center hover:border-green transition-colors group">
                <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="font-bangla font-semibold text-navy text-lg mb-1">হোয়াটসঅ্যাপ</h3>
                <p className="font-sans text-gray-500 font-medium">+880 1234 567 890</p>
              </a>
              
              <a href="mailto:support@bepari-bd.com" className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100 flex flex-col items-center text-center hover:border-navy transition-colors group">
                <div className="w-16 h-16 bg-navy/10 text-navy rounded-full flex items-center justify-center mb-4 group-hover:bg-navy group-hover:text-white transition-colors">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="font-bangla font-semibold text-navy text-lg mb-1">ইমেইল</h3>
                <p className="font-sans text-gray-500 font-medium">support@bepari-bd.com</p>
              </a>
              
              <div className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100 flex flex-col items-center text-center hover:border-gold transition-colors group">
                <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mb-4 group-hover:bg-gold group-hover:text-white transition-colors">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="font-bangla font-semibold text-navy text-lg mb-1">হেড অফিস</h3>
                <p className="font-bangla text-gray-500 font-medium leading-relaxed">মাইজদী কোর্ট, নোয়াখালী<br/>বাংলাদেশ</p>
              </div>
            </div>
          </div>
        </section>
        
      </div>
    </PageLayout>
  );
}
