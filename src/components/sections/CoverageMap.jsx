import { motion, useReducedMotion } from 'framer-motion';

export default function CoverageMap() {
  const prefersReduced = useReducedMotion();
  const nodes = [
    { id: 1, x: 20, y: 35, label: "খাতুনগঞ্জ" },
    { id: 2, x: 75, y: 25, label: "ভুলতা" },
    { id: 3, x: 80, y: 65, label: "বাবুরহাট" },
    { id: 4, x: 30, y: 75, label: "গাজীপুর" },
    { id: 5, x: 65, y: 85, label: "কেরানীগঞ্জ" },
  ];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Light overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-white/90 z-10"></div>
      
      {/* Abstract Map Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[800px] opacity-60">
        
        {/* Center Node (Dhaka) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gold shadow-[0_0_40px_rgba(212,168,67,0.8)] z-20 flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-8 font-bangla text-gray-900 font-bold text-lg drop-shadow-sm z-20 bg-white/80 px-3 py-1 rounded-full backdrop-blur-md border border-gray-200 shadow-sm">
          ঢাকা (চকবাজার)
        </div>

        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full z-10">
          {nodes.map((node) => (
            <line
              key={`line-${node.id}`}
              x1="50%"
              y1="50%"
              x2={`${node.x}%`}
              y2={`${node.y}%`}
              stroke="rgba(212, 168, 67, 0.3)"
              strokeWidth="2"
              strokeDasharray="4,4"
              className={prefersReduced ? '' : 'animate-dash'}
              style={prefersReduced ? {} : { animation: 'dashMove 2.5s ease-in-out infinite alternate' }}
            />
          ))}
        </svg>

        {/* Outer Nodes */}
        {nodes.map((node) => (
          <div 
            key={`node-${node.id}`}
            className="absolute z-20"
            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <motion.div 
              className="w-4 h-4 bg-green rounded-full shadow-[0_0_20px_rgba(0,106,78,0.8)] border-2 border-white/20"
              animate={prefersReduced ? {} : { scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={prefersReduced ? { duration: 0 } : { duration: 2, repeat: Infinity, delay: node.id * 0.3 }}
            />
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 font-bangla text-gray-700 text-sm font-medium whitespace-nowrap bg-white/90 px-2 py-0.5 rounded backdrop-blur-md border border-gray-200 shadow-sm">
              {node.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
