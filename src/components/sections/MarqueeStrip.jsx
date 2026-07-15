export default function MarqueeStrip() {
  const content = (
    <div className="flex items-center whitespace-nowrap">
      <span className="mx-4 text-lg">🇧🇩</span>
      <span className="font-bangla text-sm md:text-base font-medium mx-4">
        🎉 নতুন পাইকার যোগ দিয়েছেন — <span className="font-sans font-bold">৫০+</span> যাচাইকৃত পাইকার
      </span>
      <span className="mx-4 text-gold text-xs">◆</span>
      <span className="font-bangla text-sm md:text-base font-medium mx-4">
        বিনামূল্যে নিবন্ধন করুন
      </span>
      <span className="mx-4 text-gold text-xs">◆</span>
      <span className="font-bangla text-sm md:text-base font-medium mx-4">
        ক্যাশ অন ডেলিভারি পাওয়া যাচ্ছে
      </span>
      <span className="mx-4 text-gold text-xs">◆</span>
      <span className="font-bangla text-sm md:text-base font-medium mx-4">
        পাইকারি মূল্যে সেরা পণ্য
      </span>
    </div>
  );

  return (
    <div className="bg-green text-white py-3 overflow-hidden flex relative z-20 shadow-soft">
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite;
            display: flex;
            width: max-content;
          }
        `}
      </style>
      <div className="animate-marquee hover:[animation-play-state:paused] active:[animation-play-state:paused] cursor-default">
        {content}
        {content}
      </div>
    </div>
  );
}
