import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AppDownloadButtons from '../ui/AppDownloadButtons';
import WhatsAppButton from '../ui/WhatsAppButton';

export default function AppDownloadSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-12 md:py-24 px-4 max-w-7xl mx-auto">
      <motion.div 
        ref={ref}
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 30 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative bg-gradient-to-br from-green to-navy rounded-[2rem] py-16 px-6 text-center text-white shadow-float overflow-hidden"
      >
        {/* Diagonal stripes pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none" 
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.5) 10px, rgba(255,255,255,0.5) 20px)' }}
        ></div>

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <div className="bg-gold/20 border border-gold/40 text-gold px-5 py-2 rounded-full font-bangla text-sm font-semibold mb-6 flex items-center shadow-sm backdrop-blur-sm">
            <span className="mr-2 text-lg">📱</span> অ্যাপটি ডাউনলোড করুন
          </div>
          
          <h2 className="font-bangla text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            আজই শুরু করুন!
          </h2>
          
          <p className="font-bangla text-green-100 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            হাজারো দোকানদার ইতিমধ্যে বেপারি-বিডি ব্যবহার করে তাদের ব্যবসার খরচ বাঁচাচ্ছেন।
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-white font-bangla font-semibold mb-12 text-sm md:text-base bg-white/10 px-8 py-3 rounded-full backdrop-blur-md border border-white/10">
            <span>৩৪৫+ পণ্য</span>
            <span className="text-gold text-2xl leading-none px-1">•</span>
            <span>৫০+ পাইকার</span>
            <span className="text-gold text-2xl leading-none px-1">•</span>
            <span>৪টি জেলা</span>
          </div>

          <div className="flex flex-col items-center gap-8 w-full">
            <AppDownloadButtons layout="row" size="lg" />
            
            <div className="flex flex-col items-center mt-2">
              <span className="font-bangla text-green-100/60 text-sm mb-4">অথবা যেকোনো প্রয়োজনে</span>
              <div className="bg-white/10 p-1.5 rounded-full backdrop-blur-md">
                <WhatsAppButton text="হোয়াটসঅ্যাপে যোগাযোগ করুন" size="md" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
