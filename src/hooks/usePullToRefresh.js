import { useState, useEffect } from 'react';
import { mediumTap, successTap } from '../utils/haptics';

export function usePullToRefresh(onRefresh, disabled = false) {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);

  const threshold = 80;

  useEffect(() => {
    if (disabled) return;

    const handleTouchStart = (e) => {
      // Only initiate pull if at the very top of the page
      if (window.scrollY <= 0) {
        setStartY(e.touches[0].clientY);
      }
    };

    const handleTouchMove = (e) => {
      if (startY === 0 || isRefreshing) return;
      
      const y = e.touches[0].clientY;
      const deltaY = y - startY;

      if (deltaY > 0 && window.scrollY <= 0) {
        setIsPulling(true);
        // Apply resistance friction (0.4 multiplier)
        const distance = Math.min(deltaY * 0.4, threshold + 30);
        setPullDistance(distance);
        
        // Haptic feedback right when threshold is crossed
        if (distance > threshold - 2 && distance < threshold + 2) {
           mediumTap();
        }
      }
    };

    const handleTouchEnd = async () => {
      if (pullDistance >= threshold && !isRefreshing) {
        setIsRefreshing(true);
        setPullDistance(threshold); 
        successTap();
        
        try {
          if (onRefresh) await onRefresh();
        } finally {
          setIsRefreshing(false);
          setIsPulling(false);
          setPullDistance(0);
        }
      } else {
        setIsPulling(false);
        setPullDistance(0);
      }
      setStartY(0);
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [startY, pullDistance, isRefreshing, onRefresh, disabled]);

  return { isPulling, pullDistance, isRefreshing, threshold };
}
