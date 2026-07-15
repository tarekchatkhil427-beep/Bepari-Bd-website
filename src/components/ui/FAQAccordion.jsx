import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionHeading from './SectionHeading';

export default function FAQAccordion({ faqs, title = "সাধারণ প্রশ্নোত্তর" }) {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-offwhite">
      <div className="max-w-3xl mx-auto">
        <SectionHeading title={title} align="center" />
        
        <div className="mt-10">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-2xl mb-3 shadow-soft overflow-hidden border border-gray-100">
              <button
                onClick={() => toggle(faq.id)}
                className="w-full px-5 py-4 md:px-6 md:py-5 flex justify-between items-center text-left bg-white focus:outline-none"
              >
                <span className="font-bangla font-semibold text-navy text-base md:text-lg pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-green flex-shrink-0" />
                </motion.div>
              </button>
              
              <AnimatePresence initial={false}>
                {openId === faq.id && (
                  <motion.div
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-5 pb-4 md:px-6 md:pb-5 font-bangla text-gray-600 text-sm md:text-[15px] leading-relaxed border-t border-gray-50 pt-3">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
