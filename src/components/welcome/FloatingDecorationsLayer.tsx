import React from "react";
import { FloatingDecor, FloatingShape } from "../FloatingDecor";
import { DecorationConfig, welcomeScreenDecorations } from "../decorations/DecorationConfigs";

interface FloatingDecorationsLayerProps {
  decorations?: DecorationConfig[];
}

export const FloatingDecorationsLayer: React.FC<FloatingDecorationsLayerProps> = ({ 
  decorations = welcomeScreenDecorations 
}) => {
  return (
    <div className="pointer-events-none absolute inset-0 w-full h-full z-50">
      {decorations.map((d, i) => (
        <span
          key={i}
          className="absolute animate-floating-sway"
          style={{
            ...d.style,
            animationDelay: d.style?.animationDelay ?? undefined,
            animationDuration: d.style?.animationDuration ?? undefined
          }}
        >
          <FloatingDecor shape={d.shape as FloatingShape} color={d.color} size={d.size} />
        </span>
      ))}

      {/* Floating Element Animation Keyframes */}
      <style>{`
      @keyframes floating-sway {
        0%,100% { transform: translateY(0px) rotate(-8deg);}
        24% { transform: translateY(-12px) rotate(8deg);}
        44% { transform: translateY(-16px) rotate(1deg);}
        68% { transform: translateY(-8px) rotate(-10deg);}
        82% { transform: translateY(-3px) rotate(3deg);}
      }
      .animate-floating-sway {
        animation-name: floating-sway;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        animation-timing-function: cubic-bezier(.83,-0.19,.23,1.11);
      }
      `}</style>
    </div>
  );
};
