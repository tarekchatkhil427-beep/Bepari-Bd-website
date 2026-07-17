import { useEffect, useRef } from 'react';
import { useUIStore } from '../store/useUIStore';
import { PageLayout } from '../components/shared';
import HeroSection from '../components/sections/HeroSection';
import MarqueeStrip from '../components/sections/MarqueeStrip';
import CategoryGrid from '../components/sections/CategoryGrid';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import AppDownloadSection from '../components/sections/AppDownloadSection';

export default function HomePage() {
  const { showToast } = useUIStore();
  const categoryGridRef = useRef(null);

  useEffect(() => {
    const hasVisited = localStorage.getItem('bepari_visited');
    
    // Slight delay so toast slides in nicely after mount
    const timer = setTimeout(() => {
      if (!hasVisited) {
        showToast('👋 স্বাগতম!', 'info');
        localStorage.setItem('bepari_visited', 'true');
      } else {
        showToast('আবার স্বাগতম! নতুন পণ্য এসেছে', 'info');
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [showToast]);

  const scrollToCategories = () => {
    if (categoryGridRef.current) {
      categoryGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <PageLayout title="হোম">
      <div className="space-y-0 flex flex-col w-full bg-white">
        
        <HeroSection onLearnMoreClick={scrollToCategories} />
        
        <MarqueeStrip />
        
        <div ref={categoryGridRef} className="scroll-mt-16 md:scroll-mt-[72px] bg-offwhite">
          <CategoryGrid />
        </div>
        
        <HowItWorksSection />
        
        <TestimonialsSection />
        
        <div className="pb-16 bg-offwhite">
          <AppDownloadSection />
        </div>
        
      </div>
    </PageLayout>
  );
}
