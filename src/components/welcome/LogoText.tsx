import React from "react";
import { colors } from "../theme/Colors";

export const LogoText: React.FC = () => {
  return (
    <div className="text-center mb-8 relative z-30 mt-[-68px]">
      {/* Vanessa's - cursive script style with burgundy color and black outline */}
      <div className="lobster-two-font text-7xl font-bold text-[#d42c75] tracking-wide mb-[-10px]" 
           style={{ 
             WebkitTextStroke: `0.1px ${colors.outline}`, 
             textShadow: `2px 2px 0px ${colors.outline}, -1px -1px 0px ${colors.outline}, 1px -1px 0px ${colors.outline}, -1px 1px 0px ${colors.outline}`,
             filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))"
           }}>
        Vanessa's
      </div>
      
      {/* LITTLE ART CORNER - chunky bubble letters with yellow fill and curved arc */}
      <div className="text-center mb-4 relative">
        <div className="curved-text-container" style={{ height: '100px', position: 'relative' }}>
          <svg width="500" height="100" viewBox="0 0 500 100" className="mx-auto">
            <defs>
              <path id="top-curve" d="M 100 65 Q 250 35 400 65" />
              <path id="bottom-curve" d="M 150 95 Q 250 85 350 95" />
            </defs>
            
            {/* LITTLE ART on top curve */}
            <text className="moodcake-font font-black" 
                  style={{ 
                    fill: colors.yellowText,
                    stroke: colors.outline,
                    strokeWidth: "1px",
                    fontSize: "56px",
                    fontWeight: "900",
                    filter: "drop-shadow(3px 3px 6px rgba(0,0,0,0.3))"
                  }}>
              <textPath href="#top-curve" startOffset="50%" textAnchor="middle">
                LITTLE ART
              </textPath>
            </text>
            
            {/* CORNER on bottom curve */}
            <text className="moodcake-font font-black" 
                  style={{ 
                    fill: colors.yellowText,
                    stroke: colors.outline,
                    strokeWidth: "1px",
                    fontSize: "54px",
                    fontWeight: "900",
                    filter: "drop-shadow(3px 3px 6px rgba(0,0,0,0.3))"
                  }}>
              <textPath href="#bottom-curve" startOffset="50%" textAnchor="middle">
                CORNER
              </textPath>
            </text>
          </svg>
        </div>
      </div>
      
      {/* The Comfy and Cozy Series - simple black text */}
      <div className="bare-marker-font text-3xl text-[#2A2320] font-normal tracking-wide leading-tight mt-[-30px]">
        <div>The Comfy and Cozy</div>
        <div className="mt-[-16px]">Series</div>
      </div>
    </div>
  );
};
