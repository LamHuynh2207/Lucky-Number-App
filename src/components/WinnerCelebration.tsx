import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy } from 'lucide-react';

interface WinnerCelebrationProps {
  show: boolean;
  number: string;
}

export function WinnerCelebration({ show, number }: WinnerCelebrationProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Content */}
          <motion.div
            initial={{ scale: 0.5, y: 100, opacity: 0 }}
            animate={{ 
              scale: [0.5, 1.2, 1],
              y: [100, -20, 0],
              opacity: 1,
            }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10"
          >
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-xl border-4 border-yellow-400/60 rounded-3xl p-12 shadow-[0_0_80px_rgba(255,215,0,0.6)]">
              {/* Trophy Icon */}
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="flex justify-center mb-6"
              >
                <Trophy className="w-24 h-24 text-yellow-400" />
              </motion.div>

              {/* Title */}
              <motion.h2
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="text-6xl text-center mb-4"
                style={{
                  color: '#FFD700',
                  textShadow: `
                    0 0 20px rgba(255, 215, 0, 1),
                    0 0 40px rgba(255, 215, 0, 0.8),
                    0 0 60px rgba(255, 165, 0, 0.6)
                  `,
                  fontWeight: 900,
                }}
              >
                ✨ SỐ MAY MẮN ✨
              </motion.h2>

              {/* Number */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="text-9xl text-center tracking-widest mb-6"
                style={{
                  color: '#FFD700',
                  textShadow: `
                    0 0 30px rgba(255, 215, 0, 1),
                    0 0 60px rgba(255, 215, 0, 0.8)
                  `,
                  fontWeight: 900,
                }}
              >
                {number}
              </motion.div>

              {/* Sparkles */}
              <div className="flex justify-center gap-4">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  >
                    <Sparkles className="w-12 h-12 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Confetti particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: -20,
                  scale: 0,
                }}
                animate={{
                  y: window.innerHeight + 20,
                  scale: [0, 1, 0.5],
                  rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                className="absolute w-4 h-4 rounded-full"
                style={{
                  background: ['#FFD700', '#FFA500', '#FF6B6B', '#4ECDC4', '#45B7D1'][Math.floor(Math.random() * 5)],
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
