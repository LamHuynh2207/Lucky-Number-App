import { motion } from 'motion/react';
import antImage from 'figma:asset/76f705d17f5249340ea588863f35105ec7b8532a.png';

export function AntMascot({ isAnimating }: { isAnimating: boolean }) {
  return (
    <motion.div
      className="relative w-24 h-24"
      animate={isAnimating ? {
        y: [0, -20, 0],
        rotate: [0, -10, 10, -10, 0],
        transition: { duration: 0.6, repeat: 2 }
      } : {
        y: [0, -5, 0],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      <img 
        src={antImage} 
        alt="Ant Mascot" 
        className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,193,7,0.8)]"
      />
    </motion.div>
  );
}
