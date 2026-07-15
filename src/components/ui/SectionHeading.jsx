import { motion } from 'framer-motion';
import Badge from './Badge';

export default function SectionHeading({
  title,
  subtitle,
  align = 'left',
  accentColor = 'green',
  badge,
}) {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
  };

  const accentClasses = {
    green: 'bg-green',
    gold: 'bg-gold',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col mb-8 ${alignClasses[align]}`}
    >
      {badge && (
        <div className="mb-3">
          <Badge variant={accentColor === 'gold' ? 'gold' : 'green'} size="sm">
            {badge}
          </Badge>
        </div>
      )}
      <h2 className="font-bangla text-2xl font-bold text-navy leading-snug">
        {title}
      </h2>
      <div className={`h-[3px] w-10 mt-3 rounded-full ${accentClasses[accentColor]}`}></div>
      {subtitle && (
        <p className="font-bangla text-base text-gray-500 mt-3 max-w-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
