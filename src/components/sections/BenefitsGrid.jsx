import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

export default function BenefitsGrid({ benefits, accentColor = 'green' }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const bgColors = ['bg-green/10 text-green', 'bg-gold/10 text-gold', 'bg-red/10 text-red'];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-offwhite">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          title="কেন বেপারি-বিডি বেছে নেবেন?" 
          align="center"
        />

        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
          {benefits.map((benefit, index) => {
            const bgClass = bgColors[index % bgColors.length];
            return (
              <motion.div 
                key={benefit.id} 
                variants={itemVariants}
                className="bg-white rounded-[2rem] p-6 md:p-8 shadow-soft hover:shadow-card transition-shadow flex flex-col border border-gray-100/50"
              >
                <div className={`w-16 h-16 rounded-full ${bgClass} flex items-center justify-center text-3xl mb-5 border border-white/50`}>
                  {benefit.icon}
                </div>
                <h3 className="font-bangla font-bold text-navy text-xl mb-3">{benefit.title}</h3>
                <p className="font-bangla text-gray-500 text-[15px] leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
