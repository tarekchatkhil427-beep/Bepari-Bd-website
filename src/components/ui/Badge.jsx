export default function Badge({
  variant = 'green',
  size = 'md',
  children,
  icon,
  className = '',
}) {
  const baseStyles = 'inline-flex items-center rounded-full font-bangla font-medium';
  
  const variants = {
    green: 'bg-green/10 text-green',
    gold: 'bg-gold-light/20 text-gold-light',
    red: 'bg-red/10 text-red',
    gray: 'bg-gray-100 text-gray-700',
    navy: 'bg-navy/10 text-navy',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {icon && <span className="mr-1.5">{icon}</span>}
      {children}
    </span>
  );
}
