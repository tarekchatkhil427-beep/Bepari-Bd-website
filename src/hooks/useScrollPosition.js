import { useState, useEffect, useRef } from 'react';

export function useScrollPosition() {
  const [scrollData, setScrollData] = useState({
    scrollY: 0,
    scrollDirection: 'none', // 'up' | 'down' | 'none'
    isAtTop: true,
    isAtBottom: false,
  });

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const direction = currentScrollY > lastScrollY.current ? 'down' : 'up';
          
          // Check if bottom reached (with 20px buffer for mobile browsers)
          const isBottom = window.innerHeight + Math.ceil(currentScrollY) >= document.documentElement.scrollHeight - 20;

          setScrollData({
            scrollY: currentScrollY,
            scrollDirection: currentScrollY === lastScrollY.current ? 'none' : direction,
            isAtTop: currentScrollY < 10, // Small threshold to account for elastic scrolling
            isAtBottom: isBottom,
          });

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollData;
}
