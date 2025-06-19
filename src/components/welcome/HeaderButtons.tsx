import React from "react";
import { Info, Settings } from "lucide-react";
import { AboutModal } from "../AboutModal";

interface HeaderButtonsProps {
  onSettings: () => void;
}

export const HeaderButtons: React.FC<HeaderButtonsProps> = ({ onSettings }) => {
  return (
    <div className="absolute top-3 right-4 z-50 flex gap-2">
      <button
        onClick={onSettings}
        className="flex items-center gap-1 px-3 py-1 bg-black/10 hover:bg-black/20 rounded-full border border-black/12 font-semibold text-[15px] text-black shadow transition-all"
        aria-label="Settings"
        style={{ backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)" }}
      >
        <Settings className="w-5 h-5" /> Settings
      </button>
      <AboutModal 
        trigger={
          <button
            className="flex items-center gap-1 px-3 py-1 bg-black/10 hover:bg-black/20 rounded-full border border-black/12 font-semibold text-[15px] text-black shadow transition-all"
            aria-label="About & How it Works"
            style={{ backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)" }}
          >
            <Info className="w-5 h-5" /> About
          </button>
        }
      />
    </div>
  );
};
