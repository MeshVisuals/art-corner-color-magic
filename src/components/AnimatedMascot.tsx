
import React from "react";

// A simple animated SVG cat as a mascot (can be easily swapped)
export const AnimatedMascot: React.FC = () => (
  <div
    className="absolute bottom-4 right-5 md:right-10"
    style={{
      zIndex: 100,
      pointerEvents: "none",
      width: "72px",
      height: "77px",
      animation: "mascot-bobble 4s ease-in-out infinite"
    }}
  >
    <svg
      viewBox="0 0 72 77"
      width={72}
      height={77}
      fill="none"
      style={{}}
    >
      <ellipse cx="36" cy="70" rx="23" ry="7" fill="#EF7B24" opacity="0.18"/>
      <ellipse cx="36" cy="51" rx="20" ry="19" fill="#FFE9B3" stroke="#EF7B24" strokeWidth="3"/>
      {/* Left Ear */}
      <polygon points="13,36 4,18 22,28" fill="#FFE9B3" stroke="#EF7B24" strokeWidth="3"/>
      {/* Right Ear */}
      <polygon points="59,36 68,18 50,28" fill="#FFE9B3" stroke="#EF7B24" strokeWidth="3"/>
      {/* Face */}
      <circle cx="36" cy="38" r="16" fill="#FFE9B3" stroke="#EF7B24" strokeWidth="3"/>
      {/* Eyes */}
      <ellipse cx="31" cy="40" rx="2" ry="3.2" fill="#181211"/>
      <ellipse cx="41" cy="40" rx="2" ry="3.2" fill="#181211"/>
      {/* Smile */}
      <path d="M32 45 Q36 48 40 45" stroke="#EF7B24" strokeWidth="2" fill="none" />
      {/* Blush */}
      <ellipse cx="28" cy="44" rx="2" ry="1" fill="#EF7B24" opacity="0.24"/>
      <ellipse cx="44" cy="44" rx="2" ry="1" fill="#EF7B24" opacity="0.24"/>
      {/* Whiskers */}
      <path d="M21 39 Q10 41 22 43" stroke="#EF7B24" strokeWidth="1.2" fill="none"/>
      <path d="M51 39 Q62 41 50 43" stroke="#EF7B24" strokeWidth="1.2" fill="none"/>
    </svg>
    <style>{`
      @keyframes mascot-bobble {
        0%,100% { transform: translateY(0px) rotate(-4deg);}
        45% { transform: translateY(-10px) rotate(6deg);}
        70% { transform: translateY(-2px) rotate(-6deg);}
      }
    `}</style>
  </div>
);
