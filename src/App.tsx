import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ref,
  onValue,
  set,
  update,
  get,
  remove,
  onDisconnect,
} from "firebase/database";
import { database } from "./config/firebase";
import { NumberDisplay } from "./components/NumberDisplay";
import { STEMParticles } from "./components/STEMParticles";
import { RobotMascot } from "./components/RobotMascot";

import {
  LuckyNumber,
  Prize,
  prizeData,
  RecentNumbers,
} from "./components/RecentNumbers";
import { AdminKeyDialog } from "./components/AdminKeyDialog";
import { ViewerNotification } from "./components/ViewerNotification";
import { WinnerCelebration } from "./components/WinnerCelebration";
import { Button } from "./components/ui/button";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";
import backgroundImage from "./assets/bgr.jpg";
import fptLogo from "figma:asset/b6356dbc2eb526e3e2efc9fb62671358d845ef9a.png";
import stemDayLogo from "figma:asset/92e9417244f1b12c23a75e49f37a6d9c60ae2460.png";

import PrizeSelect from "./components/PrizeSelect";
import spinSound from "./assets/wheel.mp3";

interface SpinningState {
  thousands: boolean;
  hundreds: boolean;
  tens: boolean;
  ones: boolean;
}

const ADMIN_KEY = "STEMDAY2025";
const spinAudio = new Audio(spinSound);
const resetData = { thousands: 0, hundreds: 0, tens: 0, ones: 0 };

export default function App() {
  const [numbers, setNumbers] = useState({
    thousands: 0,
    hundreds: 0,
    tens: 0,
    ones: 0,
  });
  const [spinning, setSpinning] = useState<SpinningState>({
    thousands: false,
    hundreds: false,
    tens: false,
    ones: false,
  });
  const spunDigitRef = useRef<SpinningState>({
    thousands: false,
    hundreds: false,
    tens: false,
    ones: false,
  });

  const [antAnimating, setAntAnimating] = useState(false);
  const [recentNumbers, setRecentNumbers] = useState<LuckyNumber[]>([]);
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<Prize>(Prize.THIRD);

  const [isAdmin, setIsAdmin] = useState(false);
  const [currentAdminName, setCurrentAdminName] = useState<string>("");
  const [authError, setAuthError] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [showWinnerCelebration, setShowWinnerCelebration] = useState(false);
  const [winnerNumber, setWinnerNumber] = useState("");
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const adminIdRef = useRef<string>("");

  // Initialize Firebase listeners
  useEffect(() => {
    if (isDemoMode || !database) return;

    // Listen to session data (numbers & spinning state)
    const sessionRef = ref(database, "session");
    const unsubSession = onValue(sessionRef, (snapshot) => {
      if (isAdmin) return;

      const data = snapshot.val();
      if (!data) return;

      if (data.numbers) {
        setNumbers(data.numbers);
        if (JSON.stringify(data.numbers) === JSON.stringify(resetData)) {
          spinAudio.pause();
          spinAudio.currentTime = 0;
        }

        if (data.allSpun) handleCelebrate(data.numbers);
      }

      if (data.spinning) {
        setSpinning(data.spinning);

        if (Object.values(data.spinning).some((s) => s)) {
          spinAudio.play();
        }
      }

      if (data.adminName) {
        setCurrentAdminName(data.adminName);
      }
    });

    // Listen to history
    const historyRef = ref(database, "history");
    const unsubHistory = onValue(historyRef, (snapshot) => {
      if (isAdmin) return;

      const data = snapshot.val();
      if (data && Array.isArray(data)) {
        setRecentNumbers(data.filter(Boolean).slice(0, 10));
      } else {
        setRecentNumbers([]);
      }
    });

    return () => {
      unsubSession();
      unsubHistory();
    };
  }, [isAdmin, isDemoMode]);

  // Load local history on mount
  useEffect(() => {
    const saved = localStorage.getItem("luckyNumbers");
    if (!saved) return;

    try {
      setRecentNumbers(JSON.parse(saved));
    } catch (e) {
      console.error("Error loading saved numbers:", e);
    }
  }, []);

  const releaseAdminSession = async () => {
    if (!database) return;
    try {
      const adminRef = ref(database, "session/adminId");
      await remove(adminRef);
      const adminNameRef = ref(database, "session/adminName");
      await remove(adminNameRef);
    } catch (error) {
      console.error("Error releasing admin session:", error);
    }
  };

  const handleAuth = async (key: string) => {
    setIsAuthLoading(true);
    setAuthError("");

    try {
      if (key !== ADMIN_KEY) {
        setAuthError("❌ Mã admin không đúng!");
        setIsAuthLoading(false);
        return;
      }

      if (!database) {
        setIsDemoMode(true);
        setIsAdmin(true);
        const adminName = `Admin-${new Date().getHours()}:${String(
          new Date().getMinutes()
        ).padStart(2, "0")}`;
        setCurrentAdminName(adminName);
        setShowAdminDialog(false);
        toast.success("🎉 Xác thực thành công!", {
          description:
            "Bạn có thể quay số. App đang chạy ở chế độ Demo (offline).",
          duration: 3000,
        });
        setIsAuthLoading(false);
        return;
      }

      const adminRef = ref(database, "session/adminId");
      const snapshot = await get(adminRef);

      if (snapshot.exists() && snapshot.val()) {
        setAuthError("⚠️ Đã có admin đang hoạt động! Bạn chỉ có thể xem.");
        setIsAuthLoading(false);
        return;
      }

      const newAdminId = `admin_${Date.now()}`;
      adminIdRef.current = newAdminId;
      await set(adminRef, newAdminId);

      const adminName = `Admin-${new Date().getHours()}:${String(
        new Date().getMinutes()
      ).padStart(2, "0")}`;
      await set(ref(database, "session/adminName"), adminName);

      onDisconnect(ref(database, "session/adminId")).remove();
      onDisconnect(ref(database, "session/adminName")).remove();

      setIsAdmin(true);
      setIsDemoMode(false);
      setCurrentAdminName(adminName);
      setShowAdminDialog(false);
      toast.success("🎉 Xác thực thành công!", {
        description: "Bạn có thể điều khiển quay số realtime.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Auth error:", error);
      setAuthError("❌ Lỗi kết nối Firebase. Vui lòng kiểm tra cấu hình.");
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleCelebrate = (numbers) => {
    const finalNumber =
      numbers.thousands.toString() +
      numbers.hundreds.toString() +
      numbers.tens.toString() +
      numbers.ones.toString();

    setWinnerNumber(finalNumber);
    setShowWinnerCelebration(true);
    setTimeout(() => {
      setShowWinnerCelebration(false);
      if (isAdmin) saveNumber(finalNumber);
    }, 6000);
  };

  const spinNumber = async (position: keyof SpinningState) => {
    if (!isAdmin) {
      setShowAdminDialog(true);
      return;
    }

    const spinningUpdate = { ...spinning, [position]: true };

    if (!isDemoMode && database) {
      await update(ref(database, "session"), {
        spinning: spinningUpdate,
      });
    }

    setSpinning(spinningUpdate);
    spinAudio.play();

    setTimeout(async () => {
      const newNumber = Math.floor(Math.random() * 10);
      const numbersUpdate = { ...numbers, [position]: newNumber };
      const spinningUpdateOff = { ...spinning, [position]: false };

      setNumbers(numbersUpdate);
      setSpinning(spinningUpdateOff);
      spinAudio.pause();
      spinAudio.currentTime = 0;

      const updated = { ...spunDigitRef.current, [position]: true };
      const allSpun =
        updated.thousands && updated.hundreds && updated.tens && updated.ones;
      spunDigitRef.current = updated;

      if (!isDemoMode && database) {
        await update(ref(database, "session"), {
          numbers: numbersUpdate,
          spinning: spinningUpdateOff,
          allSpun,
        });
      }

      if (allSpun) handleCelebrate(numbersUpdate);

      playSound();
    }, 2000);
  };

  const playSound = () => {
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.1
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const saveNumber = async (number: string) => {
    const now = new Date();
    const timestamp = now.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const newEntry: LuckyNumber = { number, timestamp, prize: selectedPrize };
    const updated = [newEntry, ...recentNumbers].slice(0, 10);

    if (!isDemoMode && database) {
      try {
        await set(ref(database, "history"), updated);
      } catch (error) {
        console.error("Error saving to Firebase:", error);
        localStorage.setItem("luckyNumbers", JSON.stringify(updated));
      }
    } else {
      localStorage.setItem("luckyNumbers", JSON.stringify(updated));
    }

    setRecentNumbers(updated);

    setShowSaveNotification(true);
    toast.success("✨ Đã lưu số trúng thưởng!", {
      description: `Số may mắn: ${number}`,
      duration: 3000,
    });

    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  const resetNumbers = async () => {
    if (!isAdmin) {
      setShowAdminDialog(true);
      return;
    }

    if (!isDemoMode && database) {
      await update(ref(database, "session"), {
        numbers: resetData,
      });
    }

    setNumbers(resetData);
    setAntAnimating(true);
    setTimeout(() => setAntAnimating(false), 1200);
  };

  const clearHistory = async () => {
    if (!isAdmin) {
      setShowAdminDialog(true);
      return;
    }

    if (confirm("Bạn có chắc muốn xóa toàn bộ lịch sử số đã quay?")) {
      if (!isDemoMode && database) {
        await set(ref(database, "history"), []);
      } else {
        localStorage.removeItem("luckyNumbers");
      }
      setRecentNumbers([]);
      toast.success("Đã xóa lịch sử!", {
        description: "Tất cả số đã quay đã được xóa",
        duration: 2000,
      });
    }
  };

  const deleteNumber = async (index: number) => {
    if (!isAdmin) {
      setShowAdminDialog(true);
      return;
    }

    const updated = recentNumbers.filter((_, i) => i !== index);

    if (!isDemoMode && database) {
      if (updated.length === 0) {
        await set(ref(database, "history"), []);
      } else {
        await set(ref(database, "history"), updated);
      }
    } else {
      if (updated.length === 0) {
        localStorage.removeItem("luckyNumbers");
      } else {
        localStorage.setItem("luckyNumbers", JSON.stringify(updated));
      }
    }

    setRecentNumbers(updated);
    toast.success("Đã xóa số!", {
      description: "Số đã được xóa khỏi lịch sử",
      duration: 2000,
    });
  };

  const isAnySpinning = Object.values(spinning).some((s) => s);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Toaster position="top-center" />

      {/* Viewer Notification */}
      {!isAdmin && currentAdminName && (
        <ViewerNotification
          isSpinning={isAnySpinning}
          currentAdmin={currentAdminName}
        />
      )}

      {/* Winner Celebration */}
      <WinnerCelebration show={showWinnerCelebration} number={winnerNumber} />

      {/* Admin Key Dialog */}
      <AdminKeyDialog
        isOpen={showAdminDialog}
        onClose={() => {
          setShowAdminDialog(false);
          setAuthError("");
        }}
        onSubmit={handleAuth}
        isLoading={isAuthLoading}
        error={authError}
      />

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />

      {/* FPT Schools Logo */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-6 z-10"
      >
        <img
          src={fptLogo}
          alt="FPT Schools Logo"
          className="h-12 object-contain drop-shadow-[0_0_20px_rgba(0,255,255,0.4)]"
        />
      </motion.div>

      {/* Recent Numbers - Right side */}
      <RecentNumbers
        numbers={recentNumbers}
        onClearHistory={clearHistory}
        onDeleteNumber={deleteNumber}
        isAdmin={isAdmin}
      />

      {/* STEM Particles */}
      <STEMParticles isActive={isAnySpinning} />

      <motion.div
        animate={{
          opacity: [0.8, 1, 0.8],
          scale: [0.98, 1, 0.98],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mb-2 w-full absolute top-4"
      >
        <img
          src={stemDayLogo}
          alt="STEM DAY"
          className="h-24 xl:h-36 object-contain mx-auto drop-shadow-[0_0_30px_rgba(0,255,255,0.6)]"
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1
            className="text-5xl tracking-wider mb-4"
            style={{
              color: "#fff",
              textShadow: `
                0 0 10px rgba(0, 255, 255, 1),
                0 0 20px rgba(0, 255, 255, 0.8),
                0 0 30px rgba(0, 255, 255, 0.6)
              `,
              fontWeight: 900,
            }}
          >
            LUCKY NUMBER
          </h1>
          <h2
            className="text-4xl tracking-wider"
            style={{
              color: "#fff",
              textShadow: `
                0 0 10px rgba(0, 255, 255, 1),
                0 0 20px rgba(0, 255, 255, 0.8),
                0 0 30px rgba(0, 255, 255, 0.6)
              `,
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            Giải {prizeData[selectedPrize].text}
          </h2>
        </motion.div>

        {/* Number Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-6"
        >
          <div className="flex gap-8 items-center justify-center">
            <RobotMascot isAnimating={antAnimating} flipHorizontal={true} />

            <div className="flex gap-8 items-center justify-center bg-blue-950/40 backdrop-blur-md px-12 py-10 rounded-3xl border-2 border-cyan-400/40 shadow-[0_0_60px_rgba(0,255,255,0.3)]">
              <NumberDisplay
                value={numbers.thousands}
                isSpinning={spinning.thousands}
                position="thousands"
              />
              <NumberDisplay
                value={numbers.hundreds}
                isSpinning={spinning.hundreds}
                position="hundreds"
              />
              <NumberDisplay
                value={numbers.tens}
                isSpinning={spinning.tens}
                position="tens"
              />
              <NumberDisplay
                value={numbers.ones}
                isSpinning={spinning.ones}
                position="ones"
              />
            </div>

            <RobotMascot isAnimating={antAnimating} flipHorizontal={false} />
          </div>
        </motion.div>

        {/* Control Buttons - 4 individual buttons */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <Button
            onClick={() => spinNumber("thousands")}
            disabled={spinning.thousands || isAnySpinning}
            className="px-8 py-6 text-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 border-2 border-cyan-300/50 shadow-[0_0_20px_rgba(0,255,255,0.6)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Hàng nghìn
          </Button>
          <Button
            onClick={() => spinNumber("hundreds")}
            disabled={spinning.hundreds || isAnySpinning}
            className="px-8 py-6 text-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 border-2 border-green-300/50 shadow-[0_0_20px_rgba(0,255,0,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Hàng trăm
          </Button>
          <Button
            onClick={() => spinNumber("tens")}
            disabled={spinning.tens || isAnySpinning}
            className="px-8 py-6 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 border-2 border-purple-300/50 shadow-[0_0_20px_rgba(200,0,255,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Hàng chục
          </Button>
          <Button
            onClick={() => spinNumber("ones")}
            disabled={spinning.ones || isAnySpinning}
            className="px-8 py-6 text-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 border-2 border-orange-300/50 shadow-[0_0_20px_rgba(255,100,0,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Hàng đơn vị
          </Button>
        </div>

        {/* Reset Button */}
        <Button
          onClick={resetNumbers}
          disabled={isAnySpinning}
          className="px-12 py-4 text-lg bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 border-2 border-yellow-300/50 shadow-[0_0_20px_rgba(255,255,0,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🔄 RESET
        </Button>

        {/* Save Notification */}
        <AnimatePresence>
          {showSaveNotification && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute bottom-4 bg-green-500/90 backdrop-blur-md text-white px-6 py-3 rounded-lg shadow-lg border border-green-300/50"
            >
              ✓ Đã lưu số trúng thưởng!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <PrizeSelect onSelect={setSelectedPrize} selectedPrize={selectedPrize} />
    </div>
  );
}
