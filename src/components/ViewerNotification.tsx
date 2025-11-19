import { motion, AnimatePresence } from 'motion/react';
import { Radio } from 'lucide-react';

interface ViewerNotificationProps {
  isSpinning: boolean;
  currentAdmin?: string;
}

export function ViewerNotification({ isSpinning, currentAdmin }: ViewerNotificationProps) {
  return (
    <AnimatePresence>
      {isSpinning ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-32 left-1/2 -translate-x-1/2 z-30"
        >
          <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl border-2 border-cyan-400/50 rounded-full shadow-[0_0_30px_rgba(0,255,255,0.4)]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Radio className="w-6 h-6 text-cyan-400" />
            </motion.div>
            <div className="flex flex-col">
              <span 
                className="text-lg tracking-wide"
                style={{
                  color: '#fff',
                  textShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
                  fontWeight: 700,
                }}
              >
                🎲 ĐANG QUAY SỐ...
              </span>
              {currentAdmin && (
                <span className="text-xs text-cyan-400/80">
                  Admin: {currentAdmin}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-32 left-1/2 -translate-x-1/2 z-30"
        >
          <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border-2 border-purple-400/50 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.4)]">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <div className="w-3 h-3 bg-purple-400 rounded-full" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-sm text-purple-300">
                Đang chờ admin quay số...
              </span>
              {currentAdmin && (
                <span className="text-xs text-purple-400/70">
                  Admin hiện tại: {currentAdmin}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
