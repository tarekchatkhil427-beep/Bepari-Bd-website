import { useState, useRef, useEffect } from 'react';

export default function LazyImage({ 
  src, 
  alt, 
  className = '', 
  placeholderColor = 'bg-gray-100',
  emoji = '📦'
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${placeholderColor} ${className}`}>
      {/* Blurred Placeholder */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out z-10
          ${isLoaded || !src ? 'opacity-0 scale-110 blur-xl' : 'opacity-100 scale-100 blur-md'}`}
      >
        <span className="text-5xl md:text-6xl filter drop-shadow-md">{emoji}</span>
      </div>
      
      {/* Real Image (triggers if src provided) */}
      {isInView && src && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover relative z-20 transition-all duration-500 ease-out
            ${isLoaded ? 'blur-0 opacity-100' : 'blur-[10px] opacity-0'}`}
        />
      )}
      
      {/* Fallback emoji when no src provided (for current website state) */}
      {isInView && !src && (
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out z-20 opacity-100 scale-100 blur-0`}
        >
          <span className="text-5xl md:text-6xl filter drop-shadow-xl">{emoji}</span>
        </div>
      )}
    </div>
  );
}
