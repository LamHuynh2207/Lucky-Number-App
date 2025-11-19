import { motion } from "motion/react";
import React from "react";

import { Prize, prizeData } from "./RecentNumbers";
import { Button } from "./ui/button";

interface PrizeSelectProps {
  onSelect: (prize: Prize) => void;
  selectedPrize: string;
}

const PrizeSelect = ({ onSelect, selectedPrize }: PrizeSelectProps) => {
  const handleSelect = (prize: Prize) => {
    onSelect(prize);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute bottom-4 right-4 bg-gradient-to-br from-blue-900/80 to-purple-900/80 backdrop-blur-md rounded-xl p-4 border border-cyan-400/30 shadow-[0_0_20px_rgba(0,255,255,0.3)] max-w-xs z-20"
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-white font-semibold">Chọn giải thưởng</h3>
        <div className="flex flex-col gap-2">
          {Object.keys(prizeData).map((prize) => (
            <Button
              className={`cursor-pointer border-2 border-cyan-400/40 shadow-[0_0_60px_rgba(0,255,255,0.3)] hover:bg-blue-500 transition-all duration-300 ${
                selectedPrize == prize ? "bg-blue-500" : "bg-blue-950/50"
              }`}
              key={prize}
              onClick={() => handleSelect(prize as unknown as Prize)}
            >
              {prizeData[prize].text}
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PrizeSelect;
