import { motion } from 'motion/react';
import antImage from 'figma:asset/72895c8fbafc10837d4ae2efcdb5e13c0e9256e1.png';

export function RobotMascot({ isAnimating, flipHorizontal = false }: { isAnimating: boolean; flipHorizontal?: boolean }) {
  return (
    <motion.div
      className="relative w-28 h-28"
      style={{
        transform: flipHorizontal ? 'scaleX(-1)' : 'scaleX(1)',
      }}
      animate={isAnimating ? {
        y: [0, -20, 0],
        rotate: [0, -10, 10, -10, 0],
        transition: { duration: 0.6, repeat: 2 }
      } : {
        y: [0, -8, 0],
        transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      <img 
        src={antImage} 
        alt="Lucky Ant Mascot" 
        className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,200,0,0.6)]"
        style={{ willChange: 'transform' }}
      />
    </motion.div>
  );
}