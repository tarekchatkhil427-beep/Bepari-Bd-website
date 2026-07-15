import { Star } from 'lucide-react';

export default function StarRating({ rating = 5, size = 'md', showCount = false, count = 0 }) {
  const normalizedRating = Math.max(1, Math.min(5, Math.floor(rating)));
  
  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
  };

  return (
    <div className="flex items-center space-x-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${iconSizes[size]} ${
              star <= normalizedRating 
                ? 'fill-gold text-gold' 
                : 'fill-transparent text-gray-300'
            }`}
          />
        ))}
      </div>
      {showCount && count > 0 && (
        <span className="font-bangla text-xs text-gray-500 ml-1">
          ({count.toLocaleString('bn-BD')} জন রিভিউ)
        </span>
      )}
    </div>
  );
}
