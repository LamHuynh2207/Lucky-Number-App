import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Lock, Eye, X } from 'lucide-react';

interface AdminKeyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (key: string) => void;
  isLoading?: boolean;
  error?: string;
}

export function AdminKeyDialog({ isOpen, onClose, onSubmit, isLoading, error }: AdminKeyDialogProps) {
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
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md mx-4"
          >
            <div className="relative bg-gradient-to-br from-blue-950/95 to-purple-950/95 backdrop-blur-xl rounded-2xl border-2 border-cyan-400/40 shadow-[0_0_60px_rgba(0,255,255,0.4)] p-6">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-cyan-400/70 hover:text-cyan-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon & Title */}
              <div className="flex flex-col items-center mb-6">
                <motion.div
                  animate={{
                    rotate: [0, -5, 5, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mb-4 p-3 bg-cyan-500/20 rounded-full border-2 border-cyan-400/50"
                >
                  <Lock className="w-10 h-10 text-cyan-400" />
                </motion.div>
                <h2 
                  className="text-2xl tracking-wide"
                  style={{
                    color: '#fff',
                    textShadow: '0 0 20px rgba(0, 255, 255, 0.8)',
                    fontWeight: 800,
                  }}
                >
                  XÁC THỰC ADMIN
                </h2>
                <p className="text-cyan-300 mt-2 text-center text-sm">
                  Nhập mã để có quyền quay số
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-cyan-300 mb-2">
                    Mã Admin
                  </label>
                  <div className="relative">
                    <Input
                      type={showKey ? "text" : "password"}
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                      placeholder="Nhập mã admin..."
                      disabled={isLoading}
                      autoFocus
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

                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={onClose}
                    variant="outline"
                    className="flex-1 py-3 border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/10"
                  >
                    Hủy
                  </Button>
                  <Button
                    type="submit"
                    disabled={!key.trim() || isLoading}
                    className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 border-2 border-cyan-300/50 shadow-[0_0_20px_rgba(0,255,255,0.5)] disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        Đang xác thực...
                      </span>
                    ) : (
                      'Xác nhận'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
