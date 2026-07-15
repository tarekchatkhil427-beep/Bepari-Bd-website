import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { retailerSteps, wholesalerSteps } from '../../data/steps';
import SectionHeading from '../ui/SectionHeading';
import AppDownloadButtons from '../ui/AppDownloadButtons';
import Button from '../ui/Button';

export default function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState('retailer');
  const navigate = useNavigate();

  const steps = activeTab === 'retailer' ? retailerSteps : wholesalerSteps;

  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <SectionHeading 
          title="কীভাবে কাজ করে?" 
          subtitle="বেপারি-বিডি এর সাথে যুক্ত হওয়া একদম সহজ" 
          align="center"
        />

        {/* TAB SWITCHER */}
        <div className="flex justify-center mt-10 mb-12">
          <div className="flex bg-gray-50 p-1.5 rounded-full border border-gray-100 shadow-inner">
            {['retailer', 'wholesaler'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-8 md:px-12 py-3 rounded-full text-base font-bangla font-semibold transition-colors ${
                  activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-navy'
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="howItWorksTab"
                    className="absolute inset-0 bg-green rounded-full shadow-sm"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {tab === 'retailer' ? 'রিটেইলার (Retailer)' : 'পাইকার (Wholesaler)'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* STEP FLOW */}
        <div className="relative min-h-[480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 md:space-y-8"
            >
              {steps.map((step, index) => (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex"
                >
                  {/* Timeline Left Column */}
                  <div className="flex flex-col items-center mr-6">
                    <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center text-green font-bold text-lg font-sans z-10 border border-green/20">
                      {index + 1}
                    </div>
                    {/* Connector line */}
                    {index !== steps.length - 1 && (
                      <div className="w-0.5 h-full border-l-2 border-dashed border-green/30 mt-2"></div>
                    )}
                  </div>
                  
                  {/* Content Column */}
                  <div className="pb-8 pt-1 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 bg-offwhite p-5 md:p-6 rounded-2xl border border-gray-100 hover:shadow-soft transition-shadow">
                      <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center text-3xl flex-shrink-0 shadow-sm border border-gold/20">
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="font-bangla font-semibold text-navy text-lg md:text-xl mb-2">{step.title}</h3>
                        <p className="font-bangla text-gray-500 text-sm md:text-base leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Bottom CTA */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center pt-2 md:pl-16"
              >
                {activeTab === 'retailer' ? (
                  <div className="flex flex-col items-center md:items-start w-full sm:w-auto bg-green/5 p-6 rounded-3xl border border-green/10">
                    <p className="font-bangla font-semibold text-navy mb-4">অ্যাপ ডাউনলোড করে শুরু করুন</p>
                    <AppDownloadButtons layout="row" size="md" />
                  </div>
                ) : (
                  <Button 
                    variant="gold" 
                    size="xl"
                    className="w-full sm:w-auto shadow-float"
                    onClick={() => navigate('/wholesalers')}
                  >
                    পাইকার হিসেবে নিবন্ধন করুন <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                )}
              </motion.div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
