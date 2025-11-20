import { Trash2, Trophy, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

import { Button } from "./ui/button";

export enum Prize {
  FIRST = 1,
  SECOND = 2,
  THIRD = 3,
}

export const prizeData = {
  [Prize.FIRST]: {
    text: "Nhất",
    color: "#ffde00",
    sub: "st",
  },
  [Prize.SECOND]: {
    color: "#e6e6e6",
    text: "Nhì",
    sub: "nd",
  },
  [Prize.THIRD]: {
    color: "#c26035",
    text: "Ba",
    sub: "rd",
  },
};

export interface LuckyNumber {
  number: string;
  timestamp: string;
  prize: Prize;
}

interface RecentNumbersProps {
  numbers: LuckyNumber[];
  onClearHistory: () => void;
  onDeleteNumber: (index: number) => void;
  isAdmin?: boolean;
}

export function RecentNumbers({
  numbers,
  onClearHistory,
  onDeleteNumber,
  isAdmin = true,
}: RecentNumbersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute top-4 right-4 bg-gradient-to-br from-blue-900/80 to-purple-900/80 backdrop-blur-md rounded-xl p-4 border border-cyan-400/30 shadow-[0_0_20px_rgba(0,255,255,0.3)] max-w-xs z-20"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <h3
            className="text-white font-semibold"
            style={{ textShadow: "0 0 10px rgba(0, 255, 255, 0.5)" }}
          >
            Số đã quay gần đây
          </h3>
        </div>
        {numbers.length > 0 && (
          <Button
            onClick={onClearHistory}
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-red-400 hover:text-red-300 hover:bg-red-500/20"
            title={
              isAdmin
                ? "Xóa toàn bộ lịch sử"
                : "Xóa lịch sử (cần xác thực Admin)"
            }
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {numbers.length === 0 ? (
          <p className="text-cyan-300/60 text-sm">Chưa có số nào được quay</p>
        ) : (
          <AnimatePresence mode="popLayout">
            {numbers.map((item, index) => (
              <motion.div
                key={`${item.number}-${item.timestamp}-${index}`}
                initial={{ opacity: 0, x: 20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-between items-center gap-3 bg-blue-950/50 rounded-lg p-2 border border-cyan-500/20 group hover:border-cyan-400/40 transition-colors overflow-hidden"
              >
                <span
                  className="font-semibold ml-2 flex-shrink-0"
                  style={{
                    fontSize: "1.5rem",
                    textShadow: "0 0 3px rgba(255, 234, 0, 0.6)",
                    color: prizeData[item.prize].color,
                  }}
                >
                  {item.prize}
                  <sup
                    className="text-xs"
                    style={{
                      top: -12,
                      marginLeft: 2,
                    }}
                  >
                    {prizeData[item.prize].sub}
                  </sup>
                </span>
                <div className="flex-1 flex justify-between items-center min-w-0">
                  <span
                    className="text-cyan-300 font-semibold tracking-wider"
                    style={{
                      textShadow: "0 0 8px rgba(0, 255, 255, 0.6)",
                      fontSize: "1.6rem",
                    }}
                  >
                    {item.number}
                  </span>
                  <span className="text-sm text-cyan-400/70 ml-2 flex-shrink-0">
                    {item.timestamp}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDeleteNumber(index);
                  }}
                  className="flex-shrink-0 h-7 w-7 flex items-center justify-center rounded opacity-70 md:opacity-0 md:group-hover:opacity-100 text-red-400 hover:text-red-300 hover:bg-red-500/30 transition-all active:scale-90 cursor-pointer"
                  title={isAdmin ? "Xóa số này" : "Xóa số (cần xác thực Admin)"}
                  aria-label="Xóa số này"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
