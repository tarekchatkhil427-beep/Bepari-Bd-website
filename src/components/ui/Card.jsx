import { motion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  onClick,
  hoverable = false,
  glassmorphism = false,
  elevation = 'soft', // 'flat' | 'soft' | 'card' | 'float'
}) {
  const baseStyles = 'rounded-3xl overflow-hidden';
  
  const elevations = {
    flat: 'border border-gray-100',
    soft: 'shadow-soft bg-white',
    card: 'shadow-card bg-white',
    float: 'shadow-float bg-white',
  };

  const glassStyles = 'backdrop-blur-md bg-white/70 border border-white/40 shadow-soft';

  const containerClasses = `
    ${baseStyles} 
    ${glassmorphism ? glassStyles : elevations[elevation]} 
    ${className}
  `;

  if (hoverable || onClick) {
    return (
      <motion.div
        whileHover={hoverable ? { y: -2 } : {}}
        whileTap={hoverable ? { scale: 0.98 } : {}}
        className={`${containerClasses} ${onClick ? 'cursor-pointer' : ''}`}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
}
