import React from 'react';

const shimmerStyle = {
  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.5s infinite linear'
};

const ShimmerBase = ({ className = '', style = {} }) => (
  <div 
    className={`bg-gray-200 ${className}`} 
    style={{ ...shimmerStyle, ...style }}
  />
);

export const SkeletonCard = ({ className = '' }) => (
  <div className={`rounded-3xl h-48 p-5 border border-gray-100 shadow-sm flex flex-col ${className}`}>
    <ShimmerBase className="w-14 h-14 rounded-full mb-5" />
    <ShimmerBase className="h-4 w-3/4 rounded mb-3" />
    <ShimmerBase className="h-4 w-1/2 rounded mt-auto" />
  </div>
);

export const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <ShimmerBase 
        key={i} 
        className={`h-4 rounded ${i === lines - 1 ? 'w-[60%]' : 'w-full'}`} 
      />
    ))}
  </div>
);

export const SkeletonCategoryCard = ({ className = '' }) => (
  <div className={`bg-white rounded-[2rem] p-4 flex flex-col items-center justify-center border border-gray-50 shadow-sm aspect-square ${className}`}>
    <ShimmerBase className="w-16 h-16 rounded-full mb-4" />
    <ShimmerBase className="h-3 w-16 rounded" />
  </div>
);

export const SkeletonProductCard = ({ className = '' }) => (
  <div className={`bg-white rounded-2xl md:rounded-3xl border border-gray-50 shadow-sm flex flex-col overflow-hidden h-full ${className}`}>
    <ShimmerBase className="h-32 md:h-40 w-full" />
    <div className="p-3 md:p-4 flex flex-col flex-1">
      <ShimmerBase className="h-4 w-full rounded mb-2" />
      <ShimmerBase className="h-4 w-4/5 rounded mb-4" />
      <ShimmerBase className="h-3 w-1/2 rounded mt-auto mb-3" />
      <ShimmerBase className="h-8 w-full rounded-lg mt-2" />
    </div>
  </div>
);

export const SkeletonHero = ({ className = '' }) => (
  <div className={`w-full h-[60vh] md:h-[70vh] rounded-b-[3rem] overflow-hidden ${className}`}>
    <ShimmerBase className="w-full h-full" />
  </div>
);

export const SkeletonGrid = ({ count = 6, columns = 2, className = '' }) => {
  const getGridClass = () => {
    switch(columns) {
      case 2: return 'grid-cols-2';
      case 3: return 'grid-cols-2 md:grid-cols-3';
      case 4: return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      default: return `grid-cols-${columns}`;
    }
  };
  
  return (
    <div className={`grid ${getGridClass()} gap-3 md:gap-5 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonProductCard key={i} />
      ))}
    </div>
  );
};

export default function SkeletonLoader({ type = 'text', ...props }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}} />
      
      {(() => {
        switch (type) {
          case 'card': return <SkeletonCard {...props} />;
          case 'category': return <SkeletonCategoryCard {...props} />;
          case 'product': return <SkeletonProductCard {...props} />;
          case 'hero': return <SkeletonHero {...props} />;
          case 'grid': return <SkeletonGrid {...props} />;
          case 'text':
          default:
            return <SkeletonText {...props} />;
        }
      })()}
    </>
  );
}
