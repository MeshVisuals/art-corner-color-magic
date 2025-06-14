
import React from "react";

interface WelcomeScreenProps {
  onStartNow: () => void;
}

// Pick the key palette colors from your image
const skyBlue = "#84D1F8";
const grassGreen = "#B5D064";
const accentYellow = "#FFE185";
const titlePink = "#FF6B9E";
const outline = "#2A2320";

export const WelcomeScreen = ({ onStartNow }: WelcomeScreenProps) => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-2 py-8"
      style={{
        background: `linear-gradient(180deg, ${skyBlue} 60%, ${grassGreen} 100%)`,
      }}
    >
      {/* Cartoon Title, skewed and outlined, overlaying the image a bit */}
      <div
        className="w-full max-w-xl mx-auto flex flex-col items-center relative z-10"
        style={{ marginBottom: "-2.0rem" }}
      >
        {/* Main Title */}
        <div
          className="font-baloo text-[2.3rem] md:text-[2.8rem] font-extrabold text-white text-center select-none"
          style={{
            transform: "skewY(-6deg) rotate(-4deg)",
            color: titlePink,
            textShadow: `
              -3px 3px 0 ${outline},
              2px 2px 0 ${accentYellow},
              4px 7px 16px rgba(0,0,0,0.10)
            `,
            letterSpacing: "0.04em",
            lineHeight: "1.08",
            marginBottom: "0.25em",
            position: "relative",
            zIndex: 2,
            pointerEvents: "none"
          }}
        >
          VANESSA&apos;S
          <br />
          LITTLE ART CORNER
        </div>
        {/* Subheadline */}
        <div
          className="font-fredoka text-lg md:text-xl mt-3 text-center"
          style={{
            transform: "skewY(-5deg) rotate(-2deg)",
            color: "#18663B",
            background: accentYellow,
            borderRadius: "16px",
            display: "inline-block",
            padding: "4px 20px",
            border: "2.5px solid " + outline,
            boxShadow: "0 3px 8px rgba(180,200,110,0.16)",
            marginBottom: "-12px",
            position: "relative",
            zIndex: 2,
            pointerEvents: "none"
          }}
        >
          Comfy and Cozy
        </div>
      </div>

      {/* Center Image in white thick rounded frame */}
      <div className="mt-2 mb-10 w-full flex justify-center z-0">
        <div
          className="bg-white flex items-center justify-center rounded-3xl border-8 border-white shadow-lg balloon-frame"
          style={{
            width: 340,
            height: 340,
            overflow: "hidden",
            boxSizing: "border-box",
            position: "relative",
            zIndex: 1,
          }}
        >
          <img
            src="/lovable-uploads/84079a02-d4a9-4396-84ac-0bc0297ce8cb.png"
            alt="Vanessa and child cartoon in the park"
            className="object-cover w-full h-full"
            style={{
              borderRadius: "1.25rem",
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={onStartNow}
        className="w-full max-w-md mx-auto py-4 px-6 bg-[#2A2320] text-white font-baloo text-xl rounded-full font-extrabold tracking-wide transition-transform duration-200 hover:scale-105 focus:outline-none shadow"
        style={{
          letterSpacing: "0.03em",
          marginTop: "-0.4rem",
          boxShadow: "0 1px 12px rgba(0,0,0,0.13)"
        }}
      >
        START CREATING!
      </button>

      {/* Footer */}
      <div className="mt-10 text-[#694020] text-sm font-fredoka drop-shadow-sm">
        MeshCode 2025
      </div>
    </div>
  );
};
