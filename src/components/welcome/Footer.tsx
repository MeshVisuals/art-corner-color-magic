import React from "react";
import { colors } from "../theme/Colors";

export const Footer: React.FC = () => {
  return (
    <div className="w-full flex justify-center absolute left-0 right-0" style={{ bottom: "10px", zIndex: 30 }}>
      <div className="text-xs font-fredoka opacity-70" style={{ color: colors.footerBrown }}>
        MeshCode 2025
      </div>
    </div>
  );
};
