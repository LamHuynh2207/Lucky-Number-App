import { initializeApp, FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDL_VNX-mNg9zOcAjXMNPrt6vmGPaOgoS4",
  authDomain: "lucky-number-stem-day.firebaseapp.com",
  databaseURL:
    "https://lucky-number-stem-day-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lucky-number-stem-day",
  storageBucket: "lucky-number-stem-day.firebasestorage.app",
  messagingSenderId: "41105186644",
  appId: "1:41105186644:web:a7cc95a734ed6509a232c1",
};

let app: FirebaseApp | null = null;
let database: Database | null = null;

try {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
  console.log("✅ Firebase initialized successfully!");
} catch (error) {
  console.error("❌ Firebase initialization error:", error);
}

export { database };
export { app };
