import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

// Converts standard numbers (0-9) to Bengali numbers (০-৯)
const toBengaliNumber = (num) => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, x => bengaliDigits[x]);
};

export default function AnimatedCounter({ 
  from = 0, 
  to = 100, 
  duration = 2, 
  prefix = '', 
  suffix = '', 
  className = '',
  bengaliNumerals = true 
}) {
  const ref = useRef(null);
  // Only trigger the animation once when it enters the viewport
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const count = useMotionValue(from);
  
  // Transform the floating point motion value to rounded integer
  const rounded = useTransform(count, (latest) => Math.round(latest));
  
  // Transform the integer into formatted string (with Bengali digits + prefix/suffix)
  const displayValue = useTransform(rounded, (latest) => {
    const formatted = bengaliNumerals ? toBengaliNumber(latest) : latest.toLocaleString();
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (isInView) {
      animate(count, to, { duration: duration, ease: "easeOut" });
    }
  }, [count, to, duration, isInView]);

  return (
    <motion.span ref={ref} className={className}>
      {displayValue}
    </motion.span>
  );
}
