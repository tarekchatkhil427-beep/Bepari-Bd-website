export default function Divider({ text, color = 'gray', className = '' }) {
  const borderColors = {
    gray: 'border-gray-200',
    gold: 'border-gold/30',
  };
  
  const textColors = {
    gray: 'text-gray-400',
    gold: 'text-gold-light',
  };

  if (text) {
    return (
      <div className={`relative flex items-center py-4 ${className}`}>
        <div className={`flex-grow border-t ${borderColors[color]}`}></div>
        <span className={`flex-shrink-0 mx-4 font-bangla text-sm font-medium ${textColors[color]}`}>
          {text}
        </span>
        <div className={`flex-grow border-t ${borderColors[color]}`}></div>
      </div>
    );
  }

  return (
    <div className={`w-full border-t ${borderColors[color]} my-4 ${className}`}></div>
  );
}
