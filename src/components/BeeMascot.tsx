import { motion } from 'motion/react';

export function BeeMascot({ isAnimating }: { isAnimating: boolean }) {
  return (
    <motion.div
      className="relative w-20 h-20"
      animate={isAnimating ? {
        y: [0, -20, 0],
        rotate: [0, -10, 10, -10, 0],
        transition: { duration: 0.6, repeat: 2 }
      } : {}}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(255,255,0,0.6)]">
        {/* Bee body */}
        <ellipse cx="50" cy="55" rx="20" ry="28" fill="#FFD700" />
        
        {/* Black stripes */}
        <rect x="30" y="45" width="40" height="6" fill="#000" rx="3" />
        <rect x="30" y="58" width="40" height="6" fill="#000" rx="3" />
        
        {/* Head */}
        <circle cx="50" cy="30" r="15" fill="#FFD700" />
        
        {/* Eyes */}
        <circle cx="45" cy="28" r="3" fill="#000" />
        <circle cx="55" cy="28" r="3" fill="#000" />
        <circle cx="46" cy="27" r="1.5" fill="#fff" />
        <circle cx="56" cy="27" r="1.5" fill="#fff" />
        
        {/* Smile */}
        <path d="M 45 33 Q 50 36 55 33" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
        
        {/* Antennae */}
        <motion.line
          x1="45" y1="18" x2="42" y2="12"
          stroke="#000" strokeWidth="2" strokeLinecap="round"
          animate={isAnimating ? {
            rotate: [0, -15, 15, 0],
            transition: { duration: 0.3, repeat: 4 }
          } : {}}
          style={{ transformOrigin: '45px 18px' }}
        />
        <motion.line
          x1="55" y1="18" x2="58" y2="12"
          stroke="#000" strokeWidth="2" strokeLinecap="round"
          animate={isAnimating ? {
            rotate: [0, 15, -15, 0],
            transition: { duration: 0.3, repeat: 4 }
          } : {}}
          style={{ transformOrigin: '55px 18px' }}
        />
        <circle cx="42" cy="12" r="2" fill="#FFD700" />
        <circle cx="58" cy="12" r="2" fill="#FFD700" />
        
        {/* Wings */}
        <motion.ellipse
          cx="35" cy="45" rx="12" ry="18"
          fill="rgba(255, 255, 255, 0.6)"
          stroke="#fff" strokeWidth="1"
          animate={isAnimating ? {
            scaleY: [1, 0.7, 1],
            transition: { duration: 0.15, repeat: 8 }
          } : {
            scaleY: [1, 1.1, 1],
            transition: { duration: 1.5, repeat: Infinity }
          }}
          style={{ transformOrigin: '35px 45px' }}
        />
        <motion.ellipse
          cx="65" cy="45" rx="12" ry="18"
          fill="rgba(255, 255, 255, 0.6)"
          stroke="#fff" strokeWidth="1"
          animate={isAnimating ? {
            scaleY: [1, 0.7, 1],
            transition: { duration: 0.15, repeat: 8 }
          } : {
            scaleY: [1, 1.1, 1],
            transition: { duration: 1.5, repeat: Infinity, delay: 0.1 }
          }}
          style={{ transformOrigin: '65px 45px' }}
        />
        
        {/* Stinger */}
        <path d="M 50 80 L 50 88 L 48 83 L 50 88 L 52 83 Z" fill="#000" />
      </svg>
    </motion.div>
  );
}
