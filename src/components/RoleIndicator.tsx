import { motion } from 'motion/react';
import { Shield, Wifi, WifiOff } from 'lucide-react';

interface RoleIndicatorProps {
  isAdmin: boolean;
  isConnected: boolean;
  adminName?: string;
  isDemoMode?: boolean;
}

export function RoleIndicator({ isAdmin, isConnected, adminName, isDemoMode = false }: RoleIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-8 right-8 z-20 flex items-center gap-3"
    >
      {/* Connection Status */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border-2 ${
          isDemoMode
            ? 'bg-orange-500/20 border-orange-400/50 text-orange-300'
            : isConnected
            ? 'bg-green-500/20 border-green-400/50 text-green-300'
            : 'bg-red-500/20 border-red-400/50 text-red-300'
        }`}
      >
        {isDemoMode ? (
          <>
            <WifiOff className="w-4 h-4" />
            <span className="text-sm">Demo Mode</span>
          </>
        ) : isConnected ? (
          <>
            <Wifi className="w-4 h-4" />
            <span className="text-sm">Realtime</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            <span className="text-sm">Mất kết nối</span>
          </>
        )}
      </motion.div>

      {/* Role Badge - Only show if admin */}
      {isAdmin && (
        <motion.div
          animate={{
            boxShadow: [
              '0 0 20px rgba(0, 255, 255, 0.3)',
              '0 0 30px rgba(0, 255, 255, 0.6)',
              '0 0 20px rgba(0, 255, 255, 0.3)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-md border-2 bg-cyan-500/20 border-cyan-400/50"
        >
          <Shield className="w-5 h-5 text-cyan-400" />
          <div className="flex flex-col">
            <span className="text-sm text-cyan-300">ADMIN</span>
            {adminName && (
              <span className="text-xs text-cyan-400/70">{adminName}</span>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
