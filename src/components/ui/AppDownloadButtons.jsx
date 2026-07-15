import { motion } from 'framer-motion';
import { APP_PLAY_STORE_URL, APP_STORE_URL } from '../../utils/constants';

export default function AppDownloadButtons({ layout = 'row', size = 'md' }) {
  const containerClasses = layout === 'row' 
    ? 'flex flex-row space-x-3' 
    : 'flex flex-col space-y-3 w-full max-w-[200px]';

  const buttonClasses = `
    flex items-center justify-center bg-navy text-white rounded-xl 
    transition-all duration-200 hover:bg-black hover:scale-[1.02] cursor-pointer shadow-sm
    ${size === 'sm' ? 'px-3 py-2' : size === 'lg' ? 'px-5 py-3.5' : 'px-4 py-3'}
  `;

  return (
    <div className={containerClasses}>
      <motion.a
        whileTap={{ scale: 0.97 }}
        href={APP_PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
      >
        <svg viewBox="0 0 24 24" className={size === 'sm' ? 'w-5 h-5 mr-2' : size === 'lg' ? 'w-7 h-7 mr-3' : 'w-6 h-6 mr-3'} fill="currentColor">
          <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.61 3 21.09 3 20.5ZM14.82 10.87L5.54 5.31C5.07 5.03 4.54 5.25 4.39 5.76L13.69 12L14.82 10.87ZM14.82 13.13L13.69 12L4.39 18.24C4.54 18.75 5.07 18.97 5.54 18.69L14.82 13.13ZM21.2 11.13L16.27 8.17L14.82 9.62L15.95 10.75C16.5 11.3 16.5 12.7 15.95 13.25L14.82 14.38L16.27 15.83L21.2 12.87C21.87 12.47 21.87 11.53 21.2 11.13Z"/>
        </svg>
        <div className="flex flex-col items-start leading-none">
          <span className={`font-bangla ${size === 'sm' ? 'text-[10px]' : size === 'lg' ? 'text-xs' : 'text-xs'} text-gray-300 mb-1`}>
            ডাউনলোড করুন
          </span>
          <span className={`font-sans font-semibold ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'}`}>
            Google Play
          </span>
        </div>
      </motion.a>

      <motion.a
        whileTap={{ scale: 0.97 }}
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
      >
        <svg viewBox="0 0 24 24" className={size === 'sm' ? 'w-5 h-5 mr-2' : size === 'lg' ? 'w-7 h-7 mr-3' : 'w-6 h-6 mr-3'} fill="currentColor">
          <path d="M16.36 14c.08-.02.14-.02.22-.05.16-.06.33-.13.48-.22.61-.39 1.03-.98 1.25-1.66-1.02-.58-1.54-1.46-1.54-2.61 0-1.48.9-2.58 2.22-3.08-1.12-1.58-2.75-2.25-4.42-2.25-.56 0-1.16.11-1.78.33-.52.19-1.02.44-1.5.75-.48-.31-.98-.56-1.5-.75-.62-.22-1.22-.33-1.78-.33-1.67 0-3.3.67-4.42 2.25C2.26 9.06 1.8 11.66 2.45 14.36c.41 1.69 1.14 3.22 2.2 4.56.97 1.25 2.11 2.52 3.58 2.58 1.48.06 1.95-.83 3.69-.83 1.73 0 2.2.89 3.69.83 1.47-.06 2.61-1.33 3.58-2.58.42-.53.78-1.11 1.08-1.7-.58-.33-1.09-.78-1.53-1.33-.56-.66-.9-1.52-.98-2.42-.05-.48 0-.95.14-1.41.05-.17.11-.33.19-.48.02-.02.03-.03.05-.05.02-.03.03-.06.06-.09.02-.03.03-.06.06-.09zM15.42 4.19c.78-.97 1.22-2.19 1.08-3.44-1.16.05-2.31.55-3.14 1.44-.75.81-1.25 1.97-1.11 3.19 1.22.09 2.39-.39 3.17-1.19z"/>
        </svg>
        <div className="flex flex-col items-start leading-none">
          <span className={`font-bangla ${size === 'sm' ? 'text-[10px]' : size === 'lg' ? 'text-xs' : 'text-xs'} text-gray-300 mb-1`}>
            ডাউনলোড করুন
          </span>
          <span className={`font-sans font-semibold ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'}`}>
            App Store
          </span>
        </div>
      </motion.a>
    </div>
  );
}
