import React from "react";

export const OvalBanner: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <div 
        className="bg-white/70 backdrop-blur-sm border-4 border-white/50 shadow-xl transform -rotate-1" 
        style={{ 
          width: "300px",
          height: "180px",
          borderRadius: "50%",
          filter: "drop-shadow(0 6px 24px rgba(0,0,0,0.1))",
          marginTop: "-270px"
        }}
      />
    </div>
  );
};
