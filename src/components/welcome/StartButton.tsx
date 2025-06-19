import React from "react";
import { colors } from "../theme/Colors";

interface StartButtonProps {
  onClick: () => void;
}

export const StartButton: React.FC<StartButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-fit max-w-md mx-auto py-2 px-7 bg-[#51C7B0] text-white font-baloo text-lg rounded-full font-extrabold tracking-wide transition-transform duration-200 shadow hover:scale-105 hover:bg-[#79e7cc] active:scale-95 border-2 border-[#2A2320] focus:outline-none select-none"
      style={{
        letterSpacing: "0.02em",
        marginTop: "8rem",
        boxShadow: "0 2px 18px rgba(79,160,120,0.16)",
        minWidth: "1px",
        position: "relative",
        zIndex: 30,
        backgroundColor: colors.buttonTeal,
        borderColor: colors.outline
      }}
    >
      START CREATING!
    </button>
  );
};
