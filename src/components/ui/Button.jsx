import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-bangla rounded-2xl touch-manipulation transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-green text-white hover:bg-[#005a42] focus:ring-green',
    secondary: 'border-2 border-green text-green bg-transparent hover:bg-green/5 focus:ring-green',
    ghost: 'text-green bg-transparent hover:bg-green/10 focus:ring-green',
    gold: 'bg-gold text-navy font-semibold shadow-gold hover:brightness-105 focus:ring-gold',
    danger: 'bg-red text-white hover:bg-[#d81e33] focus:ring-red',
  };

  const sizes = {
    sm: 'h-10 px-4 text-sm',
    md: 'min-h-[48px] px-6 text-base',
    lg: 'min-h-[56px] px-8 text-lg',
    xl: 'min-h-[64px] px-10 text-xl',
  };

  const classes = [
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    (disabled || loading) ? 'opacity-60 cursor-not-allowed' : '',
    className
  ].join(' ');

  return (
    <motion.button
      whileTap={!(disabled || loading) ? { scale: 0.95 } : {}}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
      {!loading && icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  );
}
