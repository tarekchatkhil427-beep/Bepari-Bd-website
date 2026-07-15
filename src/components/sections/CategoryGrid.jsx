import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categoriesData } from '../../data/categories';
import { useUIStore } from '../../store/useUIStore';
import SectionHeading from '../ui/SectionHeading';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function CategoryGrid() {
  const navigate = useNavigate();
  const { setSelectedCategory } = useUIStore();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    navigate(`/products?category=${categoryId}`);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" } 
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-offwhite">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          title="পণ্যের ধরন" 
          subtitle="আপনার দোকানের জন্য সেরা পণ্য বেছে নিন" 
          align="center"
        />

        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 mt-10"
        >
          {categoriesData.map((cat) => (
            <motion.div key={cat.id} variants={itemVariants}>
              <Card 
                hoverable 
                elevation="soft"
                onClick={() => handleCategoryClick(cat.id)}
                className="h-full group bg-white hover:shadow-card transition-shadow p-4 flex flex-col items-center relative"
              >
                {/* Popular Badge */}
                {cat.isPopular && (
                  <div className="absolute top-3 right-3 z-10">
                    <Badge variant="gold" size="sm">জনপ্রিয়</Badge>
                  </div>
                )}
                
                {/* Icon Circle */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{cat.icon}</span>
                </div>
                
                {/* Text Content */}
                <h3 className="font-bangla font-semibold text-navy text-sm md:text-base text-center leading-tight">
                  {cat.nameBn}
                </h3>
                <p className="font-sans text-xs text-gray-400 text-center mt-1.5 flex items-center justify-center">
                  <span className="font-bold">{cat.productCount}+</span> 
                  <span className="font-bangla ml-1">পণ্য</span>
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <Button 
            variant="ghost" 
            onClick={() => {
              setSelectedCategory('all');
              navigate('/products');
            }}
          >
            সব পণ্য দেখুন <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
