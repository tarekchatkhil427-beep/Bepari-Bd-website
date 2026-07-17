import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * Animated counter that counts up from 0 to the target number
 * when the element scrolls into view.
 */
export default function CountUpNumber({ to, suffix = '', className = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(to, 10);
    if (start === end) return;

    const totalMs = 1500;
    const step = end > 1000 ? Math.ceil(end / (totalMs / 10)) : 1;
    const incrementTime = end > 1000 ? 10 : totalMs / end;

    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setVal(end); clearInterval(timer); }
      else setVal(start);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, to]);

  return <span ref={ref} className={`font-sans ${className}`}>{val.toLocaleString()}{suffix}</span>;
}
