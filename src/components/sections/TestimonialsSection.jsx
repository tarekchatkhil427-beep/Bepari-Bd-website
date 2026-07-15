import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonialsData } from '../../data/testimonials';
import SectionHeading from '../ui/SectionHeading';
import StarRating from '../ui/StarRating';
import Badge from '../ui/Badge';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-offwhite overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          title="সফল দোকানদারদের অভিজ্ঞতা" 
          subtitle="আমাদের প্ল্যাটফর্ম ব্যবহার করে যারা সফল হয়েছেন" 
          align="center"
        />

        {/* MOBILE CAROUSEL */}
        <div 
          className="md:hidden mt-10 relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden px-1 pb-6 pt-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-card relative border border-gray-100"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-green/5" />
                
                <div className="flex items-center mb-5">
                  <div className="w-14 h-14 rounded-full bg-green/10 text-green flex items-center justify-center font-bold text-xl font-sans border border-green/20">
                    {testimonialsData[currentIndex].avatarInitials}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bangla font-semibold text-navy text-lg leading-tight">
                      {testimonialsData[currentIndex].name}
                    </h4>
                    <p className="font-bangla text-gray-500 text-sm mt-0.5">
                      {testimonialsData[currentIndex].role}
                    </p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <StarRating rating={testimonialsData[currentIndex].rating} size="sm" />
                </div>
                
                <p className="font-bangla text-gray-600 text-base leading-relaxed italic mb-6 min-h-[100px]">
                  "{testimonialsData[currentIndex].text}"
                </p>
                
                <div className="flex justify-between items-center">
                  <Badge variant="green" size="sm">
                    📍 {testimonialsData[currentIndex].district}
                  </Badge>
                  {testimonialsData[currentIndex].userType === 'wholesaler' && (
                    <Badge variant="gold" size="sm">পাইকার</Badge>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonialsData.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'bg-green w-6' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {testimonialsData.slice(0, 6).map((testimonial, idx) => (
            <motion.div 
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white rounded-[2rem] p-8 shadow-soft hover:shadow-card transition-shadow relative group border border-gray-100/50 flex flex-col"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-gray-50 group-hover:text-green/5 transition-colors" />
              
              <div className="flex items-center mb-6 relative z-10">
                <div className="w-16 h-16 rounded-full bg-green/10 text-green flex items-center justify-center font-bold text-2xl font-sans border border-green/20">
                  {testimonial.avatarInitials}
                </div>
                <div className="ml-4">
                  <h4 className="font-bangla font-semibold text-navy text-xl leading-tight">
                    {testimonial.name}
                  </h4>
                  <p className="font-bangla text-gray-500 text-sm mt-1">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              
              <div className="mb-5 relative z-10">
                <StarRating rating={testimonial.rating} size="sm" />
              </div>
              
              <p className="font-bangla text-gray-600 text-base leading-relaxed italic mb-8 flex-grow relative z-10">
                "{testimonial.text}"
              </p>
              
              <div className="flex justify-between items-end mt-auto relative z-10">
                <Badge variant="green" size="sm">
                  📍 {testimonial.district}
                </Badge>
                {testimonial.userType === 'wholesaler' && (
                  <Badge variant="gold" size="sm">পাইকার</Badge>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
