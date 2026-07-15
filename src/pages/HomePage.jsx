import { useEffect, useRef } from 'react';
import { useUIStore } from '../store/useUIStore';
import { useContentStore } from '../store/useContentStore';
import { PageLayout } from '../components/shared';
import HeroSection from '../components/sections/HeroSection';
import MarqueeStrip from '../components/sections/MarqueeStrip';
import CategoryGrid from '../components/sections/CategoryGrid';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import AppDownloadSection from '../components/sections/AppDownloadSection';
import SkeletonLoader from '../components/ui/SkeletonLoader';

export default function HomePage() {
  const { showToast } = useUIStore();
  const { loadContent, isLoading } = useContentStore();
  const categoryGridRef = useRef(null);

  useEffect(() => {
    // Content loading
    loadContent();

    // Welcome Toast Logic based on visit history
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
  }, [loadContent, showToast]);

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
          {isLoading ? (
            <section className="py-16 md:py-24 px-4">
               <div className="max-w-7xl mx-auto w-full">
                 <div className="text-center mb-12">
                   <SkeletonLoader type="text" className="h-10 w-48 mx-auto mb-4" />
                   <SkeletonLoader type="text" className="h-5 w-64 mx-auto" />
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                   {[...Array(8)].map((_, i) => (
                     <SkeletonLoader key={i} type="card" className="h-52 rounded-3xl" />
                   ))}
                 </div>
               </div>
            </section>
          ) : (
            <CategoryGrid />
          )}
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
