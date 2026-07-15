import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SuccessAnimation({ 
  show = false, 
  title = "সফল হয়েছে!", 
  subtitle = "", 
  onDone = () => {},
  fullScreen = false
}) {

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onDone();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [show, onDone]);

  const Container = fullScreen ? motion.div : 'div';
  const containerProps = fullScreen 
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-[100] bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
      }
    : {
        className: "flex flex-col items-center justify-center py-12 text-center w-full"
      };

  return (
    <AnimatePresence>
      {show && (
        <Container {...containerProps}>
          
          {/* Animated Check Circle */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20, 
              duration: 0.6 
            }}
            className="w-24 h-24 bg-green rounded-full flex items-center justify-center mb-6 shadow-float relative overflow-hidden"
          >
            {/* SVG Checkmark with path drawing animation */}
            <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <motion.path
                d="M20 6L9 17l-5-5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              />
            </svg>
          </motion.div>

          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="font-bangla font-bold text-navy text-2xl md:text-3xl mb-3"
          >
            {title}
          </motion.h3>
          
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="font-bangla text-gray-500 text-lg max-w-sm mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
          
        </Container>
      )}
    </AnimatePresence>
  );
}
