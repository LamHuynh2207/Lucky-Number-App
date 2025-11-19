import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Lock, Eye, Users } from 'lucide-react';

interface AuthModalProps {
  onSubmit: (key: string) => void;
  onViewerMode: () => void;
  isLoading?: boolean;
  error?: string;
  isFirebaseConfigured?: boolean;
}

export function AuthModal({ onSubmit, onViewerMode, isLoading, error, isFirebaseConfigured = false }: AuthModalProps) {
  const [key, setKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim()) {
      onSubmit(key.trim());
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          className="relative w-full max-w-md mx-4"
        >
          <div className="relative bg-gradient-to-br from-blue-950/95 to-purple-950/95 backdrop-blur-xl rounded-2xl border-2 border-cyan-400/40 shadow-[0_0_60px_rgba(0,255,255,0.4)] p-8">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-20 blur-xl" />
            
            <div className="relative z-10">
              {/* Icon & Title */}
              <div className="flex flex-col items-center mb-6">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mb-4 p-4 bg-cyan-500/20 rounded-full border-2 border-cyan-400/50"
                >
                  <Lock className="w-12 h-12 text-cyan-400" />
                </motion.div>
                <h2 
                  className="text-3xl tracking-wide"
                  style={{
                    color: '#fff',
                    textShadow: '0 0 20px rgba(0, 255, 255, 0.8)',
                    fontWeight: 800,
                  }}
                >
                  STEM DAY 2025
                </h2>
                <p className="text-cyan-300 mt-2 text-center">
                  Chọn chế độ truy cập
                </p>
              </div>

              {/* Firebase Status */}
              {!isFirebaseConfigured && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-4 p-3 bg-orange-500/10 border border-orange-400/30 rounded-lg"
                >
                  <p className="text-orange-300 text-sm flex items-center gap-2">
                    <span>⚠️</span>
                    <span>
                      Firebase chưa cấu hình. App sẽ chạy ở <strong>chế độ Demo</strong> (offline, không realtime).
                    </span>
                  </p>
                  <a
                    href="/FIREBASE_SETUP.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-orange-400 hover:text-orange-300 underline mt-1 inline-block"
                  >
                    📖 Hướng dẫn setup Firebase
                  </a>
                </motion.div>
              )}

              {/* Admin Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm text-cyan-300 mb-2">
                    Mã Admin (nếu bạn là người điều khiển)
                  </label>
                  <div className="relative">
                    <Input
                      type={showKey ? "text" : "password"}
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                      placeholder="Nhập mã admin..."
                      disabled={isLoading}
                      className="bg-blue-950/50 border-cyan-400/30 text-white placeholder:text-cyan-300/50 focus:border-cyan-400 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400/70 hover:text-cyan-400 transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-cyan-400/60 mt-1">
                    Mã mặc định: <code className="bg-cyan-500/20 px-2 py-0.5 rounded">STEMDAY2025</code>
                  </p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/20 border border-red-400/50 rounded-lg text-red-200 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <Button
                  type="submit"
                  disabled={!key.trim() || isLoading}
                  className="w-full py-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 border-2 border-cyan-300/50 shadow-[0_0_20px_rgba(0,255,255,0.5)] disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Đang xác thực...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Lock className="w-5 h-5" />
                      Đăng nhập Admin
                    </span>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-cyan-400/30" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-blue-950/95 text-cyan-300">HOẶC</span>
                </div>
              </div>

              {/* Viewer Mode Button */}
              <Button
                type="button"
                onClick={onViewerMode}
                disabled={isLoading || !isFirebaseConfigured}
                className="w-full py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 border-2 border-purple-300/50 shadow-[0_0_20px_rgba(168,85,247,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Vào chế độ Xem (Viewer)
                </span>
              </Button>

              <p className="text-xs text-cyan-400/60 text-center mt-4">
                {isFirebaseConfigured 
                  ? 'Chế độ Viewer chỉ xem, không thể quay số'
                  : 'Chế độ Viewer cần Firebase được cấu hình'}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
