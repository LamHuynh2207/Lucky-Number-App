import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface NumberDisplayProps {
  value: number;
  isSpinning: boolean;
  position: 'thousands' | 'hundreds' | 'tens' | 'ones';
}

export function NumberDisplay({ value, isSpinning, position }: NumberDisplayProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (isSpinning) {
      const interval = setInterval(() => {
        setDisplayValue(Math.floor(Math.random() * 10));
      }, 50);

      return () => clearInterval(interval);
    } else {
      setDisplayValue(value);
    }
  }, [isSpinning, value]);

  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ willChange: 'transform', width: '120px' }}
      animate={isSpinning ? {
        y: [0, -10, 0],
        transition: { repeat: Infinity, duration: 0.3 }
      } : {}}
    >
      <div
        className="relative text-[120px] font-black text-white"
        style={{
          textShadow: `
            0 0 20px rgba(0, 255, 255, 0.8),
            0 0 40px rgba(0, 255, 255, 0.6),
            0 0 60px rgba(0, 255, 255, 0.4)
          `,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          WebkitTextStroke: '2px rgba(0, 255, 255, 0.5)',
          willChange: 'transform',
        }}
      >
        {displayValue}
      </div>
    </motion.div>
  );
}