import { initializeApp, FirebaseApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';

// ============================================
// 🔧 HƯỚNG DẪN SETUP FIREBASE
// ============================================
// 1. Truy cập https://console.firebase.google.com/
// 2. Tạo project mới: "lucky-number-stem-day"
// 3. Build > Realtime Database > Create Database
// 4. Chọn region: asia-southeast1 (Singapore)
// 5. Start in "test mode"
// 6. Project Settings > Add app > Web
// 7. Copy config và paste vào đây (thay thế phần bên dưới)
// ============================================

// 🔥 PASTE FIREBASE CONFIG CỦA BẠN VÀO ĐÂY:
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// ============================================
// DATABASE RULES (Paste vào Firebase Console)
// ============================================
// {
//   "rules": {
//     ".read": true,
//     ".write": true
//   }
// }
// ============================================

// Check if Firebase config is valid (not using placeholder values)
export function isFirebaseConfigured(): boolean {
  return (
    firebaseConfig.apiKey !== "YOUR_API_KEY_HERE" &&
    !firebaseConfig.databaseURL.includes("your-project") &&
    firebaseConfig.projectId !== "your-project-id"
  );
}

// Initialize Firebase only if configured
let app: FirebaseApp | null = null;
let database: Database | null = null;

try {
  if (isFirebaseConfigured()) {
    app = initializeApp(firebaseConfig);
    database = getDatabase(app);
    console.log('✅ Firebase initialized successfully!');
  } else {
    // Running in demo mode - no warning needed
    console.log('📱 Running in Demo Mode (offline)');
  }
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
}

export { database };
export { app };