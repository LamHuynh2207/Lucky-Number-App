import { motion } from 'motion/react';
import stemIcon from 'figma:asset/e7bb70841ce2ec9f42f8470a8bc4a9dd254fdf8c.png';

interface STEMDecorationProps {
  position: 'left' | 'right';
}

export function STEMDecoration({ position }: STEMDecorationProps) {
  const leftPosition = position === 'left' ? 'left-8' : 'right-8';
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
      animate={{ 
        opacity: [0.6, 1, 0.6],
        scale: [0.8, 1, 0.8],
        rotate: 0,
      }}
      transition={{
        opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 1, ease: "easeOut" }
      }}
      className={`absolute bottom-64 ${leftPosition} w-40 h-40 pointer-events-none z-0`}
    >
      <img 
        src={stemIcon} 
        alt="STEM Icon" 
        className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(0,255,255,0.6)]"
      />
    </motion.div>
  );
}
