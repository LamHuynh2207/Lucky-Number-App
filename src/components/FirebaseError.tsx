import { motion } from 'motion/react';
import { AlertTriangle, RefreshCw, FileText } from 'lucide-react';
import { Button } from './ui/button';

interface FirebaseErrorProps {
  error: string;
  onRetry: () => void;
}

export function FirebaseError({ error, onRetry }: FirebaseErrorProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900/95 to-purple-900/95 backdrop-blur-sm p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative max-w-2xl w-full"
      >
        <div className="relative bg-gradient-to-br from-red-950/90 to-orange-950/90 backdrop-blur-xl rounded-2xl border-2 border-red-400/40 shadow-[0_0_60px_rgba(255,0,0,0.3)] p-8">
          {/* Warning Icon */}
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{
                rotate: [0, -5, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="p-6 bg-red-500/20 rounded-full border-2 border-red-400/50"
            >
              <AlertTriangle className="w-16 h-16 text-red-400" />
            </motion.div>
          </div>

          {/* Title */}
          <h2 
            className="text-3xl text-center mb-4"
            style={{
              color: '#fff',
              textShadow: '0 0 20px rgba(255, 100, 100, 0.8)',
              fontWeight: 800,
            }}
          >
            ⚠️ Lỗi Kết Nối Firebase
          </h2>

          {/* Error Message */}
          <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-4 mb-6">
            <p className="text-red-200 text-center">
              {error}
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-orange-500/10 border border-orange-400/30 rounded-lg p-6 mb-6 space-y-4">
            <h3 className="text-orange-300 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Hướng dẫn khắc phục:
            </h3>
            
            <ol className="text-orange-200/80 text-sm space-y-3 list-decimal list-inside">
              <li>
                Kiểm tra file <code className="bg-orange-500/20 px-2 py-1 rounded">/config/firebase.ts</code>
              </li>
              <li>
                Đảm bảo bạn đã thay thế <code className="bg-orange-500/20 px-2 py-1 rounded">firebaseConfig</code> bằng config thật từ Firebase Console
              </li>
              <li>
                Verify <code className="bg-orange-500/20 px-2 py-1 rounded">databaseURL</code> có format đúng:
                <div className="mt-2 ml-4 bg-orange-500/20 p-2 rounded text-xs font-mono">
                  https://[project-id]-default-rtdb.[region].firebasedatabase.app
                </div>
              </li>
              <li>
                Kiểm tra Realtime Database đã được tạo trong Firebase Console
              </li>
              <li>
                Kiểm tra Database Rules đã cho phép read/write
              </li>
            </ol>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <a
              href="https://console.firebase.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500/20 border border-blue-400/30 rounded-lg text-blue-300 hover:bg-blue-500/30 transition-colors"
            >
              🔥 Firebase Console
            </a>
            <a
              href="/FIREBASE_SETUP.md"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500/20 border border-green-400/30 rounded-lg text-green-300 hover:bg-green-500/30 transition-colors"
            >
              📖 Hướng dẫn Setup
            </a>
          </div>

          {/* Retry Button */}
          <Button
            onClick={onRetry}
            className="w-full py-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 border-2 border-cyan-300/50 shadow-[0_0_20px_rgba(0,255,255,0.5)]"
          >
            <span className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Thử Lại Kết Nối
            </span>
          </Button>

          {/* Note */}
          <p className="text-xs text-center text-red-400/60 mt-4">
            Nếu vẫn gặp lỗi, mở Console (F12) để xem log chi tiết
          </p>
        </div>
      </motion.div>
    </div>
  );
}
